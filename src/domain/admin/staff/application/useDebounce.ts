import { useState, useEffect } from 'react';


export function useDebounce<T>(value: T, delay: number = 350): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Đặt hẹn giờ cập nhật debouncedValue
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}