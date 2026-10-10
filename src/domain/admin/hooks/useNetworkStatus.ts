'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState<boolean>(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return navigator.onLine;
    });

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);

            toast.success(
                'Đã khôi phục kết nối mạng.'
            );
        };

        const handleOffline = () => {
            setIsOnline(false);

            toast.error(
                'Mất kết nối mạng! Hệ thống đang thử kết nối lại...',
                {
                    duration: 5000,
                }
            );
        };

        window.addEventListener(
            'online',
            handleOnline
        );

        window.addEventListener(
            'offline',
            handleOffline
        );

        return () => {
            window.removeEventListener(
                'online',
                handleOnline
            );

            window.removeEventListener(
                'offline',
                handleOffline
            );
        };
    }, []);

    return isOnline;
}