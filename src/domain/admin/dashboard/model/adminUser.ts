import { LucideIcon } from "lucide-react";

export type AdminRole = 'ADMIN';

export interface MetricCardConfig {
    id: string;
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: LucideIcon;
}

export interface SidebarItem {
    id: string;
    title: string;
    route: string;
    icon: LucideIcon;
    permission: AdminRole;
}

export interface AdminUser {
    name: string;
    email: string;
    role: AdminRole;
    avatarUrl?: string;
}

export interface DashboardColumn {
    id: string;
    label: string;
}

export interface ActivityData {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
    status: 'Success' | 'Pending' | 'Failed';
}

export interface LineChartPoint {
    period: string;
    users: number;
    revenue: number;
}

export interface PieChartSegment {
    name: string;
    value: number;
    color?: string;
}

export enum QuickActionKey {
    BROADCAST_NOTICE = 'BROADCAST_NOTICE',
    EXPORT_REPORT = 'EXPORT_REPORT',
    LOCK_ACCOUNT = 'LOCK_ACCOUNT',
    ADD_STAFF = 'ADD_STAFF',
}

export interface QuickAction {
    key: QuickActionKey;
    label: string;
    icon: LucideIcon;
    color?: 'primary' | 'danger' | 'warning' | 'default';
}
