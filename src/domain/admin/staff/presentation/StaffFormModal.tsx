'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StaffEntitySchema, IStaffItem, IStaffFormInput, Department, Title, Role } from '../model/Staff';
import type { Key } from '@heroui/react';
import {
    Modal,
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
    onSubmit: (data: IStaffFormInput) => Promise<void>;
    editingStaff?: IStaffItem | null;
}

const DEPARTMENT_OPTIONS = [
    'Engineering',
    'Product',
    'UI/UX Design',
    'Helpdesk',
] as const;

const TITLE_OPTIONS = [
    'Frontend Developer',
    'Backend Developer',
    'Product Manager',
    'IT Support Engineer',
    'UI/UX Researcher',
    'UX Designer',
] as const;

const ROLE_OPTIONS = [
    'MANAGER',
    'STAFF'
] as const;

const StaffFormSchema = StaffEntitySchema.omit({ id: true, createdAt: true });
type StaffFormValues = z.infer<typeof StaffFormSchema>;

export function StaffFormModal({ isOpen, onClose, onSubmit, editingStaff }: StaffFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!editingStaff;

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<StaffFormValues>({
        resolver: zodResolver(StaffFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            department: 'Engineering',
            title: 'Frontend Developer',
            status: 'Active',
        },
    });

    //
    useEffect(() => {
        if (isOpen) {
            if (editingStaff) {
                reset({
                    fullName: editingStaff.fullName || '',
                    email: editingStaff.email || '',
                    phone: editingStaff.phone || '',
                    department: editingStaff.department || 'Engineering',
                    title: editingStaff.title || 'Frontend Developer',
                    role: editingStaff.role || 'STAFF',
                    status: editingStaff.status || 'Active',
                });
            } else {
                reset({
                    fullName: '',
                    email: '',
                    phone: '',
                    department: 'Engineering',
                    title: 'Frontend Developer',
                    role: 'STAFF',
                    status: 'Active',
                });
            }
        }
    }, [isOpen, editingStaff, reset]);

    const handleClose = () => {
        if (isSubmitting) return;
        reset();
        onClose();
    };

    const handleFormSubmit = async (data: StaffFormValues) => {
        try {
            setIsSubmitting(true);
            await onSubmit({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                department: data.department as Department,
                title: data.title as Title,
                role: data.role as Role,
                status: data.status,
            });
            reset();
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <Modal aria-label={isEditMode ? "Cập nhật nhân sự" : "Thêm mới nhân sự"}>
            <Modal.Backdrop
                aria-label="Lớp nền nhân sự"
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (!open) handleClose();
                }}
                isDismissable={!isSubmitting}
                isKeyboardDismissDisabled={isSubmitting}
                variant="blur"
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-deep-moss/80"
            >
                <Modal.Container
                    size="lg"
                    scroll="inside"
                    className="w-full max-w-lg p-4"
                >
                    <Modal.Dialog
                        aria-label="Hộp thoại nhân sự"
                        className="w-full bg-surface border border-border rounded-2xl shadow-2xl"
                    >
                        <Form onSubmit={handleSubmit(handleFormSubmit)} className="contents">
                            <Modal.Header className="flex justify-between items-center border-b border-border pb-4 px-6 pt-6">
                                <h3 className="text-xl font-headline font-bold text-text-dark">
                                    {isEditMode ? 'Cập nhật thông tin nhân sự' : 'Thêm mới nhân sự'}
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleClose}
                                    isDisabled={isSubmitting}
                                    aria-label="Hủy"
                                    className="text-text-secondary hover:text-text-dark text-xl font-bold transition-colors disabled:opacity-50"
                                >
                                    &times;
                                </Button>
                            </Modal.Header>

                            <Modal.Body className="space-y-4 px-6 py-4">
                                {/*  Input  */}
                                {textFields.map((item) => (
                                    <TextField key={item.name} className="flex flex-col gap-1">
                                        <Label className="block text-xs uppercase tracking-widest text-text-secondary mb-1 font-semibold">
                                            {item.label}
                                        </Label>
                                        <Controller
                                            name={item.name}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    value={field.value || ''}
                                                    required
                                                    type={item.type}
                                                    placeholder={item.placeholder}
                                                    className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 focus:ring-2 focus:ring-primary focus:outline-none text-base placeholder:text-text-muted"
                                                />
                                            )}
                                        />
                                        {item.errorMsg && (
                                            <p className="text-destructive text-xs mt-1 italic">{item.errorMsg}</p>
                                        )}
                                    </TextField>
                                ))}

                                <div className="grid grid-cols-2 gap-4">
                                    {/* department */}
                                    <Controller
                                        name="department"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                aria-label='department'
                                                isRequired
                                                className="flex flex-col gap-1"
                                                selectedKey={field.value}
                                                onSelectionChange={(key: Key | null) => {
                                                    if (key) field.onChange(String(key) as Department);
                                                }}
                                            >
                                                <Label className="block text-xs uppercase tracking-widest text-text-secondary mb-1 font-semibold">
                                                    Phòng ban
                                                </Label>
                                                <Select.Trigger className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 text-base flex items-center justify-between hover:border-primary transition-colors">
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
                                                                className="px-4 py-2.5 text-text-dark text-base hover:bg-primary/20 hover:text-text-dark cursor-pointer outline-none transition-colors"
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
                                        )}
                                    />
                                    {/* title */}
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                aria-label='title'
                                                isRequired
                                                className="flex flex-col gap-1"
                                                selectedKey={field.value}
                                                onSelectionChange={(key: Key | null) => {
                                                    if (key) field.onChange(String(key) as Title);
                                                }}
                                            >
                                                <Label className="block text-xs uppercase tracking-widest text-text-secondary mb-1 font-semibold">
                                                    Chức vụ
                                                </Label>
                                                <Select.Trigger className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 text-base flex items-center justify-between hover:border-primary transition-colors">
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
                                                                className="px-4 py-2.5 text-text-dark text-base hover:bg-primary/20 hover:text-text-dark cursor-pointer outline-none transition-colors"
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
                                        )}
                                    />
                                    {/* role */}
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                aria-label='role'
                                                isRequired
                                                className="flex flex-col gap-2 col-span-2"
                                                selectedKey={field.value}
                                                onSelectionChange={(key: Key | null) => {
                                                    if (key) field.onChange(String(key) as Role);
                                                }}
                                            >
                                                <Label className="block text-xs uppercase tracking-widest text-text-secondary mb-1 font-semibold">
                                                    Vai trò
                                                </Label>
                                                <Select.Trigger className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 text-base flex items-center justify-between hover:border-primary transition-colors">
                                                    <Select.Value aria-placeholder="Chọn vai trò" className="text-text-muted" />
                                                    <Select.Indicator className="text-text-secondary" />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox className="bg-surface border border-border rounded-xl overflow-hidden py-1 shadow-xl backdrop-blur-md">
                                                        {ROLE_OPTIONS.map((role) => (
                                                            <ListBoxItem
                                                                key={role}
                                                                id={role}
                                                                textValue={role}
                                                                className="px-4 py-2.5 text-text-dark text-base hover:bg-primary/20 hover:text-text-dark cursor-pointer outline-none transition-colors"
                                                            >
                                                                {role}
                                                            </ListBoxItem>
                                                        ))}
                                                    </ListBox>
                                                </Select.Popover>
                                                {errors.title && (
                                                    <p className="text-destructive text-xs mt-1 italic">{errors.title.message}</p>
                                                )}
                                            </Select>
                                        )}
                                    />

                                </div>
                            </Modal.Body>

                            <Modal.Footer className="flex justify-end gap-3 pt-4 border-t border-border px-6 pb-6">
                                <Button
                                    type="button"
                                    onClick={handleClose}
                                    isDisabled={isSubmitting}
                                    className="px-4 py-2 bg-surface-dark/10 text-text-secondary rounded-xl text-base font-medium hover:bg-surface-dark/20 transition-all disabled:opacity-50 border border-border"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    isPending={isSubmitting}
                                    className="px-5 py-2 bg-primary text-text-light rounded-xl text-base font-medium hover:bg-secondary transition-all shadow-md disabled:opacity-50 border border-border"
                                >
                                    {isEditMode ? 'Cập nhật' : 'Lưu nhân sự'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}