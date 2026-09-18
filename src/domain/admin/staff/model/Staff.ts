import { z } from 'zod';

export const DepartmentSchema = z.enum(['Product', 'Engineering', 'Helpdesk', 'UI/UX Design']);
export const StatusSchema = z.enum(['Active', 'Inactive']);
export const TitleSchema = z.enum(['Frontend Developer', 'Backend Developer', 'Product Manager', 'IT Support Engineer', 'UI/UX Researcher', 'UX Designer']);

export const StaffFormSchema = z.object({
    fullName: z.string().trim().min(2, 'Tên phải từ 2 ký tự trở lên'),
    email: z.string().trim().email('Email không hợp lệ'),
    phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    department: DepartmentSchema,
    title: TitleSchema,
    status: StatusSchema,
});

export const StaffEntitySchema = StaffFormSchema.extend({
    id: z.string(),
    createdAt: z.date(),
});

export type Department = z.infer<typeof DepartmentSchema>;
export type Title = z.infer<typeof TitleSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type IStaffItem = z.infer<typeof StaffEntitySchema>;
export type IStaffFormInput = z.infer<typeof StaffFormSchema>;

export interface IStaffRepository {
    create(data: IStaffFormInput): Promise<string>;
    update(id: string, data: Partial<IStaffFormInput>): Promise<void>;
    delete(id: string): Promise<void>;
}