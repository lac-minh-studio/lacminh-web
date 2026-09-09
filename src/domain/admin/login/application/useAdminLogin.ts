import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';
import { LoginFormValues } from '../application/login.schema';

export const useAdminLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (
        data: LoginFormValues,
        setError: UseFormSetError<LoginFormValues>
    ) => {
        setIsLoading(true);
        try {
            const MOCK_USER = {
                identifier: 'nva@lacminh.com',
                password: '147258',
            };

            if (
                MOCK_USER.identifier !== data.identifier ||
                MOCK_USER.password !== data.password
            ) {
                setError('identifier', {
                    message: 'Email hoặc tên đăng nhập hoặc mật khẩu không đúng',
                });
                return;
            }

            await new Promise((res) => setTimeout(res, 800));

            // Xử lý Remember Me (7 ngày nếu checked, 1 ngày nếu không checked)
            const maxAge = data.rememberMe
                ? 7 * 24 * 60 * 60
                : 24 * 60 * 60;

            // Lưu JWT Token vào Cookie
            document.cookie = `admin_token=mock-jwt-token; path=/; max-age=${maxAge}; SameSite=Lax`;

            // Redirect về /admin/dashboard
            router.push('/admin/dashboard');
            router.refresh();

        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
    };
};