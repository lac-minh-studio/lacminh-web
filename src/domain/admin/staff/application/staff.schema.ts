import { z } from 'zod';

export const staffFormSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: 'Họ và tên không được để trống' }),
    email: z
        .string()
        .min(1, { message: 'Email không được để trống' })
        .email({ message: 'Email không đúng định dạng' })
        .refine((val) => val.endsWith('@lacminh.com'), {
            message: 'Email bắt buộc phải có đuôi @lacminh.com',
        }),
    phone: z
        .string()
        .min(1, { message: 'Số điện thoại không được để trống' })
        .regex(/^[+\d\s()-]{8,20}$/, { message: 'Số điện thoại không hợp lệ' }),
    department: z.string().min(1, { message: 'Vui lòng chọn phòng ban' }),
    title: z.string().min(1, { message: 'Vui lòng chọn chức vụ' }),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;