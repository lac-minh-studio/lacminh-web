# App Template

Use these templates when setting up a new project for the build loop.

## APP.md Template

```markdown
# App Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It is the project's "Long-Term Memory."
> If `next-prompt.md` has `status: approved`, pick the next screen from Section 5 (Backlog) and start at round 1.

## 1. Core Identity
* **Project Name:** [Your app name]
* **Stitch Project ID:** [Your Stitch project ID]
* **App Type:** [SaaS dashboard / Admin panel / Dev tool / Consumer app / etc.]
* **Primary User:** [Who uses this — role and context]
* **Core Job-to-be-Done:** [The single most important thing the user needs to accomplish]

## 2. Visual Language
*Reference these tokens when prompting Stitch. Every prompt must include the block from Section 6 of DESIGN.md.*

* **Theme:** [Dark / Light / System]
* **Density:** [Compact / Comfortable / Spacious]
* **Style System:** Glassmorphism + Neumorphism hybrid design
* **Primary Surface Rule:** Use Neumorphism for large sections and major layout containers
* **Supporting Surface Rule:** Use Glassmorphism for floating cards, overlays, filters, modals, and secondary panels
* **Depth Language:** layered shadows + frosted glass
* **Stitch desktop canvas:** 1280px max width
* **Desktop scaling:** pc `1280/1920`, laptop `1280/1600`
* **Primary Accent:** [Color name + hex]
* **Font:** [Inter / Geist / System-UI / etc.]
* **Responsive tiers:** pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`

## 3. Architecture & File Structure
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Stitch output:** `.stitch/designs/{screen}/round-{round}.png`
* **Review log:** `.stitch/designs/{screen}/review.md` — append all rounds for that screen into one file
* **Code output:** `src/app/{route}/page.tsx` or `src/components/{Name}.tsx`
* **Project assets:** `public/**/*` — reusable logos, hero images, illustrations, symbols, diagrams, and backgrounds

## 4. Screen Inventory (Current State)
*Update when a screen completes round 6 and is approved.*

* [ ] `dashboard` → `src/app/(app)/dashboard/page.tsx`
* [ ] `settings` → `src/app/(app)/settings/page.tsx`

## 5. Backlog (Screens to Design)
*Pick from here when previous screen is approved. Always start at round 1.*

### High Priority
- [ ] **Screen name:** Brief description of purpose and key components

### Medium Priority
- [ ] **Screen name:** Brief description

## 6. Design Notes
*Constraints and patterns to maintain across all screens.*

1. All screens share the same sidebar/navbar layout component
2. Data tables use consistent column header and row hover styles
3. Large sections and primary surfaces use Neumorphism styling with sculpted depth
4. Floating cards, modal layers, filters, and secondary panels use Glassmorphism with frosted glass treatment
5. Depth is expressed through layered shadows
6. Empty states always include an illustration and a primary CTA
7. Destructive actions require a confirmation dialog
8. Responsive decisions must respect the fixed tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
9. If suitable imagery already exists in `public/`, prompts and code must reuse those files instead of inventing replacements
10. Round 2 and later must edit the previous version instead of regenerating from the original prompt
11. Desktop composition must be designed inside Stitch's 1280px canvas by scaling pc and laptop internals to `1280/1920` and `1280/1600`

## 7. Rules of Engagement
1. Never write code before round 6 is approved.
2. Always document critique of previous round before generating the next.
3. Update `next-prompt.md` before completing every iteration.
4. Mark screens complete in Section 4 only after round 6 passes quality gate.
```

## DESIGN.md Template

Generate using `stitch-design` skill from an existing Stitch screen, or create manually:

```markdown
# Design System: [App Name]
**Project ID:** [Stitch Project ID]

## 1. Visual Theme & Atmosphere
- Style: Glassmorphism + Neumorphism hybrid design
- Large sections: Neumorphism surfaces with soft sculpted depth
- Supporting layers: Glassmorphism panels with frosted glass treatment
- Depth model: layered shadows
- Mood: [professional / playful / data-dense / calm / premium]
- Density: [compact / comfortable / spacious]

## 2. Color Palette & Roles
- **Background** (#hexcode) – Page/app background
- **Surface** (#hexcode) – Card, panel, modal backgrounds
- **Surface Secondary** (#hexcode) – Table row alternates, sidebar bg
- **Border** (#hexcode) – Dividers, input strokes
- **Primary Accent** (#hexcode) – Buttons, links, active states
- **Success** (#hexcode) – Positive states, confirmations
- **Warning** (#hexcode) – Alerts, caution indicators
- **Destructive** (#hexcode) – Delete, error states
- **Text Primary** (#hexcode) – Headlines, labels
- **Text Secondary** (#hexcode) – Body copy, metadata
- **Text Muted** (#hexcode) – Placeholders, disabled labels

## 3. Typography Rules
[Font family, weight scale, size scale, line-height, letter-spacing]
- Display: Xpx / weight / line-height
- Heading: Xpx / weight / line-height
- Body: Xpx / weight / line-height
- Caption/Label: Xpx / weight / line-height
- Code: Monospace font, Xpx

## 4. Component Styles
* **Large Sections:** Neumorphism containers, [radius], soft inset/outset shadows
* **Supporting Panels:** Glassmorphism cards, translucent fill, frosted blur, thin border
* **Buttons:** [Shape, padding, height, states, layered shadow behavior]
* **Inputs:** [Height, border, focus ring color, placeholder style]
* **Cards/Panels:** [Border radius, border color, shadow or flat]
* **Badges/Tags:** [Size, radius, color variants]
* **Tables:** [Header bg, row hover, border style]

## 5. Layout Principles
[Sidebar width, topbar height, content max-width, spacing grid unit, z-index layers]
- Stitch canvas: `1280px` max desktop frame
- Desktop scaling:
	- pc: `1280/1920`
	- laptop: `1280/1600`
- Responsive tiers:
	- pc: `1920` to `1600`
	- laptop: `1600` to `1200`
	- tablet: `1200` to `900`
	- mini-tablet: `900` to `700`
	- mobile: below `700`

## 6. Design System Block for Stitch Prompts
Use this as the authoritative source. Round 1 may inline a fuller version; round 2+ should compress it into a compact design snapshot instead of pasting the whole block again.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Style: Glassmorphism + Neumorphism hybrid design
- Large sections: Neumorphism
- Supporting surfaces: Glassmorphism
- Depth: layered shadows
- Material: frosted glass
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Theme: [Dark/Light], [descriptor]
- Background: [Description] (#hex)
- Surface: [Description] (#hex)
- Primary Accent: [Description] (#hex)
- Text Primary: [Description] (#hex)
- Text Secondary: [Description] (#hex)
- Font: [Family], [base size]px base, [line-height] line-height
- Radius: [X]px cards, [X]px inputs, [X]px badges
- Spacing: [X]px grid unit
- Responsive tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
- Stitch canvas: `1280px` max desktop frame
- Desktop scaling: pc `1280/1920`, laptop `1280/1600`
- Content width targets: pc `1180-1220px`, laptop `1040-1120px` within the 1280px frame
- Overflow rule: no element may exceed the `1280px` frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
```
