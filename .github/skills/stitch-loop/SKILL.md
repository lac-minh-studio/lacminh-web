---
name: stitch-loop
description: Teaches agents to iteratively build software UIs using Stitch with a mandatory 6-round refinement loop. Each round produces PC + mobile designs. Code is generated from downloaded HTML, not screenshots.
---

# Stitch Build Loop (Software Dev Edition)

You are an **autonomous UI designer** participating in an iterative design loop for software applications. Your goal is to refine a screen design through **at least 6 Stitch generation rounds** before any code is written. Each round produces **two designs**: PC (DESKTOP) and mobile (MOBILE, ≤450px). Code implementation uses **downloaded HTML** as the source of truth.

## Core Principles

> **HARD RULE 1:** Each screen MUST go through at least 6 refinement rounds with Stitch before the design is marked `approved`. Skipping rounds is forbidden.
> **HARD RULE 2:** Every round produces TWO designs — PC and mobile. Both must be saved.
> **HARD RULE 3:** Code is generated from HTML downloads, not from PNG screenshots.
> **HARD RULE 4:** Cross-page style consistency — all pages in the project must share a cohesive visual language.
> **HARD RULE 5:** Mobile review PNGs must be saved at the highest available export resolution. Never downscale the mobile artifact after download.
> **HARD RULE 6:** HTML may be downloaded only for the round explicitly selected as the implementation source. Never pull HTML for intermediate review rounds.
> **HARD RULE 7:** Every round must have canonical local titles using `{screen}-r{round:02d}-desktop` and `{screen}-r{round:02d}-mobile`. Treat these as authoritative even if Stitch shows different titles.

## Overview

The Build Loop pattern enables deeply-refined UI development through a "baton" system. Each iteration:
1. Reads the current task and round number from `.stitch/designs/{screen}/baton.md` (each screen has its own isolated baton file)
2. Creates the initial screen (PC + mobile) in round 1, then edits both previous versions in round 2+
3. Saves PNG screenshots for both devices into a per-screen folder, with the mobile artifact kept at the sharpest available export size, and appends findings to one review log
4. Advances the round counter and writes the next baton
5. After a round is explicitly locked for implementation, downloads HTML for that round only, then converts to Next.js code

## Prerequisites

**Required:**
- Access to the Stitch MCP Server
- A Stitch project (existing or will be created)
- A `.stitch/DESIGN.md` file (design system tokens — generate with `stitch-design` skill if the user has defined a style)
- A `.stitch/APP.md` file documenting the app structure and feature roadmap

## The 6-Round Refinement Protocol

Each screen must complete the first 6 rounds **in order**. The `round` field in the baton enforces this. Round 7+ is allowed only when quality still fails or the user asks for more refinement.

| Round | Focus | What to do in the Stitch prompt |
|-------|-------|--------------------------------|
| 1 | **Concept & Layout** | Define the basic layout, section hierarchy, and primary user flow. Skeleton structure only. |
| 2 | **Visual Identity** | Apply brand colors, typography, spacing system. Match design tokens from user's `DESIGN.md` if it exists. |
| 3 | **Component Detail** | Refine individual components: buttons, inputs, cards, tables. Add micro-states (hover, active, disabled). |
| 4 | **Data & Content** | Fill with realistic mock data. Replace placeholders with actual content representative of real usage. |
| 5 | **Edge Cases & Density** | Test empty states, error states, loading states, overflow/truncation, and dense data scenarios. |
| 6 | **Polish & Accessibility** | Final contrast checks, focus indicators, icon clarity, spacing consistency, responsive behavior. |

After round 6, evaluate the design critically. Only advance to code if the screen meets all quality criteria.

## Version Lineage Rule

- **Round 1** uses `generate_screen_from_text` to create the first version (both PC and mobile).
- **Round 2 and later** must use `edit_screens` against the latest PC and mobile screen IDs stored in `.stitch/metadata.json`.
- Every round after round 1 must include a **base version reference** and a **section-by-section review**.
- Every round after round 1 must explicitly say: `update from previous version only` and `do not regenerate from scratch`.
- If a round produces a design that ignores the previous version's structure, treat it as a failed round and retry.

## Cross-Page Style Consistency

When designing multiple pages for the same project:
1. **Before starting a new page**, review screenshots from previously approved pages to extract the established visual patterns
2. **Reference the existing style** in the Round 1 prompt for new pages: `"Maintain visual consistency with the previously designed [page name] — use the same navigation style, color treatment, typography hierarchy, spacing rhythm, and component patterns"`
3. **Shared components** (navbar, footer, sidebar) must look identical across all pages
4. **After each round**, compare the current page design against existing pages and flag any style drift as a defect

## The Baton System

Each screen owns its own baton file at `.stitch/designs/{screen}/baton.md`. This prevents designs from different pages overwriting each other — switching from `home` to `careers` never clobbers the home baton. The file acts as a relay baton between rounds for that screen:

```markdown
---
screen: dashboard
round: 3
mode: edit
base-pc-id: d7237c7d78f44befa4f60afb17c818c1
base-mobile-id: a1b2c3d4e5f64789abcdef0123456789
status: refining
---
ROUND 3 FOCUS: Component Detail

**CANONICAL TITLES (REQUIRED):**
- PC: `dashboard-r03-desktop`
- Mobile: `dashboard-r03-mobile`

BASE VERSION (REQUIRED):
- Previous round: 2
- PC screen id: d7237c7d78f44befa4f60afb17c818c1
- Mobile screen id: a1b2c3d4e5f64789abcdef0123456789
- Instruction: update from previous version only; do not regenerate from scratch

CANVAS LAYOUT (PERMANENT CONSTRAINT — DO NOT CHANGE):
- 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- Full-bleed: every section wrapper spans the full canvas width with 0px outer horizontal margin; no outer left/right padding

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 — Sidebar: active state exists but is too weak; needs clearer hierarchy and hover state
- Section 2 — KPI row: cards exist but spacing is inconsistent and elements overlap on mobile
- Section 3 — Chart panel: container is present but legends overflow the card boundary
- Section 4 — Table: structure exists but sort states and row hover feedback are incomplete
- Section 5 — Top actions: primary/secondary emphasis is still unclear

CROSS-DEVICE SECTION PARITY (REQUIRED):
- Sidebar and top actions exist in both PC and mobile
- KPI row exists in both; mobile may stack cards vertically but must keep the full set
- Chart panel exists in both; the legend/filter cluster is missing on mobile and must be restored or intentionally merged
- Table exists in both; mobile may collapse rows into cards, but the data section must still be present

LAYOUT ISSUES (CRITICAL):
- [List any overlapping elements, broken alignment, content overflow, or missing components]

STYLE CONSISTENCY CHECK:
- [Compare with other approved pages and note any drift]

THIS ROUND'S CHANGES ONLY:
- Strengthen sidebar active/hover states with clearer visual weight
- Fix KPI card spacing; prevent overlap on mobile
- Clip chart legends to card boundary
- Add table sort indicators and row hover state
- Clarify primary vs secondary button hierarchy in top actions

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
- The baton tracks BOTH `base-pc-id` and `base-mobile-id`.
- Every baton must include canonical local titles using the exact format `{screen}-r{round:02d}-{device}`.
- Round 2+ baton bodies must include `BASE VERSION`, `SECTION-BY-SECTION REVIEW`, and `CROSS-DEVICE SECTION PARITY`.

## Execution Protocol

### Step 1: Read the Baton

Determine the active screen from the user's request or APP.md backlog. Then parse `.stitch/designs/{screen}/baton.md` to extract:
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
| `.stitch/DESIGN.md` | Design tokens for Stitch prompts (if the user has defined them) |
| `.stitch/designs/{screen}/round-{round-1}-pc.png` | Previous round PC screenshot — use for comparison |
| `.stitch/designs/{screen}/round-{round-1}-mobile.png` | Previous round mobile screenshot — use for comparison |
| `.stitch/designs/{other-screens}/` | Screenshots of other approved pages — use for style consistency |
| `public/**/*` | Existing project imagery to reuse |

**Mandatory pre-generation critique (rounds 2+):**
Before calling Stitch, write a detailed **section-by-section review** of the previous round's screenshots (BOTH PC and mobile). For each section, record:
- what currently exists
- what is missing or incomplete from previous rounds
- **cross-device section parity**: whether the section exists in both PC and mobile, and whether any mobile merge/collapse is intentional
- **layout defects**: elements overlapping, clipping, misaligned, or overflowing containers
- **full-bleed integrity**: confirm every section wrapper extends to the canvas edge with zero outer horizontal margin — any visible side gap is a hard defect
- what must change in the next version

**Layout integrity is the top priority.** Hard defects that block advancement:
- Any element overlapping another, breaking out of its container, clipping text, or being misaligned
- Any top-level section wrapper that has left or right outer padding/margin (side-padding creep) — the full canvas width must be used
- Any core section disappearing on mobile without explicit justification

**Cross-device parity is mandatory.** If a core section exists on PC but disappears on mobile without an explicit mobile simplification note, treat it as a hard defect.

**Cross-page consistency check:** If other pages have been approved, compare shared components (nav, footer, color usage, typography) and flag any drift.

### Step 3: Generate with Stitch

Use the Stitch MCP tools to generate or refine the screen:

1. **Discover namespace**: Run `list_tools` to find the Stitch MCP prefix
2. **Get or create project**:
   - If `.stitch/metadata.json` exists, use the `projectId` from it
   - Otherwise, call `[prefix]:create_project`, then `[prefix]:get_project` to retrieve full project details, and save to `.stitch/metadata.json`
   - After generating each screen, call `[prefix]:get_project` again and update the `screens` map in `.stitch/metadata.json`
   - Also update the canonical local titles for the current round using `{screen}-r{round:02d}-desktop` and `{screen}-r{round:02d}-mobile`

3. **Round 1 — Generate BOTH variants:**
   - PC: `[prefix]:generate_screen_from_text` with `deviceType: "DESKTOP"`
   - Mobile: `[prefix]:generate_screen_from_text` with `deviceType: "MOBILE"` and prompt adapted for mobile layout (stacked sections, hamburger nav, 44px+ touch targets)

4. **Round 2+ — Edit BOTH variants:**
   - PC: `[prefix]:edit_screens` with `selectedScreenIds: [pcId]`
   - Mobile: `[prefix]:edit_screens` with `selectedScreenIds: [mobileId]` and prompt adapted for mobile context
   - After each edit call, update `.stitch/metadata.json` so both `pcId` and `mobileId` point to the latest screen IDs

5. **Save PNGs for BOTH variants:**
   - PC: `.stitch/designs/{screen}/round-{round}-pc.png`
   - Mobile: `.stitch/designs/{screen}/round-{round}-mobile.png` — download at the highest available export resolution and do not downscale after saving

### Step 4: Document Round Results

After saving assets, append a new round section to `.stitch/designs/{screen}/review.md`. There must be exactly one review file per screen folder:

```markdown
# Review Log — {screen}

## Round {round} Review — {screen}

**Focus:** {round topic}
**Base version:** round {round-1}

**PC Review:**
- Section 1 — [what improved / what still fails]
- Section 2 — [what improved / what still fails]

**Mobile Review:**
- Section 1 — [what improved / what still fails]
- Section 2 — [what improved / what still fails]

**Canonical Titles:**
- PC: `{screen}-r{round:02d}-desktop`
- Mobile: `{screen}-r{round:02d}-mobile`

**Cross-Device Section Parity:**
- Section 1 — [present in both / intentionally merged on mobile / missing on mobile]
- Section 2 — [present in both / intentionally merged on mobile / missing on mobile]

**Layout Issues Found:**
- [List any overlapping elements, broken alignment, overflow, missing components]

**Style Consistency:**
- [Comparison with other approved pages — consistent / drifted]

**Issues resolved from previous round:** [list what was fixed]
**Remaining issues for next round:** [list what still needs work]
**Quality gate:** [PASS / NEEDS WORK]
```

### Step 5: Convert to Next.js (Only After the Round Is Locked for Code)

Only execute this step when a specific round has been explicitly selected as the implementation source. Normally this is the approved round after round 6. Do not download HTML for exploratory or intermediate review rounds.

1. **Download HTML (SOURCE OF TRUTH FOR CODE):**
   - Get the screen details using `get_screen` for both PC and mobile screen IDs
   - Download the HTML from the screen's export endpoint
   - Save as `.stitch/designs/{screen}/round-{N}-pc.html` and `.stitch/designs/{screen}/round-{N}-mobile.html`
   - These HTML files are the **primary source** for code conversion — not the PNG screenshots

2. **Convert HTML to Next.js:**
   - Analyze the HTML structure, CSS classes, and layout patterns from both PC and mobile versions
   - Output file: `src/app/{route}/page.tsx` (or `src/components/{Screen}.tsx` for shared components)
   - Use Tailwind CSS classes informed by the HTML structure and design tokens from `.stitch/DESIGN.md`
   - **Full-bleed → container conversion:** Stitch HTML uses full-bleed layouts (0px outer margin, sections span the full 1280px canvas). When converting to Next.js, apply the project's responsive container conventions from `coding-standards.md` (e.g. `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) to inner content areas. The Stitch HTML is the source of truth for proportions and component structure; Next.js governs the actual responsive scaling and containment.
   - Implement responsive behavior based on the differences between PC and mobile HTML
   - Reuse exact files from `public/` via `next/image` when the screen uses existing project assets
   - Add `'use client'` directive only if interactive state is needed

3. **Follow** all rules in `.github/instructions/coding-standards.md`
4. **Do NOT** add API calls, data fetching, or business logic — design output only

### Step 6: Update App Documentation

Modify `.stitch/APP.md`:
- Mark the screen as `[x]` complete in Section 4 (Screen Inventory)
- Update Section 5 (Backlog) if a feature is done

### Step 7: Prepare the Next Baton (Critical)

**You MUST write back to `.stitch/designs/{screen}/baton.md` before completing.**

**If the design still needs work:** Increment `round` by 1, keep `mode: edit`, and write the next prompt as an edit of both current versions. The baton for this screen is updated in-place.

**If quality passes after round 6 minimum:** Set `status: approved` in this screen's baton. To start the next screen, create a new baton file at `.stitch/designs/{next-screen}/baton.md` with `round: 1`, `mode: generate`, `status: refining`. Every screen always keeps its own baton — never reuse or overwrite another screen's file.

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

CANVAS & RESPONSIVE SPEC:
- Stitch canvas: 1280px max desktop frame
- Desktop scaling: pc 1280/1920, laptop 1280/1600
- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements
- Full-bleed: all sections span the full 1280px canvas width with 0px outer horizontal margin
- Responsive tiers: pc 1920-1600, laptop 1600-1200, macbook 1200-900, tablet 900-700, mini-tablet 700-450, mobile <450

**STYLE CONSISTENCY:**
- Maintain the same visual language as the previously designed [dashboard/home/etc.] page
- Reuse the same navigation, footer, color palette, and component patterns

**Layout Goals:**
- Two-column layout: 240px sidebar + fluid content area
- Sticky sidebar, scrollable content
- Section headers with dividers inside content area
```

## File Structure Reference

```
project/
├── .stitch/
│   ├── metadata.json        # Stitch project & screen IDs (PC + mobile per screen)
│   ├── DESIGN.md            # Visual design tokens (user-defined)
│   ├── APP.md               # App structure, feature backlog, screen roadmap
│   └── designs/             # Per-screen artifact folders
│       └── {screen}/
│           ├── baton.md         # This screen's baton — round + status (never shared)
│           ├── round-1-pc.png
│           ├── round-1-mobile.png
│           ├── round-2-pc.png
│           ├── round-2-mobile.png
│           ├── ...
│           ├── round-{N}-pc.html    # HTML download for code (implementation-selected round only)
│           ├── round-{N}-mobile.html
│           └── review.md            # Single accumulated round review log (R1-R7+)
└── src/
    └── app/
        └── {route}/
            └── page.tsx     # Next.js output (after approval, based on HTML)
```

### `.stitch/metadata.json` Schema

```json
{
  "projectId": "6139132077804554844",
  "title": "My App",
   "titleConvention": {
      "pattern": "{screen}-r{round:02d}-{device}",
      "sourceOfTruth": "local-metadata"
   },
  "deviceType": "DESKTOP",
  "screens": {
    "dashboard": {
      "pcId": "d7237c7d78f44befa4f60afb17c818c1",
      "mobileId": "a1b2c3d4e5f64789abcdef0123456789",
         "pcCanonicalTitle": "dashboard-r06-desktop",
         "mobileCanonicalTitle": "dashboard-r06-mobile",
      "pcSource": "projects/6139132077804554844/screens/d7237c7d78f44befa4f60afb17c818c1",
      "mobileSource": "projects/6139132077804554844/screens/a1b2c3d4e5f64789abcdef0123456789",
      "currentRound": 6,
      "status": "approved"
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `projectId` | Stitch project ID |
| `titleConvention.pattern` | Canonical local title format. Use exactly `{screen}-r{round:02d}-{device}` |
| `screens[].pcId` | Latest PC screen id — overwrite after every edit round |
| `screens[].mobileId` | Latest mobile screen id — overwrite after every edit round |
| `screens[].pcCanonicalTitle` | Authoritative local round title for the PC design |
| `screens[].mobileCanonicalTitle` | Authoritative local round title for the mobile design |
| `screens[].currentRound` | Last completed round for this screen (1+) |
| `screens[].status` | `refining` / `final-review` / `approved` |

## Quality Gates

Before marking a screen `approved`, verify:

- [ ] At least 6 rounds completed in sequence
- [ ] Both PC and mobile designs exist for every round
- [ ] Mobile review PNGs are stored at the highest available export resolution
- [ ] Canonical local titles are recorded in `.stitch/metadata.json` using `{screen}-r{round:02d}-desktop` and `{screen}-r{round:02d}-mobile`
- [ ] Round 2+ used `edit_screens` against the previous versions
- [ ] Round 2+ prompts included `BASE VERSION`, `SECTION-BY-SECTION REVIEW`, and `do not regenerate from scratch`
- [ ] Round 6 review doc shows `PASS`
- [ ] **Cross-device section parity** is documented: every required section exists in both PC and mobile, or any intentional mobile merge/collapse is explicitly noted
- [ ] **No layout defects**: no overlapping elements, broken alignment, content overflow, or clipped text
- [ ] **No missing components**: all elements from previous rounds are still present
- [ ] Design tokens from `DESIGN.md` are consistently applied (if DESIGN.md exists)
- [ ] **Cross-page consistency**: shared components match other approved pages
- [ ] Existing project assets from `public/` are used wherever they match
- [ ] Empty/error/loading states are designed (round 5)
- [ ] No placeholder text (Lorem Ipsum) in final design
- [ ] Color contrast meets WCAG AA (round 6)
- [ ] Mobile layout is properly adapted (not just a shrunk desktop)

## Common Pitfalls

- ❌ Jumping from round 1 to round 6 — every round must be completed
- ❌ Generating only PC design without mobile — both are mandatory
- ❌ Using `generate_screen_from_text` again after round 1
- ❌ Downloading HTML for iterative review rounds instead of only the locked implementation round
- ❌ Trusting the Stitch UI title as the round identifier instead of the local canonical title in `.stitch/metadata.json`
- ❌ Generating code before the design is approved
- ❌ Writing code from screenshots instead of HTML downloads
- ❌ Ignoring layout issues (overlapping, overflow, broken alignment)
- ❌ Skipping the PC/mobile section parity check and missing a section that disappeared on mobile
- ❌ Designing pages with inconsistent styles across the project
- ❌ Re-pasting the full round 1 concept into round 2+
- ❌ Pasting the full canvas spec in round 2+ when DESIGN.md is authoritative — use the 4-line compact block only
- ❌ Writing a generate prompt over 5000 characters — Stitch will reject it
- ❌ Writing a generic review instead of section-by-section for every visible section
- ❌ Forgetting to update `.stitch/designs/{screen}/baton.md` after each round (breaks the loop for that screen)
- ❌ Sharing or overwriting a baton across screens (each screen must own its own `baton.md`)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Stitch returns "prompt too long" | Generate: keep ≤ 5000 chars; if DESIGN.md is authoritative use compact canvas block (4 lines) instead of full spec. Edit: keep ≤ 4500 chars, delta-only |
| Design drifts from brand | Reference `.stitch/DESIGN.md` tokens and previous approved pages |
| Layout breaks / overlaps | Make it the primary fix in the next round; describe exact elements and positions |
| Mobile is missing a section | Add a `CROSS-DEVICE SECTION PARITY` block and explicitly restore or intentionally merge the missing section |
| Loop stalls | Check `.stitch/designs/{screen}/baton.md` has valid `screen`, `round`, and `status` fields |
| Round 6 fails quality gate | Re-run round 6 with specific problems addressed — do NOT skip to code |
| Pages look different | Review other approved page screenshots and enforce shared component consistency |
| Mobile just looks like shrunk desktop | Rewrite mobile prompt with explicit mobile adaptations (stacked layout, hamburger nav, etc.) |
