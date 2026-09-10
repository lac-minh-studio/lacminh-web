// components/dashboard/RecentActivityTable.tsx
'use client';

import React from 'react';
import { Table, Card, Chip } from '@heroui/react';
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
    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
            <Card.Header className="p-0 border-none">
                <Card.Title className="text-md font-bold text-text-dark">
                    Hoạt động gần đây
                </Card.Title>
            </Card.Header>
            <Card.Content className="p-0">
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
                                items={data}
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
            </Card.Content>
        </Card>
    );
}