
import { act, renderHook } from '@testing-library/react';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import { useActionRateLimit } from '../useActionRateLimit';

describe('useActionRateLimit', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-10-13T08:00:00.000Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('cho phép action đầu tiên', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));
        const callback = vi.fn().mockResolvedValue('success');

        let response!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            response = await result.current.execute(
                'staff:create',
                callback,
            );
        });

        expect(response).toEqual({
            allowed: true,
            result: 'success',
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('chặn action cùng key trong cooldown', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));
        const callback = vi.fn().mockResolvedValue('success');

        await act(async () => {
            await result.current.execute('staff:create', callback);
        });

        let response!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            response = await result.current.execute(
                'staff:create',
                callback,
            );
        });

        expect(response.allowed).toBe(false);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('cho phép các action khác key chạy độc lập', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));

        const createCallback = vi.fn().mockResolvedValue('created');
        const deleteCallback = vi.fn().mockResolvedValue('deleted');

        let createResponse!: Awaited<
            ReturnType<typeof result.current.execute>
        >;
        let deleteResponse!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            createResponse = await result.current.execute(
                'staff:create',
                createCallback,
            );

            deleteResponse = await result.current.execute(
                'staff:delete:123',
                deleteCallback,
            );
        });

        expect(createResponse.allowed).toBe(true);
        expect(deleteResponse.allowed).toBe(true);
        expect(createCallback).toHaveBeenCalledTimes(1);
        expect(deleteCallback).toHaveBeenCalledTimes(1);
    });

    it('cho phép action chạy lại sau cooldown', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));
        const callback = vi.fn().mockResolvedValue('success');

        await act(async () => {
            await result.current.execute('staff:create', callback);
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(2000);
        });

        let response!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            response = await result.current.execute(
                'staff:create',
                callback,
            );
        });

        expect(response.allowed).toBe(true);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('chặn request trùng key khi request đầu đang chạy', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));

        let resolveRequest!: (value: string) => void;

        const callback = vi.fn(
            () =>
                new Promise<string>((resolve) => {
                    resolveRequest = resolve;
                }),
        );

        let firstRequest!: ReturnType<typeof result.current.execute>;

        act(() => {
            firstRequest = result.current.execute(
                'staff:delete:123',
                callback,
            );
        });

        let secondResponse!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            secondResponse = await result.current.execute(
                'staff:delete:123',
                callback,
            );
        });

        expect(secondResponse.allowed).toBe(false);
        expect(callback).toHaveBeenCalledTimes(1);

        await act(async () => {
            resolveRequest('deleted');
            await firstRequest;
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('giữ cooldown nhưng giải phóng khóa khi callback lỗi', async () => {
        const { result } = renderHook(() => useActionRateLimit(2000));

        const failingCallback = vi.fn().mockRejectedValue(
            new Error('Delete failed'),
        );

        await expect(
            result.current.execute('staff:delete:123', failingCallback),
        ).rejects.toThrow('Delete failed');

        const retryCallback = vi.fn().mockResolvedValue('deleted');

        let response!: Awaited<
            ReturnType<typeof result.current.execute>
        >;

        await act(async () => {
            response = await result.current.execute(
                'staff:delete:123',
                retryCallback,
            );
        });

        expect(response.allowed).toBe(false);
        expect(retryCallback).not.toHaveBeenCalled();
    });
});
