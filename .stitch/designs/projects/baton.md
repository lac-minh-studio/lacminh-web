---
screen: projects
round: 7
mode: approved
base-pc-id: b18b9af40058491b90e47a4e3be43f73
base-mobile-id: 23e87831f27249db943f6a33dffebcc1
status: approved
implementation-round: 7
---

ROUND 5 COMPLETED — Results:
- PC screen ID: 9f0740a979044397a5f618ded03b2357 (projects-r05-desktop)
- Mobile screen ID: f22bdbb78c2541eb84b6ee9a470e0e99 (projects-r05-mobile)
- Artifacts: round-5-pc.png (83KB), round-5-mobile.png (30KB)
- Bento layout redesigned: 70% LEFT (Sen-City top + 2 web cards bottom) / 30% RIGHT (Khế ước full-height portrait)
- Mobile card order updated: Sen-City → Khế ước (tallest) → E-Commerce → Du Học → Coming Soon strip
- Coming Soon moved to full-width strip below bento
- Contact section email validation error state added

ROUND 6 FOCUS: Polish & Accessibility
- WCAG AA contrast check on all text over images and glassmorphic panels
- Focus rings: ensure all interactive elements (pills, cards, inputs, buttons, links) have visible :focus-visible rings in #C4954A
- Icon clarity: confirm all icon sizes ≥ 20px, sufficient stroke weight
- Spacing consistency: equal padding rhythm across all sections
- Typography audit: H1/H2/H3/Body scale consistent, no orphaned words in headings
- Badge/chip legibility: ensure all small chips (13-14px) have sufficient contrast
- Hover state visibility: confirm all interactive elements have visible state change
- PC outer padding hard check: all section wrappers exactly 10px sides, no creep
- Canonical titles: projects-r06-desktop / projects-r06-mobile

ROUND 4 COMPLETED — Results:
- PC screen ID: 8714e7b8dfc24f6b89ce342d91537d70 (projects-r04-desktop)
- Mobile screen ID: b02873a9b0ff4b9d8cd407e8470f00c0 (projects-r04-mobile)
- Artifacts: round-4-pc.png (92KB), round-4-mobile.png (28KB)
- Mock data filled: tech chips, outcomes, years, team sizes
- Floating heritage motifs added: Chim Lạc, Đông Sơn ring, gold winding line, spear ornament
- Contact Section added (glassmorphic form left 55% + info right 45%, dark #2D4538)

ROUND 5 FOCUS: Edge Cases & Density
- Empty state for Coming Soon card — ensure it doesn't look broken or unfinished
- Filter bar: show what happens when "V-Fantasy Game" tab is active — other cards should appear at 30% opacity/muted
- Contact form: show a validation error state on at least one field (e.g. red border on empty required field)
- Loading state teaser on Sen-City "Đang phát triển" card
- Ensure contact section on mobile has proper scroll/overflow behavior — no content clipping
- Check all sections for orphaned text, overflow, or missing separators
- Canonical titles: projects-r05-desktop / projects-r05-mobile

ROUND 3 COMPLETED — Results:
- PC screen ID: cc88061f36fe406f925395be89f48f55 (projects-r03-desktop)
- Mobile screen ID: 8f5f1437736d4fe09d17d94330d83669 (projects-r03-mobile)
- Artifacts: round-3-pc.png (134KB), round-3-mobile.png (42KB)
- Gemini improvements integrated: God-rays hero, true asymmetric bento (portrait Khế ước 480px), full-bleed card style + glassmorphic bottom panels, Đông Sơn ornamental divider, brocade CTA texture, filter pill states defined, nón lá corner ornament on Khế ước card

ROUND 4 FOCUS: Data & Content + Decorative Motifs + Contact Section
- Fill all cards with realistic mock data — no placeholders
- E-commerce card: show actual tech stack chips (Next.js, WooCommerce, i18n), year "2024", project duration
- Du Học card: show UX metrics or key outcomes, year "2024"
- Sen-City card: show game genre badges, current status "In Development", team size
- Khế ước card: show concept art detail, game engine hint, team
- Ensure Vietnamese copy is final — no Lorem Ipsum anywhere
- ADD floating decorative ornaments (chim Lạc silhouette, Đông Sơn circles, gold line accents) as background layer elements — they float independently between sections, not overlapping card content
- ADD Contact Section before Footer: dark #2D4538, two-column (Form left 55% + Info right 45%), identical to home page — heading "Gửi đề xuất hợp tác", fields: Họ tên / Email / SĐT / Lĩnh vực / Lời nhắn, CTA button bronze
- Section order: Navbar → Mini-Hero → Filter → Bento Grid → Ornamental Divider → CTA strip → Contact Section → Footer
- Canonical titles: projects-r04-desktop / projects-r04-mobile

ROUND 2 COMPLETED — Results:
- PC screen ID: 3e2bf1cf3388418981cf5a467e4cfc44 (projects-r02-desktop)
- Mobile screen ID: dbfde7cc1dc042f6a2a329664728c905 (projects-r02-mobile)
- Artifacts: round-2-pc.png (139KB), round-2-mobile.png (44KB)
- Approved subtitle: "Game huyền sử. Giải pháp sắc bén. Mỗi sản phẩm, một nét chạm khắc."

ROUND 3 FOCUS: Component Detail

**CANONICAL TITLES (REQUIRED):**
- PC: `projects-r03-desktop`
- Mobile: `projects-r03-mobile`

---

## PC PROMPT (`deviceType: "DESKTOP"`)

Vietnamese heritage game studio portfolio — Lạc Minh Studio. Page "CHẾ TÁC & DI SẢN" — projects showcase. Cinematic, powerful, premium. Emotional keywords: Bản sắc, Sắc sảo, Đột phá, Mãn nhãn.

⚠️ HARD CONSTRAINT — FULL SCREEN WIDTH (ZERO TOLERANCE):
- Every single section wrapper MUST span 100% of the canvas width — no exceptions
- ZERO outer horizontal margin on any section — no whitespace gaps on left or right sides of the canvas
- Background colors, gradients, and images extend EDGE-TO-EDGE (full-bleed)
- Inner content offset: exactly padding-left: 10px and padding-right: 10px — NEVER more than 10px
- Any section with outer left/right padding exceeding 10px is a HARD DEFECT — reject immediately
- PC outer padding is HARDCODED at exactly 10px each side — this is NON-NEGOTIABLE

⚠️ HARD CONSTRAINT — COLOR PALETTE (ZERO TOLERANCE):
- ONLY use the exact hex/rgba values listed below — do NOT invent new colors
- Do NOT approximate, blend, or introduce any color not in this exact list
- Do NOT generate a new design system — use ONLY these pre-defined tokens:
  ALLOWED: #EDE0C5 | #D8CAAF | #2D4538 | #C4954A | #B08030 | #4A7C59 | #C4854A | #9C3A2A
  ALLOWED: #1E1208 | #F5EDD8 | #5A4228 | #8A7560
  ALLOWED: rgba(237,224,197,0.45) | rgba(196,149,74,0.3) | rgba(196,149,74,0.25) | rgba(45,69,56,0.6)
  ALLOWED: #C8B892 (neumorphic shadow dark side) | #FFFFFF90 (neumorphic shadow light side)
  FORBIDDEN: any hex not in the list above, neon colors, pure black #000000, pure white #ffffff

COMPACT CANVAS (DESIGN.MD IS AUTHORITATIVE):
- 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

DESIGN SYSTEM (FROM DESIGN.MD — AUTHORITATIVE — DO NOT MODIFY):
- Style: Glassmorphism + Neumorphism hybrid
- Background: Warm Cream #EDE0C5 | Surface: Parchment Gray #D8CAAF
- Surface Dark: Deep Moss Green #2D4538 — CTA section, footer
- Primary Accent: Warm Bronze #C4954A | Secondary Accent: Muted Gold #B08030
- Text Primary: Rich Dark Brown #1E1208 | Text Light: Off-white Cream #F5EDD8
- Text Secondary: Medium Warm Brown #5A4228 | Text Muted: #8A7560
- Heading: EB Garamond — Display 80px / H2 48px / H3 32px; weight 500-600
- Body: Inter — 16-18px body / 13-14px uppercase label
- Glassmorphic panels: rgba(237,224,197,0.45), backdrop-blur 16px, border rgba(196,149,74,0.3)
- Neumorphic shadow: box-shadow 8px 8px 20px #C8B892, -8px -8px 20px #FFFFFF90
- Flat surfaces: forbidden — every surface must have neumorphic sculpt or glass layer
- Maintain visual consistency with previously approved pages: home, careers, blogs — same navbar, footer, color treatment

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /hero_background.png — Mini-Hero background: floating Vietnamese palace in moonlit clouds with cranes and karstic peaks — apply dark cinematic overlay rgba(18,10,4,0.70)
- /cultivation.jpg — Project card image: "Khế ước Lạc Hồng" V-Fantasy game background art
- /void_map.png — Ambient project card background: atmospheric void concept art for fantasy card
- /logo.png — Studio logo in Navbar top-left
- Asset fidelity: use exact project asset files as canonical imagery; preserve native aspect ratio; if exact rendering is not possible, keep a locked media slot for Next.js replacement

SCREEN STRUCTURE:

1. NAVBAR (sticky top, glassmorphic — identical to home/careers/blogs):
   - rgba(237,224,197,0.75) bg, backdrop-blur 16px, thin bronze ghost border-bottom rgba(196,149,74,0.25)
   - Left: /logo.png. Center: nav links "Trang Chủ | Tác Phẩm | Nghề Nghiệp | Blog" — Inter 15px weight 500, #5A4228; hover: #C4954A with underline slide-in. Right: "Liên hệ" CTA button bg #C4954A

2. MINI-HERO (height exactly 42vh — NOT full-screen):
   - Full-bleed /hero_background.png with dark overlay rgba(18,10,4,0.70). Vertical padding top: 80px
   - Center: H1 "CHẾ TÁC & DI SẢN" — EB Garamond 80px, weight 600, #F5EDD8, letter-spacing -0.02em
   - Below H1: subtitle — Inter 18px, #D4C5A9: "Hơn 5 năm miệt mài gõ code và dựng 3D. Từ những hệ thống Web chuẩn xác, không gian số GenZ, đến giấc mơ V-Fantasy vĩ đại."
   - Small animated scroll-down arrow at bottom center in Warm Bronze. NO full-screen — grid is visible below fold

3. FILTER BAR (sticky on scroll, full-width):
   - Full-width strip: glassmorphic rgba(237,224,197,0.88), backdrop-blur 14px, border-bottom rgba(196,149,74,0.2)
   - 4 pill tabs centered: [Tất cả] [V-Fantasy Game] [Không Gian Số] [Giải Pháp Doanh Nghiệp]
   - Active tab: solid #C4954A bg, text #F5EDD8, rounded pill shape. Inactive: transparent, text #5A4228, ghost bronze border on hover
   - Inter 15px weight 600, letter-spacing 0.05em. Vertical padding 18px

4. PROJECT BENTO GRID (warm cream #EDE0C5 background, section vertical padding 80px):
   Asymmetric Bento Box — premium negative space, generous gaps 24px. NOT a uniform grid.

   ROW 1 — Asymmetric 2-col (ratio ≈ 60% / 40%):
   - LEFT CARD (large — spans ~60% width, height ~380px): "SEN-CITY"
     Image-fill dark card. Tags row top: [Không Gian Số] [AI] [GenZ] [Simulator] — small glassmorphic bronze badge chips
     Title "Sen-City" EB Garamond 40px #F5EDD8 bottom of card. Description overlay: "Không gian số GenZ — virtual city simulator với AI companion."
     Dark gradient overlay bottom rgba(20,10,2,0.80). Card radius 16px, neumorphic shadow
     Hover: image scale 1.05, gold glow border rgba(196,149,74,0.65), description text fades in
   - RIGHT CARD (tall — spans ~40% width, same height 380px): "KHẾ ƯỚC LẠC HỒNG"
     Background: /cultivation.jpg. Dark overlay rgba(18,10,4,0.55). Tags: [V-Fantasy Game] [MMORPG] [Concept 3D] — glowing gold-bronze badges
     Title "Khế ước Lạc Hồng" EB Garamond 32px #F5EDD8. Brief: "MMORPG huyền sử — dòng máu Lạc Hồng thức tỉnh."
     Hover: same glow + scale effect

   ROW 2 — 3 equal columns (each ~300px height):
   - CARD A: "HỆ THỐNG E-COMMERCE MÁY THỔI KHÍ ĐÀI LOAN"
     Glassmorphic warm cream card, neumorphic shadow. Top: abstract tech/grid thumbnail locked slot. Tags: [Giải Pháp DN] [CMS] [SEO]
     Title EB Garamond 24px #1E1208. Description: "Hệ thống thương mại điện tử tích hợp CMS đa ngôn ngữ — đối tác Đài Loan."
   - CARD B: "NỀN TẢNG QUẢN LÝ DU HỌC"
     Same card style. Tags: [Giải Pháp DN] [UX/UI]. Title 24px. Description: "Platform quản lý hồ sơ du học — UX/UI tối ưu cho học sinh."
   - CARD C: Coming Soon teaser — dashed bronze border card, muted warm cream bg, centered text "Dự án tiếp theo" EB Garamond 22px #8A7560, subtext "Đang trong quá trình phát triển" Inter 14px. Ambient texture overlay.

5. CTA SECTION (full-bleed #2D4538 moss green, vertical padding 80px):
   - Full-width background #2D4538. Inner content 10px side padding only
   - H2 center: "Sẵn sàng kiến tạo huyền thoại cùng Lạc Minh?" — EB Garamond 48px, #F5EDD8
   - Below: primary CTA button "Khởi động dự án" — bg #C4954A, text #F5EDD8, Inter 16px weight 600, radius 8px, neumorphic shadow
   - Decorative gold ambient glow edges rgba(196,149,74,0.12). Style identical to CTA strips on approved pages

6. FOOTER (full-bleed, identical to home/careers/blogs):
   - #2D4538 dark moss. Logo top-left, nav link columns, studio tagline "Lạc Minh Studio — Huyền Sử Việt Nam 4000 năm", social icons in bronze #C4954A

---

## MOBILE PROMPT (`deviceType: "MOBILE"`, max 450px width)

Vietnamese heritage game studio — Lạc Minh Studio mobile projects page "CHẾ TÁC & DI SẢN". Cinematic, powerful, premium. Same visual identity as PC version.

COMPACT CANVAS (MOBILE):
- Max width: 450px canvas
- Single-column stacked layout throughout
- Touch targets: minimum 44px height for all interactive elements
- Maintain same visual identity: glassmorphism + neumorphism, warm cream palette, EB Garamond + Inter

DESIGN TOKENS (same as PC — from DESIGN.MD):
- Background #EDE0C5 | Surface Dark #2D4538 | Accent #C4954A | Text #1E1208 / #F5EDD8
- EB Garamond headings | Inter body | Glassmorphic panels + neumorphic surfaces

PROJECT ASSETS (LOCKED):
- /hero_background.png — Mini-Hero background with dark overlay
- /cultivation.jpg — "Khế ước Lạc Hồng" card art
- /logo.png — Logo in collapsed nav

SCREEN STRUCTURE (MOBILE):

1. NAVBAR (sticky top):
   - Glassmorphic strip. Logo left. Hamburger icon right (#C4954A). Collapsed by default.
   - Drawer opens from right: frosted glass panel, nav links stacked, CTA button full-width at bottom

2. MINI-HERO (42vh height, full-bleed):
   - /hero_background.png dark overlay. H1 "CHẾ TÁC & DI SẢN" EB Garamond 48px, centered, #F5EDD8
   - Subtitle: Inter 15px, #D4C5A9, centered, 2 lines max. Scroll arrow below.

3. FILTER BAR (sticky on scroll):
   - Horizontally scrollable pill tab strip (no wrapping). Same 4 tabs. Scroll hint gradient at edges.
   - Active: #C4954A pill. Inactive: ghost border. Min tap height 44px.

4. PROJECT CARDS (single-column stack, 20px vertical gap):
   - Card 1 "Sen-City": full-width, height 260px, same dark art card style. Tags top, title bottom.
   - Card 2 "Khế ước Lạc Hồng": full-width, height 260px, /cultivation.jpg bg. Fantasy badges.
   - Card 3 "E-commerce Máy Thổi Khí": full-width glassmorphic card, neumorphic shadow, tags + title + 1-line desc.
   - Card 4 "Nền tảng Du Học": same as Card 3.
   - Card 5 "Coming Soon" teaser: dashed border, muted text.

5. CTA SECTION (full-bleed #2D4538, padding 60px 16px):
   - H2 EB Garamond 32px #F5EDD8 centered. Button full-width #C4954A, 52px height, radius 8px.

6. FOOTER (full-bleed dark, single-column stacked):
   - Logo center top. Nav links stacked. Tagline. Social icons row.
