import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFirestoreRealtime } from '@/domain/admin/hooks/useFirestoreRealtime';
import {
    onSnapshot,
    Query,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
    onSnapshot: vi.fn(),
}));

describe('useFirestoreRealtime Hook', () => {
    const mockQuery = {} as Query<DocumentData, DocumentData>;
    const mockMapper = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('bước 1: khởi tạo với trạng thái loading = true và mảng data rỗng', () => {
        vi.mocked(onSnapshot).mockImplementation(() => vi.fn());

        // ✅ GỌI ĐÚNG HOOK useFirestoreRealtime
        const { result } = renderHook(() => useFirestoreRealtime(mockQuery, mockMapper));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it('bước 2: cập nhật data và tắt loading khi onSnapshot bắn sự kiện thành công', () => {
        const mockDocs = [
            { id: '1', data: () => ({ name: 'Lân' }) }
        ] as unknown as QueryDocumentSnapshot<DocumentData>[];

        const mappedData = { id: '1', name: 'Lân' };
        mockMapper.mockReturnValue(mappedData);

        vi.mocked(onSnapshot).mockImplementation((query, onNext) => {
            if (typeof onNext === 'function') {
                const mockSnapshot = { docs: mockDocs } as unknown as QuerySnapshot<DocumentData>;
                (onNext as (snapshot: QuerySnapshot<DocumentData>) => void)(mockSnapshot);
            }
            return vi.fn();
        });

        const { result } = renderHook(() => useFirestoreRealtime(mockQuery, mockMapper));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual([mappedData]);
        expect(mockMapper).toHaveBeenCalledTimes(1);
    });

    it('bước 3: phải bắt gọn lỗi (try/catch) nếu quá trình parse data thất bại', () => {
        const mockDocs = [
            { id: '1', data: () => ({}) }
        ] as unknown as QueryDocumentSnapshot<DocumentData>[];

        mockMapper.mockImplementation(() => { throw new Error('Lỗi parse data'); });

        vi.mocked(onSnapshot).mockImplementation((query, onNext) => {
            if (typeof onNext === 'function') {
                const mockSnapshot = { docs: mockDocs } as unknown as QuerySnapshot<DocumentData>;
                (onNext as (snapshot: QuerySnapshot<DocumentData>) => void)(mockSnapshot);
            }
            return vi.fn();
        });

        const { result } = renderHook(() => useFirestoreRealtime(mockQuery, mockMapper));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe('Lỗi parse data');
    });
});