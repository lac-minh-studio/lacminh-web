'use client';

import { useStaffList } from '@/domain/admin/staff/application/useStaffList';
import { StaffTable } from '@/domain/admin/staff/presentation/StaffTable';
import { StaffFormModal } from '@/domain/admin/staff/presentation/StaffFormModal';

export default function AdminStaffPage() {
    const {
        staffList,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleAddStaff,
    } = useStaffList();

    return (
        <main className="p-6 lg:p-10">
            <StaffTable staffList={staffList} onOpenAddModal={handleOpenModal} />
            <StaffFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddStaff}
            />
        </main>
    );
}