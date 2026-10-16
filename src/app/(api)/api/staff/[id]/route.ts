
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

import { adminAuth, adminDb } from '@/domain/admin/lib/firebase-admin';
import { authorizeAdmin, AuthorizationError, } from '@/domain/admin/lib/authorizeAdmin';
import { StaffUpdateSchema } from '@/domain/admin/staff/model/Staff';
import { sendEmail } from '@/domain/admin/lib/email/resend';
import { superAdminAlertTemplate, accountStatusTemplate, } from '@/domain/admin/lib/email/templates';

export const runtime = 'nodejs';

type RouteContext = {
    params: Promise<{ id: string }>;
};
type StaffAuditSnapshot = {
    fullName: string | null;
    email: string | null;
    phone: string | null;
    department: string | null;
    title: string | null;
    role: string | null;
    status: 'Active' | 'Inactive';
};

export async function PATCH(
    request: NextRequest,
    context: RouteContext,
) {
    try {
        const actor = await authorizeAdmin(request, [
            'SUPER_ADMIN',
            'ADMIN',
        ]);

        const { id } = await context.params;
        const body: unknown = await request.json();
        const parsed = StaffUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Dữ liệu cập nhật không hợp lệ',
                    errors: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        const changes = parsed.data;
        const staffRef = adminDb.collection('staffs').doc(id);
        const staffSnap = await staffRef.get();

        if (!staffSnap.exists) {
            return NextResponse.json(
                { success: false, message: 'Không tìm thấy nhân sự' },
                { status: 404 },
            );
        }

        const current = staffSnap.data()!;
        const beforeSnapshot = createStaffAuditSnapshot(current);
        const roleChanged =
            changes.role !== undefined &&
            changes.role !== current.role;

        const statusChanged =
            changes.status !== undefined &&
            (changes.status === 'Active') !== (current.status === true);

        // Các thao tác nhạy cảm chỉ SUPER_ADMIN được thực hiện.
        if (
            (roleChanged || statusChanged) &&
            actor.role !== 'SUPER_ADMIN'
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Chỉ SUPER_ADMIN được thay đổi role hoặc trạng thái tài khoản',
                },
                { status: 403 },
            );
        }

        // Không cho phép tự thay đổi role hoặc tự khóa/mở khóa tài khoản.
        if (
            actor.uid === id &&
            (roleChanged || statusChanged)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Không thể tự thay đổi role hoặc trạng thái tài khoản của chính mình',
                },
                { status: 403 },
            );
        }

        const targetAuth = await adminAuth.getUser(id);
        const nextRole = changes.role ?? current.role;
        const nextStatus =
            changes.status ?? (current.status ? 'Active' : 'Inactive');

        // Đồng bộ Firebase Authentication trước khi cập nhật hồ sơ.
        if (roleChanged) {
            await adminAuth.setCustomUserClaims(id, {
                ...(targetAuth.customClaims ?? {}),
                role: nextRole,
            });
        }

        if (statusChanged) {
            await adminAuth.updateUser(id, {
                disabled: nextStatus === 'Inactive',
            });
        }

        const updatePayload: Record<string, unknown> = {
            updated_at: FieldValue.serverTimestamp(),
        };

        for (const field of [
            'fullName',
            'email',
            'phone',
            'department',
            'title',
            'role',
        ] as const) {
            const value = changes[field];
            if (value !== undefined) {
                updatePayload[field] = value;
            }
        }

        if (changes.status !== undefined) {
            updatePayload.status = changes.status === 'Active';
        }

        await staffRef.update(updatePayload);
        const afterSnapshot = createStaffAuditSnapshot({
            ...current,
            ...changes,
        });

        const fullName = changes.fullName ?? current.fullName;
        const email = changes.email ?? current.email;
        const actorAuth = await adminAuth.getUser(actor.uid);
        const actorName =
            actorAuth.displayName || actor.email || actor.uid;

        const dashboardUrl =
            `${process.env.APP_BASE_URL || 'http://localhost:3000'}/admin/dashboard`;

        // Ghi log và gửi email sau khi cập nhật dữ liệu thành công.
        const actions: string[] = [];

        if (roleChanged && nextRole === 'SUPER_ADMIN') {
            actions.push('Nâng quyền thành SUPER_ADMIN');
        } else if (roleChanged) {
            actions.push(`Thay đổi role từ ${current.role} sang ${nextRole}`);
        }

        if (statusChanged) {
            actions.push(`Chuyển trạng thái sang ${nextStatus}`);
        }

        if (actions.length === 0) {
            actions.push('Cập nhật thông tin');
        }

        for (const action of actions) {
            try {
                // Chỉ lấy IP từ header
                const forwardedFor = request.headers.get('x-forwarded-for');
                const ipAddress = forwardedFor
                    ? forwardedFor.split(',')[0]?.trim() || null
                    : request.headers.get('x-real-ip');

                const userAgent = request.headers.get('user-agent');

                await adminDb.collection('audit_logs').add({
                    user: actorName,
                    actorUid: actor.uid,
                    action,
                    target: fullName,
                    status: 'Success',
                    before: beforeSnapshot,
                    after: afterSnapshot,
                    ipAddress,
                    userAgent,
                    createdAt: FieldValue.serverTimestamp(),
                });
            } catch (error) {
                console.error('Không thể ghi audit log:', error);
            }
        }

        const emailResults: boolean[] = [];

        if (roleChanged && nextRole === 'SUPER_ADMIN') {
            try {
                await sendEmail({
                    to: email,
                    subject: 'Lạc Minh Studio — Cảnh báo nâng quyền quản trị',
                    html: superAdminAlertTemplate({
                        fullName,
                        actorName,
                        dashboardUrl,
                    }),
                });
                emailResults.push(true);
            } catch (error) {
                console.error('Gửi email nâng quyền thất bại:', error);
                emailResults.push(false);
            }
        }

        if (statusChanged) {
            try {
                await sendEmail({
                    to: email,
                    subject:
                        nextStatus === 'Inactive'
                            ? 'Lạc Minh Studio — Tài khoản đã bị khóa'
                            : 'Lạc Minh Studio — Tài khoản đã được mở khóa',
                    html: accountStatusTemplate({
                        fullName,
                        actorName,
                        status: nextStatus,
                        dashboardUrl,
                    }),
                });
                emailResults.push(true);
            } catch (error) {
                console.error('Gửi email trạng thái tài khoản thất bại:', error);
                emailResults.push(false);
            }
        }

        return NextResponse.json({
            success: true,
            emailSent: emailResults.every(Boolean),
            message: emailResults.some((sent) => !sent)
                ? 'Đã cập nhật nhân sự nhưng có email cảnh báo chưa gửi được.'
                : 'Cập nhật nhân sự thành công.',
        });
    } catch (error) {
        if (error instanceof AuthorizationError) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: error.status },
            );
        }

        console.error('Lỗi cập nhật nhân sự:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Không thể cập nhật nhân sự.',
            },
            { status: 500 },
        );
    }
}

function createStaffAuditSnapshot(
    staff: Record<string, unknown>,
): StaffAuditSnapshot {
    return {
        fullName:
            typeof staff.fullName === 'string' ? staff.fullName : null,
        email:
            typeof staff.email === 'string' ? staff.email : null,
        phone:
            typeof staff.phone === 'string' ? staff.phone : null,
        department:
            typeof staff.department === 'string'
                ? staff.department
                : null,
        title:
            typeof staff.title === 'string' ? staff.title : null,
        role:
            typeof staff.role === 'string' ? staff.role : null,
        status:
            staff.status === true || staff.status === 'Active'
                ? 'Active'
                : 'Inactive',
    };
}
