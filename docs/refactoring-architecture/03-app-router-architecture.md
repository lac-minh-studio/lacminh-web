# 03 — App Router Architecture

## 1. Vai trò của `src/app`

`src/app` là **framework adapter** của Next.js.

Nó chịu trách nhiệm:

- URL/routing;
- route group;
- layout;
- metadata;
- loading/error/not-found boundary;
- route params;
- navigation liên quan đến auth/permission/state;
- API `route.ts` entry point.

Nó **không sở hữu business logic**.

## 2. Route Groups đã chốt

```text
src/app/
├── (home)/
├── (admin)/
└── (api)/
```

### Home

Dùng Route Group để giữ public URL hiện tại:

```text
app/(home)/page.tsx                 → /
app/(home)/projects/page.tsx        → /projects
app/(home)/careers/page.tsx         → /careers
app/(home)/careers/[slug]/page.tsx  → /careers/:slug
app/(home)/blog/page.tsx            → /blog
app/(home)/contact/page.tsx         → /contact
```

`(home)` không xuất hiện trong URL.

### Admin

```text
app/(admin)/admin/*
```

URL:

```text
/admin/*
```

Admin group có thể có protected layout và admin-specific error/loading boundary.

### API

```text
app/(api)/api/*
```

URL:

```text
/api/*
```

`route.ts` là Next.js HTTP entry point, không phải nơi triển khai toàn bộ backend.

## 3. Layout hierarchy

### Root layout

Root layout chỉ nên chứa concern thực sự global cho toàn application runtime, ví dụ:

- `<html>` / `<body>`;
- fonts;
- global stylesheet;
- analytics/telemetry chung nếu cần.

Root layout **không nên chứa Home Navbar/Footer**, vì như vậy Admin route cũng bị wrap bởi Home shell.

### Home layout

```text
app/(home)/layout.tsx
```

Sở hữu Home shell:

- Navbar;
- Footer;
- public layout concern.

### Admin layout

```text
app/(admin)/admin/layout.tsx
```

Sở hữu:

- admin shell;
- protected layout;
- admin navigation;
- permission-aware route presentation.

## 4. API protection

API route handler không nằm trong React layout tree, vì vậy **không dùng protected layout để bảo vệ API**.

API security phải được xử lý bằng backend concern phù hợp:

```text
request
  ↓
middleware/guard/authentication
  ↓
authorization
  ↓
route handler / API presentation
  ↓
application
```

Route Group `(api)` chỉ dùng để organization, không được xem là security boundary.

## 5. Route file phải mỏng

Ví dụ:

```text
app/(api)/api/jobs/route.ts
              ↓
domain/api/recruitment/presentation
              ↓
application
```

`route.ts` không chứa:

- database query trực tiếp;
- business rule;
- persistence implementation;
- feature orchestration phức tạp.

## 6. Error boundaries

Route Groups cho phép tách error handling theo application context.

Ví dụ:

```text
(home)
├── error.tsx
└── not-found UX cho public site

(admin)
├── error.tsx
└── admin-specific failure/permission UX
```

API error không dùng React `error.tsx` như HTTP error contract. API cần mapping lỗi riêng tại backend presentation layer để trả status code phù hợp.

## 7. Quy tắc `app` cuối cùng

> `src/app` quyết định **request đi vào đâu và UI được compose như thế nào**; `src/domain` quyết định **hệ thống thực sự làm gì**.
