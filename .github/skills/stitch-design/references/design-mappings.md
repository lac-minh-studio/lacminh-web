# Design Mappings & Descriptors

Use these mappings to transform vague user requests into precise, high-fidelity design instructions.

## UI/UX Keyword Refinement

| Vague Term | Enhanced Professional Terminology |
|:---|:---|
| "menu at the top" | "sticky navigation bar with logo and list items" |
| "big photo" | "high-impact hero section with full-width imagery" |
| "list of things" | "responsive card grid with hover states and subtle elevations" |
| "button" | "primary call-to-action button with micro-interactions" |
| "form" | "clean form with labeled input fields, validation states, and submit button" |
| "picture area" | "hero section with focal-point image or video background" |
| "sidebar" | "collapsible side navigation with icon-label pairings" |
| "popup" | "modal dialog with overlay and smooth entry animation" |
| "glass effect" | "glassmorphism support panel with frosted glass treatment, translucent fill, and thin border" |
| "soft section" | "neumorphism primary section with sculpted depth and soft inset/outset shadows" |
| "depth" | "layered shadows with clear foreground-background separation" |
| "transparent card" | "glassmorphism card with frosted blur, translucent background, and subtle border" |
| "big block" | "large section container using neumorphism as the primary surface language" |
| "use my logo" | "use the existing logo asset from the project's public folder as the canonical brand mark; do not invent a replacement" |
| "use my image" | "use the existing project asset from the public folder as the visual source for this section" |
| "keep the old version" | "update from the previous version only; do not regenerate from scratch" |
| "review each part" | "perform a section-by-section review listing what exists, what is missing, what violates the current round, and what must change" |

## Project Asset Grounding

Use local project assets to reduce Stitch inference work whenever imagery already exists in the Next.js project.

| Asset Need | Prompt Language |
|:---|:---|
| Brand logo | "Use `/logo.png` as the canonical logo; preserve its silhouette and proportions." |
| Hero image | "Use `/path/in/public.ext` as the hero visual reference; do not invent a different scene." |
| Section artwork | "Use `/path/in/public.ext` as the section illustration for this content block." |
| Symbol / emblem | "Use `/path/in/public.ext` as the primary symbolic asset in this section." |
| Map / diagram | "Use `/path/in/public.ext` as the visual diagram or map reference rather than synthesizing a new one." |
| Exact asset fidelity | "Asset fidelity: use exact project asset files as canonical imagery; preserve native aspect ratio; do not crop or reinterpret into a different subject." |
| Locked fallback | "If exact rendering is not possible, keep a locked media slot for Next.js replacement rather than generating substitute imagery." |

**Asset prompt rule:**
- Always use root-relative public paths such as `/logo.png` or `hero_background.png`
- Add one short visual description after each path
- Prefer existing project assets over generic generated imagery whenever there is a match
- Use `LOCKED - REUSE EXACT FILES` wording when the asset is mandatory
- Add `Asset fidelity: use exact project asset files as canonical imagery`
- Add `Preserve native aspect ratio`
- Add `If exact rendering is not possible, keep a locked media slot for Next.js replacement`
- If Stitch cannot render the exact local file, ask for a locked media slot and replace it with the real asset in Next.js

## Iterative Review Language

Use these phrases to force true version-to-version refinement instead of fresh regeneration.

| Intent | Prompt Language |
|:---|:---|
| Preserve lineage | "Update from the previous version only; do not regenerate from scratch." |
| Reference current base | "Base version: round [N-1], screen id [id]." |
| Review all sections | "Section-by-section review covering every visible section in the current screen." |
| Explain delta | "For each section: what exists, what is missing, what violates the current round focus, and what must change." |
| Lock imagery | "Use the provided project asset as a locked visual source; do not replace or reinterpret it." |

## Atmosphere & "Vibe" Descriptors

Add these adjectives to set the mood and aesthetic philosophy:

| Basic Vibe | Enhanced Design Description |
|:---|:---|
| "Modern" | "Clean, minimal, with generous whitespace and high-contrast typography." |
| "Professional" | "Sophisticated, trustworthy, utilizing subtle shadows and a restricted, premium palette." |
| "Fun / Playful" | "Vibrant, organic, with rounded corners, bold accent colors, and bouncy micro-animations." |
| "Dark Mode" | "Electric, high-contrast accents on deep slate or near-black backgrounds." |
| "Luxury" | "Elegant, spacious, with fine lines, serif headers, and a focus on high-fidelity photography." |
| "Tech / Cyber" | "Futuristic, neon accents, glassmorphism effects, and technological monospaced typography." |
| "Calm / Premium" | "Layered, restrained, and polished with frosted glass support panels, sculpted neumorphism sections, and soft depth transitions." |

## Hybrid Design System Defaults

Use these mappings whenever the project does not explicitly override the default style system.

| Intent | Required Design Language |
|:---|:---|
| Large main section | "Neumorphism primary surface with sculpted depth" |
| Secondary floating panel | "Glassmorphism support panel with frosted glass" |
| Card stack depth | "Layered shadows with clear elevation hierarchy" |
| Overlay / modal | "Frosted glass overlay with translucent surface and thin border" |
| Toolbar / filter bar | "Glassmorphism utility layer above a neumorphism base section" |
| Dashboard shell | "Neumorphism layout containers with glassmorphism detail panels" |
| Strong depth cue | "Dual-direction neumorphic shadows with visible highlight and cast shadow separation" |
| Glass detail cue | "Translucent fill, background blur, and highlight border" |
| Anti-flatness | "Flat surfaces are forbidden; every major surface must show visible depth or layered material behavior" |

**Mandatory default phrasing:**
- `Glassmorphism + Neumorphism hybrid design`
- `Neumorphism for large sections`
- `Glassmorphism for supporting surfaces`
- `layered shadows`
- `frosted glass`
- `Depth recipe: dual-direction neumorphic shadows`
- `Glass recipe: translucent fill, background blur, highlight border`
- `Flat surfaces: forbidden`

## Geometry & Shape Translation

Convert technical values into physical descriptions for Stitch:

- **Pill-shaped**: Used for `rounded-full` elements (buttons, tags).
- **Softly rounded**: Used for `rounded-xl` (12px) or `rounded-2xl` (16px) containers.
- **Sharp/Precise**: Used for `rounded-none` or `rounded-sm` elements.
- **Glassmorphism**: Semi-transparent surfaces with background blur and thin borders.
- **Neumorphism**: Softly sculpted surfaces using gentle inset/outset shadows for large sections.

## Depth & Elevation

- **Flat**: No shadows, focus on color blocking and borders.
- **Whisper-soft**: Diffused, light shadows for subtle lift.
- **Floating**: High-offset, soft shadows for elements that appear high above the surface.
- **Inset**: Inner shadows for pressable or nested elements.
- **Layered shadows**: Multiple depth levels separating major sections, support panels, and floating controls.
- **Frosted glass**: Translucent support surface with blur, thin border, and soft reflected highlights.

## Responsive Tier Mapping

These responsive tiers are fixed defaults and must remain represented in generated design systems and compact prompt snapshots unless the user explicitly overrides them.

| Width Range | Tier Name | Prompt Language |
|:---|:---|:---|
| `1920` to `1600` | `pc` | "pc layout with full desktop density and maximum content width" |
| `1600` to `1200` | `laptop` | "laptop layout preserving desktop hierarchy with moderate compression" |
| `1200` to `900` | `tablet` | "tablet layout with simplified columns and tighter spacing" |
| `900` to `700` | `mini-tablet` | "mini-tablet layout with stacked support panels and reduced chrome" |
| `<700` | `mobile` | "mobile layout with single-column flow and touch-first spacing" |

**Mandatory responsive phrasing:**
- `Responsive tiers: pc 1920-1600, laptop 1600-1200, tablet 1200-900, mini-tablet 900-700, mobile <700`

## Stitch Canvas Simulation

Stitch desktop renders are constrained to a `1280px` maximum width. Use the following prompt language to preserve large-screen hierarchy inside that constraint.

| Desktop Target | Prompt Language |
|:---|:---|
| pc | "Stitch canvas: 1280px max desktop frame; simulate pc proportions by scaling internal desktop elements to 1280/1920." |
| laptop | "Stitch canvas: 1280px max desktop frame; simulate laptop proportions by scaling internal elements to 1280/1600." |
| overflow guard | "Overflow rule: no element may exceed the 1280px frame." |
| proportional scale | "Scale typography, spacing, imagery, and component footprints proportionally; do not keep 1920-sized elements inside a 1280 frame." |
| density fill | "Fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements." |
| content width budget | "Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame." |

**Mandatory desktop scaling phrasing:**
- `Stitch canvas: 1280px max desktop frame`
- `Desktop scaling: pc 1280/1920, laptop 1280/1600`
- `Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame`
- `Overflow rule: no element may exceed the 1280px frame`
- `Scale behavior: scale typography, spacing, imagery, and component footprints proportionally`
- `Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements`
