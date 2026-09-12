import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    TrendingUp,
    UserCheck,
    DollarSign,
    Megaphone,
    FileDown,
    UserPlus,
    Lock
} from 'lucide-react';
import { ActivityData, DashboardColumn, LineChartPoint, MetricCardConfig, PieChartSegment, QuickAction, QuickActionKey, SidebarItem } from '../dashboard/model/adminUser';



export const sidebarConfig: SidebarItem[] = [
    {
        id: 'dashboard',
        title: 'Tổng quan',
        route: '/admin/dashboard',
        icon: LayoutDashboard,
        permission: 'ADMIN',
    },
    {
        id: 'staff',
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
    {
        id: '5',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    },
    {
        id: '6',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    },
    {
        id: '7',
        user: 'Nguyễn Văn A',
        action: 'Cập nhật cấu hình',
        target: 'Hệ thống',
        time: '5 phút trước',
        status: 'Success',
    },
    {
        id: '8',
        user: 'Trần Thị B',
        action: 'Xóa tài khoản',
        target: 'User #1024',
        time: '12 phút trước',
        status: 'Failed',
    },
    {
        id: '9',
        user: 'Lê Văn C',
        action: 'Thêm sản phẩm mới',
        target: 'Áo sơ mi nam',
        time: '1 giờ trước',
        status: 'Success',
    },
    {
        id: '10',
        user: 'Phạm Minh D',
        action: 'Thay đổi quyền',
        target: 'User #5012',
        time: '2 giờ trước',
        status: 'Pending',
    },
    {
        id: '11',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    },
    {
        id: '12',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    },
    {
        id: '13',
        user: 'Nguyễn Văn A',
        action: 'Cập nhật cấu hình',
        target: 'Hệ thống',
        time: '5 phút trước',
        status: 'Success',
    },
    {
        id: '14',
        user: 'Trần Thị B',
        action: 'Xóa tài khoản',
        target: 'User #1024',
        time: '12 phút trước',
        status: 'Failed',
    },
    {
        id: '15',
        user: 'Lê Văn C',
        action: 'Thêm sản phẩm mới',
        target: 'Áo sơ mi nam',
        time: '1 giờ trước',
        status: 'Success',
    },
    {
        id: '16',
        user: 'Phạm Minh D',
        action: 'Thay đổi quyền',
        target: 'User #5012',
        time: '2 giờ trước',
        status: 'Pending',
    },
    {
        id: '17',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    },
    {
        id: '18',
        user: 'Hoàng Văn E',
        action: 'Xuất báo cáo tài chính',
        target: 'Doanh thu Q3',
        time: 'Vừa xong',
        status: 'Success',
    }
];

export const lineChartData: LineChartPoint[] = [
    { period: 'T1', users: 400, revenue: 2400000 },
    { period: 'T2', users: 520, revenue: 2210000 },
    { period: 'T3', users: 610, revenue: 2900000 },
    { period: 'T4', users: 700, revenue: 3100000 },
    { period: 'T5', users: 890, revenue: 3800000 },
];

export const pieChartData: PieChartSegment[] = [
    { name: 'Kỹ thuật', value: 45, color: '#6366f1' },
    { name: 'Kinh doanh', value: 30, color: '#22c55e' },
    { name: 'Vận hành', value: 25, color: '#f59e0b' },
];

export const quickActionsConfig: QuickAction[] = [
    { key: QuickActionKey.BROADCAST_NOTICE, label: 'Thông báo toàn hệ thống', icon: Megaphone, color: 'primary' },
    { key: QuickActionKey.EXPORT_REPORT, label: 'Export Báo cáo', icon: FileDown, color: 'default' },
    { key: QuickActionKey.LOCK_ACCOUNT, label: 'Khóa tài khoản khẩn cấp', icon: Lock, color: 'danger' },
    { key: QuickActionKey.ADD_STAFF, label: 'Thêm người dùng mới', icon: UserPlus, color: 'primary' },
];