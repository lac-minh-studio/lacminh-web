import { describe, it, expect } from 'vitest';
import { StaffFormSchema } from '../../model/Staff';

describe('StaffFormSchema Validation', () => {
    const validData = {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
        department: 'Engineering',
        title: 'Frontend Developer',
        role: 'STAFF',
        status: 'Active'
    };

    it('Nên vượt qua bài test nếu dữ liệu chuẩn xác', () => {
        const result = StaffFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('Nên báo lỗi nếu thiếu trường bắt buộc (fullName)', () => {
        const invalidData = { ...validData, fullName: undefined };
        const result = StaffFormSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('fullName');
        }
    });

    it('Nên báo lỗi nếu định dạng Email không hợp lệ', () => {
        const invalidData = { ...validData, email: 'nguyenvana_at_gmail.com' }; //không có @
        const result = StaffFormSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toMatch(/email/i);
        }
    });

    it('Nên báo lỗi nếu Role không thuộc Enum quy định', () => {
        const invalidData = { ...validData, role: 'SuperAdmin' }; //role không hợp lê
        const result = StaffFormSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('role');
        }
    });
});