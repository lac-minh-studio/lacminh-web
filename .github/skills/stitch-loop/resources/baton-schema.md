# Baton File Schema

Each screen has its own baton file at `.stitch/designs/{screen}/baton.md`. This is the communication mechanism between rounds for that screen — it is **never shared with other screens**. Switching pages never overwrites another screen's baton. It tracks the current round and which of the 6 required design rounds is next. Each round produces BOTH a PC and a mobile design.

## Format

```yaml
---
screen: <screen-identifier>
round: <1+>
mode: generate | edit
base-pc-id: <required-for-edit-rounds>
base-mobile-id: <required-for-edit-rounds>
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
| `base-pc-id` | string | Required for `mode: edit` | Latest PC Stitch screen id to edit |
| `base-mobile-id` | string | Required for `mode: edit` | Latest mobile Stitch screen id to edit |
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
- Round screenshots are saved as:
  - `.stitch/designs/{screen}/round-{round}-pc.png`
  - `.stitch/designs/{screen}/round-{round}-mobile.png` — always save the highest available export resolution and do not downscale after download
- When a round is explicitly selected for implementation, HTML is downloaded as:
  - `.stitch/designs/{screen}/round-{round}-pc.html`
  - `.stitch/designs/{screen}/round-{round}-mobile.html`
- Review notes are appended into a single file: `.stitch/designs/{screen}/review.md`
- Do not create one review file per round; keep rounds `R1` to `R7+` in the same log

### Body (Markdown)

The body MUST always begin with the round declaration, then include:

1. **Round N FOCUS header** — states the round topic explicitly
2. **Canonical Titles block** — the authoritative local names for the current round:
  - PC: `{screen}-r{round:02d}-desktop`
  - Mobile: `{screen}-r{round:02d}-mobile`
3. **Base Version block** (rounds 2+) — previous round number, PC and mobile screen IDs, and `update from previous version only; do not regenerate from scratch`
4. **Section-by-Section Review** (rounds 2+) — for every visible section: what exists, what is missing, and what must change
5. **Cross-Device Section Parity** (rounds 2+) — compare PC and mobile section coverage, confirm each required section exists in both variants, and explicitly note any intentional mobile merge/collapse
6. **Layout Issues** (rounds 2+) — specifically call out overlapping elements, broken alignment, content overflow, and missing components from prior rounds
7. **Style Consistency Check** (rounds 2+) — compare shared components with other approved pages and flag drift
8. **This round's specific goals** — what must be improved or added
9. **Assets in this round** (required when relevant) — only the exact root-relative paths from `public/` touched in the current edit
10. **Component Checklist** — specific UI elements to address this round

Round 2+ prompts are delta-only. The baton must not carry forward the full round 1 screen description.
If a section is intentionally collapsed or merged on mobile, the parity block must say so explicitly.

## Example — Round 3 Baton

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

**BASE VERSION (REQUIRED):**
- Previous round: 2
- PC screen id: d7237c7d78f44befa4f60afb17c818c1
- Mobile screen id: a1b2c3d4e5f64789abcdef0123456789
- Instruction: update from previous version only; do not regenerate from scratch

**SECTION-BY-SECTION REVIEW (REQUIRED):**
- Section 1 — Sidebar: navigation exists, but active state is too weak and hover state is missing
- Section 2 — KPI row: cards exist, but value hierarchy and spacing are inconsistent across items
- Section 3 — Chart panel: chart shell exists, but legend, filters, and captioning are incomplete
- Section 4 — Data table: table exists, but sort icons, hover feedback, and checkbox states are missing
- Section 5 — Top actions: button group exists, but primary/secondary emphasis and spacing are unclear

**CROSS-DEVICE SECTION PARITY (REQUIRED):**
- Sidebar and top actions exist in both PC and mobile
- KPI row exists in both; mobile stacks cards vertically but keeps the full set
- Chart panel exists in both; mobile is missing the legend/filter cluster and must restore it or intentionally merge it
- Data section exists in both; mobile may collapse rows into cards, but the section itself must remain

**LAYOUT ISSUES:**
- KPI cards overlap on mobile viewport at current sizing
- Chart legend text clips against the card boundary in PC view

**STYLE CONSISTENCY:**
- Consistent with homepage navigation and color palette — no drift detected

**This Round's Goals:**
Refine every interactive component to match the design system precisely.
Focus on: data table (sort indicators, row hover, checkbox column),
KPI cards (icon/value/trend hierarchy), sidebar states, button variants.

**Component Checklist:**
- [ ] Sidebar: active item state, hover feedback
- [ ] KPI card: icon/value/trend hierarchy
- [ ] Data table: header, sort, row hover, checkbox
- [ ] Buttons: primary/secondary/destructive variants
```

## Validation Rules

Before advancing to the next round, validate the baton:

- [ ] `screen` frontmatter field exists and matches a route in `APP.md`
- [ ] `round` is incremented by exactly 1 from the previous baton
- [ ] `mode` is `generate` for round 1 and `edit` for round 2+
- [ ] `base-pc-id` and `base-mobile-id` are both present for round 2+
- [ ] `status` correctly reflects the current round (see table above)
- [ ] Body starts with `ROUND {N} FOCUS:` header
- [ ] Body includes `CANONICAL TITLES` using the exact `{screen}-r{round:02d}-{device}` pattern
- [ ] Rounds 2+ include `BASE VERSION`, `SECTION-BY-SECTION REVIEW`, `CROSS-DEVICE SECTION PARITY`, `LAYOUT ISSUES`, and `STYLE CONSISTENCY`
- [ ] Round 2+ baton is delta-only and does not repeat the full round 1 prompt body
- [ ] Parity section explains whether any missing mobile section is intentional or a defect
- [ ] Layout issues section specifically identifies overlapping, overflow, and alignment problems
- [ ] Style consistency section compares with other approved pages
- [ ] If relevant imagery exists in `public/`, the baton includes an asset block
- [ ] Component checklist is specific and actionable
