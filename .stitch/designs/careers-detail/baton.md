---
screen: careers-detail
round: 7
mode: edit
base-pc-id: f8d3774693c64020809f3a2f6b7e093c
base-mobile-id: 0a7f0435618948509926bf9b1da7c821
status: approved
---
ROUND 7 FOCUS: Art-direction refinement (extra iteration)

**CANONICAL TITLES (REQUIRED):**
- PC: `careers-detail-r07-desktop`
- Mobile: `careers-detail-r07-mobile`
- Source IDs:
	- PC: `f8d3774693c64020809f3a2f6b7e093c`
	- Mobile: `0a7f0435618948509926bf9b1da7c821`

**BASE VERSION (REQUIRED):**
- Previous round: 6
- PC screen id: b6540818d8ce4d80ae068b8c56308999
- Mobile screen id: 195526d0b05146a385e379a2561ef95c
- Instruction: update from previous version only; do not regenerate from scratch

CANVAS LAYOUT (PERMANENT CONSTRAINT - DO NOT CHANGE):
- PC outer padding (HARDCODED - NON-NEGOTIABLE): every section wrapper uses exactly padding-left: 10px and padding-right: 10px - no more, no less.
- Full-bleed backgrounds: background colors, gradients, and images must extend to the canvas edge; the 10px applies to inner content offset only.
- Inner content starts 10px from the canvas edge; no additional outer margin or padding beyond this 10px is permitted.
- 1280px max desktop frame.
- Overflow rule: no element may exceed the 1280px frame.
- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally.
- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements.

SECTION-BY-SECTION REVIEW (REQUIRED):
- Section 1 - Mini hero: maintain asymmetry and refine decorative hierarchy into clear depth layers.
- Section 2 - Job description: keep paragraph prose and improve long-read rhythm with better spacing cadence.
- Section 3 - Job suggest: keep exactly 4 complete cards and improve per-card scan cadence via subtle variation.

CROSS-DEVICE SECTION PARITY (REQUIRED):
- Mini hero - present in both desktop and mobile.
- Job description - present in both desktop and mobile with full content intent preserved.
- Job suggest - present in both desktop and mobile.

LAYOUT ISSUES:
- No hard overlap, clipping, or section loss detected in round 6.
- Edge-near distribution remains good and must remain unchanged.
- Decorative layers must stay subtle and never reduce usability.

STYLE CONSISTENCY CHECK:
- Overall direction matches approved Lac Minh pages.
- Maintain round-6 decorative details as subtle accents, not dominant visuals.

ASSETS IN THIS ROUND (LOCKED):
- /logo.png - canonical brand mark in navbar/footer
- /hero_background.png - mini hero base image
- /trongdong.png - heritage symbol in summary area
- /void_map.png - subtle ambient texture in suggest section
- Asset fidelity: use exact project asset files as canonical imagery
- Preserve native aspect ratio
- If exact rendering is not possible, keep a locked media slot for Next.js replacement

THIS ROUND'S CHANGES ONLY:
- User-requested extra refinement round executed after approval.
- Organized motifs into clearer multi-depth layering and diagonal visual flow.
- Kept responsibilities/requirements in paragraph format and improved prose rhythm.
- Preserved exactly 4 complete related-job cards with subtle card-level cadence.
- Preserved edge-near composition, focus visibility, and no-overflow behavior.

**Component Checklist (Round 7):**
- [x] Decorative hierarchy refinement pass
- [x] Prose rhythm/readability pass
- [x] Four-card cadence pass
- [x] Edge-near layout lock preserved
- [x] Accessibility/focus visibility preserved
