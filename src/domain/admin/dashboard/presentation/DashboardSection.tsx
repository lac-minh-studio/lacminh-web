'use client';

import { AnalyticsCharts } from '@/domain/admin/dashboard/presentation/AnalyticsCharts';
import { MetricsGrid } from '@/domain/admin/dashboard/presentation/MetricsGrid';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';
import { RecentActivityTable } from './RecentActivityTable';

export default function DashboardSection() {
    const { metricsConfig, departmentData, visitChartData, isLoading, recentLogs } = useAdminDashboard();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-dark">Trung tâm Điều hành Hệ thống</h1>
                <p className="text-sm text-text-muted">Tổng quan dữ liệu trực tiếp từ Firestore Emulator</p>
            </div>
            <MetricsGrid configs={metricsConfig} isLoading={isLoading} />
            <AnalyticsCharts lineData={visitChartData} pieData={departmentData} isLoading={isLoading} />
            <RecentActivityTable data={recentLogs} />
        </div>
    );
}
