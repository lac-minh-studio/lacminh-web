import { z } from 'zod';

export const loginSchema = z.object({
    //
    identifier: z.string().min(1, { message: 'Email hoặc tên đăng nhập không được để trống' }),
    //
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    //
    rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;