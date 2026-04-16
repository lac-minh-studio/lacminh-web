---
description: Generate a new screen from a text prompt using Stitch MCP. PNG screenshot only — no HTML download.
---

# Workflow: Text-to-Design

## Steps

1. **Use only for Round 1** — This workflow creates the initial base version. Do not use it for round 2 or later unless the user explicitly approves resetting the design.

2. **Enhance prompt** — Apply the [Prompt Enhancement Pipeline](../SKILL.md#prompt-enhancement-pipeline). Load design tokens from `.stitch/DESIGN.md` if it exists.

3. **Inventory public assets** — Scan `public/` recursively for relevant images. If the screen needs a logo, hero, background, illustration, symbol, or map, inspect the best-matching assets and add a `PROJECT ASSETS (LOCKED - REUSE EXACT FILES)` block with exact public-relative paths, native-aspect-ratio preservation, and a locked-slot fallback for Next.js replacement. These paths are text references only; for exact brand-critical visuals, prefer reserving the slot instead of asking Stitch to repaint the asset from scratch.

4. **Handle exact-image expectations honestly** — If the user requires the exact local image to appear inside the Stitch preview itself, stop and require manual upload of that asset into the Stitch project before generation. The current MCP flow cannot upload local files from `public/`.

5. **Add desktop canvas simulation** — For desktop-first prompts, explicitly include:
   - `Stitch canvas: 1280px max desktop frame`
   - `Desktop scaling: pc 1280/1920, laptop 1280/1600`
   - `Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame`
   - `Overflow rule: no element may exceed the 1280px frame`
   - `Scale behavior: scale typography, spacing, imagery, and component footprints proportionally`
   - `Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements`

6. **Add visible depth recipe** — Every base prompt must explicitly include:
   - `Depth recipe: dual-direction neumorphic shadows`
   - `Glass recipe: translucent fill, background blur, highlight border`
   - `Flat surfaces: forbidden`

7. **Get projectId** — Read from `.stitch/metadata.json`. If missing, call `list_projects`.

8. **Generate screen**
   ```json
   { "projectId": "...", "prompt": "[Enhanced Prompt]", "deviceType": "DESKTOP" }
   ```

9. **Save PNG only** — Create `.stitch/designs/{screen}/` if needed, then download `screenshot.downloadUrl` (append `=w1440`) and save as `.stitch/designs/{screen}/round-{round}.png`. Do NOT download HTML.

10. **Show feedback** — Display `outputComponents` description and suggestions to the user.

11. **Refine** — Once the base layout is acceptable, all following rounds must switch to [edit-design](edit-design.md) and update the existing version rather than generating a fresh variant from the original prompt.
