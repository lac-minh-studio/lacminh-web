import { AdminRole, RoleHierarchy } from '@/domain/admin/dashboard/model/adminUser';

interface CurrentUser {
    id: string;
    email: string;
    role: AdminRole;
}

export function usePermission(currentUser: CurrentUser | null) {
    const checkActionPermission = (targetUserId: string, targetUserRole?: AdminRole) => {
        // Khóa toàn bộ
        const permissions = {
            canEditInfo: false,
            canDelete: false,
            canChangeStatus: false,
            canChangeRole: false,
        };

        // Chưa đăng nhập hoặc là STAFF -> Không có bất kỳ quyền gì trên bảng quản lý
        if (!currentUser || currentUser.role === 'STAFF') {
            return permissions;
        }

        const isSelf = currentUser.id === targetUserId;
        const currentPower = RoleHierarchy[currentUser.role] ?? 0;
        const targetPower = RoleHierarchy[targetUserRole ?? 'STAFF'] ?? 1;

        const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
        const hasHigherPower = currentPower > targetPower;

        // Được sửa nếu: Là Super Admin, HOẶC là cấp trên, HOẶC đang tự sửa chính mình.
        permissions.canEditInfo = isSuperAdmin || hasHigherPower || isSelf;

        // CẤM tự xóa chính mình tuyệt đối. Super Admin cũng không được tự xóa mình.
        permissions.canDelete = !isSelf && (isSuperAdmin || hasHigherPower);

        // CẤM tự khóa tài khoản của chính mình.
        permissions.canChangeStatus = !isSelf && (isSuperAdmin || hasHigherPower);

        // CẤM tự đổi role của chính mình.
        permissions.canChangeRole = !isSelf && (isSuperAdmin || hasHigherPower);

        return permissions;
    };

    return {
        checkActionPermission,
        isSuperAdmin: currentUser?.role === 'SUPER_ADMIN',
    };
}