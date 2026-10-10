import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
} from 'lucide-react';
import { SidebarItem } from '../dashboard/model/adminUser';

export const sidebarConfig: SidebarItem[] = [
    {
        id: 'dashboard',
        title: 'Tổng quan',
        route: '/admin/dashboard',
        icon: LayoutDashboard,
        // permission: 'ADMIN',
    },
    {
        id: 'staff',
        title: 'Quản lý nhân sự',
        route: '/admin/staff',
        icon: Users,
        // permission: 'ADMIN',
    },
    {
        id: 'products',
        title: 'Quản lý Sản phẩm',
        route: '/admin/products',
        icon: ShoppingBag,
        // permission: 'ADMIN',
    },
    {
        id: 'settings',
        title: 'Cấu hình Hệ thống',
        route: '/admin/settings',
        icon: Settings,
        // permission: 'ADMIN',
    },
];

