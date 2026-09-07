'use client';

import { useStaffList } from '../application/useStaffList';
import { IStaffItem } from '../model/staff';

interface StaffTableProps {
    staffList: IStaffItem[];
    onOpenAddModal: () => void;

}

export function StaffTable({ staffList, onOpenAddModal }: StaffTableProps) {
    const { error, isLoading } = useStaffList();
    return (
        <div className="space-y-6">
            {/* Phần tiêu đề và nút hành động */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-light">Quản lý Nhân sự</h1>
                    <p className="text-sm text-text-light/60">Danh sách toàn bộ nhân sự nội bộ hệ thống.</p>
                </div>
                <button
                    onClick={onOpenAddModal}
                    className="px-4 py-2 bg-primary text-text-light rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md"
                >
                    + Thêm nhân sự mới
                </button>
            </div>
            {/* Bảng hiển thị danh sách nhân sự */}
            <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden shadow-lg">
                <table className="w-full border-collapse text-center">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-text-light/70">
                            <th className="py-3.5 px-4">Họ và tên</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Số điện thoại</th>
                            <th className="py-3.5 px-4">Phòng ban</th>
                            <th className="py-3.5 px-4">Chức vụ</th>
                            <th className="py-3.5 px-4">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-text-light">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-text-light/60">
                                    Đang tải danh sách nhân sự...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-red-400 bg-red-500/10">
                                    <p className="font-bold">⚠️ Lỗi hệ thống</p>
                                    <p className="text-xs mt-1">{error}</p>
                                </td>
                            </tr>
                        ) : staffList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-text-light/40">
                                    Chưa có nhân sự nào trong hệ thống.
                                </td>
                            </tr>
                        ) : (
                            staffList.map((staff) => (
                                <tr key={staff.id} className="hover:bg-white/5 transition-colors ">
                                    <td className="py-3 px-4 font-medium">{staff.fullName}</td>
                                    <td className="py-3 px-4 text-text-light/80">{staff.email}</td>
                                    <td className="py-3 px-4 text-text-light/80">{staff.phone}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                                            {staff.department}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-text-light/80">{staff.title}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-md ${staff.status === 'Active'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-rose-500/20 text-rose-400'
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