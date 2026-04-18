---
description: Edit existing Stitch screens (both PC and mobile) with a targeted prompt. PNG screenshots for review, HTML only for the round selected for code implementation.
---

# Workflow: Edit-Design

## Steps

1. **Use for Round 2 and later** — This workflow must update the previous versions. Do not restart from the original concept prompt.

2. **Identify the current base versions** — Get `projectId`, the latest `pcId`, and `mobileId` from `.stitch/metadata.json`, or call `list_screens`. These are the versions to edit.

3. **Handle exact-image expectations honestly** — If the user requires the exact local image to appear inside the Stitch preview itself, require manual upload of that asset into the Stitch project before editing.

4. **Re-check public assets** — If the edit touches a logo, hero, section image, symbol, background, or illustration, scan `public/` for the matching file and ground the edit in the exact public-relative path.

5. **Write a precise edit prompt** — The prompt must include:
   - `BASE VERSION (REQUIRED)` — previous round number plus the current PC and mobile screen IDs
   - `SECTION-BY-SECTION REVIEW (REQUIRED)` — every visible section: what exists, what is missing, what layout issues exist (overlapping elements, broken alignment, overflow), what must change
   - `CROSS-DEVICE SECTION PARITY (REQUIRED)` — compare PC and mobile and confirm every intended section exists in both variants, or explain any intentional mobile merge/collapse
   - `Preserve all unchanged areas as locked`
   - `Instruction: update from previous version only; do not regenerate from scratch`
   - `ASSETS IN THIS ROUND (LOCKED)` — only the exact root-relative public paths touched by this round
   - `THIS ROUND'S CHANGES ONLY` — net changes for the next edit

   **Layout focus (CRITICAL):** Pay special attention to:
   - Elements overlapping or being clipped by other elements
   - Broken alignment or inconsistent spacing
   - Content overflow or elements breaking out of containers
   - Missing components that should exist from previous rounds
   - Core sections that exist on PC but disappear on mobile without explicit intent
   - Incomplete or partially rendered elements

Be specific:
   - Location: `"Change the [component] in the [section]..."`
   - Visual: `"...to #hex and add a subtle shadow"`
   - Structure: `"Add a [new element] next to [existing element]"`
   - Assets: `"Use /path/in/public.ext as the canonical image for this area; do not replace"`

Keep round 2+ prompts compact:
   - Target roughly `2000-3500` characters.
   - Avoid exceeding `4500` characters.
   - Do not paste the previous prompt body into the next prompt.  

6. **Apply the edit to BOTH device variants (MANDATORY)**

   **6a. PC version:**
   ```json
   { "projectId": "...", "selectedScreenIds": ["[pcId]"], "prompt": "[Edit prompt — PC context]" }
   ```

   **6b. Mobile version:**
   ```json
   { "projectId": "...", "selectedScreenIds": ["[mobileId]"], "prompt": "[Edit prompt — adapted for mobile layout]" }
   ```

7. **Save updated PNGs** — Save both:
   - PC: `.stitch/designs/{screen}/round-{round}-pc.png`
   - Mobile: `.stitch/designs/{screen}/round-{round}-mobile.png` at the highest available export resolution
   - Do not downscale the mobile PNG after download
   - Keep previous round files intact for design lineage
   - Append round notes to `.stitch/designs/{screen}/review.md`
   - Do not download HTML during edit rounds; HTML export is reserved for the round locked for implementation

8. **Update metadata** — Update both `pcId` and `mobileId` in `.stitch/metadata.json` to the latest screen IDs, and overwrite the canonical titles for the current round using the exact naming convention `{screen}-r{round:02d}-{device}`:
   - `pcCanonicalTitle`: `{screen}-r{round:02d}-desktop`
   - `mobileCanonicalTitle`: `{screen}-r{round:02d}-mobile`

   These local canonical titles are the authoritative round names for the workflow. Do not rely on the Stitch UI title to identify the correct version.

9. **Show feedback** — Display `outputComponents` to the user.

10. **Repeat if needed** — One focused edit per call is better than batching many changes, but it must always be anchored to the previous version.

11. **Fail the round if layout is broken** — If the edited output has overlapping elements, broken alignment, content overflow, missing components from prior rounds, or a core section present on PC but missing on mobile without explanation, treat that round as failed and tighten the next edit prompt instead of advancing.
