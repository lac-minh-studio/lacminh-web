import { LucideIcon } from "lucide-react";

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';

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
    // permission: AdminRole;
}

export interface AdminUser {
    id: string;
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

export const RoleHierarchy: Record<AdminRole, number> = {
    SUPER_ADMIN: 3,
    ADMIN: 2,
    STAFF: 1,
};


