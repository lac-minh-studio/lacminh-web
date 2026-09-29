import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { activityLogService } from '@/domain/admin/dashboard/application/activityLogService';
import {
    addDoc,
    collection,
    query,
    orderBy,
    limit,
    CollectionReference,
    DocumentData,
    QueryOrderByConstraint,
    QueryLimitConstraint,
    Query,
    QueryDocumentSnapshot,
    Timestamp // Import class Timestamp thật
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// 1. Dùng importActual để giữ lại class Timestamp gốc, tránh lỗi Zod instanceof
vi.mock('firebase/firestore', async (importOriginal) => {
    const actual = await importOriginal<typeof import('firebase/firestore')>();
    return {
        ...actual, // Bê nguyên toàn bộ code thật của firebase vào đây (Bao gồm class Timestamp)
        addDoc: vi.fn(),
        collection: vi.fn(),
        query: vi.fn(),
        orderBy: vi.fn(),
        limit: vi.fn(),
    };
});

vi.mock('@/config/firebase', () => ({
    db: {}
}));

describe('activityLogService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => { });
        // Bắt cóc hàm now() của Timestamp thật và ép nó trả về mốc thời gian cố định
        vi.spyOn(Timestamp, 'now').mockReturnValue(Timestamp.fromDate(new Date('2026-09-25T14:00:00Z')));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('phải ghi log thành công vào collection "audit_logs"', async () => {
        const mockLog = {
            user: 'Lân Nguyễn',
            action: 'Xóa nhân sự',
            target: 'Nhân sự #123',
            status: 'Success' as const
        };

        const mockCollectionRef = {} as CollectionReference<DocumentData, DocumentData>;
        vi.mocked(collection).mockReturnValue(mockCollectionRef);

        await activityLogService.createLog(mockLog);

        expect(collection).toHaveBeenCalledWith(db, 'audit_logs');
        expect(addDoc).toHaveBeenCalledWith(
            mockCollectionRef,
            expect.objectContaining({
                user: 'Lân Nguyễn',
                action: 'Xóa nhân sự',
                target: 'Nhân sự #123',
                status: 'Success',
                // So sánh bằng class Timestamp thật
                createdAt: Timestamp.fromDate(new Date('2026-09-25T14:00:00Z'))
            })
        );
    });

    it('phải tạo query lấy log gần đây chuẩn xác (getRecentLogsQuery)', () => {
        const mockCollectionRef = {} as CollectionReference<DocumentData, DocumentData>;
        const mockOrderByConstraint = {} as QueryOrderByConstraint;
        const mockLimitConstraint = {} as QueryLimitConstraint;
        const mockQueryReturn = {} as Query<DocumentData, DocumentData>;

        vi.mocked(collection).mockReturnValue(mockCollectionRef);
        vi.mocked(orderBy).mockReturnValue(mockOrderByConstraint);
        vi.mocked(limit).mockReturnValue(mockLimitConstraint);
        vi.mocked(query).mockReturnValue(mockQueryReturn);

        const result = activityLogService.getRecentLogsQuery(15);

        expect(collection).toHaveBeenCalledWith(db, 'audit_logs');
        expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
        expect(limit).toHaveBeenCalledWith(15);
        expect(query).toHaveBeenCalledWith(mockCollectionRef, mockOrderByConstraint, mockLimitConstraint);
        expect(result).toBe(mockQueryReturn);
    });

    describe('mapActivityLog & formatRelativeTime', () => {
        beforeEach(() => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2026-09-25T14:00:00Z'));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('phải parse Zod thành công và format thời gian: Vừa xong (< 60s)', () => {
            const mockDoc = {
                id: 'log-123',
                data: () => ({
                    user: 'Lân',
                    action: 'Tạo',
                    target: 'Nhân sự',
                    status: 'Success',
                    // Sử dụng class Timestamp thật để Zod parse thành công
                    createdAt: Timestamp.fromDate(new Date('2026-09-25T13:59:30Z'))
                })
            } as unknown as QueryDocumentSnapshot<DocumentData>;

            const result = activityLogService.mapActivityLog(mockDoc);

            expect(result.id).toBe('log-123');
            expect(result.user).toBe('Lân');
            expect(result.time).toBe('Vừa xong');
        });

        it('phải format thời gian chuẩn xác: phút trước, giờ trước, ngày trước', () => {
            const createMockDoc = (timeString: string) => ({
                id: '1',
                data: () => ({
                    user: 'Lân', action: 'Tạo', target: 'Nhân sự', status: 'Success',
                    createdAt: Timestamp.fromDate(new Date(timeString))
                })
            }) as unknown as QueryDocumentSnapshot<DocumentData>;

            const minResult = activityLogService.mapActivityLog(createMockDoc('2026-09-25T13:55:00Z'));
            expect(minResult.time).toBe('5 phút trước');

            const hourResult = activityLogService.mapActivityLog(createMockDoc('2026-09-25T12:00:00Z'));
            expect(hourResult.time).toBe('2 giờ trước');

            const dayResult = activityLogService.mapActivityLog(createMockDoc('2026-09-22T14:00:00Z'));
            expect(dayResult.time).toBe('3 ngày trước');
        });

        it('phải ném lỗi nếu dữ liệu Firebase trả về không vượt qua Zod schema', () => {
            const mockInvalidDoc = {
                id: 'log-invalid',
                data: () => ({
                    user: 'Lân',
                    status: 'Success'
                })
            } as unknown as QueryDocumentSnapshot<DocumentData>;

            expect(() => activityLogService.mapActivityLog(mockInvalidDoc)).toThrow();
        });
    });
});