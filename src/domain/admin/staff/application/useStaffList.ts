import { useState } from 'react';
import { Title, Department, IStaffItem, IStaffFormInput } from '../model/staff';
import { STAFF_LIST } from '../infrastructure/staff.api';

export function useStaffList() {
    const [staffList, setStaffList] = useState<IStaffItem[]>(STAFF_LIST);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddStaff = (input: IStaffFormInput) => {
        const newItem: IStaffItem = {
            id: Date.now().toString(),
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            department: input.department as Department,
            title: input.title as Title,
            status: 'Active',
        };

        setStaffList((prev) => [newItem, ...prev]);
        setIsModalOpen(false);
    };

    return {
        staffList,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleAddStaff,
    };
}