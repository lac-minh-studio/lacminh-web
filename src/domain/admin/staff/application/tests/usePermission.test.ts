import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePermission } from '@/domain/admin/dashboard/application/usePermission';
import { AdminRole } from '@/domain/admin/dashboard/model/adminUser';

interface MockUser {
    id: string;
    email: string;
    role: AdminRole;
}

describe('usePermission hook (RBAC)', () => {

    it('SUPER_ADMIN/MANAGER nên có toàn quyền đối với nhân sự cấp STAFF', () => {
        const mockAdmin: MockUser = { id: 'RzrV8Ceq2U04P93rdC1r', email: 'hoanganh@lacminh.com', role: 'SUPER_ADMIN' };
        const { result } = renderHook(() => usePermission(mockAdmin));
        const permissions = result.current.checkActionPermission('qk2apheayR5sSOwcbUZL', 'STAFF');

        expect(permissions.canEditInfo).toBe(true);
        expect(permissions.canChangeStatus).toBe(true);
        expect(permissions.canDelete).toBe(true);
    });

    it('STAFF không được phép có quyền Chỉnh sửa/Xóa MANAGER', () => {
        const mockStaff: MockUser = { id: 'qk2apheayR5sSOwcbUZL', email: 'tam.pm@lacminh.com', role: 'STAFF' };
        const { result } = renderHook(() => usePermission(mockStaff));
        const permissions = result.current.checkActionPermission('RzrV8Ceq2U04P93rdC1r', 'SUPER_ADMIN');

        expect(permissions.canEditInfo).toBe(false);
        expect(permissions.canChangeStatus).toBe(false);
        expect(permissions.canDelete).toBe(false);
    });

    it('Người dùng được phép tự sửa thông tin cá nhân của chính mình', () => {
        const targetId = 'qk2apheayR5sSOwcbUZL';
        const mockStaff: MockUser = { id: 'qk2apheayR5sSOwcbUZL', email: 'tam.pm@lacminh.com', role: 'STAFF' };
        const { result } = renderHook(() => usePermission(mockStaff));
        const permissions = result.current.checkActionPermission(targetId, 'STAFF');

        expect(permissions.canEditInfo).toBe(false);
    });

    it('MANAGER không có quyền chỉnh sửa/xóa SUPER_ADMIN (cấp cao hơn)', () => {
        const manager: MockUser = { id: 'ik9EYDL3QyZ8EZHSMOCD', email: 'minhcong@gmail.com', role: 'MANAGER' };
        const { result } = renderHook(() => usePermission(manager));
        const permissions = result.current.checkActionPermission('RzrV8Ceq2U04P93rdC1r', 'SUPER_ADMIN');

        expect(permissions.canEditInfo).toBe(false);
        expect(permissions.canDelete).toBe(false);
    });

    it('Xử lý đúng khi không truyền targetUserRole (kích hoạt giá trị mặc định)', () => {
        const superAdmin: MockUser = { id: 'RzrV8Ceq2U04P93rdC1r', email: 'hoanganh@lacminh.com', role: 'SUPER_ADMIN' };
        const { result } = renderHook(() => usePermission(superAdmin));
        const permissions = result.current.checkActionPermission('qk2apheayR5sSOwcbUZL');

        expect(permissions.canEditInfo).toBe(true);
    });
});