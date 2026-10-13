import { useRef, useState, } from 'react';
import toast from 'react-hot-toast';

import { staffService } from './staffService';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { useStaffRealtime } from './useStaffRealtime'
import { useAdminIdentity } from '../../dashboard/application/useAdminIdentity';

export function useStaffList() {
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
            throw new Error('Yêu cầu đang được xử lý. Vui lòng chờ.');
        }

        inFlight.current.add(lockKey);
        setIsSubmittingStaff(true);

        try {

            // 
            if (!adminInfo) {
                throw new Error(
                    'Không xác định được người dùng đang đăng nhập.'
                );
            }

            // 
            if (editingStaff?.id) {
                await staffService.updateStaff(adminInfo, editingStaff.id, input);

                toast.success(
                    'Cập nhật thông tin nhân sự thành công!'
                );
            } else {
                await staffService.createStaff(adminInfo, input);

                toast.success(
                    'Thêm nhân sự mới thành công!'
                );
            }
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Thao tác thất bại. Vui lòng thử lại.';

            toast.error(msg);
            throw e;
        }
        finally {
            inFlight.current.delete(lockKey);
            setIsSubmittingStaff(false);
        }
    };

    //fun change status
    const handleToggleStatus = async (staff: IStaffItem) => {
        const id = staff.id
        if (!id) return;
        const lockKey = `status:${id}`;

        if (inFlight.current.has(lockKey)) return;

        inFlight.current.add(lockKey);
        setPendingStatusIds(previous => new Set(previous).add(id));
        try {

            // 
            if (!adminInfo) {
                throw new Error(
                    'Không xác định được người dùng đang đăng nhập.'
                );
            }

            // 
            await staffService.toggleStatus(adminInfo, staff.id, staff.status);
            toast.success(`Đã đổi trạng thái thành ${staff.status === 'Active' ? 'Inactive' : 'Active'}`);
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi đổi trạng thái staff';

            toast.error(msg);
        } finally {
            // Luôn mở khóa, kể cả khi request thất bại.
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

        // Khóa ngay trước confirm để tránh mở nhiều hộp thoại liên tiếp.
        inFlight.current.add(lockKey);


        const confirm = window.confirm("Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn nhân sự này khỏi hệ thống?");

        if (!confirm) {
            inFlight.current.delete(lockKey);
            return;
        }

        setPendingDeleteIds(previous => new Set(previous).add(id));

        try {

            // 
            if (!adminInfo) {
                throw new Error(
                    'Không xác định được người dùng đang đăng nhập.'
                );
            }
            // 

            await staffService.deleteStaff(adminInfo, id);
            toast.success('Đã xóa nhân sự thành công!');
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi xóa nhân sự khỏi hệ thống.';

            toast.error(msg);
        } finally {
            inFlight.current.delete(lockKey);
            setPendingDeleteIds(previous => {
                const next = new Set(previous);
                next.delete(id);
                return next;
            });
        }
    }

    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff, isSubmittingStaff, pendingDeleteIds, pendingStatusIds,
        handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,

    };
}
