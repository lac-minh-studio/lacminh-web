# 04 — Home & Admin Frontend Architecture

Home và Admin dùng **cùng một FE architecture standard** để team chỉ phải học một quy chuẩn.

## 1. Hai cấp module

Mỗi FE top-level domain gồm hai cấp chính:

```text
HOME / ADMIN
│
├── Business Sub-modules
│   ├── studio/
│   ├── portfolio/
│   ├── recruitment/
│   ├── editorial/
│   └── partnership/
│
└── Domain-wide Technical Modules
    ├── store/
    ├── hooks/
    ├── ui/
    ├── lib/
    └── config/
```

Đây là quyết định cố ý: `store` và `hooks` không bị ép vào từng business sub-module ở quy mô hiện tại.

## 2. Vì sao `store` và `hooks` ở domain level

Các business sub-module hiện chưa lớn đến mức cần một `store/` hoặc `hooks/` riêng cho từng module. Phần lớn sẽ có 0–2 store/hook, trong khi hook/store FE có thể liên hệ hoặc tái sử dụng xuyên nhiều presentation.

Do đó V1 dùng:

```text
domain/home/store
domain/home/hooks

domain/admin/store
domain/admin/hooks
```

Nếu một business sub-module phình lớn trong tương lai, có thể extract module-local store/hook khi có lý do rõ ràng.

## 3. Business sub-module layers

Bên trong mỗi FE business module dùng 4 layer:

```text
recruitment/
├── model/
├── application/
├── infrastructure/
└── presentation/
```

### `model/`

Client-side representation của business capability.

Chứa các model/type mang semantic của module, ví dụ:

```text
Job
JobListItem
JobFilter
ApplicationFormModel
```

Không phải authoritative backend domain model.

### `application/`

Client application flow/use case khi cần, ví dụ:

- load/filter data;
- submit workflow;
- orchestration giữa presentation và integration.

Không bắt buộc mọi logic FE đều phải đi qua abstraction nặng.

### `infrastructure/`

Integration với external system, chủ yếu là API:

- fetch/Axios adapter;
- endpoint integration;
- response mapping;
- client/server transport detail.

Không import `domain/api` trực tiếp.

### `presentation/`

Business-aware UI:

```text
JobCard
JobListings
JobDetail
JobApplicationForm
```

Được biết React, Next.js UI concern, HeroUI, CSS classes và view state.

## 4. Home structure

```text
domain/home/
├── studio/
├── portfolio/
├── recruitment/
├── editorial/
├── partnership/
├── store/
├── hooks/
├── ui/
├── lib/
└── config/
```

## 5. Admin structure

Admin chốt **giống Home**:

```text
domain/admin/
├── studio/
├── portfolio/
├── recruitment/
├── editorial/
├── partnership/
├── store/
├── hooks/
├── ui/
├── lib/
└── config/
```

Khác biệt nằm ở use case, không nằm ở architecture taxonomy.

Ví dụ Recruitment:

```text
Home Recruitment
- browse jobs
- view detail
- apply

Admin Recruitment
- create/edit job
- publish/close
- manage applications
```

## 6. `store/`

`store/` chỉ quản lý client state cần tồn tại ngoài một component cục bộ.

Không biến mọi `useState` thành global/module store.

Ví dụ hợp lệ:

- auth/session presentation state nếu FE cần;
- navigation state;
- multi-step workflow state;
- state có quan hệ giữa nhiều presentation.

## 7. `hooks/`

`hooks/` chứa reusable React/client behavior trong phạm vi Home hoặc Admin.

Tên folder chuẩn là `hooks/`, không dùng `custom-hooks/`.

Hook không được trở thành service trá hình chứa cùng lúc transport, business rule, mapping và state mutation không kiểm soát.

## 8. `ui/`

Chứa Home/Admin-wide business-agnostic reusable composition.

Ví dụ candidate:

```text
SectionHeading
EmptyState
ResponsiveCarousel
```

Không đặt business-aware component như `JobCard`, `ArticleCard` vào đây.

## 9. `lib/`

Pure technical helper thực sự dùng ở FE domain, ví dụ `cn()`.

Không dùng `lib/`, `utils/`, `helpers/` như miscellaneous bucket.

## 10. `config/`

Home/Admin-level configuration:

- site URL;
- navigation config;
- public contact config khi phù hợp;
- client environment/configuration.

## 11. Route composition

Route không sở hữu business implementation.

Ví dụ:

```text
app/(home)/projects/page.tsx
     ↓ compose
Portfolio presentation
Studio presentation
Partnership presentation
```

Một route có thể compose nhiều business module.
