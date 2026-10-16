import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStaffFilter } from '../useStaffFilter';
import { IStaffItem } from '@/domain/admin/staff/model/Staff'

describe('useStaffFilter hook', () => {
    // Giả lập danh sách nhân sự gốc
    const mockStaffList: IStaffItem[] = [
        {
            id: 'staff-001',
            fullName: 'Nguyễn Thanh Lân',
            email: 'lan.nguyen@lacminh.com',
            phone: '0912345678',
            department: 'Engineering',
            title: 'Backend Developer',
            role: 'ADMIN',
            status: 'Active',
            createdAt: new Date('2026-09-01T08:00:00Z'),
        },
        {
            id: 'staff-002',
            fullName: 'Trần Văn Cường',
            email: 'cuong.tran@lacminh.com',
            phone: '0387654321',
            department: 'Engineering',
            title: 'Frontend Developer',
            role: 'ADMIN',
            status: 'Active',
            createdAt: new Date('2026-09-10T09:30:00Z'),
        },
        {
            id: 'staff-003',
            fullName: 'Lê Hoàng',
            email: 'hoang.le@lacminh.com',
            phone: '84987654321',
            department: 'Helpdesk',
            title: 'IT Support Engineer',
            role: 'STAFF',
            status: 'Inactive',
            createdAt: new Date('2026-09-15T14:15:00Z'),
        },
        {
            id: 'staff-004',
            fullName: 'Phạm Thị Mai',
            email: 'mai.pham@lacminh.com',
            phone: '0561122334',
            department: 'UI/UX Design',
            title: 'UI/UX Researcher',
            role: 'STAFF',
            status: 'Active',
            createdAt: new Date('2026-09-20T10:00:00Z'),
        },
        {
            id: 'staff-005',
            fullName: 'Vũ Hải Phong',
            email: 'phong.vu@lacminh.com',
            phone: '0799988776',
            department: 'Product',
            title: 'Product Manager',
            role: 'STAFF',
            status: 'Active',
            createdAt: new Date('2026-09-24T16:45:00Z'),
        }
    ];

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Nên khởi tạo với giá trị mặc định chuẩn xác', () => {
        const { result } = renderHook(() => useStaffFilter(mockStaffList));

        expect(result.current.searchTerm).toBe('');

        if (result.current.titleFilter !== undefined) {
            expect(result.current.titleFilter).toBe('ALL');
        }

        expect(result.current.filteredStaffList).toEqual(mockStaffList);
    });

    it('Nên lọc dữ liệu cục bộ sau khi debounce 400ms khi searchTerm thay đổi', () => {
        const { result } = renderHook(() => useStaffFilter(mockStaffList));

        // Gõ chữ 'cường' vào ô tìm kiếm
        act(() => {
            result.current.setSearchTerm('Cường');
        });

        // Tua nhanh 400ms
        act(() => {
            vi.advanceTimersByTime(400);
        });

        // SỬA Ở ĐÂY: Kỳ vọng chính xác tên "Trần Văn Cường"
        expect(result.current.filteredStaffList).toHaveLength(1);
        expect(result.current.filteredStaffList[0].fullName).toBe('Trần Văn Cường');
    });

    it('Nên trả về mảng rỗng nếu không có ai khớp với từ khóa', () => {
        const { result } = renderHook(() => useStaffFilter(mockStaffList));

        act(() => {
            result.current.setSearchTerm('Tên Không Tồn Tại');
        });

        act(() => {
            vi.advanceTimersByTime(400);
        });

        expect(result.current.filteredStaffList).toEqual([]);
    });

    it('Nên lọc chính xác theo titleFilter', () => {
        const { result } = renderHook(() => useStaffFilter(mockStaffList));

        act(() => {
            if (result.current.setTitleFilter) {
                // SỬA Ở ĐÂY: Lọc theo một chức danh có thật trong mock data
                result.current.setTitleFilter('Frontend Developer');
            }
        });

        // SỬA Ở ĐÂY: Chức vụ Frontend Developer chỉ có 1 người (Trần Văn Cường)
        expect(result.current.filteredStaffList).toHaveLength(1);
        expect(result.current.filteredStaffList.every(s => s.title === 'Frontend Developer')).toBe(true);
    });
});