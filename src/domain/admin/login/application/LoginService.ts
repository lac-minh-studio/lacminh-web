import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';
import { LoginFormValues } from '../model/Login';
import { auth, db } from '@/config/firebase';

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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.identifier,
                data.password
            );

            const user = userCredential.user;

            const staffRef = doc(db, 'staffs', user.uid);
            const staffSnap = await getDoc(staffRef);

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

            const staffData = staffSnap.data();

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

            const idToken = await user.getIdToken();

            const maxAge = data.rememberMe
                ? 7 * 24 * 60 * 60
                : 24 * 60 * 60;

            document.cookie =
                `admin_token=${idToken}; ` +
                `path=/; ` +
                `max-age=${maxAge}; ` +
                `SameSite=Lax`;

            toast.success('Đăng nhập thành công!', {
                id: toastId,
            });

            router.push('/admin/dashboard');
            router.refresh();

        } catch (error: unknown) {
            console.error('Login error:', error);
            let errorMessage = 'Đã có lỗi xảy ra trong quá trình đăng nhập.';

            // Xử lý bắt lỗi 
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