# Analytics — Projects Screen (Editorial R7 Implementation)
**Source:** `.stitch/designs/projects/round-7-pc.html` + `round-7-mobile.html`
**Approved round:** 7 (editorial redesign loop) | **Locked PC ID:** `a1416cb9a17d46eab04c52c0a93c89cb` | **Locked Mobile ID:** `d577387e02ea45c5906962042c42580b`

---

## A. Component Hierarchy

```
ProjectsPage (Server Component — src/app/(app)/projects/page.tsx)
│
├── ProjectsHero              ← S1: full-width dark hero, 440px height, 3-layer depth
│   ├── [Watermark Layer]     ← /trongdong.png at 8% opacity via CSS bg-image
│   ├── [Vignette Layer]      ← radial-gradient rgba(26,45,34,0.6) to transparent
│   ├── [Bottom Ornament]     ← 12px strip, repeating arc, #C4954A 15% opacity
│   ├── ProjectsHeroContent   ← section label + H1 + body paragraph
│   └── ScrollIndicator       ← animated bounce arrow + "Khám phá" label
│
├── ProjectsStudioSection     ← S2: cream bg with diagonal-clip bottom, 50/50 grid
│   ├── StudioTextColumn      ← left col: bronze left-bar + heading + 3 paragraphs
│   ├── StudioStatsGrid       ← right col: 2×2 neumorphic stat cards (18, 6, 3, 2026)
│   └── DevelopmentTimeline   ← full-width horizontal timeline strip (5 milestones)
│
├── ProjectsGameUniverse      ← S3: dark bg with diagonal-clip top, 3 editorial rows
│   ├── GameUniverseHeader    ← section label + H2 heading
│   └── GameRowList           ← ordered list of 3 GameRow components
│       ├── GameRow (Khế Ước) ← row-A: text-left + /cultivation.jpg right, bronze bar
│       ├── GameRow (SEN CITY)← row-B: text-right + /void_map.png left (reversed), bronze bar
│       └── GameRow (Shadow)  ← row-C: text-left + placeholder right, bronze bar
│
├── TechPlatformStrip         ← S3.5: very dark bg (#1a2a1f), 6 pill chips horizontal
│
├── ProjectsCommercial        ← S4: cream bg, section heading + horizontal bronze rule
│   └── CommercialCardGrid    ← 2 neumorphic cards: E-Commerce + Du Học
│       └── CommercialCard    ← icon + heading + desc + tech pills + metric stat
│
└── ContactSection            ← S5: REUSE src/components/global/ContactSection.tsx (no change)
    (Footer is in root layout)
```

---

## B. Props & State Mapping

### `ProjectsHero` — Server Component (static)
- No props — fully static markup, CSS-only animations

### `DevelopmentTimeline`
```ts
// Props: milestones: TimelineMilestone[]
// CSS-only animations (animate-ping for active dot)
```

### `GameRow`
```ts
interface GameRowProps {
  game: GameProject
  reversed?: boolean   // true → flex-row-reverse (image left, text right)
}
```

### `CommercialCard`
```ts
interface CommercialCardProps {
  icon: string
  title: string
  description: string
  techPills: string[]
  metric: string
  metricLabel: string
}
```

---

## C. Data Shape

```ts
// src/types/projects.ts

export interface GameProject {
  id: string
  name: string
  genre: string
  status: 'pre-production' | 'in-development' | 'pending'
  statusLabel: string
  description: string
  imageAsset?: string       // "/cultivation.jpg" | "/void_map.png"
  placeholderIcon?: string  // Material Symbol name when no image
}

export interface TimelineMilestone {
  label: string
  date: string
  isActive?: boolean
  isPending?: boolean
  sublabel?: string
}

export interface CommercialProject {
  id: string
  icon: string
  title: string
  description: string
  techPills: string[]
  metric: string
  metricLabel: string
}
```

---

## D. Mock Data (src/data/projects.ts)

```ts
export const gameProjects: GameProject[] = [
  {
    id: 'khe-uoc',
    name: 'KHẾ ƯỢC LẠC HỒNG',
    genre: 'MMORPG · Huyền Sử · UE5',
    status: 'pre-production',
    statusLabel: 'Pre-production',
    description: 'Sau Đại Chiến Lạc Hồng, Linh Giới tách khỏi trần thế...',
    imageAsset: '/cultivation.jpg',
  },
  {
    id: 'sen-city',
    name: 'SEN CITY',
    genre: 'Social MMO · Simulation · Unity',
    status: 'in-development',
    statusLabel: 'Đang phát triển',
    description: 'Mega-Apartment khổng lồ với 5 tầng lớp nhà ở...',
    imageAsset: '/void_map.png',
  },
  {
    id: 'shadow-bastion',
    name: 'SHADOW BASTION',
    genre: 'Tower Defense · 2.5D · Unity',
    status: 'in-development',
    statusLabel: 'Đang phát triển',
    description: 'Tháp phòng thủ 2.5D với kiến trúc di sản Việt...',
    placeholderIcon: 'castle',
  },
]

export const timelineMilestones: TimelineMilestone[] = [
  { label: 'Thành Lập', date: 'Jan 2026' },
  { label: '3 Game', date: 'Apr 2026' },
  { label: 'SEN CITY', date: 'Q3 2026', isActive: true },
  { label: 'Shadow Bastion', date: 'Q4 2026', isPending: true, sublabel: 'Pending' },
  { label: 'Khế Ước', date: '2028+', isPending: true, sublabel: 'Pending' },
]

export const commercialProjects: CommercialProject[] = [
  {
    id: 'ecommerce',
    icon: 'shopping_cart',
    title: 'E-Commerce Máy Thổi Khí',
    description: 'Hệ thống thương mại điện tử B2B...',
    techPills: ['Next.js', 'WooCommerce', 'i18n'],
    metric: '+200%',
    metricLabel: 'Tăng trưởng doanh số Online',
  },
  {
    id: 'study-abroad',
    icon: 'school',
    title: 'Nền Tảng Du Học',
    description: 'Cổng thông tin kết nối học sinh Việt Nam...',
    techPills: ['React', 'Node.js', 'PostgreSQL'],
    metric: '1.200+',
    metricLabel: 'Hồ sơ xử lý thành công',
  },
]

export const techPlatforms: string[] = [
  'Unreal Engine 5', 'Unity 6', 'Blender', 'Next.js 15', 'Steam', 'Mobile',
]
```

---

## E. CSS Utilities to Add (globals.css)

```css
.clip-diagonal-bottom {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%);
  padding-bottom: calc(80px + 80px);
  margin-bottom: -80px;
}
.clip-diagonal-top {
  clip-path: polygon(0 80px, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(80px + 80px);
}
.timeline-dot { width: 10px; height: 10px; background: #C4954A; border-radius: 50%; }
.timeline-dot.active { width: 16px; height: 16px; box-shadow: 0 0 12px #C4954A; }
.timeline-dot.dashed { background: transparent; border: 1px dashed #C4954A; }
```

---

## F. Implementation Order (bottom-up)

- [ ] Add CSS utilities → `src/app/globals.css`
- [ ] Update types → `src/types/projects.ts`
- [ ] Update data → `src/data/projects.ts`
- [ ] `ScrollIndicator` → `src/components/projects/ScrollIndicator.tsx`
- [ ] `DevelopmentTimeline` → `src/components/projects/DevelopmentTimeline.tsx`
- [ ] `GameRow` → `src/components/projects/GameRow.tsx`
- [ ] `CommercialCard` → `src/components/projects/CommercialCard.tsx`
- [ ] `TechPlatformStrip` → `src/components/projects/TechPlatformStrip.tsx`
- [ ] `StudioStatsGrid` → `src/components/projects/StudioStatsGrid.tsx`
- [ ] `ProjectsHero` → `src/components/projects/ProjectsHero.tsx`
- [ ] `ProjectsStudioSection` → `src/components/projects/ProjectsStudioSection.tsx`
- [ ] `ProjectsGameUniverse` → `src/components/projects/ProjectsGameUniverse.tsx`
- [ ] `ProjectsCommercial` → `src/components/projects/ProjectsCommercial.tsx`
- [ ] Update `index.ts` → `src/components/projects/index.ts`
- [ ] Update page → `src/app/(app)/projects/page.tsx`

---

## G. Asset Map

| Asset | Role | Section |
|-------|------|---------|
| `/public/trongdong.png` | Watermark + bottom ornamental strip | S1 hero |
| `/public/cultivation.jpg` | Game card image | S3 Row A (Khế Ước) |
| `/public/void_map.png` | Game card image | S3 Row B (SEN CITY) |
| (placeholder) Material Symbol "castle" | Shadow Bastion placeholder | S3 Row C |

---

## H. Key Style Tokens

```
Sections bg: S1=#2D4538, S2=#EDE0C5, S3=#2D4538, S3.5=#1a2a1f, S4=#EDE0C5, S5=#2D4538
Content zone: use `.content-container` class (max-width 1440px, padding 2rem L/R, margin auto) — defined in globals.css and shared across Navbar, ContactSection, and all editorial project sections. Never create a custom content-zone class.
Section side padding: exactly 10px L/R on wrappers
Glass card dark: rgba(45,69,56,0.65) backdrop-blur-[20px] border rgba(196,149,74,0.3)
Neumorphic sculpt: bg #EDE0C5, dual-direction box-shadow
Section label: Inter 12px #C4954A uppercase tracking-[0.15em] font-semibold
H1: EB Garamond 76px #F5EDD8 leading-[1.1] tracking-[-0.03em]
H2: EB Garamond 34px #F5EDD8 or #1E1208 depending on section bg
H3 (game rows): EB Garamond 30px #F5EDD8
Stat number: EB Garamond 52px #9A7030
Metric number: EB Garamond 44px #9A7030
Body: Inter 14px leading-[1.75]
Bronze rule: 2px h, 60px wide, bg-[#C4954A], mx-auto mt-6
Left bronze bar: 4px wide, absolute left-0 top-0 bottom-0, gradient rgba(196,149,74,0.4-0.8)→transparent
Live badge: green dot w-2 h-2 bg-green-500 animate-pulse shadow-glow
Focus ring: outline 2px solid #C4954A offset 2px
Submit button: gradient from-[#C4954A] to-[#9A7030] text-white py-4 rounded-lg font-semibold
```


# Analytics: `not-found` — Coming Soon / 404 Page

**Source design:** `.stitch/designs/not-found/round-02-pc.png` + `round-02-mobile.png`
**Implementation round locked:** Round 2
**Output file:** `src/app/not-found.tsx`

---

## A. Component Hierarchy

```
NotFoundPage (Server Component — src/app/not-found.tsx)
│
├── [Background Layer]  — full-bleed, z-0
│   ├── next/image hero_background.png  (fill, object-cover, priority)
│   ├── Dark overlay div                (gradient top → bottom, rgba dark)
│   └── next/image trongdong.png        (absolute centered, low-opacity watermark)
│
├── [Bokeh Orbs]  — z-10, decorative corner blobs (4 × absolute divs)
│
├── [Glass Panel]  — z-20, centered in viewport
│   ├── next/image logo.png             (height 16 / 64px)
│   ├── Error label                     ("404 · LẠC LỐI")
│   ├── Headline h1                     ("Trang Đang Xây Dựng")
│   ├── Sub-headline p italic           (Vietnamese poetic line)
│   ├── Gold divider div
│   ├── Body copy p
│   ├── CTA Link → /                    ("Quay về Trang Chủ")
│   └── Secondary Link → /projects     ("Xem các dự án đang phát triển →")
│
└── [Footer Strip]  — z-20, anchored bottom
    └── Copyright p
```

**Single-file decision:** All static markup, no client state. Fits under 300 lines as one Server Component.

**Root layout note:** `layout.tsx` wraps all pages with `<Navbar />` and `<Footer />`. The not-found wrapper uses `h-screen overflow-hidden` to clip the root Footer. The glassmorphic fixed Navbar floats over the dark background naturally.

---

## B. Props & State

No props, no state, no `'use client'`. Pure Server Component.

---

## C. Data Shape

No interfaces needed — all static copy.

---

## D. Implementation Order

- [x] Add `glass-panel-dark` + `hero-dark-overlay` utilities to `src/app/globals.css`
- [x] Implement `src/app/not-found.tsx`

---

## E. Asset Map

| Asset | Role | Usage |
|-------|------|-------|
| `/public/hero_background.png` | Full-bleed background | `next/image` fill + dark overlay |
| `/public/trongdong.png` | Watermark behind panel | `next/image` absolute, opacity-15 |
| `/public/logo.png` | Logo inside panel | `next/image` h-16 |

---

## F. CSS Tokens to Add

```css
.glass-panel-dark {
  background: rgba(8, 4, 2, 0.58);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(196, 149, 74, 0.40);
  box-shadow: inset 0 1px 0 rgba(196, 149, 74, 0.18);
}
.hero-dark-overlay {
  background: linear-gradient(to bottom, rgba(8,4,2,0.80) 0%, rgba(4,2,1,0.90) 100%);
}
```

---

---

# Blogs Page — Implementation Analytics
**Source:** `.stitch/designs/blogs/round-8-pc.html` + `round-8-mobile.html`
**Status:** Approved R8 — ready for Phase 4

---

## A. Component Hierarchy Tree

```
BlogPage (Server Component)
└── <main>
    ├── [constrained wrapper max-w-7xl px-2.5 py-7]
    │   ├── BlogCarousel ('use client') — Section 1
    │   │   └── [slides rendered internally from IBlogPost[]]
    │   ├── BlogSwiper (Server Component) — Section 2
    │   │   └── BlogCard × 6 (variant="compact")
    │   └── BlogGridSection ('use client') — Section 3
    │       ├── [filter pills + search input inline]
    │       └── BlogCard × N (variant="full")
    └── ContactSection (existing global component) — Section 4 (full-bleed)
```

## B. Props & State Mapping

### `BlogCard`
- Props: `{ post: IBlogPost; variant?: 'compact' | 'full' }`
- No local state — Server Component

### `BlogCarousel`
- Props: `{ slides: IBlogPost[] }`
- State: `activeIndex: number` (useState)
- Handlers: `handlePrev`, `handleNext`, dot nav
- 'use client'

### `BlogSwiper`
- Props: `{ posts: IBlogPost[] }`
- No state — CSS overflow-x scroll — Server Component

### `BlogGridSection`
- Props: `{ posts: IBlogPost[]; filters: string[] }`
- State: `activeFilter: string`, `searchQuery: string`, `visibleCount: number`
- 'use client'

## C. TypeScript Interfaces

```ts
export interface IBlogPost {
  id: string; title: string; excerpt?: string; category: string;
  author?: string; date: string; readTime?: string;
  imageSrc: string; imageAlt: string;
}
```

## D. Data Shape

```ts
export const BLOG_FILTERS: string[]
export const mockCarouselSlides: IBlogPost[]   // 3 items
export const mockRecentPosts: IBlogPost[]       // 6 items
export const mockGridPosts: IBlogPost[]         // 8 items
```

## E. Build Order (bottom-up)

- [ ] `src/types/blogs.ts`
- [ ] `src/data/blogs.ts`
- [ ] `src/app/globals.css` — scrollbar-hide + blog-swiper-card utilities
- [ ] `src/components/blog/BlogCard.tsx`
- [ ] `src/components/blog/BlogCarousel.tsx`
- [ ] `src/components/blog/BlogSwiper.tsx`
- [ ] `src/components/blog/BlogGridSection.tsx`
- [ ] `src/components/blog/index.ts`
- [ ] `src/app/(app)/blog/layout.tsx`
- [ ] `src/app/(app)/blog/page.tsx`

## F. Spacing Reference

| HTML value       | Tailwind class     |
|-----------------|---------------------|
| `px-[10px]`     | `px-2.5`            |
| `gap-[14px]`    | `gap-3.5`           |
| `py-[28px]`     | `py-7`              |
| `h-[160px]`     | `h-40`              |
| `text-[11px]`   | `text-2xs`          |
| `text-[13px]`   | `text-tiny`         |
| `text-[27px]`   | `text-heading-sm`   |

## G. Completed Components

_(mark each as implemented below)_

---

## A. Component Hierarchy

```
src/app/page.tsx (HomePage — Server Component)
└── <main>
    ├── <HeroSection />             src/components/global/HeroSection.tsx
    ├── <VisionSection />           src/components/home/VisionSection.tsx
    ├── <StatSeparator />           src/components/home/StatSeparator.tsx
    ├── <ProjectsSection />         src/components/home/ProjectsSection.tsx
    │   └── <ProjectCard /> ×3      src/components/home/ProjectCard.tsx
    ├── <RoadmapSection />          src/components/home/RoadmapSection.tsx
    │   └── <MilestoneNode /> ×4   (inline sub-component)
    └── <ContactSection />          src/components/global/ContactSection.tsx
        ├── <ContactForm />         src/components/global/ContactForm.tsx
        └── <ContactInfo />         src/components/global/ContactInfo.tsx

src/app/layout.tsx (Root Layout)
├── <Navbar />                      src/components/global/Navbar.tsx
└── <Footer />                      src/components/global/Footer.tsx
```

---

## B. Existing Implementation Status

All home-page components are already implemented. This section diffs R7 design against current code and identifies targeted updates only.

### Already correct — no change needed

| Component | Why |
|---|---|
| `StatSeparator` | Thin 64px bar, 4 text-only cols, bg-surface-dark, divide-x — matches R7 exactly |
| `ContactSection` | 55/45 flex-row layout, form left + info right — matches R7 |
| `ContactForm` | All 5 fields, heading "Gửi đề xuất hợp tác", submit "Gửi lời mời hợp tác", phone validation |
| `ContactInfo` | H2 "Cùng Lạc Minh / Kiến Tạo Tương Lai", 3 contact rows, icon boxes |
| `Footer` | bg-deep-moss, 4-col grid, copyright text correct |
| `AppButton` | primary + outline variants, border-text-light on outline — matches R7 |

### Needs targeted update

#### 1. HeroSection — Add vertical decorative text (desktop only)
R7 shows a vertical "Huyền Sử Lạc Hồng" label on the left edge, hidden xl:flex, opacity-40.
Current code: Missing this element.
Change: Add vertical text decoration inside the section z-layer.

#### 2. VisionSection — Trongdong slow-spin animation
R7 shows: animate-[spin_60s_linear_infinite] on the trongdong Image.
Current code: No animation, static image.
Change: Add the slow spin animation class.

#### 3. ProjectCard — Featured overlay is hover-only
R7 shows: opacity-0 group-hover:opacity-100 transition-opacity on the featured overlay.
Current code: Featured overlay is always visible (permanent dark overlay + "XEM DỰ ÁN" button).
Change: Make the featured overlay appear only on hover.

#### 4. data/home.ts — Add "Dự Án" to nav links + update milestone titles
R7 nav: Tầm Nhìn | Dự Án | Lộ Trình | Tuyển dụng | Blog | Liên Hệ
Current: 5 links missing "Dự Án" → #projects
R7 milestones: "Khởi tạo Core Engine" / "Phát hành Alpha Test" / "Hợp tác Quốc tế" / "Grand Launching"
Current: "Nền tảng" / "Phát triển" / "Thử nghiệm" / "Khởi chạy"
Change: Update NAV_LINKS and MILESTONES arrays.

---

## C. Props & State Mapping

### HeroSection (existing — no state changes needed)
Props: title (ReactNode), subtitle (string), primaryCTA (HeroCTA), secondaryCTA (HeroCTA), scrollLabel (optional string), stats (HeroStat[])
State: none
Event handlers: none (links handled by AppButton href)

### VisionSection (no props — self-contained static data)
State: none

### ProjectCard
Props: project (IProject — required)
State: none
Behavior: featured drives lift/border style + hover-only overlay

### RoadmapSection (no props — reads MILESTONES from data)
State: none (animate-ping on active node is CSS-only)

---

## D. Data Shape (no new types needed)

All interfaces already exist in src/types/home.ts:
- INavLink — { label, href, active? }
- IStatItem — { value, label }
- IProject — { id, title, description, year, platform, imageSrc, imageAlt, featured? }
- IMilestone — { id, year, title, state: 'completed' | 'active' | 'future' }
- IFooterSection — { heading, links: { label, href }[] }

---

## E. Data Updates (src/data/home.ts)

NAV_LINKS update — add "Dự Án" as second item:
  { label: 'Tầm Nhìn', href: '/' }
  { label: 'Dự Án', href: '#projects' }   ← ADD
  { label: 'Lộ Trình', href: '#roadmap' }
  { label: 'Tuyển dụng', href: '/careers' }
  { label: 'Blog', href: '#blog' }
  { label: 'Liên Hệ', href: '#contact' }

MILESTONES update — update titles:
  { id: '2026-q1', year: '2026 Q1', title: 'Khởi tạo Core Engine', state: 'completed' }
  { id: '2026-q2', year: '2026 Q2', title: 'Phát hành Alpha Test', state: 'active' }
  { id: '2026-q3', year: '2026 Q3', title: 'Hợp tác Quốc tế', state: 'future' }
  { id: '2026-q4', year: '2026 Q4', title: 'Grand Launching', state: 'future' }

---

## F. Implementation Order (bottom-up, targeted diffs only)

1. src/data/home.ts — NAV_LINKS + MILESTONES data updates
2. src/components/home/VisionSection.tsx — add trongdong slow-spin
3. src/components/home/ProjectCard.tsx — featured overlay hover-only
4. src/components/global/HeroSection.tsx — add vertical decorative text (xl only)

---

## G. Build Checklist

- [ ] data/home.ts — NAV_LINKS updated (add "Dự Án") — src/data/home.ts
- [ ] data/home.ts — MILESTONES titles updated — src/data/home.ts
- [ ] VisionSection.tsx — trongdong animate-[spin_60s_linear_infinite] — src/components/home/VisionSection.tsx
- [ ] ProjectCard.tsx — featured overlay hover-only (opacity-0 group-hover:opacity-100) — src/components/home/ProjectCard.tsx
- [ ] HeroSection.tsx — vertical decorative text hidden xl:flex — src/components/global/HeroSection.tsx
