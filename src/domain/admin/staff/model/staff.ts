export type Department = 'Product' | 'Engineering' | 'Helpdesk' | 'UI/UX Design'
export type Status = 'Active' | 'Inactive'
export type Title = 'Frontend Developer' | 'Backend Developer' | 'Product Manager' | 'IT Support Engineer' | 'UI/UX Researcher' | 'UX Designer (User Experience Designer)'


export interface IStaffItem {
    id: string
    fullName: string
    email: string
    phone: string
    department: Department
    title: Title
    status: Status
}

export interface IStaffDTO {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    department: Department;
    title: Title;
    status: boolean;
    created_at: string;
}

export interface IStaffFormInput {
    // id: string
    fullName: string
    email: string
    phone: string
    department: Department
    title: string,
}
