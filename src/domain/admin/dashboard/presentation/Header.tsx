'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { LogOut, Menu, User } from 'lucide-react';
import { AdminUser } from '../model/adminUser';
import { ActivityNotificationPopover } from './ActivityNotificationPopover';

import {
    recentActivities
} from '@/domain/admin/config/dashboard.config';
interface HeaderProps {
    adminInfo: AdminUser;
    onLogout: () => void;
    isLoggingOut: boolean;
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    adminInfo,
    onLogout,
    isLoggingOut,
    onMenuClick,
}) => {
    return (
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur-md md:px-6 lg:px-8">
            {/* Left */}
            <div className="flex min-w-0 items-center gap-3">
                <Button
                    isIconOnly
                    variant="secondary"
                    aria-label="Mở menu"
                    onPress={onMenuClick}
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <h2 className="hidden md:block lg:block truncate text-lg font-bold text-text-dark">
                    Tổng quan hệ thống
                </h2>
            </div>

            {/* Right */}
            <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-3 text-right">
                    <ActivityNotificationPopover data={recentActivities} />

                    <div className="hidden sm:block">
                        <p className="mt-1 text-xs text-text-secondary">
                            {adminInfo.email}
                        </p>

                        <p className="mt-1 text-xs text-text-muted">
                            {adminInfo.role}
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-bold text-primary">
                        <User className="h-5 w-5" />
                    </div>
                </div>

                <Button
                    size="sm"
                    variant="ghost"
                    isPending={isLoggingOut}
                    isDisabled={isLoggingOut}
                    onPress={onLogout}
                    className="ml-1 flex items-center gap-1.5 font-medium hover:bg-red-500"
                >
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
};