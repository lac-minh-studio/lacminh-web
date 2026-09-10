import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    TrendingUp,
    UserCheck,
    DollarSign,
} from 'lucide-react';
import { ActivityData, DashboardColumn, MetricCardConfig, SidebarItem } from '../dashboard/model/adminUser';



export const sidebarConfig: SidebarItem[] = [
    {
        id: 'dashboard',
        title: 'Tổng quan',
        route: '/admin/dashboard',
        icon: LayoutDashboard,
        permission: 'ADMIN',
    },
    {
        id: 'users',
        title: 'Quản lý Người dùng',
        route: '/admin/users',
        icon: Users,
        permission: 'ADMIN',
    },
    {
        id: 'products',
        title: 'Quản lý Sản phẩm',
        route: '/admin/products',
        icon: ShoppingBag,
        permission: 'ADMIN',
    },
    {
        id: 'settings',
        title: 'Cấu hình Hệ thống',
        route: '/admin/settings',
        icon: Settings,
        permission: 'ADMIN',
    },
];




export const metricsConfig: MetricCardConfig[] = [
    {
        id: 'revenue',
        title: 'Tổng doanh thu',
        value: '128,450,000 ₫',
        change: '+12.5%',
        isPositive: true,
        icon: DollarSign,
    },
    {
        id: 'users',
        title: 'Người dùng mới',
        value: '1,240',
        change: '+8.2%',
        isPositive: true,
        icon: UserCheck,
    },
    {
        id: 'growth',
        title: 'Tỷ lệ tăng trưởng',
        value: '24.8%',
        change: '-1.4%',
        isPositive: false,
        icon: TrendingUp,
    },
];


export const activityColumns: DashboardColumn[] = [
    { id: 'user', label: 'NGƯỜI DÙNG' },
    { id: 'action', label: 'HÀNH ĐỘNG' },
    { id: 'target', label: 'ĐỐI TƯỢNG' },
    { id: 'time', label: 'THỜI GIAN' },
    { id: 'status', label: 'TRẠNG THÁI' },
];

export const recentActivities: ActivityData[] = [
    {
        id: '1',
        user: 'Nguyễn Văn A',
        action: 'Cập nhật cấu hình',
        target: 'Hệ thống',
        time: '5 phút trước',
        status: 'Success',
    },
    {
        id: '2',
        user: 'Trần Thị B',
        action: 'Xóa tài khoản',
        target: 'User #1024',
        time: '12 phút trước',
        status: 'Failed',
    },
    {
        id: '3',
        user: 'Lê Văn C',
        action: 'Thêm sản phẩm mới',
        target: 'Áo sơ mi nam',
        time: '1 giờ trước',
        status: 'Success',
    },
    {
        id: '4',
        user: 'Phạm Minh D',
        action: 'Thay đổi quyền',
        target: 'User #5012',
        time: '2 giờ trước',
        status: 'Pending',
    },
];