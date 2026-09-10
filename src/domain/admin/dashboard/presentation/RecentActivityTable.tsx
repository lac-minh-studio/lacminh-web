'use client';

import React, { useState, useMemo } from 'react';
import { Table, Card, Chip, Pagination } from '@heroui/react';
import { DashboardColumn, ActivityData } from '@/domain/admin/dashboard/model/adminUser';

interface RecentActivityTableProps {
    columns: DashboardColumn[];
    data: ActivityData[];
}

const statusColorMap: Record<ActivityData['status'], 'success' | 'warning' | 'danger'> = {
    Success: 'success',
    Pending: 'warning',
    Failed: 'danger',
};

function renderCell(item: ActivityData, columnId: string) {
    switch (columnId) {
        case 'user':
            return <span className="font-semibold text-text-dark whitespace-nowrap">{item.user}</span>;
        case 'action':
            return <span className="text-text-dark whitespace-nowrap">{item.action}</span>;
        case 'target':
            return <span className="text-text-secondary whitespace-nowrap">{item.target}</span>;
        case 'time':
            return <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>;
        case 'status':
            return (
                <Chip color={statusColorMap[item.status]} variant="soft" size="sm">
                    <Chip.Label>{item.status}</Chip.Label>
                </Chip>
            );
        default: {
            const key = columnId as keyof ActivityData;
            return item[key] ?? null;
        }
    }
}

export function RecentActivityTable({ columns, data }: RecentActivityTableProps) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 3;

    const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
    //phân trang
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [page, data, rowsPerPage]);

    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
            <Card.Header className="p-0 border-none">
                <Card.Title className="text-md font-bold text-text-dark">
                    Hoạt động gần đây
                </Card.Title>
            </Card.Header>
            <Card.Content className="p-0 space-y-4">
                <Table>
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content aria-label="Bảng hoạt động gần đây" className="w-full text-left border-collapse">
                            <Table.Header columns={columns}>
                                {(column: DashboardColumn) => (
                                    <Table.Column
                                        isRowHeader
                                        id={column.id}
                                        className="px-4 py-3 text-xs uppercase font-semibold text-text-secondary tracking-wider text-left border-b border-border"
                                    >
                                        {column.label}
                                    </Table.Column>
                                )}
                            </Table.Header>
                            <Table.Body
                                items={items}
                                renderEmptyState={() => (
                                    <p className="text-center py-8 text-sm text-text-muted italic">
                                        Không có hoạt động nào
                                    </p>
                                )}
                            >
                                {(item: ActivityData) => (
                                    <Table.Row id={item.id} className="border-b border-border/50 last:border-none hover:bg-background/50 transition-colors">
                                        {columns.map((column) => (
                                            <Table.Cell key={column.id} className="px-4 py-3 text-sm align-middle">
                                                {renderCell(item, column.id)}
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>

                {/* Sửa lại lớp CSS dàn hàng ngang cho Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center pt-4 w-full">
                        <Pagination>
                            <Pagination.Content className="flex flex-row items-center justify-center gap-1.5 list-none p-0 m-0">
                                <Pagination.Item className="flex items-center">
                                    <Pagination.Previous
                                        isDisabled={page === 1}
                                        onPress={() => setPage((p) => Math.max(p - 1, 1))}
                                        className="flex flex-row items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-background transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Pagination.PreviousIcon className="w-3.5 h-3.5" />
                                        <span>Trước</span>
                                    </Pagination.Previous>
                                </Pagination.Item>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Pagination.Item key={p} className="flex items-center">
                                        <Pagination.Link
                                            isActive={p === page}
                                            onPress={() => setPage(p)}
                                            className={`flex items-center justify-center min-w-8 h-8 px-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${p === page
                                                ? 'bg-primary text-white border-primary shadow-xs'
                                                : 'border-border hover:bg-background text-text-dark'
                                                }`}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ))}

                                <Pagination.Item className="flex items-center">
                                    <Pagination.Next
                                        isDisabled={page === totalPages}
                                        onPress={() => setPage((p) => Math.min(p + 1, totalPages))}
                                        className="flex flex-row items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-background transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <span>Sau</span>
                                        <Pagination.NextIcon className="w-3.5 h-3.5" />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                )}
            </Card.Content>
        </Card>
    );
}