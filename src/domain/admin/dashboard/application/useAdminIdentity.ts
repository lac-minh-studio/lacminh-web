'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '@/config/firebase';
import { AdminUser } from '../model/adminUser';

export function useAdminIdentity() {
    const [adminInfo, setAdminInfo] = useState<AdminUser | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // Listen for Firebase Auth state changes and keep admin identity in sync.
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (!user) {
                    setAdminInfo(null);
                    setIsLoading(false);
                    return;
                }

                try {
                    //get id token
                    const tokenResult =
                        await user.getIdTokenResult();

                    // Read the user's role from Firebase custom claims
                    const role =
                        tokenResult.claims.role;

                    //check role hợp lệ
                    if (
                        role !== 'SUPER_ADMIN' &&
                        role !== 'ADMIN' &&
                        role !== 'STAFF'
                    ) {
                        throw new Error(
                            'Role không hợp lệ'
                        );
                    }

                    //set thông tin người đăng nhập
                    setAdminInfo({
                        id: user.uid,
                        name:
                            user.displayName ??
                            'Người dùng',
                        email:
                            user.email ?? '',
                        role,
                    });

                    //bắt lỗi
                } catch (error) {
                    console.error(
                        'Không thể lấy thông tin admin:',
                        error
                    );
                    //
                    setAdminInfo(null);
                } finally {
                    //
                    setIsLoading(false);
                }
            }
        );

        // Stop listening when the component using this hook is unmounted.
        return unsubscribe;
    }, []);

    return {
        adminInfo,
        isLoading,
    };
}