---
screen: careers
round: 7
mode: edit
base-screen-id: 6f877dfc3a35401396e3b673da399165
status: approved
---
ROUND 2 FOCUS: Visual Identity

BASE VERSION (REQUIRED):
- Previous round: 1
- Screen id: eaa5b32ef82045deaa8b6c8f1ec3d50f
- Instruction: update from previous version only; do not regenerate from scratch
- Preserve the current palette, typography, materials, section order, and overall layout hierarchy from the previous version
- Treat unchanged areas as locked

DESIGN SNAPSHOT (COMPACT):
- Keep the existing Lạc Minh visual system from the previous version
- Style: Glassmorphism + Neumorphism hybrid design
- Depth recipe: dual-direction neumorphic shadows (box-shadow: 8px 8px 20px #C8B892, -8px -8px 20px #FFFFFF90)
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Stitch canvas: 1280px max desktop frame; content column 960-1060px centered
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content

ASSETS IN THIS ROUND (LOCKED):
- /public/logo.png — navbar brand mark
- /publichero_background.png — hero background (locked, do not replace)
- /publictrongdong.png — studio vision right column (locked media slot if not renderable)
- /public/lac-minh/lotus-pond.png — contact section ambient underlay (locked)
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 — Navbar: structure correct from R1; apply exact glassmorphic spec rgba(237,224,197,0.75) + backdrop-blur 16px + bronze ghost border-bottom; ensure "Tuyển dụng" active link has #C4954A underline slide-in, matching home
- Section 2 — Hero: headline and CTA exist; enforce EB Garamond 80px #F5EDD8 headline, Inter 18px subline, stat strip numbers EB Garamond 44px #C4954A on dark glass strip, CTA buttons with neumorphic shadow treatment
- Section 3 — Studio Vision: 2-col layout present; enforce warm cream #EDE0C5 neumorphic section BG with dual-direction shadow on container; trongdong.png right column must show neumorphic pedestal + bronze ambient glow; glassmorphic value pillars must have rgba(237,224,197,0.45) fill + bronze ghost border
- Section 4 — Job Listings: 5 cards present; enforce #D8CAAF section BG; each card glassmorphic rgba(237,224,197,0.45), bronze ghost border 1.5px, radius 16px; "INTERN" badge bronze bg cream text; skill tags as small pills; section H2 EB Garamond 48px #1E1208
- Section 5 — Contact: dark #2D4538 section; enforce form card rgba(45,69,56,0.6) with gold ghost border; inputs 52px height glassmorphic style; submit button bronze neumorphic shadow; right info column ghost cards
- Section 6 — Footer: deep moss footer; correct logo + nav + social + copyright layout

THIS ROUND'S CHANGES ONLY:
- Apply all DESIGN.md brand color tokens precisely across all sections
- Enforce EB Garamond heading scale (80px hero / 48px H2) and Inter body scale (18px body / 13px label uppercase)
- Apply neumorphic sculpt shadows to all large section containers (hero, vision, job listing)
- Apply glassmorphic recipe (translucent fill + backdrop blur + bronze ghost border) to all cards and panels
- Bronze accent #C4954A must appear on: stat strip numbers, CTA buttons, active nav link, section labels, card borders on hover
- Muted Gold #B08030 for hover borders and decorative elements
- No flat surfaces — every card, panel, and section container must visually express depth

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first
- Style: Glassmorphism + Neumorphism hybrid design
- Large sections: Neumorphism — warm cream (#EDE0C5) soft sculpted surfaces with dual-direction shadows
- Supporting surfaces: Glassmorphism — frosted cream glass rgba(237,224,197,0.45), backdrop-blur 16px, bronze ghost border rgba(196,149,74,0.3)
- Depth recipe: dual-direction neumorphic shadows (box-shadow: 8px 8px 20px #C8B892, -8px -8px 20px #FFFFFF90)
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden — every surface must show neumorphic sculpt or glass layer
- Background: Warm Cream (#EDE0C5)
- Surface: Parchment Gray (#D8CAAF)
- Surface Dark: Deep Moss Green (#2D4538) — hero overlay, footer, CTA sections
- Primary Accent: Warm Bronze (#C4954A) — buttons, stat numbers, active states
- Secondary Accent: Muted Gold (#B08030) — hover, borders
- Text Primary: Rich Dark Brown (#1E1208) on light sections
- Text Light: Off-white Cream (#F5EDD8) on dark sections
- Text Secondary: Medium Warm Brown (#5A4228)
- Heading Font: EB Garamond — Display 72-96px / H2 44-52px / H3 28-36px
- Body Font: Inter — 16-18px body / 13-14px label uppercase
- Radius: 16px cards / 10px inputs / 8px buttons
- Responsive tiers: pc 1920-1600, laptop 1600-1200, tablet 1200-900, mini-tablet 900-700, mobile <700
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /publichero_background.png — Hero section full-bleed background: moonlit floating Vietnamese palace with cranes and karstic peaks; add dark overlay (#2D4538 at 55%) for text legibility
- /publictrongdong.png — Studio vision section: ancient Đông Sơn bronze drum — place as 420px decorative visual in right column of split layout
- /public/logo.png — Navbar brand logo, left-aligned, max-height 40px
- /public/lac-minh/lotus-pond.png — Contact section: ambient underlay for form section bg, soft dark overlay to maintain text contrast
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SCREEN STRUCTURE:

1. NAVBAR (glassmorphic fixed top)
   - bg: rgba(237,224,197,0.75), backdrop-blur 16px, bronze ghost border-bottom
   - Left: logo.png; Center: nav links (Trang chủ / Dự án / Tuyển dụng / Liên hệ); Right: CTA button "Liên hệ ngay" bronze
   - Active link: "Tuyển dụng" underlined in #C4954A
   - Consistent with home screen navbar

2. HERO SECTION (full-bleed, min-height 90vh)
   - Background: hero_background.png full-cover with Deep Moss Green overlay (#2D4538, 55% opacity)
   - Centered content column, max-width 760px
   - Eyebrow label: Inter 13px uppercase, letter-spacing 0.12em, #C4954A — "TUYỂN DỤNG · LẠC MINH STUDIO"
   - Display headline: EB Garamond 80px, #F5EDD8 — "Gia Nhập Huyền Sử"
   - Subheadline: Inter 18px, #F5EDD8/80% — "Chúng tôi đang tìm kiếm những tài năng trẻ cùng xây dựng thế giới game fantasy Việt Nam đầu tiên."
   - Primary CTA: bronze bg #C4954A, cream text, "Xem vị trí tuyển dụng ↓" — neumorphic shadow
   - Secondary CTA: ghost outline button, "Tìm hiểu về chúng tôi"
   - Stat strip below CTAs: 3 stats horizontal — "3 Năm hoạt động / 5 Dự án / 12 Thành viên" — EB Garamond 44px bronze number + Inter 13px cream label
   - Scroll indicator: subtle animated chevron at bottom center

3. STUDIO VISION / GIỚI THIỆU (neumorphic section, bg #EDE0C5)
   - Section label: "TẦM NHÌN" — Inter 13px uppercase, #C4954A, letter-spacing 0.12em
   - H2: EB Garamond 48px, #1E1208 — "Chúng Tôi Là Ai"
   - Two-column split (60/40): left column = text + value pillars, right column = trongdong.png
   - Left column:
     - Intro paragraph (Inter 18px, #5A4228): studio intro copy about 4000 năm huyền sử Việt Nam
     - 3 value pillars in vertical stack, each as glassmorphic mini-card (rgba(237,224,197,0.45) bg, bronze ghost border, radius 14px, padding 20px):
       a) "Sáng tạo không ngừng" — icon + title + 1-line description
       b) "Tiên phong Việt hóa" — icon + title + 1-line description
       c) "Bền bỉ vì đam mê" — icon + title + 1-line description
   - Right column: trongdong.png 420px wide, neumorphic pedestal frame beneath, warm bronze light glow

4. JOB LISTINGS — "VỊ TRÍ ĐANG TUYỂN DỤNG" (neumorphic section, bg #D8CAAF)
   - Section label: "TUYỂN DỤNG" — Inter 13px uppercase, #C4954A
   - H2: EB Garamond 48px, #1E1208 — "Cùng Chúng Tôi Xây Dựng Thế Giới"
   - Subtext: Inter 16px, #5A4228 — "Tất cả vị trí dành cho Intern — môi trường học hỏi, sáng tạo, và phát triển bền vững"
   - Job card grid: 3 columns top row + 2 columns centered bottom row, gap 24px
   - 5 Job cards (glassmorphic: rgba(237,224,197,0.45) bg, bronze ghost border 1.5px, radius 16px, padding 28px):
     a) "Frontend Developer" — Intern — Web tag — skills: React, Tailwind
     b) "Backend Developer" — Intern — Web tag — skills: Node.js, API
     c) "Game Designer" — Intern — Game tag — skills: Unity, Game Design
     d) "Game Artist" — Intern — Game tag — skills: Blender, Illustrator
     e) "Business Analyst" — Intern — Web tag — skills: Agile, Excel
   - Each card: department pill (top-right), position icon, "INTERN" level badge, EB Garamond 26px title, Inter 15px description (2–3 lines), skill tags row, CTA "Xem chi tiết →" in #C4954A
   - Hover: card lifts with shadow expansion, border brightens to full #C4954A

5. CONTACT / FORM SECTION (dark accent, bg #2D4538)
   - Background: #2D4538 with lotus-pond.png as ambient underlay (20% opacity), decorative gold glow rgba(196,149,74,0.15)
   - Section label: "LIÊN HỆ" — Inter 13px uppercase, #C4954A
   - H2: EB Garamond 48px, #F5EDD8 — "Bạn Quan Tâm? Hãy Nói Chuyện"
   - Subtext: "Điền thông tin bên dưới — chúng tôi sẽ liên lạc để trao đổi về cơ hội phù hợp với bạn."
   - Two-column layout: left = contact form card (glassmorphic rgba(45,69,56,0.6), gold border), right = studio contact info ghost cards
   - Form fields: Họ tên / Email / Số điện thoại / Vị trí quan tâm (dropdown) / Lời nhắn (textarea min-height 140px)
   - Submit button: primary bronze CTA "Gửi thông tin"

6. FOOTER (dark, bg #2D4538)
   - Consistent with home screen footer
   - Logo + tagline / nav columns / social icons / copyright line

THIS ROUND'S CHANGES ONLY:
- Hero: add disabled/inactive state appearance to secondary CTA "Xem lộ trình" button
- Projects: for at least one card, show an empty/placeholder state (image slot with tasteful "Sắp Ra Mắt" overlay)
- Roadmap: make the 2027 milestone node clearly show a future/locked state (faded bronze ring, no fill, dashed connector)
- Contact: one form field (e.g. Email) shows a validation error state with bronze-red border and micro-error label beneath
- All sections: ensure no element visually overflows beyond 960px content column