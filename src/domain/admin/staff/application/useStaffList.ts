import { useState, } from 'react';
import toast from 'react-hot-toast';

import { staffService } from './staffService';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { useStaffRealtime } from './useStaffRealtime'
import { useAdminIdentity } from '../../dashboard/application/useAdminIdentity';

export function useStaffList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<IStaffItem | null>(null);

    // 
    const handleOpenModal = (staff?: IStaffItem) => {
        setEditingStaff(staff || null);
        setIsModalOpen(true);
    };

    // 
    const handleCloseModal = () => {
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
    };

    //fun change status
    const handleToggleStatus = async (staff: IStaffItem) => {
        if (!staff.id) return;
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
        }
    };

    //fun delete
    const handleDeleteStaff = async (id: string) => {
        if (!window.confirm("Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn nhân sự này khỏi hệ thống?")) return;
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
        }
    };

    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff,
        handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,

    };
}
