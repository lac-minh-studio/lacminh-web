'use client';

import { MetricsGrid } from '@/domain/admin/dashboard/presentation/MetricsGrid';
import { QuickActionsBar } from '@/domain/admin/dashboard/presentation/QuickActionsBar';
import { AnalyticsCharts } from '@/domain/admin/dashboard/presentation/AnalyticsCharts';

import {
    metricsConfig,
    lineChartData,
    pieChartData,
    quickActionsConfig,
} from '@/domain/admin/config/dashboard.config';
import { QuickActionKey } from '@/domain/admin/dashboard/model/adminUser';

export default function DashboardSection() {
    const handleQuickAction = (key: QuickActionKey) => {
        console.log('Action triggered:', key);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-dark">Trung tâm Điều hành Hệ thống</h1>
                <p className="text-sm text-text-muted">Tổng quan tình hình hoạt động và chỉ số chính</p>
            </div>

            {/* KPI Cards */}
            <MetricsGrid configs={metricsConfig} />
            {/* Biểu đồ Analytics */}
            <AnalyticsCharts lineData={lineChartData} pieData={pieChartData} />
            {/* Tác vụ Nhanh */}
            <QuickActionsBar actions={quickActionsConfig} onActionClick={handleQuickAction} />
        </div>
    );
}