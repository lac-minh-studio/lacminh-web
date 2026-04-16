# Design System: Lạc Minh Studio
**Project ID:** 15105611068859615529

## 1. Visual Theme & Atmosphere
- **Style:** Glassmorphism + Neumorphism hybrid design
- **Large sections:** Neumorphism surfaces — soft sculpted depth, embossed/debossed tactile feel
- **Supporting layers:** Glassmorphism panels — frosted glass with translucent fill and backdrop blur
- **Depth model:** Dual-direction neumorphic shadows (light from top-left, dark to bottom-right) + frosted glass layers
- **Mood:** Huyền sử — ấm, sáng, tinh tế, cao cấp (mystical heritage — warm, luminous, refined, premium)
- **Density:** Comfortable — đầy vừa, không tràn
- **Flat surfaces:** Forbidden — every surface must express depth through shadow or glass layers

## 2. Color Palette & Roles
- **Background** `#EDE0C5` — Warm Cream (kem ấm) — Page/app background, large section base
- **Surface** `#D8CAAF` — Parchment Gray (xám da) — Card and panel backgrounds, neumorphic surfaces
- **Surface Dark** `#2D4538` — Deep Moss Green (xanh rêu đậm) — Dark accent sections, footer, dividers, CTA sections
- **Surface Glass** `rgba(237,224,197,0.45)` — Frosted Cream Glass — Glassmorphic card overlays, modals, navbar blur
- **Primary Accent** `#C4954A` — Warm Bronze (đồng ấm) — Buttons, links, active states, CTAs, highlights
- **Secondary Accent** `#B08030` — Muted Gold — Hover states, decorative borders, stat strip numbers
- **Success** `#4A7C59` — Moss Green — Positive states, confirmations
- **Warning** `#C4854A` — Amber — Alerts, caution indicators
- **Destructive** `#9C3A2A` — Deep Red — Delete, error states
- **Text Primary** `#1E1208` — Rich Dark Brown — Headlines, labels on light backgrounds
- **Text Light** `#F5EDD8` — Off-white Cream — Text on dark sections (Surface Dark)
- **Text Secondary** `#5A4228` — Medium Warm Brown — Body copy, metadata
- **Text Muted** `#8A7560` — Muted Warm Brown — Placeholders, disabled labels, captions
- **Border** `rgba(196,149,74,0.25)` — Bronze Ghost Border — Subtle dividers, input strokes, card edges

### Color Notes
- **NEVER use:** #a855f7 (neon purple), #3b82f6 (electric blue), #7c3aed (violet neon), #000000 (pure black)
- **NEVER use:** pure white (#ffffff) — use `#F5EDD8` instead for light text
- **Decorative gold glow:** rgba(196,149,74,0.15) on dark sections for ambient warmth

## 3. Typography Rules
- **Display headline:** EB Garamond, 72–96px, weight 600, line-height 1.1, letter-spacing -0.02em — for hero titles
- **Section heading (H2):** EB Garamond, 44–52px, weight 500, line-height 1.2, letter-spacing -0.01em
- **Sub-heading (H3):** EB Garamond, 28–36px, weight 500, line-height 1.3
- **Body large:** Inter, 18px, weight 400, line-height 1.7, letter-spacing 0.01em
- **Body regular:** Inter, 16px, weight 400, line-height 1.65
- **Caption / Label:** Inter, 13–14px, weight 500, letter-spacing 0.08em, UPPERCASE for section labels
- **Button text:** Inter, 15px, weight 600, letter-spacing 0.05em
- **CJK/Vietnamese note:** All Vietnamese diacritic text must render cleanly — EB Garamond and Inter both support Vietnamese Unicode fully

## 4. Component Styles

### Navbar
- Fixed top, full-width, glassmorphic: `rgba(237,224,197,0.75)` bg, `backdrop-blur: 16px`, thin bronze ghost border bottom
- Logo left, nav links center, CTA button right
- Nav links: Inter 15px, weight 500, #5A4228 — hover: #C4954A with underline slide-in
- Mobile: hamburger drawer with frosted glass panel

### Large Sections (Neumorphic)
- Background: `#EDE0C5` or `#D8CAAF`
- Depth: `box-shadow: 8px 8px 20px #C8B892, -8px -8px 20px #FFFFFF90`
- Border radius: 16px for section containers, 12px for cards
- Surface feel: soft embossed — not flat, not harsh

### Supporting Panels (Glassmorphic)
- Background: `rgba(237,224,197,0.45)` with `backdrop-filter: blur(16px)`
- Border: 1px solid `rgba(196,149,74,0.3)` — subtle gold ghost border
- Border radius: 14px for cards, 10px for compact panels

### Dark Accent Sections (Moss Forest)
- Background: `#2D4538` — Deep Moss Green
- Text: `#F5EDD8` (off-white cream)
- Decorative element: bronze/gold `#C4954A` accent borders and stat numbers
- Glassmorphic cards on dark: `rgba(45,69,56,0.6)` with gold border

### Buttons
- **Primary CTA:** bg `#C4954A`, text white/cream, border-radius 8px, padding 14px 32px
  - Shadow: `box-shadow: 4px 4px 10px rgba(160,110,40,0.4), -2px -2px 6px rgba(255,220,160,0.3)`
  - Hover: bg `#B08030`, shadow contracts (neumorphic press)
  - Active: inset shadow (pressed state)
- **Secondary outline:** border 1.5px solid `#C4954A`, text `#C4954A`, transparent bg
  - Hover: bg `rgba(196,149,74,0.1)`
- **Ghost on dark section:** border 1px `rgba(245,237,216,0.4)`, text `#F5EDD8` 
  - Hover: bg `rgba(245,237,216,0.1)`

### Inputs / Contact Form
- Height: 52px, border-radius 10px
- Background: `rgba(237,224,197,0.6)` (glassmorphic inside dark section), or `#D8CAAF` (neumorphic on light)
- Border: 1.5px `rgba(196,149,74,0.35)` — bronze ghost
- Focus ring: 2px `#C4954A` with glow `rgba(196,149,74,0.25)`
- Placeholder: `#8A7560` (muted warm brown)
- Textarea: min-height 160px, same treatment

### Game Project Cards (Gallery)
- 3-column grid on desktop (pc/laptop), 2-column tablet, 1-column mobile
- Card: glassmorphic `rgba(237,224,197,0.4)`, border `rgba(196,149,74,0.3)`, radius 16px
- Image area: 16:9 aspect ratio — locked slot for game artwork
- Hover: card lifts — shadow expands, image scales 1.04, overlay CTA fades in
- CTA overlay: `rgba(45,69,56,0.75)` with "Xem chi tiết" button in bronze

### Roadmap / Timeline
- Horizontal timeline on desktop, vertical on mobile
- Step nodes: neumorphic circles on warm cream background
- Active step: filled warm bronze circle with glow
- Connector: dashed `rgba(196,149,74,0.4)` line
- Content: glassmorphic card attached below/right each node

### Stat Strip
- Background: `#2D4538` or glassmorphic overlay on hero
- Numbers: EB Garamond 52px, `#C4954A` (warm bronze), weight 600
- Labels: Inter 13px, `#F5EDD8`, uppercase, letter-spacing 0.1em
- 4-column horizontal strip

## 5. Layout Principles
- **Stitch canvas:** `1280px` max desktop frame
- **Desktop scaling:**
  - pc: `1280/1920`
  - laptop: `1280/1600`
- **Content width targets:**
  - pc: `1180–1220px` within 1280px frame
  - laptop: `1040–1120px` within 1280px frame
- **Overflow rule:** no element may exceed the 1280px frame
- **Scale behavior:** scale typography, spacing, imagery, and component footprints proportionally
- **Density rule:** fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- **Responsive tiers:**
  - pc: `1920` to `1600`
  - laptop: `1600` to `1200`
  - tablet: `1200` to `900`
  - mini-tablet: `900` to `700`
  - mobile: below `700`

### Section Spacing
- Hero: min-height 90vh (desktop), full-bleed background
- Section vertical padding: 80–100px on desktop
- Section max-width: 1200px centered
- Grid gutter: 24px desktop, 16px tablet

## 6. Design System Block for Stitch Prompts
Use this as the authoritative source. Round 1 may inline a fuller version; round 2+ should compress it into a compact design snapshot instead of pasting the entire block again.

```
DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first
- Style: Glassmorphism + Neumorphism hybrid design
- Large sections: Neumorphism — warm cream (#EDE0C5) soft sculpted surfaces with dual-direction shadows
- Supporting surfaces: Glassmorphism — frosted cream glass rgba(237,224,197,0.45), backdrop-blur 16px, bronze ghost border rgba(196,149,74,0.3)
- Depth: layered shadows — neumorphic outer shadow + inner glass highlight create dimensional depth
- Material: frosted glass — backdrop-filter blur on all supporting surface overlays
- Depth recipe: dual-direction neumorphic shadows (box-shadow: 8px 8px 20px #C8B892, -8px -8px 20px #FFFFFF90)
- Glass recipe: translucent fill, background blur, highlight border (rgba(237,224,197,0.45), backdrop-blur 16px, rgba(196,149,74,0.3) bronze ghost)
- Flat surfaces: forbidden — every surface must show neumorphic sculpt or glass layer
- Background: Warm Cream (#EDE0C5)
- Surface: Parchment Gray (#D8CAAF)
- Surface Dark: Deep Moss Green (#2D4538) — use for hero overlays, footer, CTA sections
- Primary Accent: Warm Bronze (#C4954A) — buttons, stat numbers, active states
- Secondary Accent: Muted Gold (#B08030) — hover states, decorative elements
- Text Primary: Rich Dark Brown (#1E1208) on light sections
- Text Light: Off-white Cream (#F5EDD8) on dark sections
- Text Secondary: Medium Warm Brown (#5A4228)
- Text Muted: Muted Warm Brown (#8A7560)
- Heading Font: EB Garamond — Display 72-96px / H2 44-52px / H3 28-36px
- Body Font: Inter — Body 16-18px / Label 13-14px uppercase
- Radius: 16px cards / 10px inputs / 8px buttons
- Responsive tiers: pc 1920-1600, laptop 1600-1200, tablet 1200-900, mini-tablet 900-700, mobile <700
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- FORBIDDEN colors: neon purple, electric blue, pure black (#000000), pure white (#ffffff)
```
