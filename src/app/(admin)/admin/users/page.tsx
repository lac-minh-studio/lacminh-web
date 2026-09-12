'use client';

import { useUserList } from '@/domain/admin/users/application/useUserList';
import { UserTable } from '@/domain/admin/users/presentation/UserTable';
import { UserFormModal } from '@/domain/admin/users/presentation/UserFormModal';

export default function AdminUserPage() {
    const {
        UserList,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleAddUser,
    } = useUserList();

    return (
        <main className="p-6 lg:p-10">
            <UserTable UserList={UserList} onOpenAddModal={handleOpenModal} />
            <UserFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddUser}
            />
        </main>
    );
}