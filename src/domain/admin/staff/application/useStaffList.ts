import { useEffect, useState, useCallback, useRef } from 'react';
import { IStaffItem, IStaffFormInput } from '../model/Staff';
import { staffService } from './staffService';
import type { StaffPageCursor } from '../infrastructure/repositories/FirestoreStaffRepository';
import toast from 'react-hot-toast';

export function useStaffList() {
    const pageSize = 6;
    const [staffList, setStaffList] = useState<IStaffItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStaff, setEditingStaff] = useState<IStaffItem | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const cursors = useRef<StaffPageCursor[]>([]);

    const handleOpenModal = (staff?: IStaffItem) => {
        setEditingStaff(staff || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingStaff(null);
        setIsModalOpen(false);
    };

    //fetch data list staff
    const fetchStaff = useCallback(async (page = 0) => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await staffService.getStaffPage(pageSize, page === 0 ? undefined : cursors.current[page - 1]);
            setStaffList(result.items);
            setCurrentPage(page);
            setHasNextPage(result.nextCursor !== null);
            cursors.current = cursors.current.slice(0, page);
            if (result.nextCursor) cursors.current[page] = result.nextCursor;
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
            await fetchStaff(0);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Thao tác thất bại. Vui lòng thử lại.';
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
            await fetchStaff(0);
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
            await fetchStaff(0);
        } catch (e: unknown) {
            toast.error('Lỗi khi xóa nhân sự khỏi hệ thống.' + e);
        }
    };

    //retutrn
    return {
        staffList, isLoading, error, isModalOpen, editingStaff, currentPage, hasNextPage,
        fetchStaff, setError, setStaffList, handleOpenModal, handleCloseModal, handleSubmitStaff, handleToggleStatus, handleDeleteStaff,
        goToNextPage: () => fetchStaff(currentPage + 1),
        goToPreviousPage: () => fetchStaff(currentPage - 1),
    };
}
