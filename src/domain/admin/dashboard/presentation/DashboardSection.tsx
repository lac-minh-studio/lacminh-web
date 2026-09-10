'use client';

import { useState } from 'react';
import { Sidebar } from '@/domain/admin/dashboard/presentation/SideBar';
import { Header } from '@/domain/admin/dashboard/presentation/Header';
import { MetricsGrid } from '@/domain/admin/dashboard/presentation/MetricsGrid';
import { RecentActivityTable } from '@/domain/admin/dashboard/presentation/RecentActivityTable';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';
import { activityColumns, metricsConfig, recentActivities } from '@/domain/admin/config/dashboard.config';

export default function DashboardSection() {
    const {
        adminInfo,
        handleLogout,
        isLoggingOut,
    } = useAdminDashboard();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">

            <Sidebar
                currentRole={adminInfo.role}
                onClose={() => setIsSidebarOpen(false)}
                isOpen={isSidebarOpen}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    adminInfo={adminInfo}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 space-y-8 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <MetricsGrid configs={metricsConfig} />
                    <RecentActivityTable columns={activityColumns} data={recentActivities} />
                </main>
            </div>
        </div >
    );
}