import { z } from 'zod';

// Định nghĩa các hằng số Value Objects
export const DepartmentSchema = z.enum(['Product', 'Engineering', 'Helpdesk', 'UI/UX Design']);
export const StatusSchema = z.enum(['Active', 'Inactive']);
export const TitleSchema = z.enum(['Frontend Developer', 'Backend Developer', 'Product Manager', 'IT Support Engineer', 'UI/UX Researcher', 'UX Designer']);



// Entity
export const StaffEntitySchema = z.object({
    id: z.string().optional(),
    fullName: z.string().min(2, 'Tên phải từ 2 ký tự trở lên'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    department: DepartmentSchema,
    title: TitleSchema,
    status: StatusSchema,
    createdAt: z.date(),
});

//export các hằng số và entity
export type Department = z.infer<typeof DepartmentSchema>;
export type Title = z.infer<typeof TitleSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type IStaffItem = z.infer<typeof StaffEntitySchema>;
export type IStaffFormInput = Omit<IStaffItem, 'id' | 'createdAt'>;

// Interface cho Repository
export interface IStaffRepository {
    getAll(): Promise<IStaffItem[]>;
    create(data: IStaffFormInput): Promise<string>;
    update(id: string, data: Partial<IStaffFormInput>): Promise<void>;
    delete(id: string): Promise<void>;
}