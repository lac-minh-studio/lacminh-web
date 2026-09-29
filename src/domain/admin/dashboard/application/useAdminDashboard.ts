'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, } from 'next/navigation';
import { ActivityData, LineChartPoint, MetricCardConfig, PieChartSegment } from '../model/adminUser';
import { IStaffItem } from '@/domain/admin/staff/model/Staff'
import { dashboardService } from './DashboardService';
import { activityLogService } from './activityLogService';
import { Activity, Eye, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { seedService } from '../infrastructure/seeding/seedService';
import { useFirestoreRealtime } from '../../hooks/useFirestoreRealtime';
import { useStaffRealtime } from '@/domain/admin/staff/application/useStaffRealtime';
import { useAdminIdentity } from './useAdminIdentity';
export function useAdminDashboard() {
    const router = useRouter();

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

    const [visitChartData, setVisitChartData] = useState<
        LineChartPoint[]
    >([]);
    const [visits, setVisits] = useState(0);

    const {
        staffList: staffRealtime,
        isLoading: isStaffLoading,
    } = useStaffRealtime();
    const { adminInfo } = useAdminIdentity();

    /**
     * Realtime Activity Logs
     */
    const recentLogsQuery = useMemo(
        () => activityLogService.getRecentLogsQuery(10),
        []
    );

    const {
        data: recentLogs,
        isLoading: isLogsLoading,
        error: logsError,
    } = useFirestoreRealtime<ActivityData>(
        recentLogsQuery,
        activityLogService.mapActivityLog
    );


    const fetchDashboardData = useCallback(async () => {
        try {
            setIsLoadingDashboard(true);

            await seedService.seedIfEmpty();

            const [metrics, chartData] = await Promise.all([
                dashboardService.getMetricsTrend(1),
                dashboardService.getVisitChartData(),
            ]);

            setVisits(metrics[0]?.visits ?? 0);
            setVisitChartData(chartData);
        } catch (error) {
            console.error('Không thể tải Dashboard:', error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Không thể tải số liệu Dashboard.'
            );
        } finally {
            setIsLoadingDashboard(false);
        }
    }, []);

    useEffect(() => {
        void fetchDashboardData();
    }, [fetchDashboardData]);
    //
    const totalStaff = staffRealtime.length;
    //
    const activeStaff = staffRealtime.filter(
        (staff) => staff.status === 'Active'
    ).length;
    //
    const departmentData = useMemo(
        () => buildDepartmentDistribution(staffRealtime),
        [staffRealtime]
    );
    //
    const activityRate =
        totalStaff === 0
            ? 0
            : (activeStaff / totalStaff) * 100;

    const isLoading = isStaffLoading || isLoadingDashboard;
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
        adminInfo,

        // Dashboard
        metricsConfig,
        departmentData,
        visitChartData,

        // Activity logs
        recentLogs,
        isLogsLoading,
        logsError,

        // General state
        isLoading,
        isLoggingOut,

        // Actions
        handleLogout,
        refreshDashboard: fetchDashboardData,
    };
}
function buildDepartmentDistribution(
    staffList: IStaffItem[]
): PieChartSegment[] {
    const departmentCounts = new Map<string, number>();

    for (const staff of staffList) {
        const currentCount =
            departmentCounts.get(staff.department) ?? 0;

        departmentCounts.set(
            staff.department,
            currentCount + 1
        );
    }

    return Array.from(departmentCounts.entries()).map(
        ([name, value]) => ({
            name,
            value,
        })
    );
}