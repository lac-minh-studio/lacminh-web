import { addDoc, collection, DocumentData, getDocs, orderBy, Query, query, QueryDocumentSnapshot, Timestamp, where } from 'firebase/firestore';
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

type ActivityLogInput = Omit<
    z.infer<typeof ActivityLogSchema>,
    'createdAt'
>;

export const activityLogService = {

    //lấy activity trong khoảng time
    async getActivitiesByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<ActivityData[]> {
        const q = query(
            collection(db, 'audit_logs'),
            where(
                'createdAt',
                '>=',
                Timestamp.fromDate(startDate),
            ),
            where(
                'createdAt',
                '<',
                Timestamp.fromDate(endDate),
            ),
            orderBy('createdAt', 'desc'),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) =>
            this.mapActivityLog(doc),
        );
    },

    // Create a new activity log.
    async createLog(data: ActivityLogInput): Promise<void> {
        await addDoc(collection(db, 'audit_logs'), {
            ...data,
            createdAt: Timestamp.now(),
        });
    },


    // Create Firestore query for recent activity logs.
    getRecentLogsQuery(
        // limitCount = 10
    ): Query {
        return query(
            collection(db, 'audit_logs'),
            orderBy('createdAt', 'desc'),
            // limit(limitCount)
        );
    },


    //  Map and validate Firestore document
    //  into ActivityData.

    mapActivityLog(
        doc: QueryDocumentSnapshot<DocumentData>
    ): ActivityData {
        const data = ActivityLogSchema.parse(doc.data());

        return {
            id: doc.id,
            ...data,
            time: formatRelativeTime(data.createdAt.toDate()),
        };
    },
};

// chuyển timestamp thành time dễ đọc
function formatRelativeTime(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
}
