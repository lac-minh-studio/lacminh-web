import { addDoc, collection, limit, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { z } from 'zod';
import { db } from '@/config/firebase';
import { ActivityData } from '../model/adminUser';

const ActivityLogSchema = z.object({
    user: z.string(),
    action: z.string(),
    target: z.string(),
    status: z.enum(['Success', 'Pending', 'Failed']),
    createdAt: z.instanceof(Timestamp),
});

export const activityLogService = {
    async createLog(data: Omit<z.infer<typeof ActivityLogSchema>, 'createdAt'>): Promise<void> {
        await addDoc(collection(db, 'audit_logs'), { ...data, createdAt: Timestamp.now() });
    },
    //
    subscribeToRecentLogs(
        callback: (logs: ActivityData[]) => void,
        limitCount = 10,
        onError?: (error: Error) => void,
    ) {
        const recentLogsQuery = query(collection(db, 'audit_logs'), orderBy('createdAt', 'desc'), limit(limitCount));
        return onSnapshot(recentLogsQuery, (snapshot) => {
            try {
                callback(snapshot.docs.map((item) => {
                    const data = ActivityLogSchema.parse(item.data());
                    const createdAt = data.createdAt.toDate();
                    return { id: item.id, ...data, time: formatRelativeTime(createdAt) };
                }));
            } catch (error) {
                onError?.(error instanceof Error ? error : new Error('Dữ liệu activity log không hợp lệ.'));
            }
        }, (error) => onError?.(error));
    },
};

function formatRelativeTime(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
}
