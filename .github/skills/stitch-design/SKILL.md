---
name: stitch-design
description: Prompt enhancement for Stitch MCP. Optimizes user prompts into precise UI design instructions. Generates both PC and mobile variants per round.
---

# Stitch Design Skill

Optimize user prompts and manage design generation for Stitch. Each round produces **two designs**: a PC (DESKTOP) version and a mobile (MOBILE, max 450px) version. Store review artifacts under `.stitch/designs/{screen}/` with `round-{N}-pc.png`, `round-{N}-mobile.png`, plus a single `review.md` per screen. Mobile PNG review artifacts must be saved at the highest available export resolution.

## Core Responsibility

This skill's job is to **optimize the user's prompt** — not to impose a specific style. The user controls the visual direction through their own prompts and through `.stitch/DESIGN.md` if it exists. The skill enhances clarity, structure, and terminology, then generates both device variants.

## Workflow Routing

| User Intent | Workflow |
|:---|:---|
| "Design a [screen]..." | [text-to-design](workflows/text-to-design.md) |
| "Edit this [screen]..." | [edit-design](workflows/edit-design.md) |
| "Create/Update DESIGN.md" | [generate-design-md](workflows/generate-design-md.md) |

## Prompt Enhancement Pipeline

Run this before every `generate_screen_from_text` or `edit_screens` call.

**1. Context check**
- Get `projectId` from `.stitch/metadata.json` or call `list_projects`
- Load design tokens from `.stitch/DESIGN.md` if it exists — incorporate the user's chosen style, colors, typography, and layout rules into the enhanced prompt
- Scan `public/**/*.{png,jpg,jpeg,webp,avif,svg}` for reusable local assets
- If `.stitch/DESIGN.md` does not exist, rely entirely on the user's prompt for style direction. Do not inject default styles.

**2. Asset grounding**
- `generate_screen_from_text` and `edit_screens` are text-only calls. Public asset paths are canonical references for layout and visual intent, not binary image uploads.
- If the user requires the exact same image to appear inside the Stitch preview, the asset must be uploaded to the Stitch project manually first. Otherwise, treat the image as a locked reference and reserve its slot for Next.js replacement.
- If the screen needs a logo, hero image, section artwork, symbol, map, or decorative visual, prefer matching files from `public/`
- Add a `PROJECT ASSETS (LOCKED - REUSE EXACT FILES)` block with exact public-relative paths
- For brand-critical visuals, prefer a locked media slot over an approximate redraw. Let Next.js perform the final exact asset swap.

**2.5 Prompt size discipline**
- **Round 1 generate:** target ≤ 5000 characters. May be richer than edit prompts but avoid decorative repetition.
- **Round 2+ edit:** delta-only. Target 2000-3500 characters; hard cap 4500 characters.
- Do not paste the previous round prompt into the next round.
- Keep the previous version as the source of truth for unchanged layout and styling.
- **DESIGN.md relaxation:** if `.stitch/DESIGN.md` already encodes all canvas tokens and responsive tiers, only include the 4 compact canvas tokens in the prompt instead of the full canvas spec — saves ~350 characters.
- Without an authoritative DESIGN.md, always include the full canvas spec and all 6 responsive tiers in Round 1.

**3. Terminology mapping** — see [design-mappings.md](resources/design-mappings.md)
- Map vague terms to professional UI/UX terminology
- Improve structure and specificity of layout descriptions
- Clarify component names, spacing intent, and interaction behaviors

**4. Dual-device generation (MANDATORY)**
Every round must produce TWO Stitch calls:

1. **PC version** — `deviceType: "DESKTOP"` — full desktop layout
2. **Mobile version** — `deviceType: "MOBILE"` — optimized for screens ≤450px width, with mobile-appropriate layout adaptations (stacked sections, hamburger nav, simplified grids, touch-friendly targets)

The mobile prompt should adapt the PC prompt to mobile conventions:
- Convert multi-column grids to single-column stacks
- Replace horizontal navbars with hamburger/drawer menus
- Increase touch targets to minimum 44px
- Simplify or collapse secondary content
- Maintain the same visual identity and style as PC
- When saving review artifacts, keep the mobile PNG at the sharpest available export size for easier PC/mobile comparison

**4.5 Canonical title rule (MANDATORY)**
- For every round, compute a local canonical title for each device using this exact pattern:
	- PC: `{screen}-r{round:02d}-desktop`
	- Mobile: `{screen}-r{round:02d}-mobile`
- Save these values into `.stitch/metadata.json` as `pcCanonicalTitle` and `mobileCanonicalTitle`
- Treat the local canonical titles as the source of truth for round tracking
- Do not rely on the Stitch UI title to identify the correct round; Stitch may reuse or synthesize ambiguous titles

**5. Final prompt structure (Round 1):**
```
[User's vibe/mood/style description — enhanced for clarity]

CANVAS & RESPONSIVE SPEC:
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- Full-bleed: all sections span the full 1280px canvas width with 0px outer horizontal margin
- No outer left/right padding on section wrappers
- Responsive tiers: pc 1920-1600, laptop 1600-1200, macbook 1200-900, tablet 900-700, mini-tablet 700-450, mobile <450

[OMIT block above if .stitch/DESIGN.md is authoritative — replace with 4-line compact version below]
[COMPACT CANVAS (when DESIGN.md is authoritative):]
[- 1280px max desktop frame]
[- Overflow rule: no element may exceed the 1280px frame]
[- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally]
[- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements]

DESIGN TOKENS (FROM DESIGN.md OR USER PROMPT):
[Only include if DESIGN.md exists or user specified style tokens]
- [Whatever the user or DESIGN.md defines — colors, fonts, spacing, etc.]

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /path/in/public.ext — [role and one-line visual description]
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SCREEN STRUCTURE:
1. [Section]: [component breakdown]
2. [Section]: [component breakdown]
```

**6. Round 2+ compact structure:**
```md
ROUND [N] FOCUS: [focus]

BASE VERSION (REQUIRED):
- Previous round: [N-1]
- PC screen id: [pc-id]
- Mobile screen id: [mobile-id]
- Instruction: update from previous version only; do not regenerate from scratch
- Preserve all unchanged areas as locked

CANVAS LAYOUT (PERMANENT CONSTRAINT — DO NOT CHANGE):
- Full-bleed: every section wrapper spans the full canvas width with 0px outer horizontal margin
- No left or right padding on any top-level section container
- Background colors, gradients, and images must bleed to the canvas edge
- Inner content may have internal padding, but the outer section wrapper must never shrink from the canvas edge
- VIOLATION: adding any margin, padding, or whitespace to the left or right edge of a section wrapper is a hard defect; reject and revert if detected
- 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 — [what exists / what is missing / what must change]
- Section 2 — [what exists / what is missing / what must change]

CROSS-DEVICE SECTION PARITY (REQUIRED):
- Section 1 — [present in both / intentionally merged on mobile / missing on mobile]
- Section 2 — [present in both / intentionally merged on mobile / missing on mobile]

ASSETS IN THIS ROUND (LOCKED):
- /path/in/public.ext — [role]

THIS ROUND'S CHANGES ONLY:
- [net change 1]
- [net change 2]
```

**7.** Show `outputComponents` suggestions to the user after every Stitch call.

## HTML Download for Code Implementation

When the user selects a specific round to implement as Next.js code:
0. Do not download HTML for exploratory or intermediate review rounds
1. Get the screen details using `get_screen` for both PC and mobile screen IDs from `.stitch/metadata.json`
2. Download the **HTML** from `screenshot.htmlUrl` or the screen's HTML export endpoint for the selected round
3. Save as `.stitch/designs/{screen}/round-{N}-pc.html` and `.stitch/designs/{screen}/round-{N}-mobile.html`
4. The HTML files become the **source of truth** for code conversion — not the PNG screenshots
5. Use the HTML structure, CSS classes, and layout patterns to inform the Next.js implementation

## Resources
- [design-mappings.md](resources/design-mappings.md) — vague → professional term lookup
- [prompt-keywords.md](resources/prompt-keywords.md) — Stitch UI vocabulary
- [tool-schemas.md](resources/tool-schemas.md) — MCP call signatures
