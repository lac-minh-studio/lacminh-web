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
