---
description: Edit an existing Stitch screen with a targeted prompt. PNG screenshot only — no HTML download.
---

# Workflow: Edit-Design

## Steps

1. **Use for Round 2 and later** — This workflow must update the previous version. Do not restart from the original concept prompt.

2. **Identify the current base version** — Get `projectId` and the latest `screenId` from `.stitch/metadata.json`, or call `list_screens`. The selected screen is the version to edit.

3. **Handle exact-image expectations honestly** — If the user requires the exact local image to appear inside the Stitch preview itself, require manual upload of that asset into the Stitch project before editing. The current MCP flow cannot upload local files from `public/`.

4. **Re-check public assets** — If the edit touches a logo, hero, section image, symbol, background, or illustration, scan `public/` for the matching file and ground the edit in the exact public-relative path.

5. **Write a precise edit prompt** — The prompt must include:
   - `BASE VERSION (REQUIRED)` — previous round number and current screen id
   - `SECTION-BY-SECTION REVIEW (REQUIRED)` — every visible section, what exists, what is missing, what violates the current round focus, what must change
   - a compact preservation line such as `Preserve the current palette, typography, materials, section order, and overall layout hierarchy from the previous version`
   - a lock line such as `Treat unchanged areas as locked`
   - `DESIGN SNAPSHOT (COMPACT)` — carry only the essential style and 1280-canvas constraints needed to prevent drift
   - `ASSETS IN THIS ROUND (LOCKED)` — only the exact root-relative public paths touched by this round
   - `Asset fidelity: use exact project asset files as canonical imagery`
   - `Preserve native aspect ratio`
   - `If exact rendering is not possible, keep a locked media slot for Next.js replacement`
   - `Instruction: update from previous version only; do not regenerate from scratch`
   - `Depth recipe: dual-direction neumorphic shadows`
   - `Glass recipe: translucent fill, background blur, highlight border`
   - `Flat surfaces: forbidden`
   - `Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame`
   - `Overflow rule: no element may exceed the 1280px frame`
   - `Scale behavior: scale typography, spacing, imagery, and component footprints proportionally`
   - `Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements`
   - `THIS ROUND'S CHANGES ONLY` — net changes for the next edit, without re-listing the original round 1 concept

Be specific:
   - Location: `"Change the [component] in the [section]..."`
   - Visual: `"...to #hex and add a subtle shadow"`
   - Structure: `"Add a [new element] next to [existing element]"`
   - Assets: `"Use /path/in/public.ext as the canonical image for this area; do not replace, reinterpret, or invent a replacement"`
   - Scale: `"Shrink typography, spacing, and imagery to the 1280 canvas budget; do not let any element overflow horizontally"`
   - Density: `"Use the recovered whitespace for supporting modules, metadata, secondary panels, or narrative content instead of enlarging the hero block"`

Keep round 2+ prompts compact:
   - Target roughly `2000-3500` characters.
   - Avoid exceeding `4500` characters.
   - Do not paste the previous prompt body into the next prompt.
   - Do not re-list unchanged section specs from round 1.

6. **Apply the edit**
   ```json
   { "projectId": "...", "selectedScreenIds": ["..."], "prompt": "[Edit prompt]" }
   ```

7. **Save updated PNG only** — Save the edited result as `.stitch/designs/{screen}/round-{round}.png`. Keep the previous round files intact in the same screen folder so the design lineage remains visible, and keep round notes consolidated in `.stitch/designs/{screen}/review.md`.

8. **Show feedback** — Display `outputComponents` to the user.

9. **Repeat if needed** — One focused edit per call is better than batching many changes, but it must always be anchored to the previous version rather than the original round 1 concept.

10. **Fail the round if these are still missing** — If the edited output still invents replacement imagery, still overflows the 1280 frame, or still looks visually flat without visible depth separation, treat that round as failed and tighten the next edit prompt instead of advancing blindly.
