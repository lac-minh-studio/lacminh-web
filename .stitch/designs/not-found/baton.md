---
screen: not-found
round: 2
mode: edit
base-pc-id: 03f605b76dd94227bbfc8c51fb9d8ca4
base-mobile-id: 3ceb76059b674f8a95c6a91e521973a9
status: approved
---
ROUND 1 FOCUS: Concept & Layout

**CANONICAL TITLES (REQUIRED):**
- PC: `not-found-r01-desktop`
- Mobile: `not-found-r01-mobile`

---

## PROMPT (Round 1 — PC DESKTOP)

Full-screen Coming Soon / 404 page for Lạc Minh Studio — a Vietnamese fantasy game development studio. Style: **pure Glassmorphism** as the dominant layer — deep translucent frosted panels floating over a dramatic full-bleed atmospheric background image. The overall mood is mystical, ancient Vietnamese — like discovering a hidden realm in the clouds. Warm, luminous, refined.

CANVAS LAYOUT (PERMANENT CONSTRAINT — DO NOT CHANGE):
- 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill available space elegantly — do not leave large empty voids
- PC outer padding (HARDCODED — NON-NEGOTIABLE): all section wrappers use exactly padding-left: 10px and padding-right: 10px — never more
- Full-bleed backgrounds: background images and gradients extend to the canvas edge; the 10px applies only to inner content offset

DESIGN TOKENS:
- Background fill: Deep layered atmosphere — use a dark mystical overlay gradient (rgba(20,14,6,0.65)) over the hero background image slot; the image itself is a moonlit Vietnamese palace floating in clouds with cranes
- Surface Glass (panel): rgba(237,224,197,0.12) with backdrop-filter: blur(24px); border: 1px solid rgba(196,149,74,0.35); border-radius: 24px
- Primary Accent: #C4954A (Warm Bronze)
- Secondary Accent: #B08030 (Muted Gold)
- Text on glass panel: #F5EDD8 (Off-white Cream)
- Text muted: rgba(245,237,216,0.65)
- Font Heading: EB Garamond
- Font Body: Inter
- Neumorphic surfaces: forbidden on this page — pure glassmorphism only
- Glow effects: ambient gold/bronze halos rgba(196,149,74,0.2) on key elements

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /public/hero_background.png — FULL-BLEED PAGE BACKGROUND: moonlit floating Vietnamese palace in clouds with cranes and karstic peaks. Fills entire viewport. Apply dark overlay for legibility.
- /public/logo.png — Studio logo — centered at top of glass panel
- /public/trongdong.png — Decorative brand symbol — ancient bronze drum — placed as a large ambient watermark or decorative emblem behind or below the glass panel with low opacity (0.15–0.25)
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SCREEN STRUCTURE:

1. BACKGROUND LAYER (full-bleed):
   - hero_background.png fills 100vw × 100vh, object-fit: cover, object-position: center
   - Dark overlay gradient on top: rgba(20,14,6,0.6) to rgba(10,8,4,0.8) radial from center-top
   - trongdong.png as large low-opacity watermark (opacity: 0.12) centered or offset to bottom-right, scale ~600px, no blur

2. FLOATING GLASS PANEL (centered, vertically centered):
   - Width: 680px max-width, auto horizontal margin
   - Padding: 64px top/bottom, 56px left/right
   - Glass: rgba(237,224,197,0.10) bg, backdrop-blur: 28px, border 1px solid rgba(196,149,74,0.30), border-radius: 28px
   - Inner ambient glow: subtle inset box-shadow rgba(196,149,74,0.08) at the top edge
   - Content inside (top to bottom):
     a. Logo: /public/logo.png — 56px tall, centered, margin-bottom 32px
     b. Error label: Inter 13px weight 600, letter-spacing 0.15em, UPPERCASE, color rgba(196,149,74,0.85) — text: "404 · LẠC LỐI"
     c. Main headline: EB Garamond 64px weight 600, color #F5EDD8, line-height 1.1, letter-spacing -0.02em — text: "Trang Đang Xây Dựng"
     d. Sub-headline (Vietnamese poetic): EB Garamond 22px italic weight 400, color rgba(245,237,216,0.75), line-height 1.5, margin-top 12px — text: "Vùng đất này chưa được khai phá. Hãy quay lại khi những áng mây tan biến..."
     e. Thin horizontal divider: 1px solid rgba(196,149,74,0.20), width 80px, centered, margin 32px auto
     f. Body copy: Inter 16px weight 400, color rgba(245,237,216,0.65), line-height 1.7, text-align center, max-width 480px, margin auto — text: "Trang bạn tìm kiếm vẫn đang trong quá trình phát triển. Lạc Minh Studio đang chuẩn bị những nội dung thú vị sắp ra mắt."
     g. CTA Button: "Quay về Trang Chủ" — bg #C4954A, text #1E1208 (rich dark brown), border-radius 10px, padding 14px 40px, Inter 15px weight 600, letter-spacing 0.05em; shadow: 4px 4px 14px rgba(160,110,40,0.45), -2px -2px 6px rgba(255,220,160,0.2); margin-top 40px; hover: bg #B08030 with shadow contracting
     h. Secondary link below button: "Xem các dự án đang phát triển →" — Inter 14px, color rgba(196,149,74,0.8), hover: #C4954A with underline

3. AMBIENT DECORATIVE ELEMENTS (floating outside panel):
   - 3–4 subtle glowing orbs / bokeh blobs: rgba(196,149,74,0.06)–rgba(196,149,74,0.12), various sizes 80–200px, positioned at corners and mid-edges, blur: 60–120px
   - These are ambient CSS background blobs, not part of the glass panel

4. FOOTER STRIP (bottom of screen, anchored):
   - Very minimal: full-width, transparent bg with subtle top border rgba(196,149,74,0.12)
   - Center-aligned: © 2026 Lạc Minh Studio · All rights reserved
   - Inter 13px, color rgba(245,237,216,0.4)
   - No heavy visual weight — barely there

---

## PROMPT (Round 1 — MOBILE ≤450px)

Same page as PC but adapted for mobile (≤450px). Full-screen glassmorphism Coming Soon / 404 page. Same dark atmospheric background, same mystical Vietnamese mood.

- BACKGROUND: hero_background.png fills full viewport, same dark overlay
- trongdong.png watermark: opacity 0.10, centered behind glass panel, scale 280px
- GLASS PANEL:
  - Width: calc(100% - 32px), margin: 0 16px
  - Padding: 40px 24px
  - Vertically centered (flexbox column, min-height: 100vh)
  - Same glass treatment as PC
- PANEL CONTENT (stacked, centered):
  a. Logo: 44px tall, centered
  b. Error label: Inter 11px, UPPERCASE, letter-spacing 0.15em, rgba(196,149,74,0.85)
  c. Main headline: EB Garamond 42px weight 600, #F5EDD8, line-height 1.15
  d. Sub-headline: EB Garamond 17px italic, rgba(245,237,216,0.75), line-height 1.5
  e. Thin divider: 1px solid rgba(196,149,74,0.20), 60px wide, centered
  f. Body copy: Inter 15px, rgba(245,237,216,0.60), line-height 1.65, text-align center
  g. CTA Button: full-width, padding 15px 24px, same bronze style
  h. Secondary link: Inter 13px, centered, rgba(196,149,74,0.75)
- FOOTER: Same minimal strip, Inter 12px
- Touch targets: all interactive elements ≥ 44px tall
- No horizontal scroll
