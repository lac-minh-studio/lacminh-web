---
screen: blogs
round: 9
mode: edit
base-pc-id: d95429855a3e4d52bd9cc4721e6fa12b
base-mobile-id: a0385bcf20974e87abba6272646cab1b
status: approved
canonical-mobile-title: blogs-r08-mobile
---
ROUND 2 FOCUS: Visual Identity

BASE VERSION (REQUIRED):
- Previous round: 1
- PC screen id: e8c20371720d442d8f10d9844e377c28
- Mobile screen id: ea8a8dfcf51f42c8a3e5e16868c4aa77
- Instruction: update from previous version only; do not regenerate from scratch
- Preserve all unchanged areas as locked

CANVAS LAYOUT (PERMANENT CONSTRAINT — DO NOT CHANGE):
- PC outer padding (HARDCODED — NON-NEGOTIABLE): every section wrapper uses exactly padding-left: 10px and padding-right: 10px — no more, no less
- Full-bleed backgrounds extend to canvas edge; the 10px applies to inner content offset only
- 1280px max desktop frame; no element may exceed the frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- Responsive tiers: pc 1920-1600, laptop 1600-1200, macbook 1200-900, tablet 900-700, mini-tablet 700-450, mobile <450

DESIGN SYSTEM: Use existing design system in project 15105611068859615529. Do NOT create new tokens.

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /public/blogs/huyn-s-vit-nam-3d-fantasy.jpeg — Carousel slide 1 cover
- /public/blogs/blog1.jpeg — Blog grid card cover
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 Carousel — exists with 2-col glass card; DEFECT: double frame (outer neumorphic wrapper + inner glass card) must be removed; keep only the inner glass card filling full section width with no outer wrapper; "Hot" badge present but low contrast
- Section 2 Swipers — horizontal row exists; MISSING: right-edge gradient fade clip on card 5; MISSING: category badges on swiper cards
- Section 3 Grid & Filter — 4-col grid + filter tabs + search bar present; filter bar and search bar spacing uneven; hover state on cards unclear
- Section 4 Contact — dark section present; "Gửi Liên Hệ" button low prominence; ambient bronze glow missing; mobile contact icons missing

CROSS-DEVICE SECTION PARITY (REQUIRED):
- Section 1 Carousel — present in both; mobile stacks vertically ✅
- Section 2 Swipers — present in both ✅
- Section 3 Grid & Filter — present in both; mobile 2-col ✅
- Section 4 Contact — present in both; mobile single-col ✅

THIS ROUND'S CHANGES ONLY:
1. CONTRAST & SHADOWS: Increase text/background contrast across all sections. Reduce all box-shadow blur and spread by ~40% — shadows must be softer and more subtle, not heavy.
2. FONT SIZE: Reduce ALL font sizes by ~20% across the entire page — H2 carousel 34px→27px, H3 grid 22px→18px, H2 contact 48px→38px, body 16px→13px, labels 13px→11px. Maintain hierarchy proportions.
3. SIDE SPACING: Tighten inner horizontal padding on all sections — section content must sit closer to the canvas edges. Inner content padding max 16px horizontal per side. The outer 10px wrapper rule still applies.
4. CAROUSEL DOUBLE FRAME: Remove the outer neumorphic background container/wrapper from Section 1. The glass card itself is the only container — it fills the full section width flush, no outer frame around it.
5. GRID GAP: Reduce grid gap in Blog Grid from 24px to 14px. Reduce swiper card gap from 16px to 10px. Reduce vertical padding between sections from 80px to 56px.
6. BADGES: "Hot" amber badge and "New" bronze badge must be clearly visible with strong contrast — filled pill with white text. Add these badges to swiper cards too.
7. SWIPER FADE: Add right-edge gradient fade mask (warm cream to transparent, ~80px wide) on the Horizontal Swipers section to clip card 5.
8. CONTACT CTA: "Gửi Liên Hệ" submit button must be full primary bronze — solid #C4954A background, cream text, neumorphic shadow.
9. CONTACT GLOW: Add radial bronze ambient glow rgba(196,149,74,0.15) behind the two-column layout in the contact section.
10. FILTER BAR: Align filter tabs and search bar to same vertical center. Reduce gap between tabs to 8px.
