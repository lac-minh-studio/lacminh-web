import { useRef, useState, } from 'react';
import toast from 'react-hot-toast';

import { staffService } from './staffService';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { useStaffRealtime } from './useStaffRealtime'
import { useAdminIdentity } from '../../dashboard/application/useAdminIdentity';
import { useActionRateLimit } from '@/domain/admin/hooks/useActionRateLimit';
import { auth } from '@/config/firebase';
export function useStaffList() {
    const { execute: rateLimitSubmit } = useActionRateLimit(2000);
    const { execute: rateLimitDelete } = useActionRateLimit(3000);
    const { execute: rateLimitStatusChange } = useActionRateLimit(2000);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<IStaffItem | null>(null);

    // Trạng thái xử lý để UI disable đúng nút.
    const [isSubmittingStaff, setIsSubmittingStaff] = useState(false);
    const [pendingStatusIds, setPendingStatusIds] = useState<Set<string>>(
        () => new Set(),
    );
    const [pendingDeleteIds, setPendingDeleteIds] = useState<Set<string>>(
        () => new Set(),
    );

    // Ref cập nhật đồng bộ, tránh hai lần gọi cùng lúc trước khi React render.
    const inFlight = useRef(new Set<string>());


    // 
    const handleOpenModal = (staff?: IStaffItem) => {
        setEditingStaff(staff || null);
        setIsModalOpen(true);
    };

    // 
    const handleCloseModal = () => {

        if (inFlight.current.has('submit-staff')) return;

        setEditingStaff(null);
        setIsModalOpen(false);
    };


    const {
        staffList,
        isLoading,
        error,
    } = useStaffRealtime();

    const { adminInfo } = useAdminIdentity();


    const handleSubmitStaff = async (input: IStaffFormInput) => {
        const lockKey = 'submit-staff';

        if (inFlight.current.has(lockKey)) {
            toast.error('Yêu cầu đang được xử lý. Vui lòng chờ.');
            return;
        }

        if (!adminInfo) {
            toast.error('Không xác định được người dùng đang đăng nhập.');
            return;
        }

        inFlight.current.add(lockKey);
        setIsSubmittingStaff(true);

        try {
            const result = await rateLimitSubmit(
                editingStaff?.id
                    ? `staff:update:${editingStaff.id}`
                    : 'staff:create',
                async () => {
                    if (editingStaff?.id) {
                        const result = await updateStaffWithApi(
                            editingStaff.id,
                            input,
                        );

                        if (
                            input.role === 'SUPER_ADMIN' &&
                            result.emailSent
                        ) {
                            toast.success(
                                'Cập nhật role và gửi email cảnh báo thành công.',
                            );
                        } else if (
                            input.role === 'SUPER_ADMIN' &&
                            !result.emailSent
                        ) {
                            toast.error(
                                'Đã cập nhật nhân sự nhưng email nâng quyền chưa gửi được.',
                                { duration: 6000 },
                            );
                        } else {
                            toast.success(
                                'Cập nhật thông tin nhân sự thành công!',
                            );
                        }
                    } else {
                        const result = await createStaffWithApi(input);

                        if (result.emailSent) {
                            toast.success(
                                'Tạo tài khoản nhân sự thành công. Email thiết lập tài khoản đã được gửi.',
                            );
                        } else {
                            toast.error(
                                'Đã tạo tài khoản nhân sự nhưng gửi email thất bại. Cần kiểm tra và gửi lại email.',
                                { duration: 6000 },
                            );
                        }
                    }
                },
            );

            if (!result.allowed) {
                toast.error(
                    'Thao tác quá nhanh hoặc yêu cầu trước vẫn đang xử lý. Vui lòng thử lại sau.',
                );
                return;
            }

            setEditingStaff(null);
            setIsModalOpen(false);
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Thao tác thất bại. Vui lòng thử lại.';

            toast.error(msg);
            throw e;
        } finally {
            inFlight.current.delete(lockKey);
            setIsSubmittingStaff(false);
        }
    };


    //fun change status

    const handleToggleStatus = async (staff: IStaffItem) => {
        const id = staff.id;
        if (!id) return;

        const lockKey = `status:${id}`;

        if (inFlight.current.has(lockKey)) return;

        if (!adminInfo) {
            toast.error('Không xác định được người dùng đang đăng nhập.');
            return;
        }

        inFlight.current.add(lockKey);
        setPendingStatusIds(previous => new Set(previous).add(id));

        try {
            const result = await rateLimitStatusChange(
                `staff:status:${id}`,
                async () => {
                    const nextStatus =
                        staff.status === 'Active' ? 'Inactive' : 'Active';

                    const updateResult = await updateStaffWithApi(id, {
                        status: nextStatus,
                    });

                    if (updateResult.emailSent) {
                        toast.success(
                            nextStatus === 'Active'
                                ? 'Đã mở khóa tài khoản và gửi email thông báo.'
                                : 'Đã khóa tài khoản và gửi email thông báo.',
                        );
                    } else {
                        toast.error(
                            nextStatus === 'Active'
                                ? 'Đã mở khóa tài khoản nhưng email thông báo chưa gửi được.'
                                : 'Đã khóa tài khoản nhưng email thông báo chưa gửi được.',
                            { duration: 6000 },
                        );
                    }
                },
            );

            if (!result.allowed) {
                toast.error('Thao tác quá nhanh. Vui lòng thử lại sau.');
            }
        } catch (e: unknown) {
            toast.error(
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi đổi trạng thái nhân sự.',
            );
        } finally {
            inFlight.current.delete(lockKey);

            setPendingStatusIds(previous => {
                const next = new Set(previous);
                next.delete(id);
                return next;
            });
        }
    };

    //fun delete
    const handleDeleteStaff = async (id: string) => {
        const lockKey = `delete:${id}`;

        if (inFlight.current.has(lockKey)) return;

        if (!adminInfo) {
            toast.error('Không xác định được người dùng đang đăng nhập.');
            return;
        }

        inFlight.current.add(lockKey);

        try {
            const confirmed = window.confirm(
                'Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn nhân sự này khỏi hệ thống?',
            );

            if (!confirmed) return;

            setPendingDeleteIds(previous => new Set(previous).add(id));

            const result = await rateLimitDelete(
                `staff:delete:${id}`,
                async () => {
                    await staffService.deleteStaff(adminInfo, id);
                    toast.success('Đã xóa nhân sự thành công!');
                },
            );

            if (!result.allowed) {
                toast.error('Thao tác xóa quá nhanh. Vui lòng thử lại sau.');
            }
        } catch (e: unknown) {
            toast.error(
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi xóa nhân sự khỏi hệ thống.',
            );
        } finally {
            inFlight.current.delete(lockKey);

            setPendingDeleteIds(previous => {
                const next = new Set(previous);
                next.delete(id);
                return next;
            });
        }
    };


    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff, isSubmittingStaff, pendingDeleteIds, pendingStatusIds,
        handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,

    };
}


async function createStaffWithApi(
    input: IStaffFormInput,
): Promise<{ emailSent: boolean }> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Phiên đăng nhập Firebase không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const idToken = await currentUser.getIdToken();

    const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(input),
    });

    const result: {
        success?: boolean;
        emailSent?: boolean;
        message?: string;
    } = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Không thể tạo nhân sự.');
    }

    return {
        emailSent: result.emailSent === true,
    };
}

async function updateStaffWithApi(
    id: string,
    input: Partial<IStaffFormInput>,
): Promise<{ emailSent: boolean }> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const idToken = await currentUser.getIdToken();

    const response = await fetch(
        `/api/staff/${encodeURIComponent(id)}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(input),
        },
    );

    const result: {
        success?: boolean;
        emailSent?: boolean;
        message?: string;
    } = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Không thể cập nhật nhân sự.');
    }

    return {
        emailSent: result.emailSent === true,
    };
}

