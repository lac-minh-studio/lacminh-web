---
description: Analyze a Stitch project's screenshot and synthesize design tokens into .stitch/DESIGN.md with fixed responsive tiers and hybrid design system.
---

# Workflow: Generate DESIGN.md

## Hard Rules

1. **Responsive rules are fixed and must always be written into `DESIGN.md`:**
	- `1920` to `1600` → `pc`
	- `1600` to `1200` → `laptop`
	- `1200` to `900` → `tablet`
	- `900` to `700` → `mini-tablet`
	- below `700` → `mobile`
2. **Design language is fixed and must always be written into `DESIGN.md`:**
	- Overall style: `Glassmorphism + Neumorphism hybrid design`
	- **Neumorphism** is the primary style for large sections, layout containers, and major surfaces
	- **Glassmorphism** is the supporting style for overlays, floating cards, modals, filters, and secondary panels
	- The final visual system must explicitly mention `layered shadows` and `frosted glass`
 	- The final visual system must explicitly mention `dual-direction neumorphic shadows`, `translucent fill`, `background blur`, and `highlight border`
 	- The final visual system must explicitly state `flat surfaces: forbidden`
3. **Desktop canvas rules are fixed and must always be written into `DESIGN.md`:**
	- Stitch desktop canvas is treated as `1280px max width`
	- `pc` layouts targeting `1920` must scale internal proportions by `1280/1920`
	- `laptop` layouts targeting `1600` must scale internal proportions by `1280/1600`
	- prompts must define `content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame`
	- prompts must define `overflow rule: no element may exceed the 1280px frame`
	- prompts must define `scale behavior: scale typography, spacing, imagery, and component footprints proportionally`
	- prompts must define `density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements`

## Steps

1. **Get project** — Read `projectId` from `.stitch/metadata.json` or call `list_projects`.
2. **Get a representative screen** — Call `list_screens`, then `get_screen` to retrieve `screenshot.downloadUrl`.
3. **Analyze the screenshot** — Extract from the visual: color roles, font, spacing density, border radius, shadow style. Then normalize the result to the mandatory design system above:
	- large sections and primary surfaces must be described with **Neumorphism** traits
	- supporting layers must be described with **Glassmorphism** traits
	- depth must be described as **layered shadows**
	- translucent support surfaces must be described as **frosted glass**
	- section depth must be described with **dual-direction neumorphic shadows**
	- glass surfaces must be described with **translucent fill, background blur, and highlight border**
	- flat surfaces must be treated as a design defect
4. **Write `.stitch/DESIGN.md`** with this structure:

```markdown
# Design System: [Project Title]
**Project ID:** [projectId]

## 1. Atmosphere
- Style: Glassmorphism + Neumorphism hybrid design
- Large sections: Neumorphism surfaces with soft depth and sculpted separation
- Supporting layers: Glassmorphism panels with frosted glass treatment
- Depth model: layered shadows
- Visual tone: [e.g., dark / compact / professional]

## 2. Color Roles
- Background: [name] (#hex)
- Surface: [name] (#hex)
- Surface Secondary: [name] (#hex)
- Border: [name] (#hex)
- Accent: [name] (#hex)
- Success/Warning/Destructive: (#hex each)
- Text Primary: (#hex) / Text Secondary: (#hex) / Text Muted: (#hex)

## 3. Typography
- Font: [family], [base]px, [line-height]
- Scale: display / heading / body / caption sizes

## 4. Component Styles
- Large sections: Neumorphism containers, [radius], soft inset/outset shadows
- Supporting panels: Glassmorphism cards, translucent background, frosted blur, thin border
- Depth recipe: dual-direction neumorphic shadows with visible highlight and cast shadow separation
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Buttons: [height, radius, padding, layered shadow behavior]
- Inputs: [height, border, focus ring, frosted or solid usage]
- Cards: [radius, border, shadow]

## 5. Layout & Responsive Rules
- Sidebar: [width] / Topbar: [height] / Content max-width: [px] / Grid unit: [px]
- Stitch canvas: `1280px` max desktop frame
- Desktop scaling:
	- pc: `1280/1920`
	- laptop: `1280/1600`
- Content width targets: `pc 1180-1220px`, `laptop 1040-1120px` within the `1280px` frame
- Overflow rule: no element may exceed the `1280px` frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- Responsive tiers:
	- pc: `1920` to `1600`
	- laptop: `1600` to `1200`
	- tablet: `1200` to `900`
	- mini-tablet: `900` to `700`
	- mobile: below `700`

## 6. Stitch Prompt Block (copy into every baton)
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Large sections: Neumorphism
- Supporting surfaces: Glassmorphism
- Depth: layered shadows
- Material: frosted glass
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Background: [name] (#hex)
- Surface: [name] (#hex)
- Accent: [name] (#hex)
- Text: [primary (#hex)] / [secondary (#hex)]
- Font: [family], [size]px, [line-height]
- Radius: [X]px cards / [X]px inputs
- Spacing unit: [X]px
- Responsive tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
- Stitch canvas: `1280px` max desktop frame
- Desktop scaling: pc `1280/1920`, laptop `1280/1600`
- Content width targets: pc `1180-1220px`, laptop `1040-1120px` within the `1280px` frame
- Overflow rule: no element may exceed the `1280px` frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
```
