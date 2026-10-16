'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onIdTokenChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

import { auth } from '@/config/firebase';

export function SessionGuard() {
    const router = useRouter();
    const hadAuthenticatedUser = useRef(false);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(
            auth,
            (user) => {
                if (user) {
                    hadAuthenticatedUser.current = true;
                    return;
                }

                // Bỏ qua trạng thái chưa đăng nhập ban đầu.
                if (!hadAuthenticatedUser.current) {
                    return;
                }

                hadAuthenticatedUser.current = false;

                document.cookie =
                    'admin_token=; path=/; max-age=0; SameSite=Lax';

                toast.error(
                    'Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.',
                );

                router.replace('/login?reason=session-expired');
            },
            (error) => {
                console.error(
                    'Firebase Auth observer error:',
                    error.message,
                );

                const invalidSessionCodes = [
                    'auth/user-token-expired',
                    'auth/id-token-revoked',
                    'auth/invalid-user-token',
                    'auth/user-disabled',
                ];

                if (!invalidSessionCodes.includes(error.message)) {
                    return;
                }

                hadAuthenticatedUser.current = false;

                document.cookie =
                    'admin_token=; path=/; max-age=0; SameSite=Lax';

                toast.error(
                    'Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.',
                );

                router.replace('/login?reason=session-expired');
            },
        );

        return unsubscribe;
    }, [router]);

    return null;
}