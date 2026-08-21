# 01 — Current State Analysis

## 1. Stack hiện tại

Source hiện tại sử dụng:

- Next.js 16 App Router;
- React 19;
- TypeScript;
- Tailwind CSS v4;
- HeroUI;
- Lucide React;
- Framer Motion;
- Swiper;
- Vercel Analytics / Speed Insights.

## 2. Cấu trúc source hiện tại

```text
src/
├── app/
├── components/
│   ├── blog/
│   ├── careers/
│   ├── careers-detail/
│   ├── global/
│   ├── hero-ui/
│   ├── home/
│   └── projects/
├── data/
├── types/
├── lib/
├── styles/
└── const.ts
```

Cấu trúc này chủ yếu là **technical/page-oriented**:

- component được chia theo page hoặc nhóm UI;
- data đứng ở một global folder riêng;
- type đứng ở một global folder riêng;
- business capability bị trải ra nhiều vị trí.

## 3. Business capability đang bị phân tán

Ví dụ Recruitment hiện nằm ở nhiều nơi:

```text
src/app/(app)/careers/*
src/components/careers/*
src/components/careers-detail/*
src/data/careers.ts
src/types/careers.ts
```

Một thay đổi Recruitment có thể phải đi qua route, component, data và type ở nhiều top-level folder khác nhau.

Target architecture phải gom code theo **business ownership trước**, technical layer sau.

## 4. Route/page đang bị dùng như ownership boundary

Các folder:

```text
components/home
components/projects
components/careers
components/careers-detail
components/blog
```

phản ánh nơi UI được hiển thị hơn là business owner.

Ví dụ:

- `components/home/ProjectsSection.tsx` đọc `GAME_PROJECTS` từ `data/projects.ts`;
- `/projects` hiển thị cả Portfolio và Studio timeline/stats;
- `careers` và `careers-detail` thực chất là hai presentation của cùng Recruitment capability.

Target architecture không dùng route name để quyết định business ownership.

## 5. `global` là miscellaneous bucket

`src/components/global` đang chứa nhiều responsibility khác nhau:

```text
Navbar             → Home-wide UI / shell
Footer             → Home-wide UI / shell
HeroSection        → Home-wide shared presentation
ContactForm        → Partnership use case
ContactInfo        → company/site information
ContactSection     → Partnership composition
```

`global` không phải business boundary và sẽ bị loại bỏ trong target architecture.

## 6. Data ownership đang bị lẫn

### `src/data/projects.ts`

File này chứa đồng thời:

- `GAME_PROJECTS`, `COMMERCIAL_PROJECTS` → Portfolio;
- `STUDIO_STATS`, `TIMELINE_MILESTONES` → Studio.

Nó cần **SPLIT**, không được move nguyên file.

### `src/data/home.ts`

`HERO_STATS`, `SEPARATOR_STATS`, `MILESTONES` chủ yếu mô tả company/studio information. Home page chỉ là consumer, không phải owner.

### Duplicate business truth

`MILESTONES` trong `data/home.ts` và `TIMELINE_MILESTONES` trong `data/projects.ts` mô tả gần như cùng một company timeline bằng hai schema khác nhau.

Target architecture phải hướng đến nguyên tắc:

> Một business truth có một owner.

## 7. Type ownership đang quá global

Hiện tại có:

```text
src/types/blogs.ts
src/types/careers.ts
src/types/global.ts
src/types/home.ts
src/types/projects.ts
```

Các type như `IJobPosition`, `IGameProject`, `IBlogPost` mang business semantic nhưng lại nằm trong global technical layer `types/`.

Target architecture không giữ top-level `src/types`.

## 8. Business model đang trộn presentation concern

Ví dụ `IJobPosition` hiện có:

```text
summary
linkHref
```

`linkHref` là routing concern. `summary` là display projection lặp lại các field như `location`, `workType`.

`IGameProject` có:

```text
reversed
```

`reversed` chỉ quyết định layout text/image, không phải business property của project.

Target architecture phải tách:

```text
business/client model
≠
view/layout configuration
```

## 9. UI abstraction không nhất quán

Source hiện tại có `components/hero-ui/AppButton.tsx`, wrap HeroUI `Button` để thêm style và navigation behavior.

Trong khi nhiều primitive HeroUI khác được dùng trực tiếp. Đây là ví dụ cho vấn đề code do nhiều developer triển khai không cùng quy chuẩn:

```text
HeroUI primitive
    ↓
wrapper
    ↓
wrapper khác / feature component
```

Target architecture loại bỏ abstraction chỉ phục vụ styling consistency. Styling standard phải thuộc Design Foundation.

## 10. Design Foundation hiện tại là nền tảng tốt để giữ lại

`src/app/globals.css` đã có:

- color tokens;
- font tokens;
- shadow tokens;
- custom font-size tokens;
- HeroUI style imports;
- các reusable CSS patterns như glass, timeline, content container.

Đây là phần nên được chuẩn hóa và tiếp tục phát triển, không cần thay thế bằng một Atom layer mới.

## 11. Backend hiện chưa tồn tại

Source hiện tại chủ yếu là static data + presentation. Chưa có API architecture, repository, persistence hoặc authoritative backend domain model.

Vì vậy migration V1 cần:

1. refactor current public website vào `domain/home`;
2. tạo skeleton `admin` và `api` theo architecture đã chốt;
3. phát triển API/Admin sau mà không phá Home boundary.
