
import { useCallback, useRef } from 'react';

export function useActionRateLimit(delay: number) {
    const lastExecutionRef = useRef(new Map<string, number>());
    const inFlightRef = useRef(new Set<string>());

    const execute = useCallback(
        async <T,>(
            key: string,
            callback: () => Promise<T>,
        ): Promise<{ allowed: boolean; result?: T }> => {
            const now = Date.now();
            const lastExecution = lastExecutionRef.current.get(key);

            if (inFlightRef.current.has(key)) {
                return { allowed: false };
            }

            if (
                lastExecution !== undefined &&
                now - lastExecution < delay
            ) {
                return { allowed: false };
            }

            inFlightRef.current.add(key);
            lastExecutionRef.current.set(key, now);

            try {
                const result = await callback();
                return { allowed: true, result };
            } finally {
                inFlightRef.current.delete(key);
            }
        },
        [delay],
    );

    return { execute };
}
