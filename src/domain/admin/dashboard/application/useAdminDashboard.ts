'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ActivityData, AdminUser, LineChartPoint, MetricCardConfig, PieChartSegment } from '../model/adminUser';
import { dashboardService } from './DashboardService';
import { activityLogService } from './activityLogService';
import { Activity, Eye, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export function useAdminDashboard() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogsLoading, setIsLogsLoading] = useState(true);
    const [totalStaff, setTotalStaff] = useState(0);
    const [activeStaff, setActiveStaff] = useState(0);
    const [departmentData, setDepartmentData] = useState<PieChartSegment[]>([]);
    const [visitChartData, setVisitChartData] = useState<LineChartPoint[]>([]);
    const [visits, setVisits] = useState(0);
    const [recentLogs, setRecentLogs] = useState<(ActivityData & { time: string })[]>([]);

    const adminInfo: AdminUser = { name: 'Nguyễn Văn A', email: 'nva@lacminh.com', role: 'ADMIN' };

    const fetchDashboardData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [total, active, deptDistribution, metrics, chartData] = await Promise.all([
                dashboardService.getTotalStaffCount(),
                dashboardService.getStaffCountByStatus('Active'),
                dashboardService.getDepartmentDistribution(),
                dashboardService.getMetricsTrend(1),
                dashboardService.getVisitChartData(),
            ]);
            setTotalStaff(total);
            setActiveStaff(active);
            setDepartmentData(deptDistribution);
            setVisits(metrics[0]?.visits ?? 0);
            setVisitChartData(chartData);
        } catch (error) {
            console.error('Không thể tải Dashboard:', error);
            toast.error(error instanceof Error ? error.message : 'Không thể tải số liệu Dashboard.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = activityLogService.subscribeToRecentLogs(
            (logs) => { setRecentLogs(logs); setIsLogsLoading(false); },
            10,
            () => { setIsLogsLoading(false); toast.error('Không thể tải nhật ký hoạt động.'); },
        );
        return unsubscribe;
    }, []);

    useEffect(() => { void fetchDashboardData(); }, [fetchDashboardData, pathname]);

    const activityRate = totalStaff === 0 ? 0 : (activeStaff / totalStaff) * 100;
    const metricsConfig: MetricCardConfig[] = [
        { id: 'total-staff', title: 'Tổng số nhân sự', value: totalStaff.toLocaleString(), change: 'Firestore', isPositive: true, icon: Users },
        { id: 'visits', title: 'Lượt truy cập', value: visits.toLocaleString(), change: 'Metrics mới nhất', isPositive: true, icon: Eye },
        { id: 'activity-rate', title: 'Tỷ lệ hoạt động', value: `${activityRate.toFixed(1)}%`, change: `${activeStaff}/${totalStaff} nhân sự`, isPositive: true, icon: Activity },
    ];

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            document.cookie = 'admin_token=; path=/; max-age=0; SameSite=Lax';
            router.push('/admin/login');
            router.refresh();
            toast.success('Đăng xuất thành công');
        } catch (error) {
            console.error('Không thể đăng xuất:', error);
            toast.error('Đăng xuất thất bại.');
        } finally { setIsLoggingOut(false); }
    };

    return {
        adminInfo, metricsConfig, departmentData, visitChartData, recentLogs,
        isLoading, isLogsLoading, isLoggingOut, handleLogout, refreshDashboard: fetchDashboardData,
    };
}
