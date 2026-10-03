import { z } from 'zod';

export const loginSchema = z.object({
    //name login
    identifier: z
        .string()
        .refine((val) => val.includes('@'), { error: "bắt buộc phải có @" })
        .min(1, { message: 'Email hoặc tên đăng nhập không được để trống' }),
    //password
    password: z
        .string()
        .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    //checkbox remenber Login
    rememberMe: z
        .boolean()
        .optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormConfigItem {
    name: 'identifier' | 'password';
    label: string;
    type: string;
    placeholder: string;
}

