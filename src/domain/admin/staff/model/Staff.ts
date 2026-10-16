import { z } from 'zod';

export const DepartmentSchema = z.enum(['Product', 'Engineering', 'Helpdesk', 'UI/UX Design']);
export const StatusSchema = z.enum(['Active', 'Inactive']);
export const TitleSchema = z.enum(['Frontend Developer', 'Backend Developer', 'Product Manager', 'IT Support Engineer', 'UI/UX Researcher', 'UX Designer']);
export const RoleSchema = z.enum(['SUPER_ADMIN', 'ADMIN', 'STAFF']);

export const StaffFormSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, 'Tên phải từ 2 ký tự trở lên')
        .max(100, 'Tên không được vượt quá 100 ký tự'),

    email: z
        .string()
        .trim()
        .email('Email không hợp lệ')
        .max(254, 'Email không được vượt quá 254 ký tự'),

    phone: z
        .string()
        .trim()
        .regex(
            /^(?:0[35789]\d{8}|\+?84[35789]\d{8})$/,
            'Số điện thoại không hợp lệ',
        ),

    department: DepartmentSchema,
    title: TitleSchema,
    role: RoleSchema,
    status: StatusSchema,
});

// Dùng cho luồng cập nhật một phần dữ liệu.
export const StaffUpdateSchema = StaffFormSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        'Phải cung cấp ít nhất một trường để cập nhật',
    );



export const StaffEntitySchema = StaffFormSchema.extend({
    id: z.string(),
    createdAt: z.date(),
});

export type Department = z.infer<typeof DepartmentSchema>;
export type Title = z.infer<typeof TitleSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type IStaffItem = z.infer<typeof StaffEntitySchema>;
export type IStaffFormInput = z.infer<typeof StaffFormSchema>;

export interface IStaffRepository {
    create(data: IStaffFormInput): Promise<string>;
    update(id: string, data: Partial<IStaffFormInput>): Promise<void>;
    delete(id: string): Promise<void>;
    getAll(): Promise<IStaffItem[]>;
    getByCreatedAtRange(
        startDate: Date,
        endDate: Date,
    ): Promise<IStaffItem[]>;

}

export interface StaffFilterQuery {
    searchTerm: string;
    title: string;
}