'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { staffFormSchema, StaffFormValues } from '../application/staff.schema';
import { Title, Department, IStaffFormInput } from '../model/staff';
import type { Key } from '@heroui/react';
import {
    Form,
    TextField,
    Label,
    Input,
    Select,
    ListBox,
    ListBoxItem,
    Button,
} from '@heroui/react';

interface StaffFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IStaffFormInput) => void;
}

const DEPARTMENT_OPTIONS = [
    'Engineering',
    'Product',
    'UI/UX Design',
    'Helpdesk',
];

const TITLE_OPTIONS = [
    'Frontend Developer',
    'Backend Developer',
    'UX Designer (User Experience Designer)',
    'UI/UX Researcher',
    'Product Manager',
    'IT Support Engineer',
];

export function StaffFormModal({ isOpen, onClose, onSubmit }: StaffFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            department: '',
            title: '',
        },
    });

    if (!isOpen) return null;
    //đóng modal và reset form
    const handleClose = () => {
        reset();
        onClose();
    };
    //thêm staff
    const handleFormSubmit = async (data: StaffFormValues) => {
        try {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 400));

            onSubmit({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                department: data.department as Department,
                title: data.title as Title,
            });
            reset();
        } finally {
            setIsSubmitting(false);
        }
    };
    //
    const textFields = [
        {
            name: 'fullName' as const,
            label: 'Họ và tên',
            type: 'text',
            placeholder: 'Nguyễn Văn A',
            errorMsg: errors.fullName?.message,
        },
        {
            name: 'email' as const,
            label: 'Email công ty (@lacminh.com)',
            type: 'email',
            placeholder: 'nhansu@lacminh.com',
            errorMsg: errors.email?.message,
        },
        {
            name: 'phone' as const,
            label: 'Số điện thoại',
            type: 'text',
            placeholder: '+84...',
            errorMsg: errors.phone?.message,
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-moss/80 backdrop-blur-md p-4">
            <div className="bg-surface border border-border w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-border pb-4">
                    <h3 className="text-[length:var(--text-heading-sm)] font-headline font-bold text-text-dark">Thêm mới nhân sự</h3>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="text-text-secondary hover:text-text-dark text-xl font-bold transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <Form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {/* Text Inputs */}
                    {textFields.map((field) => (
                        <TextField key={field.name} className="flex flex-col gap-1">
                            <Label className="block text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-secondary mb-1 font-semibold">
                                {field.label}
                            </Label>
                            <Input

                                {...register(field.name)}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 focus:ring-2 focus:ring-primary focus:outline-none text-[length:var(--text-md)] placeholder:text-text-muted"
                            />
                            {field.errorMsg && (
                                <p className="text-destructive text-xs mt-1 italic">{field.errorMsg}</p>
                            )}
                        </TextField>
                    ))}

                    {/* Department & Title Selects */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Phòng ban */}
                        <Select
                            className="flex flex-col gap-1"
                            onSelectionChange={(key: Key | null) => {
                                setValue('department', key ? String(key) : '', { shouldValidate: true });
                            }}
                        >
                            <Label className="block text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-secondary mb-1 font-semibold">
                                Phòng ban
                            </Label>
                            <Select.Trigger className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 text-[length:var(--text-md)] flex items-center justify-between hover:border-primary transition-colors">
                                <Select.Value aria-placeholder="Chọn phòng ban" className="text-text-muted" />
                                <Select.Indicator className="text-text-secondary" />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox className="bg-surface border border-border rounded-xl overflow-hidden py-1 shadow-xl backdrop-blur-md">
                                    {DEPARTMENT_OPTIONS.map((dept) => (
                                        <ListBoxItem
                                            key={dept}
                                            id={dept}
                                            textValue={dept}
                                            className="px-4 py-2.5 text-text-dark text-[length:var(--text-md)] hover:bg-primary/20 hover:text-text-dark cursor-pointer outline-none transition-colors"
                                        >
                                            {dept}
                                        </ListBoxItem>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                            {errors.department && (
                                <p className="text-destructive text-xs mt-1 italic">{errors.department.message}</p>
                            )}
                        </Select>

                        {/* Chức vụ */}
                        <Select
                            className="flex flex-col gap-1"
                            onSelectionChange={(key: Key | null) => {
                                setValue('title', key ? String(key) : '', { shouldValidate: true });
                            }}
                        >
                            <Label className="block text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-secondary mb-1 font-semibold">
                                Chức vụ
                            </Label>
                            <Select.Trigger className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 text-[length:var(--text-md)] flex items-center justify-between hover:border-primary transition-colors">
                                <Select.Value aria-placeholder="Chọn chức vụ" className="text-text-muted" />
                                <Select.Indicator className="text-text-secondary" />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox className="bg-surface border border-border rounded-xl overflow-hidden py-1 shadow-xl backdrop-blur-md">
                                    {TITLE_OPTIONS.map((title) => (
                                        <ListBoxItem
                                            key={title}
                                            id={title}
                                            textValue={title}
                                            className="px-4 py-2.5 text-text-dark text-[length:var(--text-md)] hover:bg-primary/20 hover:text-text-dark cursor-pointer outline-none transition-colors"
                                        >
                                            {title}
                                        </ListBoxItem>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                            {errors.title && (
                                <p className="text-destructive text-xs mt-1 italic">{errors.title.message}</p>
                            )}
                        </Select>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            onClick={handleClose}
                            isDisabled={isSubmitting}
                            className="px-4 py-2 bg-surface-dark/10 text-text-secondary rounded-xl text-[length:var(--text-md)] font-medium hover:bg-surface-dark/20 transition-all disabled:opacity-50 border border-border"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            isDisabled={isSubmitting}
                            className="px-5 py-2 bg-primary text-text-light rounded-xl text-[length:var(--text-md)] font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] disabled:opacity-50 flex items-center gap-2 border border-border"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-text-light border-t-transparent rounded-full animate-spin inline-block"></span>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                'Lưu nhân sự'
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}