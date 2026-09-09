import { z } from 'zod';

const VALID_EMAIL_DOMAINS = ['lacminh.com', 'lacminh.vn', 'gmail.com', 'gmail.vn'];
export const staffFormSchema = z.object({
    // Họ và tên: Bắt buộc, loại bỏ khoảng trắng thừa ở 2 đầu
    fullName: z
        .string()
        .trim()
        .min(1, { message: 'Họ và tên không được để trống' }),
    // Email: Bắt buộc, đúng định dạng email và phải sử dụng tên miền nội bộ @lacminh.com
    email: z
        .string()
        .trim()
        .min(1, { message: 'Email không được để trống' })
        .email({ message: 'Email không đúng định dạng' })
        .refine(
            (val) => VALID_EMAIL_DOMAINS.some((domain) => val.endsWith(`@${domain}`)),
            {
                message: `Email bắt buộc phải thuộc các domain: ${VALID_EMAIL_DOMAINS.map((d) => `@${d}`).join(' | ')}`,
            }
        ),
    // Số điện thoại: Bắt buộc, kiểm tra định dạng khớp với biểu thức chính quy (cho phép dấu +, khoảng trắng, ngoặc)
    phone: z
        .string()
        .trim()
        .min(1, { message: 'Số điện thoại không được để trống' })
        .regex(/^[+\d\s()-]{8,20}$/, { message: 'Số điện thoại không hợp lệ' }),
    // Phòng ban: Bắt buộc chọn giá trị
    department: z.string().min(1, { message: 'Vui lòng chọn phòng ban' }),
    // Chức vụ: Bắt buộc chọn giá trị
    title: z.string().min(1, { message: 'Vui lòng chọn chức vụ' }),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;