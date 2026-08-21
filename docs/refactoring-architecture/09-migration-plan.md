# 09 — Migration Plan

## 1. Nguyên tắc

Đây là một **architecture refactor**, không phải đổi tên folder cơ học.

Mục tiêu là kết thúc migration với một source tree duy nhất, thống nhất, không duy trì song song architecture cũ và mới lâu dài.

## 2. Phase 0 — Freeze architecture

Đã hoàn thành trong Architecture V1:

- Home/Admin/API top-level boundary;
- Route Group strategy;
- FE module-first structure;
- API module-first 4-layer DDD;
- Home/Admin store/hooks ở domain level;
- HTTP-only cross-domain communication;
- bỏ Atomic taxonomy;
- HeroUI + Design Foundation;
- `.gitkeep` skeleton rule.

## 3. Phase 1 — Tạo skeleton trước

Tạo toàn bộ target folders:

```text
src/app/(home)
src/app/(admin)
src/app/(api)

src/domain/home/**
src/domain/admin/**
src/domain/api/**
```

Folder chưa có implementation phải có `.gitkeep`.

Không chờ đến lúc feature xuất hiện mới tạo architecture path.

## 4. Phase 2 — Restructure App Router

1. Đổi `(app)` → `(home)`.
2. Move root public `page.tsx` vào `(home)`.
3. Tạo `(home)/layout.tsx`.
4. Move Navbar/Footer composition khỏi root layout vào Home layout.
5. Tạo `(admin)/admin` skeleton + protected layout placeholder.
6. Tạo `(api)/api` skeleton.
7. Kiểm tra route URL không thay đổi ngoài routes mới chưa triển khai.

## 5. Phase 3 — Refactor Home theo business module

Khuyến nghị thứ tự:

### 3.1 Recruitment

Là module có boundary rõ nhất và hiện bị tách giữa `careers` + `careers-detail`.

- merge presentation;
- move model/data;
- tách Job Application khỏi generic Contact/Partnership form;
- cleanup `IJobPosition` presentation concern.

### 3.2 Portfolio

- move Game/Commercial project presentation;
- move project model/data;
- remove layout concern như `reversed` khỏi data model.

### 3.3 Studio

- gom Vision/Stats/Milestones;
- merge duplicated timeline source;
- nhận Studio sections đang nằm trong Home/Projects/Careers.

### 3.4 Editorial

- move Blog components/data/model;
- colocate Swiper-specific presentation styling.

### 3.5 Partnership

- rename generic Contact form theo business intent;
- chuẩn hóa partnership presentation/config.

## 6. Phase 4 — Refactor Home-wide technical modules

Move/chuẩn hóa:

```text
home/ui
home/lib
home/config
home/hooks
home/store
```

Không tạo store/hook mới chỉ để “đủ architecture”. Chỉ move/extract khi responsibility thật tồn tại.

## 7. Phase 5 — UI cleanup

1. Delete `components/hero-ui/AppButton.tsx`.
2. Rewrite usage sang HeroUI direct primitive.
3. Đưa styling pattern vào Design Foundation.
4. Xóa `components/hero-ui` nếu không còn abstraction thật.
5. Review các generic wrapper khác cùng nguyên tắc.

## 8. Phase 6 — Xóa architecture cũ

Sau khi module đã migrate xong, loại bỏ:

```text
src/components
src/data
src/types
src/lib
src/styles
src/const.ts
```

chỉ sau khi toàn bộ responsibility đã được chuyển đúng owner.

Không để source mới tiếp tục import ngược về folder cũ.

## 9. Phase 7 — Build validation

Sau mỗi business module migration:

- TypeScript check;
- Next.js build;
- route smoke test;
- visual regression/manual verification;
- kiểm tra URL giữ nguyên;
- kiểm tra không có import chéo `home/admin/api`.

ESLint architecture guardrails được skip trong V1 theo quyết định hiện tại và có thể setup sau.

## 10. Phase 8 — Admin/API development

Sau Home refactor:

- Admin phát triển trên skeleton đã có, dùng cùng FE architecture standard;
- API phát triển module-first với 4 DDD layers;
- Home/Admin gọi API qua HTTP ngay cả khi ở cùng repo.

## 11. Definition of Done cho migration architecture

Migration chỉ được xem là hoàn tất khi:

- `src` chỉ còn target top-level architecture;
- không còn business code trong `app`;
- không còn `src/components`, `src/data`, `src/types` global architecture;
- Home business code đã được ownership theo module;
- Home/Admin/API không import trực tiếp lẫn nhau;
- HeroUI primitive được dùng theo Design Foundation standard;
- target empty folders tồn tại với `.gitkeep`;
- public routes và behavior hiện tại vẫn hoạt động.
