---
name: stitch-unified
description: 'Autonomous UI design workflow using Stitch MCP with mandatory 6-round refinement. Combines bold aesthetic direction, prompt optimization, and iterative polish. Each round produces PC + Mobile designs. Auto-generates DESIGN.md from distinctive design principles. Use for: building new screens, designing app interfaces, creating production-ready UI from scratch.'
argument-hint: 'screen name or "continue" to resume'
---

# Stitch Unified Skill

Execute mandatory 6-round design refinement workflow. Each round generates PC and Mobile variants. Download PNG screenshots after every Stitch call. Download HTML only after approval. Auto-generate DESIGN.md if missing.

## Hard Rules

1. Complete 6 rounds minimum before approval
2. Generate PC and Mobile variants per round
3. Download PNG artifacts after every round (both devices)
4. Download HTML only for approved implementation round
5. Execute section-by-section review before rounds 2+
6. Save mobile PNGs at highest export resolution
7. Use canonical local titles: `{screen}-r{round:02d}-{desktop|mobile}`
8. Auto-generate `.stitch/DESIGN.md` if missing before Round 1

## Round Protocol

| Round | Focus | Design Thinking Required |
|-------|-------|-------------------------|
| 1 | Concept & Layout | YES — Aesthetic direction, typography, tone |
| 2 | Visual Identity | YES — Color system, motion strategy, spatial composition |
| 3 | Component Detail | NO — Refine components using established aesthetic |
| 4 | Data & Content | NO — Realistic mock data density testing |
| 5 | Edge Cases & Density | NO — Empty/error/loading states, overflow handling |
| 6 | Polish & Accessibility | NO — Contrast, focus indicators, responsive behavior |

After Round 6, execute quality gate. If pass, set status `approved` and download HTML.

## Execution Flow

### Phase 1: Initialize

**Input:** User provides screen name (e.g., "pricing", "dashboard")

**Steps:**
1. Parse screen name from user input
2. Check if `.stitch/designs/{screen}/baton.md` exists
   - If exists → parse frontmatter → extract `round`, `status`, `base-pc-id`, `base-mobile-id`
   - If not exists → initialize round = 1, status = refining, mode = generate
3. Check if `.stitch/DESIGN.md` exists
   - If missing → execute design-philosophy auto-generation (see Phase 2)
4. Check if `.stitch/metadata.json` exists
   - If missing → call Stitch MCP `create_project` → save project ID to metadata.json
5. If status = "approved" → screen complete → halt execution or pick next screen from `.stitch/APP.md`

### Phase 2: Design Thinking (Rounds 1 & 2 Only)

**Trigger:** Round = 1 OR Round = 2

**Steps:**
1. Load [design-philosophy.md](resources/design-philosophy.md)
2. Execute aesthetic direction selection:
   - Pick ONE from aesthetic catalog (brutalist/luxury/retro/etc.)
   - FORBIDDEN fonts: Inter, Roboto, Arial, system fonts
   - Select display font + body font pair
   - Define color strategy (monochrome+accent / gradient / jewel / pastel / utility)
   - Define motion strategy (page load choreography, scroll effects, hover states)
   - Define spatial composition (asymmetry / overlap / diagonal / grid-breaking)
   - Identify unforgettable element (one memorable feature)
3. If `.stitch/DESIGN.md` missing:
   - Generate DESIGN.md using template from design-philosophy.md
   - Populate with design thinking output
   - Save to `.stitch/DESIGN.md`
4. If `.stitch/DESIGN.md` exists:
   - Load existing tokens
   - Incorporate into prompt enhancement

### Phase 3: Pre-Generation Review (Rounds 2+ Only)

**Trigger:** Round >= 2

**Steps:**
1. Load previous round PNG artifacts:
   - `.stitch/designs/{screen}/round-{N-1}-pc.png`
   - `.stitch/designs/{screen}/round-{N-1}-mobile.png`
2. Execute section-by-section visual critique:
   - For each visible section in PC design:
     - Document what currently exists
     - Document what is missing or incomplete
     - Document layout defects (overlap, clip, misalign, overflow)
     - Document what must change
   - For each visible section in Mobile design:
     - Document what currently exists
     - Document what is missing or incomplete
     - Document layout defects
     - Document what must change
3. Execute cross-device section parity check:
   - List all sections present in PC
   - Verify each section exists in Mobile OR document intentional mobile merge/collapse
   - Flag missing sections as hard defect if not intentional
4. Execute full-bleed integrity check:
   - Verify every section wrapper extends to canvas edge (0px outer horizontal margin)
   - Flag any visible side gaps as hard defect
5. Execute cross-page style consistency check (if other approved pages exist):
   - Load screenshots from other approved screens
   - Compare nav, footer, color usage, typography
   - Flag any drift as defect
6. Document all findings → use as foundation for edit prompt

### Phase 4: Prompt Enhancement

**Trigger:** Every round before Stitch MCP calls

**Steps:**
1. **Context Check:**
   - Extract `projectId` from `.stitch/metadata.json`
   - Load design tokens from `.stitch/DESIGN.md`
   - Scan `public/**/*.{png,jpg,jpeg,webp,avif,svg}` for reusable assets
   - If round > 1: load findings from Phase 3 review

2. **Asset Grounding:**
   - For each public asset referenced in screen:
     - Add to `PROJECT ASSETS (LOCKED - REUSE EXACT FILES)` block
     - Format: `/path/in/public.ext — [role and visual description]`
     - Note: Stitch does not upload files; paths are canonical references

3. **Terminology Mapping:**
   - Transform vague terms → professional UI/UX terminology
   - Use [design-mappings.md](resources/design-mappings.md) lookup table

4. **Canonical Title Generation:**
   - PC: `{screen}-r{round:02d}-desktop`
   - Mobile: `{screen}-r{round:02d}-mobile`

5. **Prompt Size Discipline:**
   - Round 1: target ≤5000 chars
   - Round 2+: target 2000-3500 chars (delta-only; describe changes not full spec)
   - If `.stitch/DESIGN.md` authoritative: use compact 4-line canvas spec
   - Else: include full canvas spec + 6 responsive tiers

### Phase 5: Stitch Generation

**Execute for BOTH device variants per round:**

#### 5.1: PC Variant

**Steps:**
1. Build PC prompt using Phase 4 enhanced prompt
2. If round = 1:
   ```
   Call: [stitch-prefix]:generate_screen_from_text
   Params:
     projectId: {from metadata.json}
     prompt: {enhanced PC prompt}
     deviceType: "DESKTOP"
   ```
3. If round >= 2:
   ```
   Call: [stitch-prefix]:edit_screens
   Params:
     projectId: {from metadata.json}
     selectedScreenIds: [{base-pc-id from baton}]
     prompt: {enhanced PC edit prompt with section-by-section changes}
   ```
4. Extract `screenId` from response
5. Call `[stitch-prefix]:get_screen`
   ```
   Params:
     projectId: {from metadata.json}
     screenId: {from step 4}
     name: "projects/{projectId}/screens/{screenId}"
   ```
6. Extract `screenshot.url` (or `screenshot.imageUrl`) from response
7. Download PNG from screenshot URL
8. Save to `.stitch/designs/{screen}/round-{N}-pc.png`
9. Store `screenId` as `current-pc-id`

#### 5.2: Mobile Variant

**Steps:**
1. Adapt PC prompt for mobile:
   - Convert multi-column grids → single-column stacks
   - Replace horizontal nav → hamburger/drawer menu
   - Increase touch targets to minimum 44px
   - Simplify or collapse secondary content
   - Maintain same visual identity (fonts, colors, spacing rhythm)
2. If round = 1:
   ```
   Call: [stitch-prefix]:generate_screen_from_text
   Params:
     projectId: {from metadata.json}
     prompt: {enhanced Mobile prompt}
     deviceType: "MOBILE"
   ```
3. If round >= 2:
   ```
   Call: [stitch-prefix]:edit_screens
   Params:
     projectId: {from metadata.json}
     selectedScreenIds: [{base-mobile-id from baton}]
     prompt: {enhanced Mobile edit prompt}
   ```
4. Extract `screenId` from response
5. Call `[stitch-prefix]:get_screen`
   ```
   Params:
     projectId: {from metadata.json}
     screenId: {from step 4}
     name: "projects/{projectId}/screens/{screenId}"
   ```
6. Extract `screenshot.url` from response
7. Download PNG from screenshot URL
8. Save to `.stitch/designs/{screen}/round-{N}-mobile.png` (HIGHEST EXPORT RESOLUTION — do not downscale)
9. Store `screenId` as `current-mobile-id`

### Phase 6: Document Results

**Steps:**
1. If `.stitch/designs/{screen}/review.md` does not exist, create it with header:
   ```markdown
   # Review Log — {screen}
   ```
2. Append new round section:
   ```markdown
   ## Round {N} Review — {screen}

   **Focus:** {round focus from baton}
   **Base version:** round {N-1} (or "initial generation" for round 1)
   **Canonical Titles:**
   - PC: {screen}-r{N:02d}-desktop
   - Mobile: {screen}-r{N:02d}-mobile

   **PC Review:**
   - Section 1: {name} — {what exists / what improved / what still fails}
   - Section 2: {name} — {what exists / what improved / what still fails}
   [continue for all sections]

   **Mobile Review:**
   - Section 1: {name} — {what exists / what improved / what still fails}
   - Section 2: {name} — {what exists / what improved / what still fails}
   [continue for all sections]

   **Cross-Device Section Parity:**
   - Section 1 — [present in both / intentionally merged on mobile / missing on mobile]
   - Section 2 — [present in both / intentionally merged on mobile / missing on mobile]
   [continue for all sections]

   **Layout Issues Found:**
   - [overlapping elements, broken alignment, content overflow, missing components, full-bleed violations]

   **Style Consistency Check:**
   - Nav: [matches / drifts from] {other-page}
   - Footer: [matches / drifts from] {other-page}
   - Color usage: [matches / drifts from] {other-page}
   - Typography: [matches / drifts from] {other-page}

   **Issues resolved from previous round:** [list fixes]
   **Remaining issues for next round:** [list pending work]
   **Quality gate:** [PASS / NEEDS WORK]
   ```

### Phase 7: Update Metadata

**Steps:**
1. Load `.stitch/metadata.json`
2. Update or create screen entry:
   ```json
   {
     "projectId": "...",
     "screens": {
       "{screen}": {
         "latestPcId": "{current-pc-id from Phase 5.1}",
         "latestMobileId": "{current-mobile-id from Phase 5.2}",
         "pcCanonicalTitle": "{screen}-r{N:02d}-desktop",
         "mobileCanonicalTitle": "{screen}-r{N:02d}-mobile",
         "currentRound": N
       }
     }
   }
   ```
3. Save `.stitch/metadata.json`

### Phase 8: Advance Baton

**Steps:**
1. Compute next round number: N+1
2. Determine next status:
   - If N < 6: status = "refining"
   - If N = 6: status = "final-review"
3. Determine next mode:
   - If next round = 1: mode = "generate"
   - If next round > 1: mode = "edit"
4. Build next round focus:
   - Round 1: "Concept & Layout"
   - Round 2: "Visual Identity"
   - Round 3: "Component Detail"
   - Round 4: "Data & Content"
   - Round 5: "Edge Cases & Density"
   - Round 6: "Polish & Accessibility"
   - Round 7+: "Additional refinement based on quality gate defects"
5. Write baton file `.stitch/designs/{screen}/baton.md`:
   ```yaml
   ---
   screen: {screen}
   round: {N+1}
   mode: {next mode}
   base-pc-id: {current-pc-id from Phase 5.1}
   base-mobile-id: {current-mobile-id from Phase 5.2}
   status: {next status}
   ---
   ROUND {N+1} FOCUS: {next focus}

   **CANONICAL TITLES (REQUIRED):**
   - PC: {screen}-r{N+1:02d}-desktop
   - Mobile: {screen}-r{N+1:02d}-mobile

   [For rounds 2+, include BASE VERSION, SECTION-BY-SECTION REVIEW template, CROSS-DEVICE PARITY template, etc.]
   ```

### Phase 9: Loop Decision

**Steps:**
1. If N < 6:
   - Jump to Phase 1 (auto-pilot continues)
2. If N = 6:
   - Execute Phase 10 (Quality Gate)
3. If N >= 7:
   - Execute Phase 10 (Quality Gate)

### Phase 10: Quality Gate

**Trigger:** Round >= 6

**Validation Checklist:**
1. Layout integrity: NO overlapping elements, NO overflow, NO misalignment
2. Cross-device parity: ALL core sections present in both PC and Mobile OR explicitly documented mobile simplification
3. Full-bleed integrity: ALL section wrappers extend to canvas edge (0px outer horizontal margin)
4. Style consistency: Nav/footer/colors/typography match other approved pages
5. Aesthetic execution: Design thinking vision (typography, color, motion, spatial) fully realized
6. Accessibility: Contrast ratios meet WCAG AA, focus indicators visible, touch targets >= 44px
7. Content fidelity: Realistic data (not lorem ipsum placeholders)

**Decision:**
- If ALL criteria PASS:
  - Update baton status to "approved"
  - Execute Phase 11 (HTML Download & Code Implementation)
- If ANY criteria FAIL:
  - Document defects in review.md
  - Set next round = N+1
  - Update baton with status = "refining"
  - Jump to Phase 1 (continue refinement)

### Phase 11: HTML Download & Code Implementation

**Trigger:** Status = "approved"

**Steps:**
1. Call `[stitch-prefix]:get_screen` for PC:
   ```
   Params:
     projectId: {from metadata.json}
     screenId: {approved PC screen ID}
     name: "projects/{projectId}/screens/{screenId}"
   ```
2. Extract `screenshot.htmlUrl` (or HTML export endpoint) from response
3. Download HTML from URL
4. Save to `.stitch/designs/{screen}/round-{N}-pc.html`
5. Repeat steps 1-4 for Mobile variant → save to `.stitch/designs/{screen}/round-{N}-mobile.html`
6. Invoke `coding-fe` skill:
   ```
   Params:
     screen: {screen}
     route: /{screen}
     pcHtml: .stitch/designs/{screen}/round-{N}-pc.html
     mobileHtml: .stitch/designs/{screen}/round-{N}-mobile.html
   ```

**CRITICAL:** Do NOT download HTML for rounds < approved round. HTML download is ONLY for implementation.

## Prompt Templates

### Round 1 (Generate)

```
[DESIGN THINKING OUTPUT]
Aesthetic: {chosen aesthetic}
Typography: Display ({font}), Body ({font})
Color: {strategy} — Primary {hex}, Secondary {hex}, Accent {hex}
Motion: {page load} / {scroll effects} / {hover states}
Spatial: {layout strategy}
Unforgettable element: {memorable feature}

CANVAS & RESPONSIVE SPEC:
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within 1280px frame
- Overflow rule: no element may exceed 1280px frame
- Scale behavior: scale typography, spacing, imagery, component footprints proportionally
- Density rule: fill leftover space with secondary modules, not oversized heroes
- PC outer padding (HARDCODED): padding-left 10px + padding-right 10px on all section wrappers
- Full-bleed backgrounds: extend to canvas edge; 10px applies to inner content only
- Responsive tiers: pc 1920-1600, laptop 1600-1200, macbook 1200-900, tablet 900-700, mini-tablet 700-450, mobile <450

DESIGN TOKENS (FROM DESIGN.md):
[Aesthetic tokens from design thinking or loaded from existing DESIGN.md]

PROJECT ASSETS (LOCKED - REUSE EXACT FILES):
- /path/in/public.ext — [role and visual description]

SCREEN STRUCTURE:
1. {Section name}: {component breakdown}
2. {Section name}: {component breakdown}
[...]
```

### Round 2+ (Edit — Delta Only)

```
ROUND {N} FOCUS: {focus}

BASE VERSION (REQUIRED):
- Previous round: {N-1}
- PC screen id: {base-pc-id}
- Mobile screen id: {base-mobile-id}
- Instruction: update from previous version only; do not regenerate from scratch
- Preserve all unchanged areas as locked

CANVAS LAYOUT (PERMANENT CONSTRAINT — DO NOT CHANGE):
- PC outer padding (HARDCODED): padding-left 10px + padding-right 10px — non-negotiable
- Full-bleed backgrounds: extend to canvas edge; 10px applies to inner content only
- 1280px max desktop frame
- Overflow rule: no element may exceed 1280px frame
- Scale behavior: scale typography, spacing, imagery, component footprints proportionally
- Density rule: fill leftover space with secondary modules, not oversized heroes

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1: {name} — [current state / missing elements / required changes]
- Section 2: {name} — [current state / missing elements / required changes]
[continue for all sections]

CROSS-DEVICE SECTION PARITY (REQUIRED):
- Section 1 — [present in both / intentionally merged on mobile / missing on mobile]
- Section 2 — [present in both / intentionally merged on mobile / missing on mobile]
[continue for all sections]

LAYOUT ISSUES (CRITICAL):
- [overlapping elements, broken alignment, content overflow, missing components from prior rounds]

STYLE CONSISTENCY CHECK (vs other approved pages):
- [compare nav, footer, colors, typography; flag drift]

ASSETS IN THIS ROUND (LOCKED):
- /path/in/public.ext — [role]

THIS ROUND'S CHANGES ONLY:
- [net change 1]
- [net change 2]
[...]
```

## File Artifacts Structure

```
.stitch/designs/{screen}/
├── baton.md                      # Round state tracker (per screen)
├── review.md                     # Cumulative findings (all rounds in single file)
├── round-01-pc.png
├── round-01-mobile.png
├── round-02-pc.png
├── round-02-mobile.png
├── round-03-pc.png
├── round-03-mobile.png
├── round-04-pc.png
├── round-04-mobile.png
├── round-05-pc.png
├── round-05-mobile.png
├── round-06-pc.png
├── round-06-mobile.png
├── round-06-pc.html              # Only after approval
└── round-06-mobile.html          # Only after approval
```

## Validation Rules

**Before Phase 5 (Stitch calls):**
- Verify projectId exists in metadata.json
- Verify DESIGN.md exists OR auto-generate
- For rounds 2+: verify previous round PNGs exist
- For rounds 2+: verify Phase 3 review completed

**After Phase 5 (Stitch calls):**
- Verify PNG downloads succeeded for both PC and Mobile
- Verify file sizes > 0 bytes
- Verify canonical titles match pattern `{screen}-r{N:02d}-{device}`

**Before Phase 11 (HTML download):**
- Verify status = "approved"
- Verify quality gate passed
- Do NOT download HTML if round < 6 OR status != "approved"

## Resources

- [design-philosophy.md](resources/design-philosophy.md) — Aesthetic catalog, typography tiers, color strategies, anti-patterns
- [design-mappings.md](resources/design-mappings.md) — Vague → professional UI/UX terminology lookup table
- [prompt-keywords.md](resources/prompt-keywords.md) — Stitch UI vocabulary
- [tool-schemas.md](resources/tool-schemas.md) — MCP call signatures, download workflows
- [baton-schema.md](resources/baton-schema.md) — Baton file frontmatter structure
