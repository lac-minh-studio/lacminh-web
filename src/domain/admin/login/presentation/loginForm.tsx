'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Card,
    Form,
    TextField,
    Label,
    Input,
    Button,
    Checkbox,
    ErrorMessage,
} from '@heroui/react';
import {
    loginSchema,
    LoginFormValues,
} from '@/domain/admin/login/application/login.schema';
import { loginFormConfig } from '@/domain/admin/config/login.config';
import { useAdminLogin } from '@/domain/admin/login/application/useAdminLogin';

export default function Login() {
    const { login, isLoading } = useAdminLogin();

    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        login(data, setError);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md p-8 bg-surface border border-border shadow-2xl rounded-2xl space-y-6 backdrop-blur-md">
                <div>
                    <h1 className="text-(length:--text-heading-sm) font-headline font-bold text-text-dark">
                        Admin Portal
                    </h1>
                    <p className="text-sm text-text-secondary mt-1">
                        Đăng nhập hệ thống quản trị nội bộ.
                    </p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {loginFormConfig.map((field) => (
                        <TextField
                            key={field.name}
                            isInvalid={!!errors[field.name]}
                            isDisabled={isLoading}
                            className="flex flex-col gap-1"
                        >
                            <Label className="block text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-secondary mb-1 font-semibold">
                                {field.label}
                            </Label>
                            <Input
                                {...register(field.name)}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full h-11 bg-background/50 border border-border rounded-xl text-text-dark px-4 focus:ring-2 focus:ring-primary focus:outline-none text-[length:var(--text-md)] placeholder:text-text-muted"
                            />
                            {errors[field.name]?.message && (
                                <ErrorMessage className="text-destructive text-xs mt-1 italic font-medium">
                                    {errors[field.name]?.message}
                                </ErrorMessage>
                            )}
                        </TextField>
                    ))}

                    <div className="flex items-center justify-between">
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    isSelected={field.value}
                                    onChange={field.onChange}
                                    isDisabled={isLoading}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Checkbox.Content className="flex items-center gap-2">
                                        <Checkbox.Control className="w-4 h-4 rounded border border-border bg-background/50 flex items-center justify-center">
                                            <Checkbox.Indicator className="w-3 h-3 text-text-dark" />
                                        </Checkbox.Control>
                                        <span className="text-sm text-text-dark select-none">
                                            Ghi nhớ đăng nhập
                                        </span>
                                    </Checkbox.Content>
                                </Checkbox>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        isPending={isLoading}
                        isDisabled={isLoading}
                        className="w-full bg-primary text-text-light font-medium py-3 rounded-xl shadow-(--shadow-neu-cta) hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-2 border border-border"
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </Card>
        </div>
    );
}