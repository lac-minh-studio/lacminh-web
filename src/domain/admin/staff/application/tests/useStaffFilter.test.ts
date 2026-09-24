import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStaffFilter } from '../useStaffFilter';
import { staffService } from '../staffService';
import { IStaffItem } from '../../model/Staff';

// Mock Service
vi.mock('../staffService', () => ({
    staffService: {
        filterStaff: vi.fn(),
    },
}));

describe('useStaffFilter hook', () => {
    beforeEach(() => {
        // CỰC KỲ QUAN TRỌNG: Thêm { shouldAdvanceTime: true } để waitFor không bị treo
        vi.useFakeTimers({ shouldAdvanceTime: true });
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('Nên khởi tạo với giá trị mặc định chuẩn xác', async () => {
        vi.mocked(staffService.filterStaff).mockResolvedValue([]);

        const { result } = renderHook(() => useStaffFilter());

        // Ngay khi vừa render, isSearching phải là true vì đang fetch lần đầu
        expect(result.current.searchTerm).toBe('');
        expect(result.current.titleFilter).toBe('ALL');
        expect(result.current.isSearching).toBe(true);

        // Chờ API gọi xong, isSearching phải về false
        await waitFor(() => {
            expect(result.current.isSearching).toBe(false);
            expect(result.current.error).toBeNull();
        });
    });

    it('Nên gọi staffService.filterStaff sau khi debounce 400ms khi searchTerm thay đổi', async () => {
        const mockData: IStaffItem[] = [
            {
                id: '1',
                fullName: 'Lê Cường',
                email: 'cuong@example.com',
                phone: '0901234567',
                department: 'Engineering',
                title: 'Frontend Developer',
                role: 'STAFF',
                status: 'Active',
                createdAt: new Date(),
            },
        ]; vi.mocked(staffService.filterStaff).mockResolvedValue(mockData);

        const { result } = renderHook(() => useStaffFilter());

        // 1. Chờ cho lần fetch khởi tạo (Mount) hoàn tất
        await waitFor(() => {
            expect(result.current.isSearching).toBe(false);
        });

        // 2. Clear lịch sử mock function để bắt đầu test logic gõ phím
        vi.clearAllMocks();

        // 3. Giả lập gõ phím
        act(() => {
            result.current.setSearchTerm('Cường');
        });

        // Chưa đủ 400ms -> API không được phép gọi
        expect(staffService.filterStaff).not.toHaveBeenCalled();

        // Tua nhanh thời gian thêm 400ms
        act(() => {
            vi.advanceTimersByTime(400);
        });

        // Chờ kết quả và xác nhận API đã được gọi đúng tham số
        await waitFor(() => {
            expect(staffService.filterStaff).toHaveBeenCalledTimes(1);
            expect(staffService.filterStaff).toHaveBeenCalledWith({
                searchTerm: 'Cường',
                title: 'ALL',
            });
            expect(result.current.filteredStaffList).toEqual(mockData);
        });
    });

    it('Nên xử lý trạng thái lỗi khi service quăng ngoại lệ', async () => {
        // Giả lập service ném ra lỗi Firebase
        vi.mocked(staffService.filterStaff).mockRejectedValue(new Error('Firebase Error'));

        const { result } = renderHook(() => useStaffFilter());

        // Chờ và bắt lỗi
        await waitFor(() => {
            expect(result.current.isSearching).toBe(false);
            expect(result.current.error).toBe('Không thể tìm kiếm nhân sự');
            expect(result.current.filteredStaffList).toEqual([]);
        });
    });
});