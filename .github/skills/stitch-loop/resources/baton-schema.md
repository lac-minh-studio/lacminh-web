# Baton File Schema

The baton file (`next-prompt.md`) is the communication mechanism between loop iterations. It tracks the current screen and which of the 6 required design rounds is next.

## Format

```yaml
---
screen: <screen-identifier>
round: <1+>
mode: generate | edit
base-screen-id: <required-for-edit-rounds>
status: refining | final-review | approved
---
ROUND {N} FOCUS: {Round Topic}
<prompt-content>
```

## Fields

### Frontmatter (YAML)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `screen` | string | Yes | Screen identifier (maps to `src/app/{route}/page.tsx`) |
| `round` | integer | Yes | Current design round. Must increase by exactly 1 each iteration. |
| `mode` | enum | Yes | `generate` for round 1, `edit` for round 2 and later |
| `base-screen-id` | string | Required for `mode: edit` | Latest Stitch screen id that the next round must edit |
| `status` | enum | Yes | `refining`, `final-review`, or `approved` |

### Round Progression

| Round | Status to set | Topic |
|-------|--------------|-------|
| 1 | `refining` | Concept & Layout |
| 2 | `refining` | Visual Identity |
| 3 | `refining` | Component Detail |
| 4 | `refining` | Data & Content |
| 5 | `refining` | Edge Cases & Density |
| 6 | `final-review` | Polish & Accessibility |
| 7+ | `refining` or `final-review` | Extra polish or user-requested revision based on the previous version |

After round 6 minimum passes quality gate → set `status: approved` and pick next screen from backlog.

## Artifact Convention

- Each screen owns one artifact folder: `.stitch/designs/{screen}/`
- Round screenshots are saved as `.stitch/designs/{screen}/round-{round}.png`
- Review notes are appended into a single file: `.stitch/designs/{screen}/review.md`
- Do not create one review file per round; keep rounds `R1` to `R7+` in the same log for later audit

### Body (Markdown)

The body MUST always begin with the round declaration, then include:

1. **Round N FOCUS header** — states the round topic explicitly
2. **Base Version block** (rounds 2+) — previous round number, current screen id, and `update from previous version only; do not regenerate from scratch`
3. **Section-by-Section Review** (rounds 2+) — for every visible section: what exists, what is missing, what violates the current round focus, what must change
4. **This round's specific goals** — what must be improved or added
5. **Design snapshot** (required) — round 1 may use a fuller design block, but round 2+ should prefer a compact 6-10 line snapshot that preserves the current palette, typography, materials, depth recipe, and 1280 canvas rules without re-pasting the entire initial concept
6. **Assets in this round** (required when relevant) — only the exact root-relative paths from `public/` touched in the current edit, plus asset fidelity and aspect-ratio preservation rules
7. **Component Checklist** — specific UI elements to address this round

Round 2+ prompts are delta-only. The baton must not carry forward the full round 1 screen description or unchanged section specs. `edit_screens` already has the previous visual state.

If exact image fidelity inside Stitch preview is required, the baton must note that the relevant asset has already been uploaded manually to the Stitch project. Otherwise the baton must treat the asset as a locked reference or media slot only.

## Example — Round 3 Baton

```markdown
---
screen: dashboard
round: 3
mode: edit
base-screen-id: d7237c7d78f44befa4f60afb17c818c1
status: refining
---
ROUND 3 FOCUS: Component Detail

**BASE VERSION (REQUIRED):**
- Previous round: 2
- Screen id: d7237c7d78f44befa4f60afb17c818c1
- Instruction: update from previous version only; do not regenerate from scratch

**SECTION-BY-SECTION REVIEW (REQUIRED):**
- Section 1 — Sidebar: navigation exists, but active state is too weak and hover state is missing
- Section 2 — KPI row: cards exist, but value hierarchy and spacing are inconsistent across items
- Section 3 — Chart panel: chart shell exists, but legend, filters, and captioning are incomplete
- Section 4 — Data table: table exists, but sort icons, hover feedback, and checkbox states are missing
- Section 5 — Top actions: button group exists, but primary/secondary emphasis and spacing are unclear

**This Round's Goals:**
Refine every interactive component to match the design system precisely.
Focus on: data table (sort indicators, row hover, checkbox column),
KPI cards (icon/value/trend hierarchy), sidebar states, button variants.

**DESIGN SNAPSHOT (COMPACT):**
- Preserve the current palette, typography, materials, and layout hierarchy from the previous version
- Style: Glassmorphism + Neumorphism hybrid design
- Theme: Dark, data-dense, professional
- Primary Accent: #6366f1 (Indigo)
- Depth recipe: dual-direction neumorphic shadows
- Glass recipe: translucent fill, background blur, highlight border
- Flat surfaces: forbidden
- Stitch canvas: 1280px max desktop frame
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements

**ASSETS IN THIS ROUND (LOCKED):**
- `/logo.png` — canonical brand mark for navigation and app identity
- `hero_background.png` — atmospheric hero background reference
- `trongdong.png` — symbolic feature artwork
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

**Component Checklist:**
- [ ] Data table: sort icon in header, row hover (#1e2233), checkbox selection
- [ ] KPI card: icon 24px, value 32px bold, trend up/down arrow, label 12px muted
- [ ] Sidebar: 3px left border active state, #6366f1 active bg at 10% opacity
- [ ] Primary button: bg #6366f1, hover bg #4f46e5, text #fff
- [ ] Secondary button: border #334155, bg transparent, hover bg #1e2233
```

## Validation Rules

Before advancing to the next round, validate the baton:

- [ ] `screen` frontmatter field exists and matches a route in `APP.md`
- [ ] `round` is incremented by exactly 1 from the previous baton
- [ ] `mode` is `generate` for round 1 and `edit` for round 2+
- [ ] `status` correctly reflects the current round (see table above)
- [ ] Body starts with `ROUND {N} FOCUS:` header
- [ ] Rounds 2+ include `BASE VERSION` and `SECTION-BY-SECTION REVIEW`
- [ ] Round 2+ baton is delta-only and does not repeat the full round 1 prompt body
- [ ] Baton includes either a full round 1 design block or a compact round 2+ design snapshot
- [ ] Design snapshot includes the explicit depth recipe, anti-flatness rule, overflow rule, scale behavior, and density rule
- [ ] If relevant imagery exists in `public/`, the baton includes an asset block with the exact root-relative paths touched in this round
- [ ] If relevant imagery exists in `public/`, the baton includes asset-fidelity, native-aspect-ratio, and locked-slot fallback language
- [ ] Component checklist is specific and actionable
