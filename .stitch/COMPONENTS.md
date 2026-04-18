# Lạc Minh Studio — Component Reference for Stitch

Source of truth: actual implemented code in `src/`. Use this file to align Stitch designs with the real codebase.

---

## Page Structure — Home (`src/app/page.tsx`)

```
<main>
  <HeroSection />        ← full-screen, bg: hero_background.png overlay
  <VisionSection />      ← bg-background (#EDE0C5)
  <StatSeparator />      ← THIN dark bar, NOT a section
  <ProjectsSection />    ← bg-surface (#D8CAAF)
  <RoadmapSection />     ← bg-background (#EDE0C5)
  <ContactSection />     ← bg-surface-dark (#2D4538)
  <Footer />             ← bg-deep-moss (#1E3028)
</main>
```

---

## Layout Token

```css
.content-container {
  max-width: 1440px;  /* NOT 1280px — important correction for Stitch prompts */
  padding-left: 2rem;
  padding-right: 2rem;
}
```

---

## CSS Utility Classes (from globals.css)

| Class | Recipe |
|---|---|
| `.glass-navbar` | rgba(237,224,197,0.85) backdrop-blur-12px, border-bottom bronze/25 |
| `.glass-card` | rgba(237,224,197,0.45) backdrop-blur-16px, border bronze/30 |
| `.glass-stat-strip` | rgba(30,18,8,0.45) backdrop-blur-16px, border bronze/40 |
| `.glass-form` | rgba(45,69,56,0.6) backdrop-blur-16px, border bronze/30 |
| `.hero-overlay` | radial-gradient from rgba(30,18,8,0.1) → rgba(45,69,56,0.7) |
| `.timeline-dashed` | dashed bronze/40 horizontal line, 15px dash pattern |
| `.value-pill` | rgba(216,202,175,0.4) backdrop-blur-8px border bronze/30 |

---

## Component Specs

### `AppButton` (`src/components/hero-ui/AppButton.tsx`)

Two variants only:
- `primary` → `bg-primary (#C4954A)` + `text-text-light (#F5EDD8)` + neumorphic shadow
- `outline` → `border-2 border-text-light (#F5EDD8)` + transparent + `backdrop-blur-sm` + `hover:bg-white/10`

> ⚠️ **STITCH CORRECTION**: The secondary / outline CTA uses `border-text-light` (#F5EDD8 off-white), NOT bronze outline. Hero secondary CTA has a white/cream border, not a bronze border.

---

### `Navbar` (`src/components/global/Navbar.tsx`)

- Fixed top, full-width, `.glass-navbar`, height: `h-16 lg:h-20`
- Logo: `/logo.png` (h-8 mobile / h-10 desktop) + "Lạc Minh Studio" EB Garamond text
- Desktop nav links (5 items): `Tầm Nhìn | Lộ Trình | Tuyển dụng | Blog | Liên Hệ`
- Active link style: `text-primary font-bold border-b-2 border-primary pb-1`
- CTA button: `AppButton` (primary) — label **"Kêu gọi đầu tư"** (hidden on mobile)
- Mobile: hamburger `<Menu>` / `<X>` icon (lucide), animated dropdown drawer
- Mobile drawer: links stacked, CTA button full-width at bottom

---

### `HeroSection` (`src/components/global/HeroSection.tsx`)

- `h-screen` full viewport height, `pt-20` (navbar offset)
- Background: `/hero_background.png` fill cover + `.hero-overlay` gradient
- **H1**: "Huyền Sử Lạc Hồng, / Tái Sinh Trong Game" — EB Garamond, `text-hero` (68px desktop)
- **Subtitle**: Inter 15–17px, `text-text-light/90`, max-w-2xl centered
- **Primary CTA**: "Khám phá dự án" → `#projects` — `AppButton` (primary)
- **Secondary CTA**: "Xem lộ trình" → `#roadmap` — `AppButton` (outline, cream border)
- Scroll indicator: "Cuộn xuống" + `<ChevronDown>` animate-bounce
- **Stat strip**: `glass-stat-strip` absolute bottom, 4 stats in grid
  - Stat values: `5+` / `3` / `12` / `18` — text-primary EB Garamond bold
  - Stat labels: "Năm kinh nghiệm" / "Dự án lớn" / "Đối tác" / "Thành viên"
  - Separated by `border-r border-primary/30`
  - Strip padding: `p-4 sm:p-8`

---

### `VisionSection` (`src/components/home/VisionSection.tsx`)

- `bg-background` (#EDE0C5), `py-20 md:py-32 lg:py-40`
- 2-col grid (`md:grid-cols-2`), gap-8 to gap-24
- **Left**: `/trongdong.png` inside `.glass-card` + `rounded-3xl` + blurred circular glow behind
- **Right col**:
  - Eyebrow: "SỨ MỆNH CỦA CHÚNG TÔI" — primary, uppercase, tracking-[0.2em]
  - Bronze divider line: `w-20 h-px bg-primary`
  - H2: "Từ Đất Thiêng Lạc Hồng, / Vươn Tầm Thế Giới" — EB Garamond 2xl–4xl
  - Block quote (italic, `border-l-4 border-primary/40 pl-6`): "Lạc Minh Studio không chỉ làm game..."
  - Body paragraph
  - 3 `<Chip variant="soft">` tags: `'🏛 4000+ năm huyền sử Việt Nam'` / `'⚔ Fantasy RPG & Interactive Story'` / `'🇻🇳 Proudly Made in Vietnam'` — class `.value-pill`

---

### `StatSeparator` (`src/components/home/StatSeparator.tsx`)

> ⚠️ **STITCH CORRECTION**: This is a THIN decorative bar, NOT a full section.

- Height: `h-12 sm:h-16` (**48px / 64px** only — very short)
- `bg-surface-dark` (#2D4538)
- 4-col grid, `divide-x divide-white/10`
- Text only, no icons, no values/labels pair — single value per column:
  - `Thành lập 2024` | `3 tựa game` | `18 nhân sự` | `Seed Round 2026`
- Style: `text-2xs sm:text-xs font-bold tracking-wider uppercase opacity-80 text-text-light`

---

### `ProjectCard` (`src/components/home/ProjectCard.tsx`)

- `.glass-card rounded-2xl overflow-hidden`
- **Image**: `h-50` (200px / 12.5rem), `object-cover`
- **Featured card** (`featured: true`): always `-translate-y-3 shadow-2xl`, image has dark overlay + "XEM DỰ ÁN" `AppButton`
- **Non-featured cards**: on hover `hover:-translate-y-3`. Year badge (dark/60 glass) + Platform badge (primary/accent)
- Body: `p-8`, H3 EB Garamond text-xl text-text-dark, description text-sm text-text-secondary
- Footer: `px-8 pb-8`, `"TÌM HIỂU THÊM"` link with `<ArrowRight>` icon, text-primary

Projects data:
1. **Lĩnh Nam Truyền Kỳ** — `/cultivation.jpg` — 2025 — PC / Console
2. **Huyền Sử Ký** ⭐ featured — `/interactive_story.png` — 2026 — Web / Mobile
3. **Cõi Hư Vô** — `/void_map.png` — 2027 — Metaverse

---

### `ProjectsSection` (`src/components/home/ProjectsSection.tsx`)

- `bg-surface` (#D8CAAF), `py-12 md:py-20 lg:py-32`
- H2: "Các Dự Án Tâm Huyết" + bronze underline `w-32 h-1`
- 3-col grid (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3`)
- **Wide dark banner CTA** below grid: `bg-surface-dark rounded-2xl/3xl p-6/10 border border-primary/30`
  - Left: H4 "Khám phá toàn bộ vũ trụ Lạc Minh" + subtitle
  - Right: `AppButton` "Xem tất cả dự án" + `<MoveRight>` icon

---

### `RoadmapSection` (`src/components/home/RoadmapSection.tsx`)

- `bg-background` (#EDE0C5), `py-20 md:py-32 lg:py-40`
- **Header row**: H2 "Lộ Trình Phát Triển" left + pre-order badge right
  - Pre-order badge: `.hidden lg:block` (desktop only), white/40 glass card, `<Users>` icon
  - Badge content: "🎯 100+ người đặt trước beta" + "Cập nhật 24h qua"
- **Timeline**: horizontal dashed `.timeline-dashed` line (`hidden lg:block`) at `top-5.5`
- **4 milestone nodes** `grid-cols-2 lg:grid-cols-4`:
  - `2026 Q1 — Nền tảng` → `completed` (filled bronze circle + `<Check>` icon, border-t-4 primary)
  - `2026 Q2 — Phát triển` → `active` (filled bronze + `<Rocket>` + animate-ping pulse ring + bg-background/60)
  - `2026 Q3 — Thử nghiệm` → `future` (outline ring + `<Clock>` icon, opacity-50 grayscale)
  - `2026 Q4 — Khởi chạy` → `future` (same as above)

Node states:
- `completed`: `bg-primary shadow-bronze-glow`, `<Check>` white, card `border-t-4 border-primary`
- `active`: `bg-primary shadow-2xl`, `<Rocket>` white, `animate-ping` ring + `animate-pulse` status text
- `future`: `border-2 border-primary/40 bg-transparent`, `<Clock>` primary/40, card `opacity-50 grayscale-[0.5]`

---

### `ContactSection` (`src/components/global/ContactSection.tsx`)

- `bg-surface-dark` (#2D4538), `py-20 md:py-32 lg:py-40`
- Layout: `flex flex-col lg:flex-row gap-8 lg:gap-20`
- **Left (55%)**: `<ContactForm />`
- **Right (45%)**: `<ContactInfo />`

#### `ContactForm`

- Container: `.glass-form p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-neu-dark border-white/10`
- Form title: **"Gửi đề xuất hợp tác"** — `text-heading-sm` (28px) EB Garamond `text-text-light`
- Fields:
  1. **Họ và tên** — text input, placeholder "Nguyễn Văn A"
  2. **Email** — email input (left col)
  3. **Số điện thoại** — tel input (right col), validation: `/^[+\d\s()-]{8,20}$/`, error "Số điện thoại không hợp lệ" (red-400)
  4. **Lĩnh vực đầu tư** — Select dropdown: `Venture Capital` | `Private Angel` | `Strategic Partner`
  5. **Ghi chú** — textarea rows=3
- Input style: `bg-white/5 border border-primary/40 rounded-lg text-text-light h-11 px-4 focus:ring-2 focus:ring-primary`
- Submit CTA: `AppButton` full-width `h-14`, label **"Gửi lời mời hợp tác"** (NOT "Gửi ngay")

> ⚠️ **STITCH CORRECTION**: Form heading is "Gửi đề xuất hợp tác", NOT "Cùng Lạc Minh..." (that's ContactInfo). Submit label is "Gửi lời mời hợp tác".

#### `ContactInfo`

- H2: **"Cùng Lạc Minh / Kiến Tạo Tương Lai"** — `text-heading-md` (34px) EB Garamond `text-text-light`
- Body paragraph: text-text-light/70
- 3 contact items with icon+label+value:
  - `<Mail>` — "Email liên hệ" — from env
  - `<Phone>` — "Điện thoại" — from env
  - `<MapPin>` — "Trụ sở" — from env
- Icon containers: `w-14 h-14 rounded-2xl bg-white/5 border border-primary/30 hover:bg-primary/20`

---

### `Footer` (`src/components/global/Footer.tsx`)

- `bg-deep-moss` (#1E3028), `pt-12`
- Grid: `grid-cols-2 md:grid-cols-4`
- **Col 1 (span-2 md:span-1)**: "Lạc Minh Studio" italic EB Garamond + description text-text-light/50
- **Col 2**: "Liên kết" — Về chúng tôi / Dự án mới / Tuyển dụng / Blog tin tức
- **Col 3**: "Pháp lý" — Điều khoản sử dụng / Chính sách bảo mật
- **Col 4 (Social "Theo dõi")**: 3 icons `<Globe>` / `<Video>` / `<Share2>`, `w-10 h-10 rounded-lg border border-primary/20 bg-white/5 hover:bg-primary`
- Section headings: `text-primary font-bold text-2xs uppercase tracking-[0.2em]`
- Link style: `text-text-light/80 hover:text-primary text-tiny transition-colors`
- Copyright bar: `border-t border-white/5`, "© 2026 Lạc Minh Studio đồng hành cùng Thuan Diep Corp." — `text-xs text-text-muted`

---

## Key Corrections for Stitch Prompts

| What Stitch shows | What code actually does |
|---|---|
| Secondary hero CTA: bronze outline | Actual: `border-2 border-text-light` (#F5EDD8 cream) |
| Stat bar = large prominent section | Actual: `h-12/h-16` thin bar, text-only, no icons |
| Form submit = "Gửi ngay" | Actual: **"Gửi lời mời hợp tác"** |
| ContactInfo heading shown inside form | Actual: separate right-column component |
| content-container max-width 1280px | Actual: **1440px** max-width |
| Project link "Xem chi tiết →" | Actual: **"TÌM HIỂU THÊM"** with ArrowRight icon |
