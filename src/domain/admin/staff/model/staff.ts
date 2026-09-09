//Định nghĩa phòng ban
export type Department = 'Product' | 'Engineering' | 'Helpdesk' | 'UI/UX Design'
//Định nghĩa trạng thái
export type Status = 'Active' | 'Inactive'
//Định nghĩa chức vụ 
export type Title = 'Frontend Developer' | 'Backend Developer' | 'Product Manager' | 'IT Support Engineer' | 'UI/UX Researcher' | 'UX Designer'

//Interface staff
export interface IStaffItem {
    id: string
    fullName: string
    email: string
    phone: string
    department: Department
    title: Title
    status: Status
}
//Interface Backend
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

//Interface Form
export interface IStaffFormInput {
    fullName: string
    email: string
    phone: string
    department: Department
    title: string,
}
