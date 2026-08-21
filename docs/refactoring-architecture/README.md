# Lạc Minh Web — Architecture Documentation V1

> Trạng thái: **Architecture baseline đã chốt** cho đợt refactor hiện tại.
>
> Phạm vi: refactor repository Next.js hiện tại thành một **Extractable Modular Monolith** gồm ba top-level domain: `home`, `admin`, `api`, với mục tiêu giữ một repository ở hiện tại nhưng có thể tách thành ba repository/application độc lập trong tương lai mà không phải refactor lại kiến trúc từ đầu.

## Mục tiêu

Bộ tài liệu này không phải tài liệu lý thuyết DDD chung. Nó là **architecture contract của chính `lacminh-web`** và dùng làm baseline cho:

- refactor source hiện tại;
- phát triển Admin FE;
- phát triển API bằng Next.js Route Handlers;
- thống nhất cách tổ chức code cho toàn bộ team;
- giảm phụ thuộc vào cách tổ chức code theo thói quen của từng developer;
- chuẩn bị sẵn boundary để sau này tách `home`, `admin`, `api` thành các application/repository riêng.

## Tài liệu

1. [`00-architecture-overview.md`](architecture/00-architecture-overview.md) — tổng quan và các quyết định đã chốt.
2. [`01-current-state-analysis.md`](architecture/01-current-state-analysis.md) — hiện trạng source và các vấn đề kiến trúc cần giải quyết.
3. [`02-target-system-architecture.md`](architecture/02-target-system-architecture.md) — kiến trúc mục tiêu Home/Admin/API.
4. [`03-app-router-architecture.md`](architecture/03-app-router-architecture.md) — quy chuẩn `src/app`, Route Groups, layout, routing và protection.
5. [`04-home-admin-frontend-architecture.md`](architecture/04-home-admin-frontend-architecture.md) — chuẩn kiến trúc FE dùng chung cho Home và Admin.
6. [`05-api-architecture.md`](architecture/05-api-architecture.md) — kiến trúc API module-first với 4 layer DDD.
7. [`06-design-foundation-and-ui.md`](architecture/06-design-foundation-and-ui.md) — HeroUI, Design Foundation và quyết định loại Atomic taxonomy.
8. [`07-target-folder-structure.md`](architecture/07-target-folder-structure.md) — target folder tree và quy tắc `.gitkeep`.
9. [`08-current-to-target-mapping.md`](architecture/08-current-to-target-mapping.md) — mapping source hiện tại sang architecture mới.
10. [`09-migration-plan.md`](architecture/09-migration-plan.md) — thứ tự refactor đề xuất.

## Nguyên tắc đọc

Khi có xung đột giữa source hiện tại và tài liệu này, **tài liệu target architecture là chuẩn mới**. Source hiện tại được xem là input của migration, không phải source of truth cho cách tổ chức code mới.
