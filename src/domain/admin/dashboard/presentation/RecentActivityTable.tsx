'use client';

import React, { useState, useMemo } from 'react';
import { Table, Card, Chip, Pagination, Select, ListBox } from '@heroui/react';
import { DashboardColumn, ActivityData } from '@/domain/admin/dashboard/model/adminUser';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface RecentActivityTableProps {
    data: ActivityData[];
}

const statusColorMap: Record<ActivityData['status'], 'success' | 'warning' | 'danger'> = {
    Success: 'success',
    Pending: 'warning',
    Failed: 'danger',
};

const statusIconMap = {
    Success: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,
    Pending: <Clock className="h-3.5 w-3.5 text-warning" />,
    Failed: <AlertCircle className="h-3.5 w-3.5 text-danger" />,
};

const columns: DashboardColumn[] = [
    { id: 'user', label: 'Quản trị viên' },
    { id: 'action', label: 'Hành động' },
    { id: 'target', label: 'Đối tượng' },
    { id: 'time', label: 'Thời gian' },
    { id: 'status', label: 'Trạng thái' },
];

function renderCell(item: ActivityData, columnId: string) {
    switch (columnId) {
        case 'user':
            return <span className="font-semibold text-text-dark whitespace-nowrap">{item.user}</span>;
        case 'action':
            return <span className="text-text-dark font-medium whitespace-nowrap">{item.action}</span>;
        case 'target':
            return <span className="text-text-secondary whitespace-nowrap">{item.target}</span>;
        case 'time':
            return <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>;
        case 'status':
            return (
                <Chip color={statusColorMap[item.status]} variant="soft" size="sm">
                    <div className="flex items-center gap-1.5">
                        {statusIconMap[item.status]}
                        <Chip.Label>{item.status}</Chip.Label>
                    </div>
                </Chip>
            );
        default: {
            const key = columnId as keyof ActivityData;
            return item[key] ?? null;
        }
    }
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
    const [page, setPage] = useState(1);
    const [selectedAction, setSelectedAction] = useState<string>('ALL');
    const rowsPerPage = 5;

    const actionOptions = useMemo(() => {
        const uniqueActions = Array.from(new Set(data.map((item) => item.action)));
        return [
            { key: 'ALL', label: 'Tất cả hành động' },
            ...uniqueActions.map((action) => ({ key: action, label: action })),
        ];
    }, [data]);

    // Lọc dữ liệu dựa theo Action được chọn
    const filteredData = useMemo(() => {
        if (selectedAction === 'ALL') return data;
        return data.filter((item) => item.action === selectedAction);
    }, [data, selectedAction]);

    // Tính toán phân trang dựa trên tập dữ liệu đã lọc
    const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [page, filteredData, rowsPerPage]);

    // Khi đổi bộ lọc Action, reset lại trang về trang 1 để tránh lỗi out-of-bound page
    const handleActionChange = (key: string | number) => {
        setSelectedAction(String(key));
        setPage(1);
    };

    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
            <Card.Header className="p-0 border-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Card.Title className="text-lg font-bold font-headline text-text-dark">
                    Nhật ký hoạt động gần đây
                </Card.Title>

                {/* Bộ lọc theo Action */}
                <div className="w-full sm:w-48">
                    <Select
                        aria-label="Lọc theo chức vụ"
                        value={selectedAction}
                        onChange={(key) => {
                            handleActionChange(String(key));
                        }}
                        className="w-60"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {actionOptions.map((opt) => (
                                    <ListBox.Item key={opt.key} id={opt.key} textValue={opt.label}>
                                        {opt.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
            </Card.Header>

            <Card.Content className="p-0 space-y-4">
                <Table>
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content aria-label="Bảng hoạt động gần đây" className="w-full text-left border-collapse">
                            <Table.Header>
                                {columns.map((column: DashboardColumn) => (
                                    <Table.Column
                                        isRowHeader
                                        key={column.id}
                                        id={column.id}
                                        className="px-4 py-3 text-xs uppercase font-semibold text-text-secondary tracking-wider text-left border-b border-border"
                                    >
                                        {column.label}
                                    </Table.Column>
                                ))}
                            </Table.Header>
                            <Table.Body
                                items={items}
                                renderEmptyState={() => (
                                    <p className="text-center py-8 text-sm text-text-muted italic">
                                        Không tìm thấy hoạt động nào phù hợp với bộ lọc.
                                    </p>
                                )}
                            >
                                {(item: ActivityData) => (
                                    <Table.Row key={item.id} id={item.id} className="border-b border-border/50 last:border-none hover:bg-background/50 transition-colors">
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

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className="flex justify-center pt-2 w-full">
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