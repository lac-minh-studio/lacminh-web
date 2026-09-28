'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '@/config/firebase';
import { AdminUser } from '../model/adminUser';

export function useAdminIdentity() {
    const [adminInfo, setAdminInfo] =
        useState<AdminUser | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (!user) {
                    setAdminInfo(null);
                    setIsLoading(false);
                    return;
                }

                try {
                    const tokenResult =
                        await user.getIdTokenResult();

                    const role =
                        tokenResult.claims.role;

                    if (
                        role !== 'SUPER_ADMIN' &&
                        role !== 'ADMIN' &&
                        role !== 'STAFF'
                    ) {
                        throw new Error(
                            'Role không hợp lệ'
                        );
                    }

                    setAdminInfo({
                        id: user.uid,
                        name:
                            user.displayName ??
                            'Người dùng',
                        email:
                            user.email ?? '',
                        role,
                    });
                } catch (error) {
                    console.error(
                        'Không thể lấy thông tin admin:',
                        error
                    );

                    setAdminInfo(null);
                } finally {
                    setIsLoading(false);
                }
            }
        );

        return unsubscribe;
    }, []);

    return {
        adminInfo,
        isLoading,
    };
}