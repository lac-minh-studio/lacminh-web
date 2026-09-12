'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormSchema, UserFormValues } from '../application/user.schema';
import { Title, Department, IUserFormInput } from '../model/User';
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

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IUserFormInput) => void;
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

export function UserFormModal({ isOpen, onClose, onSubmit }: UserFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            department: '',
            title: '',
        },
    });

    // đóng modal và reset form
    const handleClose = () => {
        if (isSubmitting) return;
        reset();
        onClose();
    };

    // thêm User
    const handleFormSubmit = async (data: UserFormValues) => {
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
        <Modal aria-label="Thêm mới người dùng">
            <Modal.Backdrop
                aria-label="Lớp nền thêm người dùng"
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
                        aria-label="Thêm mới nhân sự"
                        className="w-full bg-surface border border-border rounded-2xl shadow-2xl"
                    >
                        <Form onSubmit={handleSubmit(handleFormSubmit)} className="contents">
                            <Modal.Header className="flex justify-between items-center border-b border-border pb-4 px-6 pt-6">
                                <h3 className="text-[length:var(--text-heading-sm)] font-headline font-bold text-text-dark">
                                    Thêm mới nhân sự
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
                                {/* Text Inputs */}
                                {textFields.map((field) => (
                                    <TextField key={field.name} className="flex flex-col gap-1">
                                        <Label className="block text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-secondary mb-1 font-semibold">
                                            {field.label}
                                        </Label>
                                        <Input
                                            {...register(field.name)}
                                            required
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
                                        aria-label='department'
                                        isRequired
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
                                        isRequired
                                        aria-label='title'
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
                            </Modal.Body>

                            <Modal.Footer className="flex justify-end gap-3 pt-4 border-t border-border px-6 pb-6">
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
                                    isPending={isSubmitting}
                                    className="px-5 py-2 bg-primary text-text-light rounded-xl text-[length:var(--text-md)] font-medium hover:bg-secondary transition-all shadow-[var(--shadow-neu-cta)] disabled:opacity-50 border border-border"
                                >
                                    Lưu nhân sự
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}