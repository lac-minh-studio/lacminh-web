---
name: stitch-loop
description: Teaches agents to iteratively build software UIs using Stitch with a mandatory 6-round refinement loop before committing any design to code
---

# Stitch Build Loop (Software Dev Edition)

You are an **autonomous UI designer** participating in an iterative design loop for software applications. Your goal is to refine a screen design through **at least 6 Stitch generation rounds** before any code is written, then integrate the final design into a Next.js project.

## Core Principle: 6-Round Minimum

> **HARD RULE:** Each screen MUST go through at least 6 refinement rounds with Stitch before the design is marked `approved`. Skipping rounds is forbidden. Round 1 creates the base version; round 2 and later must update that version instead of restarting. The baton tracks the current round via the `round` field.

## Overview

The Build Loop pattern enables deeply-refined UI development through a "baton" system. Each iteration:
1. Reads the current task and round number from `.stitch/next-prompt.md`
2. Creates the initial screen in round 1, then edits the previous version in round 2+
3. Saves assets into a per-screen folder and appends findings to one review log
4. Advances the round counter and writes the next baton
5. After round 6 minimum: converts the approved design to Next.js and marks the screen as complete

## Prerequisites

**Required:**
- Access to the Stitch MCP Server
- A Stitch project (existing or will be created)
- A `.stitch/DESIGN.md` file (design system tokens — generate with `stitch-design` skill)
- A `.stitch/APP.md` file documenting the app structure and feature roadmap

## The 6-Round Refinement Protocol

Each screen must complete the first 6 rounds **in order**. The `round` field in the baton enforces this. Round 7+ is allowed only when quality still fails or the user asks for more refinement.

| Round | Focus | What to do in the Stitch prompt |
|-------|-------|--------------------------------|
| 1 | **Concept & Layout** | Define the basic layout, section hierarchy, and primary user flow. Skeleton structure only. |
| 2 | **Visual Identity** | Apply brand colors, typography, spacing system. Match `DESIGN.md` tokens exactly. |
| 3 | **Component Detail** | Refine individual components: buttons, inputs, cards, tables. Add micro-states (hover, active, disabled). |
| 4 | **Data & Content** | Fill with realistic mock data. Replace placeholders with actual content representative of real usage. |
| 5 | **Edge Cases & Density** | Test empty states, error states, loading states, overflow/truncation, and dense data scenarios. |
| 6 | **Polish & Accessibility** | Final contrast checks, focus indicators, icon clarity, spacing consistency, responsive behavior. |

After round 6, evaluate the design critically. Only advance to code if the screen meets all quality criteria.

## Version Lineage Rule

- **Round 1** uses `generate_screen_from_text` to create the first version.
- **Round 2 and later** must use `edit_screens` against the latest screen id stored in `.stitch/metadata.json`.
- Every round after round 1 must include a **base version reference** and a **section-by-section review**.
- Every round after round 1 must explicitly say: `update from previous version only` and `do not regenerate from scratch`.
- If a round produces a design that ignores the previous version's structure, treat it as a failed round and retry with a more constrained edit prompt.

## The Baton System

The `.stitch/next-prompt.md` file acts as a relay baton between iterations:

```markdown
---
screen: dashboard
round: 3
mode: edit
base-screen-id: d7237c7d78f44befa4f60afb17c818c1
status: refining
---
ROUND 3 FOCUS: Component Detail

BASE VERSION (REQUIRED):
- Previous round: 2
- Screen id: d7237c7d78f44befa4f60afb17c818c1
- Instruction: update from previous version only; do not regenerate from scratch

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 — Sidebar: active state exists but is too weak; needs clearer hierarchy and hover state
- Section 2 — KPI row: cards exist but spacing and value hierarchy are inconsistent
- Section 3 — Chart panel: container is present but legends and filters are underspecified
- Section 4 — Table: structure exists but sort states and row hover feedback are incomplete
- Section 5 — Top actions: primary/secondary emphasis is still unclear

**DESIGN SYSTEM (REQUIRED):**
[Copy from .stitch/DESIGN.md Section 6]

**PROJECT ASSETS (LOCKED - REUSE EXACT FILES):**
[Copy exact public-relative paths when relevant]
[Include asset fidelity, native aspect ratio preservation, and locked-slot fallback when assets are referenced]

**Component Checklist for this round:**
- [ ] Data table: sortable headers, row hover, selection state
- [ ] KPI cards: icon, value, trend delta, label hierarchy
- [ ] Sidebar: active link highlight, hover state, icon + label alignment
- [ ] Action buttons: primary/secondary/destructive variants
```

**Critical rules:**
- `round` MUST be an integer from 1 upward. Never skip a round.
- `mode` is `generate` for round 1, `edit` for round 2 and later.
- `status` is `refining` for in-progress rounds, `final-review` for an approval candidate, `approved` after passing review.
- Never set `status: approved` before completing at least round 6.
- The prompt body MUST state the round number and its specific focus at the top.
- Round 2+ prompts MUST include `BASE VERSION (REQUIRED)` and `SECTION-BY-SECTION REVIEW (REQUIRED)`.

## Execution Protocol

### Step 1: Read the Baton

Parse `.stitch/next-prompt.md` to extract:
- **Screen name** from the `screen` frontmatter field
- **Current round** from the `round` field
- **Mode** from the `mode` field
- **Status** from the `status` field
- **Prompt content** from the markdown body

If `status: approved` — this screen is done. Read `.stitch/APP.md` to pick the next screen from the backlog.

### Step 2: Consult Context Files

Before generating, read these files:

| File | Purpose |
|------|---------|
| `.stitch/APP.md` | App structure, **Stitch Project ID**, feature backlog, screen roadmap |
| `.stitch/DESIGN.md` | Required design tokens for all Stitch prompts, including fixed responsive tiers and hybrid style defaults |
| `.stitch/designs/{screen}/round-{round-1}.png` | Previous round screenshot — use for comparison and critique |
| `public/**/*` | Existing project imagery to reuse as logo, hero, symbol, map, background, or section artwork |

**Mandatory pre-generation critique (rounds 2+):**
Before calling Stitch, write a detailed **section-by-section review** of the previous round's screenshot. If the screen has five sections, review all five. For each section, record:
- what currently exists
- what is missing
- what violates the current round focus
- what must change in the next version

If the project already has a matching asset in `public/` and the design is still inventing generic imagery, treat that as a design defect and fix it in the next round.
If any element behaves like an unscaled 1920 layout inside the 1280 frame, overflows horizontally, or leaves excessive empty space that was filled by oversized hero typography instead of supporting content, treat that as a design defect and fix it in the next round.
If the screen still looks visually flat and does not show the hybrid depth recipe through visible neumorphic separation and glass highlight layers, treat that as a design defect and fix it in the next round.

### Step 3: Generate with Stitch

Use the Stitch MCP tools to generate or refine the screen:

1. **Discover namespace**: Run `list_tools` to find the Stitch MCP prefix
2. **Get or create project**:
   - If `.stitch/metadata.json` exists, use the `projectId` from it
   - Otherwise, call `[prefix]:create_project`, then `[prefix]:get_project` to retrieve full project details, and save to `.stitch/metadata.json`
   - After generating each screen, call `[prefix]:get_project` again and update the `screens` map in `.stitch/metadata.json`
3. **Round 1 only**: Call `[prefix]:generate_screen_from_text` with:
  - `projectId`: The project ID
  - `prompt`: The initial concept prompt from the baton
  - `deviceType`: `DESKTOP` (default for web apps)
4. **Round 2 and later**: Call `[prefix]:edit_screens` with:
  - `projectId`: The project ID
  - `selectedScreenIds`: The latest screen id from `.stitch/metadata.json`
  - `prompt`: The edit prompt from the baton including `BASE VERSION`, `SECTION-BY-SECTION REVIEW`, locked asset references, and the explicit instruction `update from previous version only; do not regenerate from scratch`
  - After the edit call, update `.stitch/metadata.json` so `screens[{screen}].id` points to the latest editable screen id
5. **Save PNG only** — Create `.stitch/designs/{screen}/` if needed, then download `screenshot.downloadUrl` (append `=w1440`) and save as `.stitch/designs/{screen}/round-{round}.png`. **Do NOT download HTML.**

### Step 4: Document Round Results

After saving assets, append a new round section to `.stitch/designs/{screen}/review.md`. There must be exactly one review file per screen folder:

```markdown
# Review Log — {screen}

## Round {round} Review — {screen}

**Focus:** {round topic}
**Base version:** round {round-1}
**Section-by-section review:**
- Section 1 — [what improved / what still fails]
- Section 2 — [what improved / what still fails]
**Issues resolved from previous round:** [list what was fixed]
**Remaining issues for next round:** [list what still needs work]
**Quality gate:** [PASS / NEEDS WORK]
```

If `review.md` already exists, preserve the previous round sections and append the new round at the end. Do not create `{screen}-r{round}-review.md` files.

### Step 5: Convert to Next.js (Round 6 Only)

Only execute this step when `round >= 6` AND the design passes quality review.

1. **View** the round 6 screenshot `.stitch/designs/{screen}/round-6.png` as visual reference
2. **Convert** the design to a Next.js page component from the screenshot:
   - Output file: `src/app/{route}/page.tsx` (or `src/components/{Screen}.tsx` for shared components)
   - Use Tailwind CSS classes derived from the design tokens in `.stitch/DESIGN.md`
   - Replace static mock data with typed props and placeholder data arrays
  - Reuse the exact files from `public/` via `next/image` or the project image wrapper when the screen uses existing project assets
   - Add `'use client'` directive only if interactive state is needed
3. **Follow** all rules in `.github/instructions/coding-standards.md`
4. **Do NOT** add API calls, data fetching, or business logic — design output only

### Step 6: Update App Documentation

Modify `.stitch/APP.md`:
- Mark the screen as `[x]` complete in Section 4 (Screen Inventory)
- Update Section 5 (Backlog) if a feature is done

### Step 7: Prepare the Next Baton (Critical)

**You MUST update `.stitch/next-prompt.md` before completing.**

**If the design still needs work:** Increment `round` by 1, keep `mode: edit`, and write the next prompt as an edit of the current version.

**If quality passes after round 6 minimum:** Pick the next screen from `.stitch/APP.md` backlog and reset `round: 1`, `mode: generate`, `status: refining`.

```markdown
---
screen: settings
round: 1
mode: generate
status: refining
---
ROUND 1 FOCUS: Concept & Layout
Design the initial layout for the user settings screen.
Include: page header with breadcrumb, sidebar with settings categories
(Account, Security, Notifications, Integrations, Billing),
and a main content area with form sections.

**DESIGN SNAPSHOT (COMPACT):**
- Preserve the current palette, typography, materials, and layout hierarchy from the previous version
- Style: Glassmorphism + Neumorphism hybrid design
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Stitch canvas: 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

**ASSETS IN THIS ROUND (LOCKED):**
[Copy only the exact public-relative paths touched in this round]
[Include asset fidelity, native aspect ratio preservation, and locked-slot fallback when assets are referenced]

**Layout Goals:**
- Two-column layout: 240px sidebar + fluid content area
- Sticky sidebar, scrollable content
- Section headers with dividers inside content area
```

## File Structure Reference

```
project/
├── .stitch/
│   ├── metadata.json        # Stitch project & screen IDs (persist this!)
│   ├── DESIGN.md            # Visual design tokens
│   ├── APP.md               # App structure, feature backlog, screen roadmap
│   ├── next-prompt.md       # The baton — current screen + round
│   └── designs/             # Per-screen artifact folders
│       └── {screen}/
│           ├── round-1.png
│           ├── round-2.png
│           ├── ...
│           ├── round-6.png  # Final approved screenshot (source of truth for code)
│           └── review.md    # Single accumulated round review log (R1-R7+)
└── src/
    └── app/
        └── {route}/
            └── page.tsx     # Next.js output (after round 6 only)
```

### `.stitch/metadata.json` Schema

```json
{
  "projectId": "6139132077804554844",
  "title": "My App",
  "deviceType": "DESKTOP",
  "designTheme": {
    "colorMode": "DARK",
    "font": "INTER",
    "roundness": "ROUND_EIGHT",
    "customColor": "#40baf7",
    "saturation": 3
  },
  "screens": {
    "dashboard": {
      "id": "d7237c7d78f44befa4f60afb17c818c1",
      "sourceScreen": "projects/6139132077804554844/screens/d7237c7d78f44befa4f60afb17c818c1",
      "currentRound": 6,
      "status": "approved",
      "width": 1440,
      "height": 900
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `projectId` | Stitch project ID |
| `deviceType` | `DESKTOP` for web apps (default) |
| `screens[].currentRound` | Last completed round for this screen (1+) |
| `screens[].id` | Latest editable Stitch screen id. Overwrite this after every edit round so round N+1 always edits round N. |
| `screens[].status` | `refining` / `final-review` / `approved` |

## Quality Gates

Before marking a screen `approved`, verify:

- [ ] At least 6 rounds completed in sequence
- [ ] Round 2+ used `edit_screens` against the previous version instead of `generate_screen_from_text`
- [ ] Round 2+ prompts included `BASE VERSION`, `SECTION-BY-SECTION REVIEW`, and `do not regenerate from scratch`
- [ ] Round 6 review doc shows `PASS`
- [ ] Design tokens from `DESIGN.md` are consistently applied
- [ ] Hybrid style is consistent: Neumorphism on large sections, Glassmorphism on supporting layers
- [ ] Existing project assets from `public/` are used wherever they match the screen's imagery needs
- [ ] Empty/error/loading states are designed (round 5)
- [ ] No placeholder text (Lorem Ipsum) in final design
- [ ] Responsive behavior is validated against the fixed tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
- [ ] Color contrast meets WCAG AA (round 6)

## Common Pitfalls

- ❌ Jumping from round 1 to round 6 — every round must be completed
- ❌ Using `generate_screen_from_text` again after round 1 instead of editing the previous version
- ❌ Generating code before round 6 is approved
- ❌ Re-pasting the full round 1 concept into round 2+ instead of writing a delta-only edit prompt
- ❌ Writing a generic review instead of a section-by-section review for every visible section
- ❌ Forgetting to update `.stitch/next-prompt.md` (breaks the loop)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Stitch generation fails | Trim the prompt size first; round 2+ should be a compact delta edit, not a replay of round 1 |
| Design drifts from brand | Preserve the current palette, typography, and materials from the previous version, then restate only the hard depth and 1280 canvas constraints |
| Loop stalls | Check `next-prompt.md` has valid `screen`, `round`, and `status` fields |
| Round 6 fails quality gate | Re-run round 6 with the specific problems addressed — do NOT skip to code |
| Rounds look unrelated to each other | Ensure round 2+ uses `edit_screens`, references the previous screen id, and says `update from previous version only; do not regenerate from scratch` |
