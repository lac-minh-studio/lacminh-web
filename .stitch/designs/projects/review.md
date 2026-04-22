# Projects Screen — Round Review Log

---

## Round 1 — Concept & Layout
**Date:** 2026-04-21
**PC ID:** d1673b39ca2742d3aa0277b0eda86299 | **Mobile ID:** 3d71ef5a597c4e07a1eaeda49f93737d
**Artifacts:** round-1-pc.png (138KB), round-1-mobile.png (43KB)

### PC Review
**Section 1 — Navbar:** ✅ Present. Glassmorphic strip, logo left, nav links center, CTA button right. Color palette correct.
**Section 2 — Mini-Hero:** ✅ Present. 42vh height (NOT full-screen — grid visible below fold). "CHẾ TÁC & DI SẢN" heading prominent, subtitle visible. Warm bronze accent scroll cue.
**Section 3 — Filter Bar:** ✅ Present. 4 pill tabs clearly laid out. Active tab visible in bronze. Full-width strip.
**Section 4 — Bento Grid:** ✅ Present. Asymmetric Row 1 — SEN-CITY large card left (~60%), Khế ước Lạc Hồng right (~40%). Row 2 — 3 equal cards: E-Commerce, Nền tảng Du học, Dự án tiếp theo dashed teaser.
**Section 5 — CTA:** ✅ Present. Full-bleed #2D4538 moss green. Correct heading and bronze CTA button.
**Section 6 — Footer:** ✅ Present. Dark moss green, multi-column layout.

**Full-width compliance:** ✅ All sections appear to span canvas edge to edge — no visible side gaps detected.
**Color compliance:** ✅ No rogue colors — warm cream bg, bronze accents, moss green dark sections consistent with DESIGN.MD.
**Hard defects detected:** None in R1 layout structure.

### Mobile Review
**Section 1 — Navbar:** ✅ Compact bar with logo and hamburger.
**Section 2 — Mini-Hero:** ✅ 42vh, heading and subtitle visible.
**Section 3 — Filter Bar:** ✅ Horizontal scrollable pill strip.
**Section 4 — Cards:** ✅ Single-column stack — SEN-CITY and Khế ước Lạc Hồng dark art cards, then glassmorphic enterprise cards below.
**Section 5 — CTA:** ✅ Full-bleed dark strip with centered heading and full-width button.
**Section 6 — Footer:** ✅ Visible.

**Cross-device parity:** ✅ All 6 sections present in both PC and mobile. Mobile correctly collapses bento grid to single-column stack.

### Round 1 Verdict: PASS — Ready for Round 2 (Visual Identity)

---

## Round 2 — Visual Identity
**Date:** 2026-04-21
**PC ID:** 3e2bf1cf3388418981cf5a467e4cfc44 | **Mobile ID:** dbfde7cc1dc042f6a2a329664728c905
**Artifacts:** round-2-pc.png (139KB), round-2-mobile.png (44KB)

### PC Review
**Navbar:** ✅ Glassmorphic, full-width, logo + nav links + CTA visible. Warm cream palette consistent.
**Mini-Hero:** ✅ New subtitle "Game huyền sử. Giải pháp sắc bén. Mỗi sản phẩm, một nét chạm khắc." — visible and correctly placed.
**Filter Bar:** ✅ Active tab (Tất cả) solid bronze pill visible. 4 tabs present. Full-width strip.
**Bento Grid R1:** ✅ Sen-City (60%) + Khế ước Lạc Hồng (40%). Dark art cards with gold glow border applied. Tag badges visible.
**Bento Grid R2:** ✅ 3 cards — E-Commerce, Nền tảng Du Học, Dự án tiếp theo. Neumorphic depth visible on light cards.
**CTA:** ✅ #2D4538 full-bleed. Bronze ornament line above H2 present. Button visible.
**Footer:** ✅ Dark moss, multi-column, consistent.
**Full-width:** ✅ No side gaps detected.
**Color:** ✅ Palette compliant — warm bronze, cream, moss green only.

### Mobile Review
**Navbar:** ✅ Glassmorphic compact bar.
**Mini-Hero:** ✅ Updated subtitle visible. Layout preserved.
**Filter Bar:** ✅ Horizontal scrollable strip, active bronze pill.
**Cards:** ✅ Single-column stack — dark art cards + light glassmorphic cards. Gold glow on dark cards visible.
**CTA:** ✅ Full-bleed dark, full-width button, bronze ornament present.
**Footer:** ✅ Present.

**Cross-device parity:** ✅ All 6 sections present in both. Mobile single-column correctly applied.

### Round 2 Verdict: PASS — Ready for Round 3 (Component Detail)

---

## Round 3 — Component Detail + Gemini Improvements
**Date:** 2026-04-21
**PC ID:** cc88061f36fe406f925395be89f48f55 | **Mobile ID:** 8f5f1437736d4fe09d17d94330d83669
**Artifacts:** round-3-pc.png (134KB), round-3-mobile.png (42KB)

### Gemini Changes Applied
- God-rays atmospheric depth in Mini-Hero ✅
- True asymmetric bento (Sen-City wide 60%, Khế ước tall 40% portrait 480px) ✅
- Full-bleed card style with glassmorphic bottom info panel ✅
- Nón lá silhouette corner ornament on Khế ước card ✅
- All 3 filter pill states defined (active/hover/inactive) ✅
- Đông Sơn ornamental gold divider between Grid → CTA ✅
- Subtle brocade texture overlay on CTA section ✅

### PC Review
**Navbar:** ✅ Glassmorphic, full-width, correct layout. No change from R2.
**Mini-Hero:** ✅ Title/subtitle locked and visible. God-rays subtle at preview scale — acceptable.
**Filter Bar:** ✅ 4 pills, active bronze, ghost border inactive states visible.
**Bento Row 1:** ✅ True asymmetric — Sen-City urban nightscape (60% wide), Khế ước fantasy art (40% portrait, visibly taller). Both full-bleed with glassmorphic bottom panels. "SEN-CITY" uppercase bold title visible in panel.
**Bento Row 2:** ✅ 3 equal smaller cards: E-Commerce Máy Thổi Khí + Nền Tảng Du Học + Coming Soon dashed. Neumorphic shadow on light cards.
**Transition divider:** ✅ Ornamental gold line visible between grid and CTA.
**CTA:** ✅ Dark moss full-bleed, H2 "Sẵn sàng kiến tạo huyền thoại cùng Lạc Minh?", button present.
**Footer:** ✅ Dark moss, multi-column, consistent.
**Full-width:** ✅ No side gaps.
**Asset note:** Khế ước card uses Stitch-generated warm amber fantasy art (stand-in). /cultivation.jpg must be swapped in Next.js via locked media slot.

### Mobile Review
**Navbar:** ✅ Compact glassmorphic bar.
**Mini-Hero:** ✅ Title/subtitle visible, atmospheric warmth.
**Filter Bar:** ✅ Horizontal scrollable.
**Sen-City card:** ✅ Full-bleed urban, 280px, glassmorphic bottom panel.
**Khế ước card:** ✅ Portrait tall 320px, warm amber fantasy art, gold-glow badges.
**E-Commerce + Du Học cards:** ✅ Light neumorphic surface, readable.
**CTA:** ✅ Full-bleed dark + full-width button.
**Footer:** ✅ Single-column stacked.
**Ornamental divider:** ✅ Present between cards and CTA.

**Cross-device parity:** ✅ All sections present in both. Portrait asymmetry preserved on mobile. No defects.

### Round 3 Verdict: PASS — Ready for Round 4 (Data & Content)

---

## Round 4 — Data & Content + Decorative Motifs + Contact Section
**Date:** 2026-04-21
**PC ID:** 8714e7b8dfc24f6b89ce342d91537d70 | **Mobile ID:** b02873a9b0ff4b9d8cd407e8470f00c0
**Artifacts:** round-4-pc.png (92KB), round-4-mobile.png (28KB)

### Changes Applied
- ✅ Realistic mock data: tech chips, outcomes ("Tăng 340% organic traffic"), years, team sizes on all cards
- ✅ Floating heritage motifs: Chim Lạc, Đông Sơn ring, gold winding line, spear ornament — bg layer
- ✅ Contact section added: glassmorphic form (55%) + contact info (45%) on dark #2D4538

### PC Review
**Navbar:** ✅ Unchanged locked.
**Mini-Hero:** ✅ "CHẾ TÁC & DI SẢN" — title/subtitle/god-rays present.
**Filter Bar:** ✅ 4 pills visible.
**Bento Row 1:** ✅ SEN-CITY (wide, urban art, chips visible), KHẾ ƯỚC LẠC HỒNG (portrait, fantasy art, chips visible). Content metadata present.
**Bento Row 2:** ✅ E-commerce + Du Học cards with tech chips and outcomes. Coming Soon dashed.
**Floating motifs:** ✅ Subtle heritage ornaments visible at preview scale.
**CTA strip:** ✅ Dark moss, locked.
**Contact Section:** ✅ Glassmorphic form left, "Cùng Lạc Minh / Kiến Tạo Tương Lai" right. All fields visible. Icon boxes present.
**Footer:** ✅ Dark moss, multi-column.
**Full-width:** ✅ No side gaps detected.

### Mobile Review
**Navbar:** ✅ Compact glassmorphic.
**Mini-Hero:** ✅ Title + subtitle correct.
**Cards:** ✅ Single-column, content metadata visible on all cards.
**CTA:** ✅ Full-bleed dark, full-width button.
**Contact Section:** ✅ Single-column stacked form + info below. All fields present.
**Footer:** ✅ Single-column.

**Cross-device parity:** ✅ All 7 sections present on both. Contact section adapted correctly for mobile single-column.

### Round 4 Verdict: PASS — Ready for Round 5 (Edge Cases & Density)

---

## Round 5 — Edge Cases & Density + Bento 70/30 Redesign
**Date:** 2026-04-21
**PC ID:** 9f0740a979044397a5f618ded03b2357 | **Mobile ID:** f22bdbb78c2541eb84b6ee9a470e0e99
**Artifacts:** round-5-pc.png (83KB), round-5-mobile.png (30KB)

### Layout Changes Applied
- ✅ Bento rebuilt: 70% LEFT (Sen-City top + 2 web cards bottom) / 30% RIGHT (Khế ước full-height portrait)
- ✅ Coming Soon moved to full-width strip below bento
- ✅ Contact form email validation error state shown
- ✅ Mobile card order: Sen-City → Khế ước (tallest) → E-Commerce → Du Học → Coming Soon strip

### PC Review
**Navbar:** ✅ Glassmorphic, logo visible.
**Mini-Hero:** ✅ "CHẾ TÁC & DI SẢN" + subtitle. Hero background dark — acceptable at Stitch preview scale.
**Filter Bar:** ✅ 4 pills present.
**Bento Grid 70/30:** ✅ Sen-City wide card top-left, 2 web cards bottom-left side by side, Khế ước Lạc Hồng tall portrait right column spanning full height. Layout structure correct.
**Coming Soon strip:** ✅ Full-width dashed strip below bento.
**CTA section:** ✅ Dark moss, "Sẵn sàng kiến tạo huyền thoại" + button.
**Contact Section:** ✅ Glassmorphic form left + "Cùng Lạc Minh / Kiến Tạo Tương Lai" right. Email error state visible.
**Footer:** ✅ Dark moss multi-column.
**Full-width:** ✅ No outer side gaps.

### Mobile Review
**Cards:** ✅ Correct order: Sen-City → Khế ước (tallest portrait) → E-Commerce → Du Học → Coming Soon strip.
**CTA:** ✅ Present.
**Contact:** ✅ Single-column, form + info stacked, validation error visible.
**Footer:** ✅ Present.

**Cross-device parity:** ✅ All sections present on both variants. No hard defects detected.

### Round 5 Verdict: PASS — Ready for Round 6 (Polish & Accessibility)

---

## Round 6 — Polish & Accessibility + User Structural Changes
**Date:** 2026-04-21
**PC ID:** 4dcf386b1c8348db84024e2016d1bf4d | **Mobile ID:** 1a79c762910d4f648b1ff487ff57acf0
**Artifacts:** round-6-pc.png (72KB), round-6-mobile.png (28KB)

### Changes Applied
- ✅ Filter bar (4 pills) — REMOVED ENTIRELY
- ✅ Bento grid — full-width, outer padding 10px sides only, reduced white gap
- ✅ NEW "Tầm Vóc Studio" stats section added between CTA (#2D4538) and Contact (#2D4538)
  - Background: #EDE0C5 neumorphic light — creates DARK → LIGHT → DARK rhythm
  - 4 neumorphic stat cards: 12+ Dự Án | 15+ Đối Tác | 4 Năm | 20+ Thành Viên
  - Numbers: EB Garamond #C4954A. Labels: Inter uppercase #5A4228

### PC Review
**Navbar:** ✅ Glassmorphic, logo.
**Mini-Hero:** ✅ "CHẾ TÁC & DI SẢN" + subtitle + /hero_background.png.
**Filter Bar:** ✅ REMOVED.
**Bento Grid 70/30:** ✅ Full-width treatment, Sen-City left + Khế ước portrait right. E-Commerce + Du Học bottom-left visible.
**Coming Soon strip:** ✅ Below bento.
**CTA strip:** ✅ Dark #2D4538.
**Stats section:** ✅ "Tầm Vóc Studio" 4 stat cards on #EDE0C5 background — visual break achieved.
**Contact Section:** ✅ Dark #2D4538, form + info.
**Footer:** ✅ Dark #2D4538.
**Rhythm:** DARK (CTA) → LIGHT (stats) → DARK (contact) ✅ — no visual monotony.

### Mobile Review
**Filter Bar:** ✅ REMOVED.
**Cards:** ✅ Sen-City → Khế ước (portrait) → smaller cards → CTA.
**Stats:** ✅ 2×2 grid on #EDE0C5 background, numbers visible.
**Contact + Footer:** ✅ Single-column stacked.

### Quality Gate (R6)
- WCAG AA contrast: Reported applied ✅
- Focus rings: Reported applied ✅
- Icons: ≥20px ✅
- Filter bar: Removed ✅
- Stats section: Breaks dark-dark monotony ✅
- No hard defects detected from screenshots.

### Round 6 Verdict: FAIL — Stats section không phù hợp (corporate feel, sai màu Khế ước card). Tiếp tục R7.

---

## Round 7 — Manifesto Section + Bento Color Fix + CTA Height
**Date:** 2026-04-21
**PC ID:** b18b9af40058491b90e47a4e3be43f73 | **Mobile ID:** 23e87831f27249db943f6a33dffebcc1
**Artifacts:** round-7-pc.png (65KB), round-7-mobile.png (26KB)

### Changes Applied
- ✅ Stats "Tầm Vóc Studio" → REPLACED với manifesto "Triết Lý Sáng Tạo"
  - Quote EB Garamond italic #1E1208 trên nền #EDE0C5 neumorphic
  - Đông Sơn ornamental dividers top/bottom
  - DARK (CTA) → LIGHT (manifesto) → DARK (contact) rhythm preserved
- ✅ Khế ước Lạc Hồng card: mint/teal fixed → warm amber-brown gradient (#2D1A0A→#5A2D0C)
- ✅ CTA strip: taller, more impactful vertical presence
- ✅ Filter bar: confirmed absent

### PC Review
**Navbar:** ✅ Glassmorphic.
**Mini-Hero:** ✅ "CHẾ TÁC & DI SẢN" + atmospheric background.
**Bento 70/30:** ✅ Sen-City dark card top-left, E-Commerce/Du Học bottom-left, Khế ước warm amber portrait right. Color defect corrected.
**Coming Soon strip:** ✅ Present below bento.
**CTA strip:** ✅ Taller, dark #2D4538, Đông Sơn divider above.
**Manifesto section:** ✅ "Từ huyền sử ngàn năm — đến giao diện của ngày mai." — EB Garamond italic large, warm cream bg. Elegant narrative break.
**Contact Section:** ✅ Form left + info right, #2D4538.
**Footer:** ✅ Present.

### Mobile Review
**Cards:** ✅ Sen-City → Khế ước (amber-brown portrait) → E-Commerce → Du Học → Coming Soon.
**Manifesto:** ✅ Large italic quote centered, cream background.
**Contact + Footer:** ✅ Single-column stacked.

### Round 7 Verdict: APPROVED ✅ — Proceeding to Phase 3 + Phase 4

---

## EDITORIAL REDESIGN LOOP — Round 6 — Polish & Accessibility + Diagonal Section Transitions
**Date:** 2026-05-01
**PC ID:** 6619f7b1bba94f5896df005da69afd6a | **Mobile ID:** 8a015be5684a4aacb29ba0864880b4d2
**Artifacts:** round-6-pc.png (42KB), round-6-mobile.png (20KB)
**Insight Source:** Naughty Dog, Larian Studios — cinematic diagonal section transitions

### Changes Applied
- ✅ Diagonal clip-path transition between S2 (cream) and S3 (dark), 80px height on desktop / 40px mobile
- ✅ WCAG AA contrast audit — heading #F5EDD8 on #2D4538 verified ≥7:1, body text ≥4.5:1
- ✅ All interactive elements: 2px solid #C4954A focus rings with offset 2px
- ✅ Icon size ≥20px stroke ≥1.5px globally
- ✅ Section vertical padding standardized ≥80px (desktop) / ≥60px (mobile)
- ✅ Touch targets mobile ≥44px — form inputs, buttons, icon rows
- ✅ Submit button min-height 48px
- ✅ 10px side-padding on all section wrappers confirmed

### Round 6 Verdict: PASS ✅ — All 6 sections + tech strip present, no hard defects.

---

## EDITORIAL REDESIGN LOOP — Round 7 — Final Cohesion + Monumental Hero + Trống Đồng Ornamentals
**Date:** 2026-05-01
**PC ID:** a1416cb9a17d46eab04c52c0a93c89cb | **Mobile ID:** d577387e02ea45c5906962042c42580b
**Artifacts:** round-7-pc.png (41KB), round-7-mobile.png (20KB), round-7-pc.html (34KB), round-7-mobile.html (33KB)
**Insight Source:** FromSoftware, CD Projekt RED — layered depth hero, chapter marker accents

### Changes Applied
- ✅ S1 Hero: 3-layer depth — Trống Đồng 8% watermark + corner vignette + bottom Đông Sơn arc strip 15% opacity
- ✅ S2 Studio Story: 4px left-edge bronze bar (gradient top→transparent) as chapter marker
- ✅ S3 Game Universe: 4px bronze left-edge bar per glassmorphic row (3 bars total)
- ✅ S4 Commercial heading "ĐỐI TÁC & ĐẦU TƯ": 2px centered horizontal bronze rule below H2
- ✅ S5 Contact section heading: 2px centered horizontal bronze rule below heading
- ✅ Cross-page cohesion check vs home-r07 (200f705d), careers-r07 (6f877dfc), blogs-r08 (d9542985)
- ✅ EB Garamond heading weight consistent across all pages
- ✅ Bronze accent #C4954A consistent in chips, bars, stats
- ✅ Glass border rgba(196,149,74,0.3) consistent
- ✅ All 6 sections + tech strip present, no padding creep
- ✅ Implementation HTML downloaded: round-7-pc.html + round-7-mobile.html

### Round 7 Verdict: APPROVED ✅ — Status set to approved. Proceeding to Phase 3 Analytics.
