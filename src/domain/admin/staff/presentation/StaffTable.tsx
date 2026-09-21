'use client';

import { Button, Table, Skeleton, Tooltip } from '@heroui/react';
import { Pencil, Trash2, Lock, Unlock } from 'lucide-react';
import { useStaffList } from '../application/useStaffList';
import { StaffFormModal } from './StaffFormModal';
import { useAdminDashboard } from '../../dashboard/application/useAdminDashboard';
import { usePermission } from '@/domain/admin/dashboard/application/usePermission';
const TABLE_HEADER = [
    "Họ và tên",
    "Email",
    "Số điện thoại",
    "Phòng ban",
    "Chức vụ",
    "Vai trò",
    "Trạng thái",
    "Hành động"
];

export function StaffTable() {
    const {
        staffList, isLoading, error, isModalOpen, editingStaff, currentPage, hasNextPage,
        handleOpenModal, handleCloseModal, handleSubmitStaff,
        handleToggleStatus, handleDeleteStaff, goToNextPage, goToPreviousPage
    } = useStaffList();

    //  Lấy thông tin người đang đăng nhập
    const {
        adminInfo
    } = useAdminDashboard();

    const {
        checkActionPermission
    } = usePermission(adminInfo);

    const renderSkeleton = () => (
        Array.from({ length: 5 }).map((_, index) => (
            <Table.Row key={`skeleton-${index}`} aria-label="Đang tải">
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-4 w-full rounded-lg mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-4 w-24 rounded-lg mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-6 w-20 rounded-full mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-4 w-3/4 rounded-lg mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-6 w-16 rounded-md mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-6 w-24 rounded-md mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-6 w-24 rounded-md mx-auto" /></Table.Cell>
                <Table.Cell className="py-4 px-4 text-center"><Skeleton className="h-6 w-24 rounded-md mx-auto" /></Table.Cell>
            </Table.Row>
        ))
    );

    const TableError = () => (
        <Table.Row key="error" aria-label="Lỗi hệ thống">
            <Table.Cell colSpan={8} className="text-center py-8 text-destructive bg-destructive/10">
                <p className="font-bold">⚠️ Lỗi hệ thống</p>
                <p className="text-xs mt-1">{error}</p>
            </Table.Cell>
        </Table.Row>
    )

    const TableEmpty = () => (
        <Table.Row key="empty" aria-label="Trống">
            <Table.Cell colSpan={8} className="text-center py-10 text-text-muted italic">
                Chưa có nhân sự nào trong hệ thống.
            </Table.Cell>
        </Table.Row>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline text-text-dark">Quản lý Nhân sự</h1>
                    <p className="text-sm text-text-secondary">Danh sách toàn bộ nhân sự nội bộ hệ thống.</p>
                </div>
                <Button
                    onPress={() => handleOpenModal()}
                    aria-label="Thêm nhân sự mới"
                    className="px-5 py-2.5 bg-primary text-text-light rounded-xl font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] border border-border"
                >
                    + Thêm nhân sự mới
                </Button>
            </div>

            <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden shadow-xl backdrop-blur-md overflow-x-auto">
                <Table aria-label="Danh sách nhân sự" className="w-full">
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content className="w-full min-w-[1000px]">
                            <Table.Header className="border-b border-border bg-surface-dark/10">
                                {TABLE_HEADER.map((title) => (
                                    <Table.Column
                                        isRowHeader
                                        key={title}
                                        aria-label={title}
                                        className="py-4 px-4 text-[length:var(--text-2xs)] uppercase tracking-[0.15em] font-semibold text-text-secondary text-center"
                                    >
                                        {title}
                                    </Table.Column>
                                ))}
                            </Table.Header>
                            <Table.Body className="divide-y divide-border/60 text-sm text-text-dark">
                                {isLoading ? (
                                    renderSkeleton()
                                ) : error ? (
                                    TableError()
                                ) : staffList.length === 0 ? (
                                    TableEmpty()
                                ) : (
                                    staffList.map((staff) => {
                                        const { canEditInfo, canChangeStatus, canDelete } = checkActionPermission(staff.id!, staff.role);
                                        return (
                                            <Table.Row
                                                key={staff.id}
                                                aria-label={staff.fullName}
                                                className="hover:bg-surface-dark/5 transition-colors"
                                            >
                                                <Table.Cell className="py-4 px-4 font-medium text-text-dark text-center">
                                                    {staff.fullName}
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                    {staff.email}
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                    {staff.phone}
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-center">
                                                    <span className="px-3 py-1 text-xs font-semibold bg-primary/15 text-text-secondary border border-primary/30 rounded-full inline-block">
                                                        {staff.department}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                    {staff.title}
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                    {staff.role}
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-center">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-medium rounded-md border inline-block ${staff.status === 'Active'
                                                            ? 'bg-success/15 text-success border-success/30'
                                                            : 'bg-destructive/15 text-destructive border-destructive/30'
                                                            }`}
                                                    >
                                                        {staff.status}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell className="py-4 px-4 text-center">
                                                    {/* Action */}
                                                    <div className="flex items-center justify-center gap-2">
                                                        {/* Edit */}
                                                        {canEditInfo ? (
                                                            <Button isIconOnly size="sm" variant="secondary" onPress={() => handleOpenModal(staff)} className="text-primary hover:bg-primary/10">
                                                                <Pencil size={16} />
                                                            </Button>
                                                        ) : (
                                                            <Tooltip >
                                                                <div className="cursor-not-allowed opacity-50">
                                                                    <Button isIconOnly size="sm" variant="ghost" isDisabled><Pencil size={16} /></Button>
                                                                </div>
                                                            </Tooltip>
                                                        )}

                                                        {/* Change status */}
                                                        {canChangeStatus ? (
                                                            <Button
                                                                isIconOnly size="sm" variant="secondary"
                                                                onPress={() => handleToggleStatus(staff)}
                                                                className={staff.status === 'Active' ? 'text-warning hover:bg-warning/10' : 'text-success hover:bg-success/10'}
                                                            >
                                                                {staff.status === 'Active' ? <Lock size={16} /> : <Unlock size={16} />}
                                                            </Button>
                                                        ) : (
                                                            <Tooltip >
                                                                <div className="cursor-not-allowed opacity-50">
                                                                    <Button isIconOnly size="sm" variant="ghost" isDisabled>
                                                                        {staff.status === 'Active' ? <Lock size={16} /> : <Unlock size={16} />}
                                                                    </Button>
                                                                </div>
                                                            </Tooltip>
                                                        )}

                                                        {/* delete */}
                                                        {canDelete ? (
                                                            <Button isIconOnly size="sm" variant="secondary" onPress={() => handleDeleteStaff(staff.id!)} className="text-destructive hover:bg-destructive/10">
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        ) : (
                                                            <Tooltip >
                                                                <div className="cursor-not-allowed opacity-50">
                                                                    <Button isIconOnly size="sm" variant="ghost" isDisabled><Trash2 size={16} /></Button>
                                                                </div>
                                                            </Tooltip>
                                                        )}

                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            <div className="flex items-center justify-end gap-3 text-sm text-text-secondary">
                <span>Trang {currentPage + 1}</span>
                <Button size="sm" variant="secondary" isDisabled={isLoading || currentPage === 0} onPress={goToPreviousPage}>Trước</Button>
                <Button size="sm" variant="secondary" isDisabled={isLoading || !hasNextPage} onPress={goToNextPage}>Sau</Button>
            </div>

            <StaffFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitStaff}
                editingStaff={editingStaff}
            />
        </div>
    );
}