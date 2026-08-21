# 08 — Current → Target Mapping

> Mapping này là baseline cho refactor source hiện tại. Các path con cụ thể trong `presentation/` có thể được làm phẳng hoặc chia nhỏ khi implementation, nhưng **business ownership và action KEEP/MOVE/SPLIT/MERGE/DELETE phải giữ nguyên tinh thần**.

## 1. Top-level mapping

| Current | Action | Target |
|---|---|---|
| `src/app` | KEEP + RESTRUCTURE | `src/app` |
| `src/components` | DELETE top-level + DISTRIBUTE | `src/domain/home/*` |
| `src/data` | DELETE top-level + DISTRIBUTE/SPLIT | `src/domain/home/*` |
| `src/types` | DELETE top-level + DISTRIBUTE | module `model/` hoặc colocated type |
| `src/lib` | MOVE | `src/domain/home/lib` |
| `src/styles` | MOVE/COLOCATE | Design Foundation hoặc module presentation |
| `src/const.ts` | SPLIT/MOVE | `src/domain/home/config` + owner phù hợp |

## 2. App Router

| Current | Action | Target |
|---|---|---|
| `src/app/page.tsx` | MOVE | `src/app/(home)/page.tsx` |
| `src/app/(app)/projects/*` | MOVE | `src/app/(home)/projects/*` |
| `src/app/(app)/careers/*` | MOVE | `src/app/(home)/careers/*` |
| `src/app/(app)/blog/*` | MOVE | `src/app/(home)/blog/*` |
| `src/app/(app)/contact/*` | MOVE | `src/app/(home)/contact/*` |
| `src/app/layout.tsx` | SPLIT responsibility | Root layout + `(home)/layout.tsx` |
| Navbar/Footer trong root layout | MOVE | `(home)/layout.tsx` composition |
| `src/app/globals.css` | KEEP + REFACTOR | Global Design Foundation |

Root layout sau migration không được mặc định render public Navbar/Footer cho Admin.

## 3. `components/global`

| Current file | Action | Target ownership |
|---|---|---|
| `Navbar.tsx` | MOVE | `domain/home/ui` |
| `Footer.tsx` | MOVE | `domain/home/ui` |
| `HeroSection.tsx` | MOVE + REWRITE AppButton usage | `domain/home/ui` |
| `ContactForm.tsx` | RENAME/MOVE | `domain/home/partnership/presentation/PartnershipInquiryForm.tsx` |
| `ContactSection.tsx` | MOVE/RENAME | `domain/home/partnership/presentation` |
| `ContactInfo.tsx` | REVIEW ownership + MOVE | Partnership presentation using Home/Studio config |
| `index.ts` | DELETE/RECREATE locally if useful | Không giữ global barrel chỉ vì folder cũ |

`global/` bị xóa hoàn toàn như một ownership concept.

## 4. `components/hero-ui`

| Current file | Action | Target |
|---|---|---|
| `AppButton.tsx` | **DELETE** | HeroUI `Button` trực tiếp + Design Foundation class/token |
| `index.ts` | DELETE | — |

Tất cả usage của `AppButton` phải rewrite.

## 5. Home page components

| Current file | Action | Target ownership |
|---|---|---|
| `home/VisionSection.tsx` | MOVE | `home/studio/presentation` |
| `home/StatSeparator.tsx` | MOVE | `home/studio/presentation` |
| `home/RoadmapSection.tsx` | MOVE | `home/studio/presentation` |
| `home/ProjectCard.tsx` | MOVE | `home/portfolio/presentation` |
| `home/ProjectsSection.tsx` | MOVE + rewrite AppButton | `home/portfolio/presentation` |

`home/` hiện tại không trở thành một business module mới. Home route là composition surface.

## 6. Projects components

| Current file | Action | Target ownership |
|---|---|---|
| `projects/ProjectsHero.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/GameRow.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/ProjectsGameUniverse.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/CommercialCard.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/ProjectsCommercial.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/TechPlatformStrip.tsx` | MOVE | `home/portfolio/presentation` |
| `projects/ProjectsStudioSection.tsx` | MOVE | `home/studio/presentation` |
| `projects/StudioStatsGrid.tsx` | MOVE | `home/studio/presentation` hoặc `home/ui` nếu được chứng minh business-agnostic |
| `projects/DevelopmentTimeline.tsx` | MOVE | `home/studio/presentation` |

Route `/projects` sau migration compose cả `Portfolio` và `Studio`; route name không quyết định owner.

## 7. Recruitment components

Hai folder hiện tại:

```text
components/careers
components/careers-detail
```

được **MERGE về cùng Recruitment business module**.

| Current file | Action | Target ownership |
|---|---|---|
| `careers/JobCard.tsx` | MOVE | `home/recruitment/presentation` |
| `careers/JobListings.tsx` | MOVE | `home/recruitment/presentation` |
| `careers/CareerContactForm.tsx` | RENAME/MOVE | `home/recruitment/presentation/JobApplicationForm.tsx` |
| `careers/CareerContactInfo.tsx` | MOVE/REVIEW | `home/recruitment/presentation` |
| `careers/CareerContactSection.tsx` | MOVE/RENAME | `home/recruitment/presentation` |
| `careers/StudioVision.tsx` | MOVE ownership | `home/studio/presentation` nếu nội dung là company values |
| `careers-detail/CareerDetailHero.tsx` | MOVE | `home/recruitment/presentation` |
| `careers-detail/CareerDetailBody.tsx` | MOVE + rewrite AppButton | `home/recruitment/presentation` |
| `careers-detail/CareerDetailRelatedSection.tsx` | MOVE | `home/recruitment/presentation` |
| `careers-detail/CareerDetailView.tsx` | MOVE | `home/recruitment/presentation` |
| `careers-detail/CareerDetailApplySection.tsx` | REWRITE/MERGE | Recruitment application presentation; không dùng generic Partnership contact form |

`CareerDetailApplySection` hiện import `global/ContactForm`; migration phải tách rõ `JobApplicationForm` và `PartnershipInquiryForm` thay vì dùng generic Contact use case.

## 8. Editorial components

| Current file | Action | Target |
|---|---|---|
| `blog/BlogCard.tsx` | MOVE | `home/editorial/presentation` |
| `blog/BlogCarousel.tsx` | MOVE | `home/editorial/presentation` |
| `blog/BlogGridSection.tsx` | MOVE | `home/editorial/presentation` |
| `blog/BlogSwiper.tsx` | MOVE | `home/editorial/presentation` |
| `styles/swiper.css` | MOVE/COLOCATE | Editorial presentation stylesheet hoặc phù hợp với Next.js import constraint |

## 9. Data mapping

### `data/careers.ts`

**SPLIT theo ownership:**

```text
JOB_POSITIONS
getJobBySlug
getRelatedJobs
Recruitment-specific stats
    → home/recruitment

VALUE_PILLARS
    → home/studio nếu xác nhận là company values
```

Static data ở giai đoạn hiện tại có thể nằm trong module phù hợp; khi API được phát triển, phần public data source sẽ chuyển sang Home infrastructure/API integration.

### `data/projects.ts`

**Bắt buộc SPLIT:**

```text
GAME_PROJECTS
COMMERCIAL_PROJECTS
    → home/portfolio

STUDIO_STATS
TIMELINE_MILESTONES
    → home/studio
```

### `data/home.ts`

```text
HERO_STATS
SEPARATOR_STATS
MILESTONES
    → home/studio
```

Cần hợp nhất company timeline để tránh hai source of truth (`MILESTONES` và `TIMELINE_MILESTONES`).

### `data/blogs.ts`

```text
BLOG_FILTERS
BLOG_HERO_STATS
mockCarouselSlides
mockGridPosts
    → home/editorial
```

### `data/global.ts`

```text
NAV_LINKS
FOOTER_SECTIONS
    → home/config hoặc home/ui colocated config
```

Không giữ `data/global.ts`.

## 10. Type mapping

| Current | Action | Target |
|---|---|---|
| `types/careers.ts` | SPLIT/MOVE | `home/recruitment/model` + Studio value type nếu cần |
| `types/projects.ts` | SPLIT/MOVE | `home/portfolio/model` + `home/studio/model` |
| `types/blogs.ts` | MOVE | `home/editorial/model` |
| `types/home.ts` | MOVE/MERGE | `home/studio/model` |
| `types/global.ts` | DELETE AS GLOBAL REGISTRY | colocate theo UI/config/owner |

Không giữ rule cũ “dùng nhiều page thì đưa vào global type”. Reuse không đồng nghĩa ownership = shared.

## 11. Current model cleanup

### `IJobPosition`

Review/remove presentation concern:

```text
linkHref  → routing/view concern
summary   → projection/display concern nếu trùng source fields
```

### `IGameProject`

```text
reversed → presentation/layout concern, không phải model property
```

## 12. Technical files

| Current | Action | Target |
|---|---|---|
| `src/lib/utils.ts` (`cn`) | MOVE | `domain/home/lib/cn.ts` hoặc equivalent |
| `src/const.ts` | SPLIT | `domain/home/config/*` |
| `src/styles/swiper.css` | MOVE | owner phù hợp |

## 13. Admin/API

Current source chưa có implementation đáng kể cho Admin/API. Migration V1 tạo **architecture skeleton đầy đủ + `.gitkeep`** cho các folder chưa có file.
