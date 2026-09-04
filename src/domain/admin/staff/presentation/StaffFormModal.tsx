'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { staffFormSchema, StaffFormValues } from '../application/staff.schema';
import { Title, Department, IStaffFormInput } from '../model/staff';

interface StaffFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IStaffFormInput) => void;
}

export function StaffFormModal({ isOpen, onClose, onSubmit }: StaffFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffFormSchema),
    });

    if (!isOpen) return null;

    const handleFormSubmit = (data: StaffFormValues) => {
        onSubmit({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            department: data.department as Department,
            title: data.title as Title,
        });
        reset();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-surface-dark border border-white/10 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-text-light">Thêm mới nhân sự</h3>
                    <button
                        onClick={onClose}
                        className="text-text-light/50 hover:text-text-light text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {/* Họ và tên */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-text-light/60 mb-1">
                            Họ và tên
                        </label>
                        <input
                            {...register('fullName')}
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="w-full h-11 bg-white/5 border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                        />
                        {errors.fullName && (
                            <p className="text-red-400 text-xs mt-1 italic">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-text-light/60 mb-1">
                            Email công ty (@lacminh.com)
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="nhansu@lacminh.com"
                            className="w-full h-11 bg-white/5 border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1 italic">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-text-light/60 mb-1">
                            Số điện thoại
                        </label>
                        <input
                            {...register('phone')}
                            type="text"
                            placeholder="+84..."
                            className="w-full h-11 bg-white/5 border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                        />
                        {errors.phone && (
                            <p className="text-red-400 text-xs mt-1 italic">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Phòng ban & Chức vụ */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-text-light/60 mb-1">
                                Phòng ban
                            </label>
                            <select
                                {...register('department')}
                                className="w-full h-11 bg-surface-dark border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                            >
                                <option value="" >Chọn phòng ban</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Product">Product</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Helpdesk">Helpdesk</option>
                            </select>
                            {errors.department && (
                                <p className="text-red-400 text-xs mt-1 italic">{errors.department.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-text-light/60 mb-1">
                                Chức vụ
                            </label>
                            <select
                                {...register('title')}
                                className="w-full h-11 bg-surface-dark border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                            >
                                <option value="" >Chọn chức vụ</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="UX Designer">UX Designer (User Experience Designer)</option>
                                <option value="UI/UX Researcher">UI/UX Researcher</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="IT Support Engineer">IT Support Engineer</option>
                            </select>
                            {errors.title && (
                                <p className="text-red-400 text-xs mt-1 italic">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white/10 text-text-light rounded-lg text-sm font-medium hover:bg-white/20 transition-all"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-primary text-text-light rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-md"
                        >
                            Lưu nhân sự
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}