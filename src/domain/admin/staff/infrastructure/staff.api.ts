import { IStaffItem } from "@/domain/admin/staff/model/staff"

export const STAFF_LIST: IStaffItem[] = [
    {
        id: '1',
        email: 'anv@lacminh.com',
        fullName: 'Nguyễn Văn A',
        phone: '+84901234567',
        department: 'Engineering',
        title: 'Frontend Developer',
        status: "Active",
    },
    {
        id: '2',
        email: 'bnv@lacminh.com',
        fullName: 'Nguyễn Văn B',
        phone: '+84901232548',
        department: 'Product',
        title: 'Product Manager',
        status: "Active",
    },
    {
        id: '3',
        email: 'cnv@lacminh.com',
        fullName: 'Nguyễn Văn C',
        phone: '+84901236857',
        department: 'UI/UX Design',
        title: 'UI/UX Researcher',
        status: "Active",
    },
    {
        id: '4',
        email: 'dnv@lacminh.com',
        fullName: 'Nguyễn Văn D',
        phone: '+84901236942',
        department: 'Helpdesk',
        title: 'IT Support Engineer',
        status: "Active",
    },
    {
        id: '5',
        email: 'env@lacminh.com',
        fullName: 'Nguyễn Văn E',
        phone: '+84901236385',
        department: 'UI/UX Design',
        title: 'UX Designer (User Experience Designer)',
        status: "Inactive",
    },

]
