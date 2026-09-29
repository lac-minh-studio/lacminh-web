import { useState, } from 'react';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { staffService } from './staffService';
// import type { StaffPageCursor } from '../infrastructure/repositories/FirestoreStaffRepository';
import toast from 'react-hot-toast';
import { useStaffRealtime } from './useStaffRealtime'
export function useStaffList() {
    // const pageSize = 6;
    // const [staffList, setStaffList] = useState<IStaffItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const [editingStaff, setEditingStaff] = useState<IStaffItem | null>(null);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [hasNextPage, setHasNextPage] = useState(false);
    // const cursors = useRef<StaffPageCursor[]>([]);

    const handleOpenModal = (staff?: IStaffItem) => {
        setEditingStaff(staff || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingStaff(null);
        setIsModalOpen(false);
    };


    const {
        staffList,
        isLoading,
        error,
    } = useStaffRealtime();


    const handleSubmitStaff = async (input: IStaffFormInput) => {
        try {
            if (editingStaff?.id) {
                await staffService.updateStaff(editingStaff.id, input);

                toast.success(
                    'Cập nhật thông tin nhân sự thành công!'
                );
            } else {
                await staffService.createStaff(input);

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
    };

    //fun change status
    const handleToggleStatus = async (staff: IStaffItem) => {
        if (!staff.id) return;
        try {
            await staffService.toggleStatus(staff.id, staff.status);
            toast.success(`Đã đổi trạng thái thành ${staff.status === 'Active' ? 'Inactive' : 'Active'}`);
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi đổi trạng thái staff';

            toast.error(msg);
        }
    };

    //fun delete
    const handleDeleteStaff = async (id: string) => {
        if (!window.confirm("Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn nhân sự này khỏi hệ thống?")) return;
        try {
            await staffService.deleteStaff(id);
            toast.success('Đã xóa nhân sự thành công!');
        } catch (e: unknown) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Lỗi khi xóa nhân sự khỏi hệ thống.';

            toast.error(msg);
        }
    };

    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff,
        // currentPage, hasNextPage,
        // setError,
        handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,

    };
}
