# 00 — Architecture Overview

## 1. Bối cảnh

`lacminh-web` hiện là một Next.js application chứa public website. Trong cùng repository này sẽ tiếp tục phát triển thêm:

- **Home FE** — toàn bộ public routes hiện tại;
- **Admin FE** — các route phục vụ quản trị;
- **API** — backend server sử dụng Next.js Route Handlers và kết nối persistence/database.

Do chưa cần thiết và chưa có đủ thời gian để tách thành ba repository riêng, hệ thống sẽ tiếp tục ở **một repository**, nhưng phải được tổ chức như ba application boundary độc lập ngay từ bây giờ.

## 2. Target model

```text
HOME FE (Client)  ─────┐
                       │ HTTP
                       ▼
                  API SERVER
                       ▲
                       │ HTTP
ADMIN FE (Client) ─────┘
                       │
                       ▼
               Persistence Layer
                       │
                       ▼
                MongoDB / Firebase
```

### Vai trò

| Top-level domain | Vai trò | Loại |
|---|---|---|
| `home` | Public website | Client |
| `admin` | Management UI | Client |
| `api` | Business backend + persistence access | Server |

`Home` và `Admin` là hai client ngang hàng. `Admin` có quyền quản trị cao hơn nhưng **không phải server**.

## 3. Physical architecture đã chốt

```text
src/
├── app/
│   ├── (home)/
│   ├── (admin)/
│   └── (api)/
│
└── domain/
    ├── home/
    ├── admin/
    └── api/
```

`src/app` là framework/router adapter. `src/domain` chứa implementation thực sự của từng top-level domain.

## 4. Boundary rule quan trọng nhất

Ba top-level domain phải được đối xử như **ba repository độc lập dù hiện tại đang cùng repo**.

```text
domain/home  ──X──> domain/admin
domain/home  ──X──> domain/api

domain/admin ──X──> domain/home
domain/admin ──X──> domain/api

domain/api   ──X──> domain/home
domain/api   ──X──> domain/admin
```

Giao tiếp hợp lệ:

```text
Home  ── HTTP ──┐
                ├──> API
Admin ── HTTP ──┘
```

Home/Admin không được import API internals chỉ vì đang nằm trong cùng repository.

## 5. Business modules

Các business capability hiện tại được chuẩn hóa thành:

```text
Studio
Portfolio
Recruitment
Editorial
Partnership
```

Chúng là **sub-module bên trong top-level domain**, không phải ba top-level application domain mới.

Ví dụ:

```text
domain/home/recruitment
domain/admin/recruitment
domain/api/recruitment
```

Ba module trên phục vụ cùng một business capability nhưng có responsibility khác nhau:

- Home: public presentation/use case;
- Admin: management presentation/use case;
- API: business truth, business rules và persistence.

## 6. DDD strategy

### Frontend

Home/Admin dùng module-first frontend architecture:

```text
Business Module
├── model/
├── application/
├── infrastructure/
└── presentation/
```

`model` được dùng thay cho `domain` vì FE không sở hữu authoritative business truth.

### API

API dùng module-first DDD với 4 layer chuẩn:

```text
Business Module
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

## 7. UI strategy

Atomic Design **không còn là architectural taxonomy** của source mới.

Không tạo:

```text
atoms/
molecules/
organisms/
templates/
```

Thay vào đó:

```text
Design Foundation
      +
HeroUI primitives
      ↓
Home/Admin shared UI
      ↓
Business presentation
```

HeroUI được dùng trực tiếp cho primitive component. Design consistency phải được xử lý bằng token/theme/global CSS/class convention, không bằng wrapper component không cần thiết.

## 8. Architecture status

Các quyết định trong tài liệu V1 này được xem là **đã duyệt**. Những phần implementation chi tiết như database cụ thể, authentication provider, query library, ESLint guardrails hoặc DTO strategy có thể được chốt sau mà không làm thay đổi top-level architecture.
