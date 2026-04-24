# Validation rules (Zod) — quick reference

Purpose: provide reusable validation rules and examples. Validation messages for user inputs must be Vietnamese.

Common patterns

Email
```
z.string().email({ message: 'Email không hợp lệ' })
```

Password (min 8, letter + number + special)
```
z.string()
 .min(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
 .regex(/[A-Z]/, { message: 'Mật khẩu cần 1 chữ hoa' })
 .regex(/[0-9]/, { message: 'Mật khẩu cần 1 chữ số' })
 .regex(/[^A-Za-z0-9]/, { message: 'Mật khẩu cần 1 ký tự đặc biệt' })
```

Name
```
z.string().min(1, { message: 'Tên không được để trống' }).max(120, { message: 'Tên quá dài' })
```

Slug
```
z.string().regex(/^[a-z0-9-]+$/, { message: 'Slug chỉ chứa chữ thường, số và dấu gạch ngang' })
```

ID card path
```
z.string().optional()
```

Helpers
- Provide small helpers in code generation: `zEmail()`, `zPassword()` that return pre-configured zod schemas.
- Always derive TS types from Zod: `export type CreateUserInput = z.infer<typeof createUserSchema>`

Localization
- Only Vietnamese messages are required for validation errors.

Notes
- Do not include business logic in validation (e.g., "email must be unique"). That belongs to DAL/Action.
- Keep rules strict and fail-fast to avoid downstream errors.
