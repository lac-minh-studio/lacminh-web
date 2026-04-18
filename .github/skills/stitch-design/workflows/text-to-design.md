---
description: Generate a new screen from a text prompt using Stitch MCP. Produces both PC and mobile variants. PNG screenshots for review, HTML only for the round selected for code implementation.
---

# Workflow: Text-to-Design

## Steps

1. **Use only for Round 1** — This workflow creates the initial base version. Do not use it for round 2 or later unless the user explicitly approves resetting the design.

2. **Enhance prompt** — Apply the [Prompt Enhancement Pipeline](../SKILL.md#prompt-enhancement-pipeline). Load design tokens from `.stitch/DESIGN.md` if it exists. Do not inject default styles — enhance the user's prompt for clarity and precision only.

3. **Inventory public assets** — Scan `public/` recursively for relevant images. If the screen needs a logo, hero, background, illustration, symbol, or map, add a `PROJECT ASSETS (LOCKED - REUSE EXACT FILES)` block with exact public-relative paths.

4. **Handle exact-image expectations honestly** — If the user requires the exact local image to appear inside the Stitch preview itself, stop and require manual upload of that asset into the Stitch project before generation. The current MCP flow cannot upload local files from `public/`.

5. **Get projectId** — Read from `.stitch/metadata.json`. If missing, call `list_projects`.

6. **Generate BOTH device variants (MANDATORY)**

   **6a. PC version:**
   ```json
   { "projectId": "...", "prompt": "[Enhanced Prompt — PC layout]", "deviceType": "DESKTOP" }
   ```

   **6b. Mobile version:**
   ```json
   { "projectId": "...", "prompt": "[Enhanced Prompt — adapted for mobile ≤450px: stacked layout, hamburger nav, single-column grids, touch-friendly 44px+ targets]", "deviceType": "MOBILE" }
   ```

7. **Save PNGs** — Create `.stitch/designs/{screen}/` if needed:
   - PC: download `screenshot.downloadUrl` → `.stitch/designs/{screen}/round-{round}-pc.png`
  - Mobile: download `screenshot.downloadUrl` at the highest available export resolution → `.stitch/designs/{screen}/round-{round}-mobile.png`
  - Do not downscale the mobile PNG after download
  - Do not download HTML in this workflow; HTML is reserved for the round selected for code implementation

8. **Update metadata** — Save both screen IDs and canonical titles to `.stitch/metadata.json`. Use the exact naming convention `{screen}-r{round:02d}-{device}`. Example for round 1:
   ```json
   {
     "titleConvention": {
       "pattern": "{screen}-r{round:02d}-{device}"
     },
     "screens": {
       "{screen}": {
         "pcId": "...",
         "mobileId": "...",
         "pcCanonicalTitle": "{screen}-r01-desktop",
         "mobileCanonicalTitle": "{screen}-r01-mobile",
         "currentRound": 1,
         "status": "refining"
       }
     }
   }
   ```

   These local canonical titles are authoritative even if the Stitch project UI shows a different generated title.

9. **Show feedback** — Display `outputComponents` description and suggestions to the user.

10. **Refine** — Once the base layout is acceptable, all following rounds must switch to [edit-design](edit-design.md) and update both existing versions rather than generating fresh variants.
