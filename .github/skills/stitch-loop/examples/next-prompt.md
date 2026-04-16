---
screen: dashboard
round: 3
mode: edit
base-screen-id: d7237c7d78f44befa4f60afb17c818c1
status: refining
---
ROUND 3 FOCUS: Component Detail

**BASE VERSION (REQUIRED):**
- Previous round: 2
- Screen id: d7237c7d78f44befa4f60afb17c818c1
- Instruction: update from previous version only; do not regenerate from scratch

**SECTION-BY-SECTION REVIEW (REQUIRED):**
- Section 1 — Sidebar: active state exists but is too subtle; add stronger hierarchy and hover feedback
- Section 2 — KPI cards: cards exist but typography and spacing are inconsistent; trend indicators need clearer hierarchy
- Section 3 — Hero/overview panel: shell exists but the locked background asset is not being respected strongly enough
- Section 4 — Chart/table panel: table exists but sort, hover, and selection behaviors are incomplete
- Section 5 — Top actions: button sizing and primary emphasis still do not meet round 3 requirements

**This Round's Goals:**
Refine all major UI components to match the design system precisely.
Focus on: sidebar navigation states, KPI card typographic hierarchy,
data table (header, row hover, checkbox column), and button variants.

**DESIGN SNAPSHOT (COMPACT):**
- Preserve the current palette, typography, materials, and layout hierarchy from the previous version
- Style: Glassmorphism + Neumorphism hybrid design
- Theme: Dark, data-dense, professional
- Primary Accent: #6366f1 (Indigo)
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Stitch canvas: 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

**ASSETS IN THIS ROUND (LOCKED):**
- `/logo.png` — canonical dashboard logo for top navigation and sidebar
- `hero_background.png` — overview background visual for the dashboard hero section
- `void_map.png` — supporting map/diagram visual for analytics storytelling
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

**Component Checklist:**
- [ ] Sidebar: 240px wide, active item = 3px left border #6366f1 + 10% indigo bg tint
- [ ] KPI card: 32px/700 value, 12px/400 label, trend badge (green/red arrow + delta %)
- [ ] Data table header: bg Surface Secondary, 12px uppercase label, sort chevron icon
- [ ] Data table row: hover bg #1e2233, 48px row height, border-bottom Border color
- [ ] Primary button: bg #6366f1, hover #4f46e5, 36px height, 8px radius
- [ ] Secondary button: border Border, bg transparent, hover bg Surface Secondary
