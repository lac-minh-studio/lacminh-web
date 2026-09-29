'use client';

import React, { useMemo, useState } from 'react';
import {
    Table,
    Card,
    Chip,
    Pagination,
    Select,
    ListBox,
} from '@heroui/react';
import {
    DashboardColumn,
    ActivityData,
} from '@/domain/admin/dashboard/model/adminUser';
import {
    CheckCircle2,
    AlertCircle,
    Clock,
} from 'lucide-react';

interface RecentActivityTableProps {
    data: ActivityData[];
    isLoading?: boolean;
    error?: Error | null;
}

const statusColorMap: Record<
    ActivityData['status'],
    'success' | 'warning' | 'danger'
> = {
    Success: 'success',
    Pending: 'warning',
    Failed: 'danger',
};

const statusIconMap = {
    Success: (
        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
    ),
    Pending: (
        <Clock className="h-3.5 w-3.5 text-warning" />
    ),
    Failed: (
        <AlertCircle className="h-3.5 w-3.5 text-danger" />
    ),
};

const columns: DashboardColumn[] = [
    { id: 'user', label: 'Quản trị viên' },
    { id: 'action', label: 'Hành động' },
    { id: 'target', label: 'Đối tượng' },
    { id: 'time', label: 'Thời gian' },
    { id: 'status', label: 'Trạng thái' },
];

function renderCell(
    item: ActivityData,
    columnId: string
) {
    switch (columnId) {
        case 'user':
            return (
                <span className="font-semibold text-text-dark whitespace-nowrap">
                    {item.user}
                </span>
            );

        case 'action':
            return (
                <span className="text-text-dark font-medium whitespace-nowrap">
                    {item.action}
                </span>
            );

        case 'target':
            return (
                <span className="text-text-secondary whitespace-nowrap">
                    {item.target}
                </span>
            );

        case 'time':
            return (
                <span className="text-xs text-text-muted whitespace-nowrap">
                    {item.time}
                </span>
            );

        case 'status':
            return (
                <Chip
                    color={statusColorMap[item.status]}
                    variant="soft"
                    size="sm"
                >
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

export function RecentActivityTable({
    data,
    isLoading = false,
    error = null,
}: RecentActivityTableProps) {
    const [page, setPage] = useState(1);
    const [selectedAction, setSelectedAction] =
        useState<string>('ALL');

    const rowsPerPage = 5;

    const actionOptions = useMemo(() => {
        const uniqueActions = Array.from(
            new Set(data.map((item) => item.action))
        );

        return [
            {
                key: 'ALL',
                label: 'Tất cả hành động',
            },
            ...uniqueActions.map((action) => ({
                key: action,
                label: action,
            })),
        ];
    }, [data]);

    const filteredData = useMemo(() => {
        if (selectedAction === 'ALL') {
            return data;
        }

        return data.filter(
            (item) => item.action === selectedAction
        );
    }, [data, selectedAction]);

    const totalPages =
        Math.ceil(filteredData.length / rowsPerPage) || 1;

    const safePage = Math.min(page, totalPages);

    const items = useMemo(() => {
        const start = (safePage - 1) * rowsPerPage;

        return filteredData.slice(
            start,
            start + rowsPerPage
        );
    }, [safePage, filteredData]);

    const handleActionChange = (
        key: string | number
    ) => {
        setSelectedAction(String(key));
        setPage(1);
    };

    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
            <Card.Header className="p-0 border-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Card.Title className="text-lg font-bold font-headline text-text-dark">
                    Nhật ký hoạt động gần đây
                </Card.Title>

                <div className="w-full sm:w-48">
                    <Select
                        aria-label="Lọc theo hành động"
                        value={selectedAction}
                        onChange={(key) => {
                            handleActionChange(String(key));
                        }}
                        className="w-40"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                {actionOptions.map((option) => (
                                    <ListBox.Item
                                        key={option.key}
                                        id={option.key}
                                        textValue={option.label}
                                    >
                                        {option.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
            </Card.Header>

            <Card.Content className="p-0 space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <p className="text-sm text-text-muted">
                            Đang tải nhật ký hoạt động...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center py-10">
                        <p className="text-sm text-danger">
                            Không thể tải nhật ký hoạt động.
                        </p>
                    </div>
                ) : (
                    <>
                        <Table>
                            <Table.ScrollContainer className="w-full overflow-x-auto">
                                <Table.Content
                                    aria-label="Bảng hoạt động gần đây"
                                    className="w-full text-left border-collapse"
                                >
                                    <Table.Header>
                                        {columns.map((column) => (
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
                                            <Table.Row
                                                key={item.id}
                                                id={item.id}
                                                className="border-b border-border/50 last:border-none hover:bg-background/50 transition-colors"
                                            >
                                                {columns.map((column) => (
                                                    <Table.Cell
                                                        key={column.id}
                                                        className="px-4 py-3 text-sm align-middle"
                                                    >
                                                        {renderCell(
                                                            item,
                                                            column.id
                                                        )}
                                                    </Table.Cell>
                                                ))}
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>

                        {totalPages > 1 && (
                            <div className="flex w-full justify-center pt-4">
                                <Pagination>
                                    {/* Bắt buộc dùng flex-row ở đây */}
                                    <Pagination.Content className="flex flex-row items-center justify-center gap-2 list-none p-0 m-0">

                                        {/* Nút Previous */}
                                        <Pagination.Item>
                                            <Pagination.Previous
                                                isDisabled={page === 1}
                                                onPress={() => setPage((current) => Math.max(current - 1, 1))}
                                                // Bổ sung flex items-center cho bản thân nút nếu HeroUI không tự cấp
                                                className="flex items-center gap-1 px-3 py-1 text-sm border border-border rounded-lg"
                                            >
                                                <Pagination.PreviousIcon className="w-4 h-4" />
                                                <span>Trước</span>
                                            </Pagination.Previous>
                                        </Pagination.Item>

                                        {/* Các số trang */}
                                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                            <Pagination.Item key={pageNumber}>
                                                <Pagination.Link
                                                    isActive={pageNumber === page}
                                                    onPress={() => setPage(pageNumber)}
                                                    // Các nút số cũng cần được định hình rõ ràng
                                                    className={`flex items-center justify-center min-w-8 h-8 rounded-lg border text-sm ${pageNumber === page
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'border-border'
                                                        }`}
                                                >
                                                    {pageNumber}
                                                </Pagination.Link>
                                            </Pagination.Item>
                                        ))}

                                        {/* Nút Next */}
                                        <Pagination.Item>
                                            <Pagination.Next
                                                isDisabled={page === totalPages}
                                                onPress={() => setPage((current) => Math.min(current + 1, totalPages))}
                                                className="flex items-center gap-1 px-3 py-1 text-sm border border-border rounded-lg"
                                            >
                                                <span>Sau</span>
                                                <Pagination.NextIcon className="w-4 h-4" />
                                            </Pagination.Next>
                                        </Pagination.Item>

                                    </Pagination.Content>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </Card.Content>
        </Card>
    );
}