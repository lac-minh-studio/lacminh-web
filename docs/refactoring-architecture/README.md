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

## Environment
### 1. Development
Run the application with Firebase Local Emulator:
`npm run dev:firebase`
The application uses the local Firebase Emulator for development and testing.

### 2. Production
Build and start the application:
`npm run build`
`npm run start`

Set the production environment variable:
NEXT_PUBLIC_ENV=production

Production uses Firebase Cloud services instead of the local Emulator. Make sure the required production environment variables and Firebase configuration are set before starting the application.

## Main Commands
| Command| Description |
|---|---|
| `npm run dev:firebase` | Run the application with Firebase Emulator |
| `npm run seed:auth` | Initialize authentication test data |
| `npm run test` | Run automated tests |
| `npm run lint` | Check code quality |
| `npm run build` | Build the application for production |
| `npm run deploy:rules` | Deploy Firestore Security Rules |
| `npm run seed:prod` | Initialize production data, according to the script configuration |

Run data initialization or deployment commands only in the intended environment. Review the script configuration before using commands that modify production data.

## Diagram Environment DEV & PRODUCTION

                    ┌─────────────────────────┐
                    │    NEXT.JS APPLICATION  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   ENVIRONMENT CONFIG    │
                    └────────────┬────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
       ┌────────────────────────┐  ┌────────────────────────┐
       │     DEVELOPMENT        │  │      PRODUCTION        │
       │                        │  │                        │
       │ Firebase Emulator      │  │ Firebase Cloud         │
       │                        │  │                        │
       │ Authentication         │  │ Authentication         │
       │ Firestore              │  │ Cloud Firestore        │
       └────────────────────────┘  └────────────────────────┘


## System Architecture Diagram

                         ┌────────────────────────┐
                         │       ADMIN USER       │
                         └────────────┬───────────┘
                                      │
                                      │ HTTP / HTTPS
                                      ▼
                    ┌────────────────────────────────┐
                    │       NEXT.JS ADMIN PORTAL     │
                    │                                │
                    │  ┌──────────────────────────┐  │
                    │  │ Presentation Layer       │  │
                    │  │ Pages / Layouts / UI     │  │
                    │  └────────────┬─────────────┘  │
                    │               │                │
                    │  ┌────────────▼─────────────┐  │
                    │  │ Application Layer        │  │
                    │  │ Hooks / Services         │  │
                    │  └────────────┬─────────────┘  │
                    │               │                │
                    │  ┌────────────▼─────────────┐  │
                    │  │ Domain Layer             │  │
                    │  │ Business Rules / Models  │  │
                    │  └────────────┬─────────────┘  │
                    │               │                │
                    │  ┌────────────▼─────────────┐  │
                    │  │ Infrastructure Layer     │  │
                    │  │ Repositories / Firebase  │  │
                    │  └────────────┬─────────────┘  │
                    └───────────────┼────────────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
        ┌──────────────────────┐       ┌──────────────────────┐
        │ Firebase             │       │ Cloud Firestore      │
        │ Authentication       │       │                      │
        │                      │       │ Staff / Audit Logs   │
        │ Login / Identity     │       │ Dashboard Data       │
        └──────────────────────┘       └──────────────────────┘
                                                  ▲
                                                  │
                                     ┌────────────┴───────────┐
                                     │ Firestore Security     │
                                     │ Rules                  │
                                     └────────────────────────┘



## Main Features

- Admin authentication and role-based access control.
- Staff management, search, filtering, and pagination.
- Dashboard statistics and data visualizations.
- Activity logs and high-risk activity alerts.
- Staff CSV export and monthly PDF reports.
- Paginated activity notifications.
- Firestore backup and restore utilities.

