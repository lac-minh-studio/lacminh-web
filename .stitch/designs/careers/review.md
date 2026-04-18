# Review Log — careers

## Round 1 Review — careers

**Focus:** Concept & Layout
**Base version:** N/A (first generation)

**Section-by-section review:**
- Section 1 — Navbar: established glassmorphic fixed top with logo + nav links + bronze CTA; "Tuyển dụng" active state present — verify underline style matches home
- Section 2 — Hero: full-bleed hero_background with moss green overlay, centered headline "Gia Nhập Huyền Sử", dual CTA, stat strip — layout hierarchy is correct; depth/glass of stat strip to verify in R2
- Section 3 — Studio Vision: 2-column split with trongdong.png placeholder right + value pillar glassmorphic cards left — structure confirmed; bronze glow and neumorphic pedestal treatment to refine in R2
- Section 4 — Job Listings: 5 glassmorphic cards in 3+2 grid, INTERN badges, skill tags, "Xem chi tiết →" CTA — grid layout confirmed; card depth and content density to enhance in R2
- Section 5 — Contact / Form: dark #2D4538 section, glassmorphic form card left + info right, lotus-pond ambient — layout confirmed; form field styling and input depth to verify in R3
- Section 6 — Footer: deep moss footer consistent with brand — structure confirmed

**Issues resolved from previous round:** N/A  
**Remaining issues for next round:**
- Apply all DESIGN.md brand tokens precisely: bronze numbers, neumorphic section shadows, glass card recipe
- Verify typography scale (EB Garamond 80px hero, 48px H2, Inter body sizes)
- Ensure trongdong.png locked slot visible with neumorphic pedestal and bronze ambient glow
- Add realistic Vietnamese-language content depth (copy, labels, job descriptions)

**Quality gate:** NEEDS WORK → advance to Round 2 (Visual Identity)

---

## Round 2 Review — careers

**Focus:** Visual Identity
**Base version:** round 1 (eaa5b32ef82045deaa8b6c8f1ec3d50f)

**Section-by-section review:**
- Section 1 — Navbar: glassmorphic spec applied, bronze ghost border-bottom present, "Tuyển dụng" active underline in #C4954A ✓
- Section 2 — Hero: stat strip numbers larger with EB Garamond bronze; glassmorphic strip around stats applied; CTA neumorphic shadow improved
- Section 3 — Studio Vision: "TẦM NHÌN" label added; value pillar cards now glassmorphic with bronze ghost borders; trongdong.png warm bronze glow applied
- Section 4 — Job Listings: H2 corrected to "Cùng Chúng Tôi Xây Dựng Thế Giới"; "TUYỂN DỤNG" label added; job cards glassmorphic; "INTERN" badges bronze bg cream text
- Section 5 — Contact: H2 corrected to "Bạn Quan Tâm? Hãy Nói Chuyện"; "LIÊN HỆ" label added; glassmorphic form inputs with bronze borders
- Section 6 — Footer: preserved from R1 ✓

**Issues resolved from previous round:** section labels added, H2 text corrected in sections 4 & 5, typography scale enforced, glassmorphic depth applied to cards
**Remaining issues for next round:** component micro-states (hover/active/disabled), button states, job card hover lift, nav hover state, form field focus ring visibility
**Quality gate:** NEEDS WORK → advance to Round 3 (Component Detail)

---

## Round 3 Review — careers

**Focus:** Component Detail
**Base version:** round 2 (2294185afb2249a1902c6927f1e0c40a)

**Section-by-section review:**
- Section 1 — Navbar: hover + active states applied; "Tuyển dụng" active underline confirmed ✓
- Section 2 — Hero: CTA hover/active/disabled states shown; neumorphic press shadow confirmed ✓
- Section 3 — Studio Vision: value pillar card hover (deeper shadow, border brightens) added ✓
- Section 4 — Job Listings: Frontend Developer card shown in hover lift state (shadow expand, #C4954A border, -4px translate) ✓; "Xem chi tiết →" hover underline ✓
- Section 5 — Contact: "Họ & tên" focus state (bronze border + glow) shown; "Số điện thoại" error state (red border + validation text) shown; submit button hover/active ✓
- Section 6 — Footer: locked ✓

**Issues resolved from previous round:** all interactive micro-states added, hover/active/focus/error states visible
**Remaining issues for next round:** fill all job cards with realistic Vietnamese content (full descriptions, realistic skill tags, proper copy); hero and vision sections need realistic copy depth; replace any placeholder text
**Quality gate:** NEEDS WORK → advance to Round 4 (Data & Content)

---

## Round 4 Review — careers

**Focus:** Data & Content
**Base version:** round 3 (2f8c00663833410d9dc19501c7f70380)

**Section-by-section review:**
- Section 1 — Navbar: locked ✓
- Section 2 — Hero: subheadline updated with 4.000 năm huyền sử copy ✓; stat strip "3+ Năm / 4 Dự án / 12 Thành viên" ✓
- Section 3 — Studio Vision: brand-specific intro paragraph applied ✓; value pillar descriptions updated with Vietnamese cultural copy ✓
- Section 4 — Job Listings: all 5 job cards filled with realistic Vietnamese descriptions and accurate skill tags ✓; no placeholder text remaining ✓
- Section 5 — Contact: tagline "Dù bạn mới tốt nghiệp hay còn đi học..." added ✓; office address and email contact info added ✓; R3 focus/error states preserved ✓
- Section 6 — Footer: locked ✓

**Issues resolved from previous round:** all placeholder/Lorem Ipsum text replaced with production-ready Vietnamese content
**Remaining issues for next round:** test empty states (no jobs listed scenario), loading skeleton, dense layout scenario, form validation edge cases, content overflow/truncation on long Vietnamese text
**Quality gate:** NEEDS WORK → advance to Round 5 (Edge Cases & Density)

---

## Round 5 Review — careers

**Focus:** Edge Cases & Density
**Base version:** round 4 (531fe9c193f34274a6036b48e71c639d)

**Section-by-section review:**
- Section 1 — Navbar: locked ✓
- Section 2 — Hero: text wrapping within 760px column verified; stat strip not truncated ✓
- Section 3 — Vision: long Vietnamese text wraps cleanly in value pillar cards; trongdong column not squeezed ✓
- Section 4 — Job Listings: coming-soon placeholder card added (glassmorphic, dashed bronze border, "Sắp mở thêm vị trí...") ✓; skill tag pill wrapping graceful ✓; loading skeleton indicator shown ✓
- Section 5 — Contact: success banner (moss green glassmorphic, 1–3 day response message) added ✓; phone field error state preserved ✓; textarea overflow handled ✓
- Section 6 — Footer: locked ✓

**Issues resolved from previous round:** edge cases designed, density improved, no text overflow
**Remaining issues for next round:** WCAG AA contrast check on all text/bg combos, focus rings visible and consistent size, icon clarity, spacing consistency across sections, final responsive behavior check within 1280px frame
**Quality gate:** NEEDS WORK → advance to Round 6 (Polish & Accessibility)

---

## Round 6 Review — careers

**Focus:** Polish & Accessibility
**Base version:** round 5 (a1f606ebc95543938fcb9c3822e785f7)

**Section-by-section review:**
- Section 1 — Navbar: focus ring on CTA button added; nav link contrast verified ✓
- Section 2 — Hero: WCAG AA contrast on #F5EDD8 text on dark overlay confirmed ✓; scroll chevron visible ✓
- Section 3 — Vision: bronze divider below H2 added ✓; lightbulb/flag/heart line icons in value pillars ✓; contrast on glass cards adjusted ✓
- Section 4 — Job Listings: bronze divider below H2 ✓; skill tag contrast verified ✓; "INTERN" badge passes AA ✓; section bottom padding 80px ✓; focus rings on "Xem chi tiết →" links ✓
- Section 5 — Contact: form label turns bronze on focus ✓; success banner alignment with form ✓; submit button cream-on-bronze passes AA ✓
- Section 6 — Footer: #F5EDD8 on #2D4538 contrast confirmed ✓; logo crisp ✓

**Issues resolved from previous round:** WCAG AA contrast enforced, focus rings consistent, icons clarified, section spacing balanced, no layout bleed
**Quality gate:** R6 COMPLETE — proceeding to Round 7 (final quality pass as specified)

---

## Round 7 Review — careers

**Focus:** Final Quality Pass
**Base version:** round 6 (88f52bd3838f466d8e2a809523f1b103)

**Section-by-section review:**
- Section 1 — Navbar: visual rhythm with hero confirmed; logo size proportional; glassmorphic nav-to-hero transition smooth ✓
- Section 2 — Hero: eyebrow label "TUYỂN DỤNG · LẠC MINH STUDIO" visible; bronze ornamental divider/flourish added below stat strip ✓
- Section 3 — Vision: ambient bronze halo at base of trongdong.png adds artifact-on-display premium feel ✓; section-to-section transition intentional ✓
- Section 4 — Job Listings: coming-soon card height consistent; 3+2 grid balanced and center-justified; Game Designer card shown in hover-lift alongside Frontend Dev — hover system consistent ✓
- Section 5 — Contact: two-column balance confirmed; lotus ambient glow (15% opacity) adds atmosphere without obscuring form ✓; success banner spacing correct ✓
- Section 6 — Footer: column alignment and copyright line confirmed ✓

**Issues resolved from previous round:** ornamental divider, artifact halo, hover consistency, final vertical rhythm, atmospheric depth
**Quality gate:** ✅ APPROVED — all 7 rounds complete, design meets all quality criteria
