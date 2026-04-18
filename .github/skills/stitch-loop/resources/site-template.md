# App Template

Use these templates when setting up a new project for the build loop.

## APP.md Template

```markdown
# App Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It is the project's "Long-Term Memory."
> To resume a screen, read its baton from `.stitch/designs/{screen}/baton.md`. If a screen has `status: approved`, pick the next screen from Section 5 (Backlog) and create a new baton at `.stitch/designs/{next-screen}/baton.md` starting at round 1.

## 1. Core Identity
* **Project Name:** [Your app name]
* **Stitch Project ID:** [Your Stitch project ID]
* **App Type:** [SaaS dashboard / Admin panel / Dev tool / Consumer app / etc.]
* **Primary User:** [Who uses this — role and context]
* **Core Job-to-be-Done:** [The single most important thing the user needs to accomplish]

## 2. Visual Language
*Reference these tokens when prompting Stitch. Copy from `DESIGN.md` if it exists.*

* **Theme:** [Dark / Light / System]
* **Density:** [Compact / Comfortable / Spacious]
* **Style:** [User's chosen style — define freely]
* **Primary Accent:** [Color name + hex]
* **Font:** [Inter / Geist / System-UI / etc.]

## 3. Architecture & File Structure
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Stitch output (per round):**
  - `.stitch/designs/{screen}/round-{round}-pc.png`
  - `.stitch/designs/{screen}/round-{round}-mobile.png`
* **HTML download (for code):**
  - `.stitch/designs/{screen}/round-{round}-pc.html`
  - `.stitch/designs/{screen}/round-{round}-mobile.html`
* **Review log:** `.stitch/designs/{screen}/review.md` — append all rounds in one file
* **Code output:** `src/app/{route}/page.tsx` or `src/components/{Name}.tsx`
* **Project assets:** `public/**/*` — reusable logos, hero images, illustrations, symbols

## 4. Screen Inventory (Current State)
*Update when a screen is approved.*

* [ ] `home` → `src/app/page.tsx`
* [ ] `dashboard` → `src/app/(app)/dashboard/page.tsx`

## 5. Backlog (Screens to Design)
*Pick from here when previous screen is approved. Always start at round 1.*

### High Priority
- [ ] **Screen name:** Brief description of purpose and key components

### Medium Priority
- [ ] **Screen name:** Brief description

## 6. Design Notes
*Constraints and patterns to maintain across all screens.*

1. All screens share the same navigation/layout component — do not redesign per page
2. Shared components (navbar, footer, sidebar) must look identical across all pages
3. When starting a new page, reference the style of previously approved pages for consistency
4. Empty states always include an illustration and a primary CTA
5. Destructive actions require a confirmation dialog
6. If suitable imagery already exists in `public/`, prompts and code must reuse those files
7. Round 2 and later must edit the previous version instead of regenerating
8. Every round produces BOTH a PC and a mobile design

## 7. Rules of Engagement
1. Never write code before the design is approved.
2. Code must be generated from HTML downloads, not from screenshots.
3. Always document critique of previous round before generating the next.
4. Write back to `.stitch/designs/{screen}/baton.md` before completing every iteration. Never overwrite another screen's baton.
5. Mark screens complete in Section 4 only after quality gate passes.
6. Maintain visual consistency across all pages in the project.
```

## DESIGN.md Template

Generate using `stitch-design` skill from an existing Stitch screen, or create manually based on the user's style preferences:

```markdown
# Design System: [App Name]
**Project ID:** [Stitch Project ID]

## 1. Visual Theme & Atmosphere
- Style: [User's chosen style — describe freely]
- Mood: [professional / playful / data-dense / calm / premium / etc.]
- Density: [compact / comfortable / spacious]

## 2. Color Palette & Roles
- **Background** (#hexcode) – Page/app background
- **Surface** (#hexcode) – Card, panel, modal backgrounds
- **Surface Secondary** (#hexcode) – Table row alternates, sidebar bg
- **Border** (#hexcode) – Dividers, input strokes
- **Primary Accent** (#hexcode) – Buttons, links, active states
- **Success** (#hexcode) – Positive states
- **Warning** (#hexcode) – Alerts
- **Destructive** (#hexcode) – Delete, error states
- **Text Primary** (#hexcode) – Headlines, labels
- **Text Secondary** (#hexcode) – Body copy, metadata
- **Text Muted** (#hexcode) – Placeholders, disabled labels

## 3. Typography Rules
- Font: [family], [base size]px, [line-height]
- Display / Heading / Body / Caption sizes and weights

## 4. Component Styles
- [Describe observed/desired component patterns]
- Buttons: [shape, padding, height, states]
- Inputs: [height, border, focus ring]
- Cards: [radius, border, shadow]

## 5. Layout Principles
- [Sidebar width, topbar height, content max-width, spacing grid unit]
- Responsive tiers: [whatever the user defines]

## 6. Stitch Prompt Block (copy into every baton)
[Compile the design tokens into a compact block for Stitch prompts]
```
