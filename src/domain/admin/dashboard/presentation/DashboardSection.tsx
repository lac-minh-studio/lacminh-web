'use client';

import { useState } from 'react';
import { AnalyticsCharts } from '@/domain/admin/dashboard/presentation/AnalyticsCharts';
import { MetricsGrid } from '@/domain/admin/dashboard/presentation/MetricsGrid';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';
import { RecentActivityTable } from './RecentActivityTable';
import { ExportReportButton } from '../../report/presentation/ExportReportButton';
import { ListBox, Select } from '@heroui/react';
import { CalendarDays } from 'lucide-react';

//
const monthOptions = [
    { value: '2026-01', label: 'Tháng 01/2026' },
    { value: '2026-02', label: 'Tháng 02/2026' },
    { value: '2026-03', label: 'Tháng 03/2026' },
    { value: '2026-04', label: 'Tháng 04/2026' },
    { value: '2026-05', label: 'Tháng 05/2026' },
    { value: '2026-06', label: 'Tháng 06/2026' },
    { value: '2026-07', label: 'Tháng 07/2026' },
    { value: '2026-08', label: 'Tháng 08/2026' },
    { value: '2026-09', label: 'Tháng 09/2026' },
    { value: '2026-10', label: 'Tháng 10/2026' },
    { value: '2026-11', label: 'Tháng 11/2026' },
    { value: '2026-12', label: 'Tháng 12/2026' },
];
export default function DashboardSection() {
    const [selectedMonth, setSelectedMonth] = useState('2026-10');
    const { metricsConfig, departmentData, visitChartData, isLoading, recentLogs } = useAdminDashboard();
    return (
        <div className="space-y-6">
            <div>
                <div>
                    <h1 className="text-2xl font-bold text-text-dark">Trung tâm Điều hành Hệ thống</h1>
                    <p className="text-sm text-text-muted">Tổng quan dữ liệu trực tiếp từ Firestore Emulator</p>
                </div>
                {/* Filter month and Export Report PDF */}
                <div className="flex items-center gap-3">
                    <Select
                        className="w-48"
                        aria-label="Lọc theo chức vụ"
                        value={selectedMonth}
                        onChange={(key) => {
                            setSelectedMonth(String(key));

                        }}
                    >
                        <Select.Trigger>
                            <CalendarDays size={18} />

                            <Select.Value />

                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                {monthOptions.map((month) => (
                                    <ListBox.Item
                                        key={month.value}
                                        id={month.value}
                                        textValue={month.label}
                                    >
                                        {month.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <ExportReportButton selectedMonth={selectedMonth} />
                </div>
            </div>
            <MetricsGrid configs={metricsConfig} isLoading={isLoading} />
            <AnalyticsCharts lineData={visitChartData} pieData={departmentData} isLoading={isLoading} />
            <RecentActivityTable data={recentLogs} />
        </div>
    );
}
