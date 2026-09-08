'use client';

import { useStaffList } from '../application/useStaffList';
import { IStaffItem } from '../model/staff';

interface StaffTableProps {
    staffList: IStaffItem[];
    onOpenAddModal: () => void;
}

const TABLE_HEADER = [
    "Họ và tên",
    "Email",
    "Số điện thoại",
    "Phòng ban",
    "Chức vụ",
    "Trạng thái",
];

export function StaffTable({ staffList, onOpenAddModal }: StaffTableProps) {
    const { error, isLoading } = useStaffList();

    return (
        <div className="space-y-6">
            {/* Phần tiêu đề và nút hành động */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline text-text-dark">Quản lý Nhân sự</h1>
                    <p className="text-sm text-text-secondary">Danh sách toàn bộ nhân sự nội bộ hệ thống.</p>
                </div>
                <button
                    onClick={onOpenAddModal}
                    className="px-5 py-2.5 bg-primary text-text-light rounded-xl font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] border border-border"
                >
                    + Thêm nhân sự mới
                </button>
            </div>

            {/* Bảng hiển thị danh sách nhân sự */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
                <table className="w-full border-collapse text-center">
                    <thead>
                        <tr className="border-b border-border bg-surface-dark/10 text-[length:var(--text-2xs)] uppercase tracking-[0.15em] font-semibold text-text-secondary">
                            {TABLE_HEADER.map(title => (
                                <th key={title} className="py-4 px-4">{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-sm text-text-dark">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-text-muted italic">
                                    Đang tải danh sách nhân sự...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-destructive bg-destructive/10">
                                    <p className="font-bold">⚠️ Lỗi hệ thống</p>
                                    <p className="text-xs mt-1">{error}</p>
                                </td>
                            </tr>
                        ) : staffList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-text-muted italic">
                                    Chưa có nhân sự nào trong hệ thống.
                                </td>
                            </tr>
                        ) : (
                            staffList.map((staff) => (
                                <tr key={staff.id} className="hover:bg-surface-dark/5 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-dark">{staff.fullName}</td>
                                    <td className="py-4 px-4 text-text-secondary">{staff.email}</td>
                                    <td className="py-4 px-4 text-text-secondary">{staff.phone}</td>
                                    <td className="py-4 px-4">
                                        <span className="px-3 py-1 text-xs font-semibold bg-primary/15 text-text-secondary border border-primary/30 rounded-full">
                                            {staff.department}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-text-secondary">{staff.title}</td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-md border ${staff.status === 'Active'
                                                    ? 'bg-success/15 text-success border-success/30'
                                                    : 'bg-destructive/15 text-destructive border-destructive/30'
                                                }`}
                                        >
                                            {staff.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}