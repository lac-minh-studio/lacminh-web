'use client';

import { Button, Table } from '@heroui/react';
import { useUserList } from '../application/useUserList';
import { IUserItem } from '../model/User';

interface UserTableProps {
    UserList: IUserItem[];
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

export function UserTable({ UserList, onOpenAddModal }: UserTableProps) {
    const { error, isLoading } = useUserList();

    return (
        <div className="space-y-6">
            {/* Phần tiêu đề và nút hành động */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline text-text-dark">Quản lý Người dùng</h1>
                    <p className="text-sm text-text-secondary">Danh sách toàn bộ người dùng nội bộ hệ thống.</p>
                </div>
                <Button
                    onClick={onOpenAddModal}
                    aria-label="Thêm người dùng mới"
                    className="px-5 py-2.5 bg-primary text-text-light rounded-xl font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] border border-border"
                >
                    + Thêm người dùng mới
                </Button>
            </div>

            {/* Bảng hiển thị danh sách người dùng sử dụng HeroUI */}
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
                                ) : UserList.length === 0 ? (
                                    <Table.Row key="empty" aria-label="Trống">
                                        <Table.Cell colSpan={6} className="text-center py-10 text-text-muted italic">
                                            Chưa có người dùng nào trong hệ thống.
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    UserList.map((User, ind) => (
                                        <Table.Row
                                            key={ind}
                                            aria-label={User.fullName}
                                            className="hover:bg-surface-dark/5 transition-colors"
                                        >
                                            <Table.Cell className="py-4 px-4 font-medium text-text-dark text-center">
                                                {User.fullName}
                                            </Table.Cell>
                                            <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                {User.email}
                                            </Table.Cell>
                                            <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                {User.phone}
                                            </Table.Cell>
                                            <Table.Cell className="py-4 px-4 text-center">
                                                <span className="px-3 py-1 text-xs font-semibold bg-primary/15 text-text-secondary border border-primary/30 rounded-full inline-block">
                                                    {User.department}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="py-4 px-4 text-text-secondary text-center">
                                                {User.title}
                                            </Table.Cell>
                                            <Table.Cell className="py-4 px-4 text-center">
                                                <span
                                                    className={`px-3 py-1 text-xs font-medium rounded-md border inline-block ${User.status === 'Active'
                                                        ? 'bg-success/15 text-success border-success/30'
                                                        : 'bg-destructive/15 text-destructive border-destructive/30'
                                                        }`}
                                                >
                                                    {User.status}
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