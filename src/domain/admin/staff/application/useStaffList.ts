import { useEffect, useState, useCallback } from 'react';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { staffService } from './staffService';
import toast from 'react-hot-toast';

export function useStaffList() {
    const [staffList, setStaffList] = useState<IStaffItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStaff, setEditingStaff] = useState<IStaffItem | null>(null);

    const handleOpenModal = (staff?: IStaffItem) => {
        setEditingStaff(staff || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingStaff(null);
        setIsModalOpen(false);
    };

    //fetch data list staff
    const fetchStaff = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await staffService.getAllStaffs();
            setStaffList(data);
        } catch (e: unknown) {
            const errorMsg = e instanceof Error ? e.message : "Đã xảy ra lỗi khi lấy dữ liệu";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    //list data staff change sư refresh
    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    //fun create/update
    const handleSubmitStaff = async (input: IStaffFormInput) => {
        try {
            if (editingStaff?.id) {
                await staffService.updateStaff(editingStaff.id, input);
                toast.success('Cập nhật thông tin nhân sự thành công!');
            } else {
                await staffService.createStaff(input);
                toast.success('Thêm nhân sự mới thành công!');
            }
            handleCloseModal();
            await fetchStaff();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Thao tác thất bại. Vui lòng thử lại.';
            toast.error(msg);
        }
    };

    //fun change status
    const handleToggleStatus = async (staff: IStaffItem) => {
        if (!staff.id) return;
        try {
            await staffService.toggleStatus(staff.id, staff.status);
            toast.success(`Đã đổi trạng thái thành ${staff.status === 'Active' ? 'Inactive' : 'Active'}`);
            await fetchStaff();
        } catch (e: unknown) {
            toast.error('Lỗi khi cập nhật trạng thái trên hệ thống.' + e);
        }
    };

    //fun delete
    const handleDeleteStaff = async (id: string) => {
        if (!window.confirm("Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn nhân sự này khỏi hệ thống?")) return;
        try {
            await staffService.deleteStaff(id);
            toast.success('Đã xóa nhân sự thành công!');
            await fetchStaff();
        } catch (e: unknown) {
            toast.error('Lỗi khi xóa nhân sự khỏi hệ thống.' + e);
        }
    };

    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff,
        handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,
    };
}