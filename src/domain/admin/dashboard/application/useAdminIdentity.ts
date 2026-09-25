import { useMemo } from 'react';
import { AdminUser } from '../model/adminUser';

export function useAdminIdentity() {
    const adminInfo = useMemo<AdminUser>(
        () => ({
            id: 'JCKX6LhfBbqcq0ZrT5xS',
            name: 'Hoàng Anh',
            email: 'hoanganh@lacminh.com',
            role: 'SUPER_ADMIN',
        }),
        []
    );

    return {
        adminInfo,
    };
}