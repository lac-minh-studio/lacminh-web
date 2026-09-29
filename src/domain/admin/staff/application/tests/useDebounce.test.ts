import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('Nên trả về giá trị ban đầu ngay lập tức', () => {
        const { result } = renderHook(() => useDebounce('initial', 350));
        expect(result.current).toBe('initial');
    });

    it('Chỉ nên cập nhật giá trị sau khi hết khoảng thời gian delay', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 350),
            { initialProps: { value: 'initial' } }
        );

        // Giả lập người dùng gõ phím đổi text thành 'changed'
        rerender({ value: 'changed' });
        // Lúc này chưa hết 350ms, giá trị debounce vẫn phải là 'initial'
        expect(result.current).toBe('initial');
        // Tua nhanh thời gian thêm 349ms (vẫn chưa đủ 350ms)
        act(() => { vi.advanceTimersByTime(349); });
        expect(result.current).toBe('initial');
        // Tua thêm 1ms (đủ 350ms)
        act(() => { vi.advanceTimersByTime(1); });
        // Bây giờ giá trị mới được phép cập nhật
        expect(result.current).toBe('changed');
    });
});