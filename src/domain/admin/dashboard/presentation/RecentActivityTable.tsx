'use client';

import React, { useMemo, useState } from 'react';
import { Table, Card, Chip, Select, ListBox, Button, } from '@heroui/react';
import { DashboardColumn, ActivityData, } from '@/domain/admin/dashboard/model/adminUser';
import { CheckCircle2, AlertCircle, Clock, FileDown } from 'lucide-react';
import { usePagination } from '../../hooks/usePagination';
import { CsvColumn, exportToCsv } from '@/unitls/exportToCsv';
import toast from 'react-hot-toast';

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

//
const ActivityLogCsvColumns: CsvColumn<ActivityData>[] = [
    {
        key: 'user',
        header: 'Quản trị viên',
    },
    {
        key: 'action',
        header: 'Hành động',
    },
    {
        key: 'target',
        header: 'Đối tượng',
    },
    {
        key: 'status',
        header: 'trạng thái',
        formatter: (value) =>
            value === "Success" ? "Thành công " :
                value === "Warning" ? "cảnh báo" :
                    "Thất bại"
    },
    {
        key: 'time',
        header: 'Thời gian',
        formatter: (value) =>
            value.toString(),
    },
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
    const [isExporting, setIsExporting] = useState(false);
    const [selectedAction, setSelectedAction] =
        useState<string>('ALL');


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


    const handleActionChange = (
        key: string | number
    ) => {
        setSelectedAction(String(key));
    };

    //phân trang
    const {
        currentPage,
        totalPages,
        paginatedItems,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage,
    } = usePagination({
        items: filteredData,
        pageSize: 6,
    });

    //export CSV 
    const handleExportCsv = async () => {
        try {
            setIsExporting(true);
            exportToCsv(
                filteredData,
                ActivityLogCsvColumns,
                'audit-logs.csv',
            );

            if (filteredData.length === 0) {
                toast.error(`Không có data để export`)
                return;
            }

            toast.success(
                `Đã xuất ${filteredData.length} hoạt động.`,
            );

        } catch (error) {
            console.error(
                'Export Activity Log CSV failed:',
                error,
            );

            toast.error('Xuất Activity Log CSV thất bại.');
        } finally {
            setIsExporting(false);
        }
    }


    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
            <Card.Header className="p-0 border-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Card.Title className="text-lg font-bold font-headline text-text-dark">
                    Nhật ký hoạt động gần đây
                    {/*  */}
                    <Button
                        size='lg'
                        variant="secondary"
                        onPress={handleExportCsv}
                        isDisabled={isExporting}
                        isPending={isExporting}
                        className="ml-2"

                    >
                        Export file <FileDown size={20} />
                    </Button>
                </Card.Title>

                <div className=" w-full sm:w-48">
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
                                        items={paginatedItems}
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

                        {/* phân trang */}
                        {filteredData.length > 0 && (
                            <div className="flex items-center justify-between gap-4 px-2">
                                <span className="text-sm text-text-secondary">
                                    Trang {currentPage} / {totalPages}
                                </span>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        isDisabled={!hasPreviousPage || isLoading}
                                        onPress={goToPreviousPage}
                                    >
                                        Trước
                                    </Button>

                                    <span className="min-w-20 text-center text-sm text-text-secondary">
                                        {currentPage} / {totalPages}
                                    </span>

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        isDisabled={!hasNextPage || isLoading}
                                        onPress={goToNextPage}
                                    >
                                        Sau
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Card.Content>
        </Card>
    );
}