import { addDoc, collection, getCountFromServer, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

const STAFFS = [
    { fullName: 'Trần Hoàng Anh', email: 'hoanganh@lacminh.com', phone: '0374352511', department: 'Engineering', title: 'Frontend Developer', status: true },
    { fullName: 'Nguyễn Lê Hữu', email: 'huunl@lacminh.com', phone: '0912345678', department: 'Product', title: 'Product Manager', status: true },
    { fullName: 'Phạm Minh Tâm', email: 'tam.pm@lacminh.com', phone: '0987654321', department: 'UI/UX Design', title: 'UX Designer', status: false },
    { fullName: 'Lê Cường', email: 'cuongle@lacminh.com', phone: '0909123123', department: 'Helpdesk', title: 'IT Support Engineer', status: true },
] as const;

const METRICS = [
    { date: '2026-09-14', visits: 120, activeUsers: 83, totalUsers: 100 },
    { date: '2026-09-15', visits: 145, activeUsers: 86, totalUsers: 104 },
    { date: '2026-09-16', visits: 132, activeUsers: 88, totalUsers: 108 },
    { date: '2026-09-17', visits: 168, activeUsers: 92, totalUsers: 112 },
    { date: '2026-09-18', visits: 190, activeUsers: 96, totalUsers: 118 },
];

async function isEmpty(collectionName: string): Promise<boolean> {
    const snapshot = await getCountFromServer(collection(db, collectionName));
    return snapshot.data().count === 0;
}

export const seedService = {
    async seedIfEmpty(): Promise<void> {
        if (process.env.NODE_ENV !== 'development') return;

        try {
            const now = Timestamp.now();
            const [staffsEmpty, metricsEmpty, logsEmpty] = await Promise.all([
                isEmpty('staffs'),
                isEmpty('metrics'),
                isEmpty('activity_logs'),
            ]);

            if (staffsEmpty) {
                await Promise.all(STAFFS.map((staff) => addDoc(collection(db, 'staffs'), {
                    ...staff,
                    created_at: now,
                    updated_at: now,
                })));
            }

            if (metricsEmpty) {
                await Promise.all(METRICS.map((metric) => addDoc(collection(db, 'metrics'), {
                    ...metric,
                    created_at: now,
                })));
            }

            if (logsEmpty) {
                await addDoc(collection(db, 'activity_logs'), {
                    user: 'Hệ thống',
                    action: 'Khởi tạo dữ liệu mẫu',
                    target: 'Firestore Emulator',
                    status: 'Success',
                    createdAt: now,
                });
            }
        } catch (error) {
            console.error('[Seed] Không thể khởi tạo dữ liệu Emulator:', error);
            throw error;
        }
    },
};