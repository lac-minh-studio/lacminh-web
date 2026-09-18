import { collection, getCountFromServer, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { z } from 'zod';
import { db } from '@/config/firebase';
import type { LineChartPoint, PieChartSegment } from '../model/adminUser';

const MetricDocumentSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    visits: z.number().int().nonnegative(),
    activeUsers: z.number().int().nonnegative(),
    totalUsers: z.number().int().positive(),
});

export type DashboardMetric = z.infer<typeof MetricDocumentSchema>;

const departments = [
    { name: 'Engineering', color: '#6366f1' },
    { name: 'Product', color: '#22c55e' },
    { name: 'UI/UX Design', color: '#f59e0b' },
    { name: 'Helpdesk', color: '#ec4899' },
] as const;

function throwFirebaseError(context: string, error: unknown): never {
    console.error(`[Dashboard] ${context}`, error);
    const message = error instanceof Error ? error.message : 'Lỗi Firebase không xác định.';
    throw new Error(`${context}: ${message}`);
}

export const dashboardService = {
    async getTotalStaffCount(): Promise<number> {
        try {
            return (await getCountFromServer(collection(db, 'staffs'))).data().count;
        } catch (error) {
            throwFirebaseError('Không thể đếm nhân sự', error);
        }
    },

    async getStaffCountByStatus(status: 'Active' | 'Inactive'): Promise<number> {
        try {
            const staffQuery = query(collection(db, 'staffs'), where('status', '==', status === 'Active'));
            return (await getCountFromServer(staffQuery)).data().count;
        } catch (error) {
            throwFirebaseError(`Không thể đếm nhân sự ${status}`, error);
        }
    },

    async getDepartmentDistribution(): Promise<PieChartSegment[]> {
        try {
            return await Promise.all(departments.map(async (department) => ({
                ...department,
                value: (await getCountFromServer(query(
                    collection(db, 'staffs'),
                    where('department', '==', department.name),
                ))).data().count,
            })));
        } catch (error) {
            throwFirebaseError('Không thể tải phân bổ phòng ban', error);
        }
    },

    async getMetricsTrend(limitCount = 7): Promise<DashboardMetric[]> {
        try {
            const snapshot = await getDocs(query(
                collection(db, 'metrics'),
                orderBy('date', 'desc'),
                limit(limitCount),
            ));
            return snapshot.docs
                .map((item) => MetricDocumentSchema.parse(item.data()))
                .reverse();
        } catch (error) {
            throwFirebaseError('Không thể tải metrics', error);
        }
    },

    async getVisitChartData(): Promise<LineChartPoint[]> {
        const metrics = await this.getMetricsTrend();
        return metrics.map((metric) => ({
            period: metric.date.slice(5),
            users: metric.visits,
            revenue: 0,
        }));
    },
};
