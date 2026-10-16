'use client';

import { RefreshCw, WifiOff } from 'lucide-react';

interface ReconnectionBannerProps {
    isVisible: boolean;
    message?: string;
}

export function ReconnectionBanner({
    isVisible,
    message = 'Mất kết nối mạng. Đang chờ kết nối lại...'
}: ReconnectionBannerProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-center gap-2 border-b border-warning/30 bg-warning/10 px-4 py-2 text-sm text-warning"
        >
            <WifiOff className="h-4 w-4" />

            <span>{message}</span>

            <RefreshCw className="h-4 w-4 animate-spin" />
        </div>
    );
}