# 07 — Target Folder Structure

## 1. Top-level target

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

## 2. Full architecture skeleton

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── (home)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   ├── careers/
│   │   ├── blog/
│   │   └── contact/
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       └── ...
│   │
│   └── (api)/
│       └── api/
│           └── ...
│
└── domain/
    ├── home/
    │   ├── studio/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── portfolio/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── recruitment/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── editorial/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── partnership/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── store/
    │   ├── hooks/
    │   ├── ui/
    │   ├── lib/
    │   └── config/
    │
    ├── admin/
    │   ├── studio/
    │   │   ├── model/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── presentation/
    │   ├── portfolio/
    │   │   └── ... same 4 FE layers
    │   ├── recruitment/
    │   │   └── ... same 4 FE layers
    │   ├── editorial/
    │   │   └── ... same 4 FE layers
    │   ├── partnership/
    │   │   └── ... same 4 FE layers
    │   ├── store/
    │   ├── hooks/
    │   ├── ui/
    │   ├── lib/
    │   └── config/
    │
    └── api/
        ├── studio/
        │   ├── domain/
        │   ├── application/
        │   ├── infrastructure/
        │   └── presentation/
        ├── portfolio/
        │   └── ... same 4 API layers
        ├── recruitment/
        │   └── ... same 4 API layers
        ├── editorial/
        │   └── ... same 4 API layers
        ├── partnership/
        │   └── ... same 4 API layers
        └── _shared/
```

## 3. Quy tắc tạo folder trước

Toàn bộ folder đã được định nghĩa trong target architecture phải được **tạo sẵn trong lần refactor đầu tiên**, kể cả khi chưa có implementation.

Mục tiêu:

- developer nhìn source biết ngay vị trí hợp lệ để đặt code;
- tránh tự phát sinh `services/`, `common/`, `helpers/`, `features/` ở top-level;
- giữ architecture skeleton ổn định ngay từ đầu.

## 4. `.gitkeep`

Git không track folder rỗng. Vì vậy folder chưa có file thật phải chứa:

```text
.gitkeep
```

Quy ước dùng `.gitkeep` — không dùng `.gitkeeper`.

Ví dụ:

```text
recruitment/
├── model/
│   └── .gitkeep
├── application/
│   └── .gitkeep
├── infrastructure/
│   └── .gitkeep
└── presentation/
    └── JobCard.tsx
```

Khi folder đã có file implementation thật, `.gitkeep` nên được xóa.

## 5. Folder không còn tồn tại ở top-level sau migration

Target không giữ:

```text
src/components/
src/data/
src/types/
src/lib/
src/styles/
src/const.ts
```

Responsibility của chúng được phân phối về đúng Home/Admin/API domain/module hoặc Design Foundation.

## 6. Không tạo Atomic folder

Không có:

```text
atoms/
molecules/
organisms/
templates/
```

trong target skeleton.
