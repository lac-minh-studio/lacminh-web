---
name: stitch-design
description: Prompt enhancement and design system synthesis for Stitch MCP. Transforms vague UI descriptions into precise prompts; builds .stitch/DESIGN.md from existing projects.
---

# Stitch Design Skill

Enhance user prompts and manage the design system for Stitch generation. No HTML files are downloaded — only PNG screenshots are used for review. Store review artifacts under `.stitch/designs/{screen}/` with `round-{N}.png` plus a single `review.md` per screen.

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
- Load design tokens from `.stitch/DESIGN.md` Section 6 if it exists
- Scan `public/**/*.{png,jpg,jpeg,webp,avif,svg}` for reusable local assets
- If the design system is missing or incomplete, default to the fixed responsive tiers, the `Glassmorphism + Neumorphism hybrid design` rules, and the `1280px Stitch canvas` desktop scaling rules

**2. Asset grounding**
- `generate_screen_from_text` and `edit_screens` are text-only calls. Public asset paths are canonical references for layout and visual intent, not binary image uploads.
- If the user requires the exact same image to appear inside the Stitch preview, the asset must be uploaded to the Stitch project manually first. Otherwise, treat the image as a locked reference and reserve its slot for Next.js replacement.
- If the screen needs a logo, hero image, section artwork, symbol, map, or decorative visual, prefer matching files from `public/`
- Inspect the most relevant local assets and summarize them in one line each
- Add a `PROJECT ASSETS (LOCKED - REUSE EXACT FILES)` block with exact public-relative paths such as `/logo.png` or `hero_background.png`
- Use wording such as `do not replace`, `do not reinterpret`, and `do not generate alternative imagery`
- Add `Asset fidelity: use exact project asset files as canonical imagery`
- Add `Preserve native aspect ratio`
- Add `If exact rendering is not possible, keep a locked media slot for Next.js replacement`
- For brand-critical or artwork-critical visuals, prefer a locked media slot over an approximate redraw. Let Next.js perform the final exact asset swap.

**2.5 Prompt size discipline**
- Round 1 may use a fuller prompt, but keep it concise and avoid decorative repetition.
- Round 2 and later must be delta-only edit prompts.
- Do not paste the previous round prompt into the next round.
- Keep the previous version as the source of truth for unchanged layout, palette, typography, and materials.
- Prefer a compact design snapshot for round 2+ instead of re-listing the full design system block.
- List only the assets touched in the current round.
- Target round 2+ prompts at roughly 2000-3500 characters; avoid exceeding 4500 characters.

**3. Terminology mapping** — see [design-mappings.md](references/design-mappings.md)

**4. Final prompt structure:**
```
[Vibe/mood sentence]

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first
- Style: Glassmorphism + Neumorphism hybrid design
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
- Text: [name] (#hex) / [name] (#hex)
- Font: [family], [size]px, [line-height]
- Radius: [Xpx cards / Xpx inputs]
- Responsive tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc `1280/1920`, laptop `1280/1600`
- Content width targets: pc `1180-1220px`, laptop `1040-1120px` within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /path/in/public.ext — [role and one-line visual description]
- /path/in/public.ext — [role and one-line visual description]
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

BASE VERSION (REQUIRED FOR ROUND 2+):
- Previous round: [round number]
- Screen id: [stitch screen id]
- Instruction: update from previous version only; do not regenerate from scratch

SECTION-BY-SECTION REVIEW (REQUIRED FOR ROUND 2+):
- Section 1 — [what exists / what is missing / what must change]
- Section 2 — [what exists / what is missing / what must change]

SCREEN STRUCTURE:
1. [Section]: [component breakdown]
2. [Section]: [component breakdown]
```

For round 2+, prefer this compact structure instead of re-pasting the full round 1 prompt:

```md
ROUND [N] FOCUS: [focus]

BASE VERSION (REQUIRED):
- Previous round: [N-1]
- Screen id: [id]
- Instruction: update from previous version only; do not regenerate from scratch
- Preserve the current palette, typography, materials, section order, and overall layout hierarchy from the previous version
- Treat unchanged areas as locked

DESIGN SNAPSHOT (COMPACT):
- Keep the existing [brand] visual system from the previous version
- Style: Glassmorphism + Neumorphism hybrid design
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Stitch canvas: 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

ASSETS IN THIS ROUND (LOCKED):
- /path/in/public.ext — [role]
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 — [what exists / what is missing / what must change]

THIS ROUND'S CHANGES ONLY:
- [net change 1]
- [net change 2]
```

**5.** Show `outputComponents` suggestions to the user after every Stitch call.

## References
- [design-mappings.md](references/design-mappings.md) — vague → professional term lookup
- [prompt-keywords.md](references/prompt-keywords.md) — Stitch UI vocabulary
- [tool-schemas.md](references/tool-schemas.md) — MCP call signatures
