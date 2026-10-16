
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { FieldValue } from 'firebase-admin/firestore';
import { adminAuth, adminDb } from '@/domain/admin/lib/firebase-admin';
import { authorizeAdmin, AuthorizationError } from '@/domain/admin/lib/authorizeAdmin';

import { StaffFormSchema } from '@/domain/admin/staff/model/Staff';
import { sendEmail } from '@/domain/admin/lib/email/resend';
import { welcomeTemplate } from '@/domain/admin/lib/email/templates';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    let createdUid: string | null = null;
    let profileCreated = false;

    try {
        const actor = await authorizeAdmin(request, ['SUPER_ADMIN']);

        const body: unknown = await request.json();
        const parsed = StaffFormSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Dữ liệu nhân sự không hợp lệ',
                    errors: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        const staff = parsed.data;
        const normalizedEmail = staff.email.trim().toLowerCase();

        //  Tạo tài khoản Firebase Authentication.
        const authUser = await adminAuth.createUser({
            email: normalizedEmail,
            password: 'password123',
            displayName: staff.fullName,
            disabled: staff.status === 'Inactive',
        });

        createdUid = authUser.uid;

        //  Đồng bộ role để authorizeAdmin đọc được role từ ID token.
        await adminAuth.setCustomUserClaims(authUser.uid, {
            role: staff.role,
        });

        //  Tạo hồ sơ với document ID bằng UID của Firebase Auth.
        await adminDb.collection('staffs').doc(authUser.uid).set({
            fullName: staff.fullName,
            email: normalizedEmail,
            phone: staff.phone,
            department: staff.department,
            title: staff.title,
            role: staff.role,
            status: staff.status === 'Active',
            created_at: FieldValue.serverTimestamp(),
            updated_at: FieldValue.serverTimestamp(),
        });

        profileCreated = true;

        //  Ghi audit log. Lỗi log không làm mất tài khoản đã tạo.
        try {
            await adminDb.collection('audit_logs').add({
                user: actor.email || actor.uid,
                action: 'Thêm mới nhân sự',
                target: staff.fullName,
                status: 'Success',
                createdAt: FieldValue.serverTimestamp(),
            });
        } catch (error) {
            console.error('Không thể ghi audit log tạo nhân sự', error);
        }

        //  Gửi welcome email. Không gửi mật khẩu dạng văn bản thuần.
        try {
            await sendEmail({
                to: normalizedEmail,
                subject: 'Lạc Minh Studio — Thông tin tài khoản nhân sự',
                html: welcomeTemplate({
                    fullName: staff.fullName,
                    email: normalizedEmail
                }),
            });

            return NextResponse.json(
                {
                    success: true,
                    staffCreated: true,
                    emailSent: true,
                    uid: authUser.uid,
                },
                { status: 201 },
            );
        } catch (error) {
            console.error('Tạo nhân sự thành công nhưng gửi email thất bại', {
                uid: authUser.uid,
                message: error instanceof Error ? error.message : 'Unknown error',
            });

            return NextResponse.json(
                {
                    success: true,
                    staffCreated: true,
                    emailSent: false,
                    message:
                        'Tài khoản đã được tạo nhưng email chưa gửi được. Cần thử gửi lại.',
                    uid: authUser.uid,
                },
                { status: 201 },
            );
        }
    } catch (error) {
        // Bù trừ nếu Auth đã tạo nhưng hồ sơ Firestore chưa tạo thành công.
        if (createdUid && !profileCreated) {
            try {
                await adminAuth.deleteUser(createdUid);
            } catch (cleanupError) {
                console.error('Không thể dọn tài khoản Auth sau lỗi tạo hồ sơ', {
                    uid: createdUid,
                    message:
                        cleanupError instanceof Error
                            ? cleanupError.message
                            : 'Unknown error',
                });
            }
        }

        if (error instanceof AuthorizationError) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: error.status },
            );
        }

        if (error instanceof ZodError) {
            return NextResponse.json(
                { success: false, message: 'Dữ liệu nhân sự không hợp lệ' },
                { status: 400 },
            );
        }

        const errorCode = (error as { code?: string })?.code;

        if (errorCode === 'auth/email-already-exists') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email này đã tồn tại trong Firebase Authentication',
                },
                { status: 409 },
            );
        }

        console.error('Không thể tạo tài khoản nhân sự', {
            message: error instanceof Error ? error.message : 'Unknown error',
        });

        return NextResponse.json(
            { success: false, message: 'Không thể tạo tài khoản nhân sự' },
            { status: 500 },
        );
    }
}
