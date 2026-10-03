//
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
//
import { FirebaseError } from 'firebase/app';
import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
//
import { LoginFormValues } from '../model/Login';

export const LoginService = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (
        data: LoginFormValues,
        setError: UseFormSetError<LoginFormValues>
    ) => {
        setIsLoading(true);
        const toastId = toast.loading('Đang xác thực...');

        try {
            //auth
            const staffCredential = await signInWithEmailAndPassword(
                auth,
                data.identifier,
                data.password
            );

            //lấy staff từ Firebase
            const staff = staffCredential.user;

            //tìm staff
            const staffRef = doc(db, 'staffs', staff.uid);

            //đọc staff doc
            const staffSnap = await getDoc(staffRef);

            //check staff đã tồn tại chưa
            if (!staffSnap.exists()) {
                await auth.signOut();

                const msg =
                    'Tài khoản không có quyền truy cập hệ thống quản trị.';

                toast.error(msg, {
                    id: toastId,
                });

                setError('identifier', {
                    message: msg,
                });

                return;
            }

            //lấy staff data
            const staffData = staffSnap.data();

            //check trạng thái của staff
            if (staffData.status !== true) {
                await auth.signOut();

                const msg =
                    'Tài khoản nhân viên này đã bị vô hiệu hóa.';

                toast.error(msg, {
                    id: toastId,
                });

                setError('identifier', {
                    message: msg,
                });

                return;
            }

            //lấy id token
            const idToken = await staff.getIdToken();

            //cấu hình maxAge
            const maxAge = data.rememberMe
                ? 7 * 24 * 60 * 60
                : 24 * 60 * 60;

            //tạo cookie
            document.cookie =
                `admin_token=${idToken}; ` +
                `path=/; ` +
                `max-age=${maxAge}; ` +
                `SameSite=Lax`;

            toast.success('Đăng nhập thành công!', {
                id: toastId,
            });

            //điều hướng về trang dashboard
            router.push('/admin/dashboard');
            router.refresh();

        } catch (error: unknown) {
            let errorMessage = 'Đã có lỗi xảy ra trong quá trình đăng nhập.';

            // Xử lý bắt lỗi trong firebase
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage = 'Email hoặc mật khẩu không chính xác.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Tài khoản tạm khóa do đăng nhập sai quá nhiều lần.';
                        break;
                    default:
                        errorMessage = `Lỗi hệ thống: ${error.message}`;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage, { id: toastId });
            setError('identifier', { message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
    };
};