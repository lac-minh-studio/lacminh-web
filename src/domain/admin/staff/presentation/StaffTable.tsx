'use client';

import { Button, Table } from '@heroui/react';
import { useStaffList } from '../application/useStaffList';
import { IStaffItem } from '../model/staff';

interface StaffTableProps {
    staffList: IStaffItem[];
    onOpenAddModal: () => void;
}

const TABLE_HEADER = [
    "Họ và tên",
    "Email",
    "Số điện thoại",
    "Phòng ban",
    "Chức vụ",
    "Trạng thái",
];

export function StaffTable({ staffList, onOpenAddModal }: StaffTableProps) {
    const { error, isLoading } = useStaffList();

    return (
        <div className="space-y-6">
            {/* Phần tiêu đề và nút hành động */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline text-text-dark">Quản lý Nhân sự</h1>
                    <p className="text-sm text-text-secondary">Danh sách toàn bộ nhân sự nội bộ hệ thống.</p>
                </div>
                <Button
                    onClick={onOpenAddModal}
                    aria-label="Thêm nhân sự mới"
                    className="px-5 py-2.5 bg-primary text-text-light rounded-xl font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] border border-border"
                >
                    + Thêm nhân sự mới
                </Button>
            </div>

            {/* Bảng hiển thị danh sách nhân sự sử dụng HeroUI */}
            <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
                <Table aria-label="Danh sách nhân sự" className="w-full">
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content className="w-full min-w-[900px]">
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
                                    <Table.Row key="loading" aria-label="Đang tải">
                                        <Table.Cell colSpan={6} className="text-center py-10 text-text-muted italic">
                                            Đang tải danh sách nhân sự...
                                        </Table.Cell>
                                    </Table.Row>
                                ) : error ? (
                                    <Table.Row key="error" aria-label="Lỗi hệ thống">
                                        <Table.Cell colSpan={6} className="text-center py-8 text-destructive bg-destructive/10">
                                            <p className="font-bold">⚠️ Lỗi hệ thống</p>
                                            <p className="text-xs mt-1">{error}</p>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : staffList.length === 0 ? (
                                    <Table.Row key="empty" aria-label="Trống">
                                        <Table.Cell colSpan={6} className="text-center py-10 text-text-muted italic">
                                            Chưa có nhân sự nào trong hệ thống.
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    staffList.map((staff, ind) => (
                                        <Table.Row
                                            key={ind}
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
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}