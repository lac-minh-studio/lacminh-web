import { useRef, useState, } from 'react';
import toast from 'react-hot-toast';

import { staffService } from './staffService';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { useStaffRealtime } from './useStaffRealtime'
import { useAdminIdentity } from '../../dashboard/application/useAdminIdentity';
import { useActionRateLimit } from '@/domain/admin/hooks/useActionRateLimit';
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
                        await staffService.updateStaff(
                            adminInfo,
                            editingStaff.id,
                            input,
                        );

                        toast.success('Cập nhật thông tin nhân sự thành công!');
                    } else {
                        await staffService.createStaff(adminInfo, input);

                        toast.success('Thêm nhân sự mới thành công!');
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
                    await staffService.toggleStatus(
                        adminInfo,
                        id,
                        staff.status,
                    );

                    toast.success(
                        `Đã đổi trạng thái thành ${staff.status === 'Active' ? 'Inactive' : 'Active'
                        }`,
                    );
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
