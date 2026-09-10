import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminUser } from "@/domain/admin/dashboard/model/adminUser"

export const useAdminDashboard = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);



    // Thông tin Admin đang Session (Giả lập)
    const adminInfo: AdminUser = {
        name: 'Nguyễn Văn A',
        email: 'nva@lacminh.com',
        role: 'ADMIN',
    };
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Xóa Cookie admin_token bằng cách set max-age = 0
            document.cookie = 'admin_token=; path=/; max-age=0; SameSite=Lax';

            await new Promise((res) => setTimeout(res, 400));

            // Redirect về /admin/login và refresh router
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return {
        adminInfo,
        handleLogout,
        isLoggingOut,
    };
};