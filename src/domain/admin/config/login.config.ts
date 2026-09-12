export interface LoginFormConfigItem {
    name: 'identifier' | 'password';
    label: string;
    type: string;
    placeholder: string;
}

export const loginFormConfig: LoginFormConfigItem[] = [
    {
        name: 'identifier',
        label: 'Email hoặc Tên đăng nhập',
        type: 'text',
        placeholder: 'admin@lacminh.com',
    },
    {
        name: 'password',
        label: 'Mật khẩu',
        type: 'password',
        placeholder: '••••••••',
    },
];