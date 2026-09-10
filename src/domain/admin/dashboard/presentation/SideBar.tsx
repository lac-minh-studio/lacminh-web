'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

import { sidebarConfig } from '@/domain/admin/config/dashboard.config';
import type { AdminRole } from '@/domain/admin/dashboard/model/adminUser';
import { Button } from '@heroui/react';
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentRole: AdminRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    currentRole,
}) => {
    const pathname = usePathname();

    const visibleItems = sidebarConfig.filter(
        (item) => item.permission === currentRole,
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Đóng menu"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-64 flex-col
                    justify-between
                    border-r border-border
                    bg-surface
                    p-6
                    transition-transform duration-200
                    lg:static lg:z-auto lg:translate-x-0
                    ${isOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                    }
                `}
            >
                <div className="space-y-6">
                    {/* Logo */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white">
                                L
                            </div>

                            <span className="text-lg font-bold text-text-dark">
                                Lạc Minh Admin
                            </span>
                        </div>

                        {/* Close button - Mobile */}
                        <Button
                            type="button"
                            aria-label="Đóng menu"
                            onClick={onClose}
                            className="rounded-lg p-2 text-text-secondary hover:bg-background lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {visibleItems.map((item) => {
                            const Icon = item.icon;

                            const isActive =
                                pathname === item.route ||
                                pathname.startsWith(`${item.route}/`);

                            return (
                                <Link
                                    key={item.id}
                                    href={item.route}
                                    onClick={onClose}
                                    className={`
                                        flex items-center gap-3
                                        rounded-xl px-3 py-2.5
                                        text-sm font-medium
                                        transition-all
                                        ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-secondary hover:bg-background hover:text-primary'
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />

                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
};