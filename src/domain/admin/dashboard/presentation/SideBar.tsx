'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { Button, Tooltip } from '@heroui/react';
import Image from 'next/image';
import Logo from "../../../../../public/logo.png";
import { sidebarConfig } from '@/domain/admin/config/dashboard.config';
import type { AdminRole } from '@/domain/admin/dashboard/model/adminUser';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    currentRole: AdminRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    isCollapsed,
    onToggleCollapse,
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

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex flex-col justify-between
                    border-r border-border bg-surface p-5
                    transition-all duration-300 ease-in-out
                    lg:static lg:z-auto lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'lg:w-28' : 'lg:w-64'}
                `}
            >
                <div className="space-y-6">
                    {/* Header: Logo & Collapse Button nằm cùng 1 hàng */}
                    <div className="flex items-center justify-between border-b px-4 py-4 gap-1">
                        {/* Logo Block */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white">
                                <Image
                                    src={Logo}
                                    width={24}
                                    height={24}
                                    alt="Lạc Minh Logo"
                                />
                            </div>

                            {!isCollapsed && (
                                <span className="truncate text-lg font-bold text-text-dark transition-opacity duration-200">
                                    Lạc Minh
                                </span>
                            )}
                        </div>

                        {/* Nút Toggle Collapse cho Desktop */}
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onClick={onToggleCollapse}
                            aria-label={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
                            className="hidden rounded-lg p-2  hover:cursor-pointer md:flex"
                        >
                            {isCollapsed ? (
                                <PanelLeftOpen size={20} />
                            ) : (
                                <PanelLeftClose size={20} />
                            )}
                        </Button>

                        {/* Nút Đóng cho Mobile */}
                        <Button
                            isIconOnly
                            size="sm"
                            variant="secondary"
                            onClick={onClose}
                            aria-label="Đóng menu"
                            className="flex lg:hidden shrink-0 text-text-secondary hover:bg-background"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1.5">
                        {visibleItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                pathname === item.route ||
                                pathname.startsWith(`${item.route}/`);

                            const navLink = (
                                <Link
                                    key={item.id}
                                    href={item.route}
                                    onClick={onClose}
                                    className={`
                                        flex items-center rounded-xl py-2.5 text-sm font-medium transition-all
                                        ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'}
                                        ${isActive
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-text-secondary hover:bg-background hover:text-primary'
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {!isCollapsed && (
                                        <span className="truncate">{item.title}</span>
                                    )}
                                </Link>
                            );

                            if (isCollapsed) {
                                return (
                                    <Tooltip key={item.id} closeDelay={0}>
                                        <Tooltip.Trigger>
                                            <div className="w-full">{navLink}</div>
                                        </Tooltip.Trigger>

                                        <Tooltip.Content placement="right">
                                            {item.title}
                                        </Tooltip.Content>
                                    </Tooltip>
                                );
                            }

                            return navLink;
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
};