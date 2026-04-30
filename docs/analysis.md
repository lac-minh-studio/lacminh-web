# Phân tích source code — Lạc Minh Web

Tài liệu này tóm tắt cấu trúc, các page, component chính và tính năng hiện có trong repository `lacminh-web` (Next.js App Router).

**Tổng quan**
- **Framework**: Next.js (App Router).  
- **Styling**: Tailwind CSS + một số class UI component từ `@heroui/react`.  
- **Ảnh/Media**: `next/image`.  
- **JS/TS helpers**: `clsx` + `tailwind-merge` (hàm `cn` ở `src/lib/utils.ts`).  
- **Các thư viện UI**: `swiper` (carousel), `lucide-react` (icons), `@heroui/react` (UI primitives).  
- **Telemetry**: Vercel SpeedInsights + Vercel Analytics (đã import trong layout).

**Kỹ thuật quan trọng**
- **Root layout** dùng ở [src/app/layout.tsx](src/app/layout.tsx#L1-L120): gán font, thêm `Navbar` và `Footer`, chèn scripts analytics/GTM.  
- **Dynamic route** cho trang chi tiết tuyển dụng sử dụng `generateStaticParams` + `generateMetadata` (SSG-like): [src/app/(app)/careers/[slug]/page.tsx](src/app/(app)/careers/[slug]/page.tsx#L1-L200).  
- **Dữ liệu tĩnh** hiện lưu dưới `src/data/*` (mock data): blog, careers, projects, home, global.

**Các page chính**
- **Trang chủ `/`**: [src/app/page.tsx](src/app/page.tsx#L1-L120)
  - **Components**: `HeroSection`, `VisionSection`, `StatSeparator`, `ProjectsSection`, `RoadmapSection`, `ContactSection`.
  - **Dữ liệu**: `HERO_STATS` từ `src/data/home.ts`.
  - **Ghi chú**: Page là React server component (không có `use client`).

- **Blog `/blog`**: [src/app/(app)/blog/page.tsx](src/app/(app)/blog/page.tsx#L1-L200)
  - **Components**: `BlogCarousel`, `BlogSwiper`, `BlogGridSection` (tất cả hiển thị danh sách / lọc / carousel).  
  - **Dữ liệu**: `src/data/blogs.ts` (mock posts).  
  - **Layout metadata**: [src/app/(app)/blog/layout.tsx](src/app/(app)/blog/layout.tsx#L1-L80).

- **Projects `/projects`**: [src/app/(app)/projects/page.tsx](src/app/(app)/projects/page.tsx#L1-L120)
  - **Components**: `ProjectsHero`, `ProjectsStudioSection`, `ProjectsGameUniverse`, `TechPlatformStrip`, `ProjectsCommercial`.  
  - **Dữ liệu**: `src/data/projects.ts`.

- **Careers `/careers`**: [src/app/(app)/careers/page.tsx](src/app/(app)/careers/page.tsx#L1-L120)
  - **Components**: `HeroSection`, `StudioVision`, `JobListings`.
  - **Dữ liệu**: `src/data/careers.ts` (bao gồm `JOB_POSITIONS`, helper `getJobBySlug`).

- **Career detail `/careers/[slug]`**: [src/app/(app)/careers/[slug]/page.tsx](src/app/(app)/careers/[slug]/page.tsx#L1-L200)
  - **Behavior**: `generateStaticParams()` tạo params từ `JOB_POSITIONS`; `generateMetadata()` build SEO meta cho từng job; khi job không tồn tại gọi `notFound()`.
  - **View**: `CareerDetailView` (tập hợp `CareerDetailHero`, `CareerDetailBody`, `CareerDetailRelatedSection`).

- **Contact `/contact`**: [src/app/(app)/contact/page.tsx](src/app/(app)/contact/page.tsx#L1-L60)
  - **Components**: `ContactSection` -> `ContactForm` (client) + `ContactInfo`.
  - **Ghi chú**: `ContactForm` có validation cơ bản nhưng hiện chưa gọi API.

- **404**: [src/app/not-found.tsx](src/app/not-found.tsx#L1-L160) — custom 404 page với hero, CTA.

**Nhóm component & vai trò (tóm tắt)**
- **Global** (`src/components/global`)
  - **Navbar**: [Navbar.tsx](src/components/global/Navbar.tsx#L1-L120) — client component, mobile drawer, dùng `usePathname()`; nguồn links từ `src/data/global.ts`.
  - **Footer**: [Footer.tsx](src/components/global/Footer.tsx#L1-L160) — social links, footer sections từ `src/data/global.ts`.
  - **HeroSection**: [HeroSection.tsx](src/components/global/HeroSection.tsx#L1-L200) — reusable hero với CTAs và stat strip.
  - **ContactSection / ContactForm / ContactInfo**: contact UI; `ContactForm` là client, dùng `@heroui/react` controls và validation điện thoại.

- **Blog** (`src/components/blog`)
  - `BlogCarousel` (client): slideshow tự động + controls.  
  - `BlogSwiper` (client): uses `swiper` để show latest posts.  
  - `BlogGridSection` (client): filter + search + load-more; `BlogCard` render từng bài.

- **Careers** (`src/components/careers` & `careers-detail`)
  - `JobListings`, `JobCard`, `JobNewCard`: hiển thị danh sách vị trí.  
  - `StudioVision`: giới thiệu giá trị công ty.  
  - `CareerDetail*` components: layout chi tiết vị trí, sidebar tóm tắt, social share links.

- **Home / Projects** (`src/components/home`, `src/components/projects`)
  - `ProjectCard`, `ProjectsSection`: show game projects.
  - `RoadmapSection`: timeline UI (MILESTONES).  
  - `ProjectsHero`, `ProjectsStudioSection`, `ProjectsGameUniverse`: sections cấu thành trang Projects.

- **Hero UI** (`src/components/hero-ui/AppButton.tsx`) — wrapper cho `Button` từ `@heroui/react`, hỗ trợ `href` prop.

**Dữ liệu & utils**
- **Mock data**: `src/data/blogs.ts`, `src/data/careers.ts`, `src/data/home.ts`, `src/data/projects.ts`, `src/data/global.ts` — hiện dùng để render content (placeholder cho backend/API sau này).
- **Hàm tiện ích**: `src/lib/utils.ts` — `cn()` dùng `clsx` + `twMerge` để hợp nhất classnames.
- **Hằng số môi trường**: `src/const.ts` — `SITE_URL`, `FACEBOOK_LINK`, `CONTACT_EMAIL`, ... đọc từ env.
- **Types**: types được định nghĩa trong `src/types/*` (sử dụng cho data & props).

**Routing & render strategy**
- App Router với nested layouts: root layout + route-level layouts (ví dụ `blog/layout.tsx`, `projects/layout.tsx`, `careers/layout.tsx`).
- Dynamic career pages được generate statically qua `generateStaticParams()` → sẵn sàng cho SSG/ISR.
- Nhiều components client-only (với `use client`) cho interaction: `Navbar`, `ContactForm`, blog carousels, filter/search.

**Third-party / DevOps**
- `@heroui/react` — UI primitives.
- `swiper` — carousel.
- `lucide-react` — icons.
- `@vercel/analytics/next` & `@vercel/speed-insights/next` — analytics / perf.
- `clsx`, `tailwind-merge` — class name utils.

**Những điểm cần chú ý / đề xuất tiếp theo**
- **ContactForm** chưa gọi API: cần route API (API route / server action) để nhận contact submissions.
- **Dữ liệu hiện là mock**: cân nhắc nối `src/data/*` tới CMS hoặc database; nhiều chỗ có comment `// TODO: replace with fetch()` (ví dụ `src/data/projects.ts`).
- **SEO / OG**: layouts đã có metadata, nhưng có thể mở rộng canonical, structured-data cho từng bài blog.
- **Testing**: hiện chưa thấy test; nên thêm unit test cho helpers và snapshot/integration cho critical UI.
- **Accessibility**: nhiều thành phần tương tác (carousel, drawer) nên được audit a11y (focus trap, aria labels).

**Các file tham khảo nhanh**
- Root layout: [src/app/layout.tsx](src/app/layout.tsx#L1-L120)  
- Home page: [src/app/page.tsx](src/app/page.tsx#L1-L120)  
- Blog page: [src/app/(app)/blog/page.tsx](src/app/(app)/blog/page.tsx#L1-L200)  
- Careers list: [src/app/(app)/careers/page.tsx](src/app/(app)/careers/page.tsx#L1-L120)  
- Career detail: [src/app/(app)/careers/[slug]/page.tsx](src/app/(app)/careers/[slug]/page.tsx#L1-L200)  
- Navbar: [src/components/global/Navbar.tsx](src/components/global/Navbar.tsx#L1-L120)  
- Contact form: [src/components/global/ContactForm.tsx](src/components/global/ContactForm.tsx#L1-L250)  
- Blog data: [src/data/blogs.ts](src/data/blogs.ts#L1-L200)  
- Careers data: [src/data/careers.ts](src/data/careers.ts#L1-L200)

---

Nếu bạn muốn, tôi có thể:
- tạo PR với bản phân tích này; hoặc
- mở thêm checklist để implement API contact, hoặc
- sinh ra một sơ đồ routing (Mermaid) cho repository.