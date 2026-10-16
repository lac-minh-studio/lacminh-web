
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSanitize } from '../useSanitize';

describe('useSanitize', () => {
    const { result } = renderHook(() => useSanitize());

    it('trả về chuỗi rỗng khi đầu vào là chuỗi rỗng', () => {
        expect(result.current.sanitize('')).toBe('');
    });

    it('chuẩn hóa khoảng trắng khi bật collapseWhitespace', () => {
        const input = '  Nguyen    Van   A  ';

        const output = result.current.sanitize(input, {
            collapseWhitespace: true,
        });

        expect(output).toBe('Nguyen Van A');
    });

    it('giữ khoảng trắng bên trong khi không bật collapseWhitespace', () => {
        const input = 'Nguyen    Van   A';

        const output = result.current.sanitize(input);

        expect(output).toBe(input);
    });

    it('xử lý chuỗi có khoảng trắng ở đầu và cuối', () => {
        const output = result.current.sanitize('  test@example.com  ');

        expect(output).toBe('test@example.com');
    });

    it('xử lý chuỗi chỉ chứa khoảng trắng', () => {
        const output = result.current.sanitize('     ', {
            collapseWhitespace: true,
        });

        expect(output).toBe('');
    });

    it('không làm thay đổi chuỗi thông thường', () => {
        const input = 'test@example.com';

        expect(result.current.sanitize(input)).toBe(input);
    });
});
