# Review Log — careers-detail

## Round 1 Review — careers-detail

**Focus:** Concept & Layout  
**Base version:** N/A (first generation)

**PC Review:**
- Section 1 — Mini hero: hierarchy is clear with breadcrumb, role title, and metadata chips; hero height is controlled and does not consume full viewport.
- Section 2 — Job description: 65/35 editorial layout is present; left column is text-heavy with readable blocks; right summary card supports quick scanning and CTA actions.
- Section 3 — Job suggest: related jobs grid is present with three cards and compact metadata.

**Mobile Review:**
- Section 1 — Mini hero: content compresses into a readable stacked block with preserved context.
- Section 2 — Job description: content is converted to a single-column flow; primary CTA remains visible and touch-friendly.
- Section 3 — Job suggest: related jobs remain present and readable in compact card form.

**Canonical Titles:**
- PC: `careers-detail-r01-desktop`
- Mobile: `careers-detail-r01-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both PC and mobile.
- Job description — present in both; mobile keeps full content intent via stacked modules.
- Job suggest — present in both; mobile uses compact list/card adaptation.

**Layout Issues Found:**
- No clipping or section disappearance detected.
- Mobile text density is high in the JD body and can benefit from stronger spacing rhythm in round 2.
- Suggest cards are readable but visual emphasis between active jobs and coming-soon card should be improved.

**Style Consistency:**
- Overall palette and typography direction align with approved careers/projects pages.
- Navbar/footer language is generally consistent, but round 2 should tighten brand-consistent spacing and visual depth tokens.

**Issues resolved from previous round:**
- Initial 3-section architecture for careers/[slug] established.
- Text-first page direction achieved.

**Remaining issues for next round:**
- Strengthen visual identity tokens (glass/neu depth consistency and spacing rhythm).
- Improve CTA hierarchy and card contrast.
- Refine mobile readability and spacing scale.

**Quality gate:** NEEDS WORK → advance to Round 2 (Visual Identity)

---

## Round 2 Review — careers-detail

**Focus:** Visual Identity  
**Base version:** round 1

**PC Review:**
- Section 1 — Mini hero: heading weight and contrast are stronger; eyebrow accent is clearer; subtitle legibility improved against dark hero background.
- Section 2 — Job description: panel depth is more consistent, with clearer glass/neumorphic treatment and cleaner hierarchy between content blocks and sticky summary card.
- Section 3 — Job suggest: active openings are easier to distinguish; coming-soon card is more subdued and no longer competes with active roles.

**Mobile Review:**
- Section 1 — Mini hero: hierarchy improved and remains readable in compact width.
- Section 2 — Job description: module separation and CTA hierarchy improved; primary action is clearer.
- Section 3 — Job suggest: related roles remain visible and scannable in stacked form.

**Canonical Titles:**
- PC: `careers-detail-r02-desktop`
- Mobile: `careers-detail-r02-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both PC and mobile.
- Job description — present in both; full content intent preserved.
- Job suggest — present in both; mobile keeps compact adaptation without section loss.

**Layout Issues Found:**
- No clipping, overlap, or missing section detected.
- Mobile long-form copy is improved but still dense in some JD subsections; micro-spacing can be refined further.

**Style Consistency:**
- Visual language now aligns more tightly with approved careers/projects pages.
- Bronze accent and depth tokens are more coherent across sections.

**Issues resolved from previous round:**
- Stronger mini hero typography hierarchy.
- Better CTA dominance (primary vs secondary).
- Better suggestion-card emphasis logic.

**Remaining issues for next round:**
- Add richer component states (hover/active/focus/disabled) in both desktop and mobile.
- Tighten readability rhythm in the longest text modules.
- Polish interactive card/link affordance clarity.

**Quality gate:** NEEDS WORK → advance to Round 3 (Component Detail)

---

## Round 3 Review — careers-detail

**Focus:** Component Detail  
**Base version:** round 2

**PC Review:**
- Section 1 — Mini hero: component surfaces are less aggressive; elevation reduction gives cleaner, calmer hierarchy.
- Section 2 — Job description: cards and panels now feel less embossed, with better reading comfort and less visual noise.
- Section 3 — Job suggest: card language now matches careers page pattern (INTERN label, department pill, skill chips, arrow-link CTA), and the coming-soon variant is properly de-emphasized.

**Mobile Review:**
- Section 1 — Mini hero: depth is reduced and more stable on small screen.
- Section 2 — Job description: dense modules are easier to parse after tone-down of panel prominence.
- Section 3 — Job suggest: careers-style cards are applied consistently and maintain touch-friendly rhythm.

**Canonical Titles:**
- PC: `careers-detail-r03-desktop`
- Mobile: `careers-detail-r03-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both PC and mobile.
- Job description — present in both; content intent preserved.
- Job suggest — present in both; careers-card pattern preserved across devices.

**Layout Issues Found:**
- Full-width intent is now visually stronger (no obvious side-gap artifacts).
- No clipping or overflow detected in core sections.
- Minor text-density pockets remain in long JD lists on mobile.

**Style Consistency:**
- Better alignment with existing careers page due to reused card language.
- Reduced elevation now feels closer to the broader site balance.

**Issues resolved from previous round:**
- Reduced component "nổi" level globally.
- Full-width section feel tightened.
- Related-job cards synchronized with existing careers card style.

**Remaining issues for next round:**
- Improve realistic content density and micro-copy depth in JD modules.
- Finalize data realism across all related job cards.
- Continue mobile long-text readability tuning.

**Quality gate:** NEEDS WORK → advance to Round 4 (Data & Content)

---

## Round 4 Review — careers-detail

**Focus:** Data & Content + Edge Distribution Refinement  
**Base version:** round 3

**PC Review:**
- Section 1 — Mini hero: inner content now uses horizontal span more assertively; less center-clustered feeling.
- Section 2 — Job description: module groups sit closer to frame edges, producing a stronger full-width impression while preserving readability.
- Section 3 — Job suggest: card cluster is spread wider left-to-right with tighter edge distance and careers-card style preserved.

**Mobile Review:**
- Section 1 — Mini hero: content feels less inset and more edge-aligned.
- Section 2 — Job description: cards/modules sit closer to screen boundaries with clearer full-width presence.
- Section 3 — Job suggest: cards hug available width better and keep touch-friendly behavior.

**Canonical Titles:**
- PC: `careers-detail-r04-desktop`
- Mobile: `careers-detail-r04-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both PC and mobile.
- Job description — present in both; section intent preserved.
- Job suggest — present in both; careers-card pattern preserved.

**Layout Issues Found:**
- No clipping or overflow detected.
- User-requested edge-near distribution has been applied and is visibly stronger.
- Some long-copy modules still need denser content polish for round 5 edge-case checks.

**Style Consistency:**
- Consistent with approved careers visual language.
- Reduced elevation and full-width behavior now feel coherent together.

**Issues resolved from previous round:**
- Distance from cards/components to screen edges reduced.
- Narrow centered clustering removed in core sections.
- Full-width perception significantly improved on both desktop and mobile.

**Remaining issues for next round:**
- Validate edge cases (loading/empty/error) with current edge-near layout.
- Stress-test long text and card density scenarios.

**Quality gate:** NEEDS WORK → advance to Round 5 (Edge Cases & Density)

---

## Round 5 Review — careers-detail

**Focus:** Edge Cases & Density + Decorative Detail  
**Base version:** round 4

**PC Review:**
- Section 1 — Mini hero: subtle heritage motifs and engraved lines were added; header now feels less plain without overpowering text.
- Section 2 — Job description: module dividers and shallow inset lines reduce monotony and improve scan rhythm.
- Section 3 — Job suggest: careers-card structure is preserved, now with restrained ornamental accents and stronger production-readiness states.

**Mobile Review:**
- Section 1 — Mini hero: low-opacity motif treatment adds texture while preserving readability.
- Section 2 — Job description: decorative separators remain lightweight and mobile-safe.
- Section 3 — Job suggest: loading/empty/error variations are present while keeping cards edge-near and touch-friendly.

**Canonical Titles:**
- PC: `careers-detail-r05-desktop`
- Mobile: `careers-detail-r05-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both PC and mobile.
- Job description — present in both; decorative treatment and content intent preserved.
- Job suggest — present in both; careers-card pattern and state variants preserved.

**Layout Issues Found:**
- No clipping or overflow detected in decorative layers.
- Edge-near distribution remains intact after adding motifs and separators.
- Ornament density is controlled and does not conflict with readability.

**Style Consistency:**
- New details (hoa van, duong chim, filigree accents) fit the Lac Minh tone and do not break design-system consistency.
- Visual language remains aligned with prior approved pages.

**Issues resolved from previous round:**
- Page no longer feels plain; added tasteful ornamental detail.
- Added edge-case states (loading/empty/error-like hint) without breaking layout.

**Remaining issues for next round:**
- Final polish and accessibility checks (contrast, focus visibility, icon clarity).
- Confirm ornamental details remain subtle across all interaction states.

**Quality gate:** NEEDS WORK → advance to Round 6 (Polish & Accessibility)

---

## Round 6 Review — careers-detail

**Focus:** Polish & Accessibility + user-requested final refinements  
**Base version:** round 5

**PC Review:**
- Section 1 — Mini hero: background ornament density is richer than round 5 with asymmetric distribution; text contrast remains readable.
- Section 2 — Job description: "Trách nhiệm công việc" and "Yêu cầu kỹ năng" are converted to paragraph prose while keeping section headings.
- Section 3 — Job suggest: exactly 4 complete careers-style cards are present; no skeleton, coming-soon, or placeholder card remains.

**Mobile Review:**
- Section 1 — Mini hero: denser motifs are present with controlled opacity and asymmetric placement.
- Section 2 — Job description: responsibilities/requirements are paragraph-based and remain readable on small width.
- Section 3 — Job suggest: 4 complete cards are present with stable touch-friendly rhythm and no placeholder variants.

**Canonical Titles:**
- PC: `careers-detail-r06-desktop`
- Mobile: `careers-detail-r06-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both desktop and mobile.
- Job description — present in both desktop and mobile with paragraph conversion preserved.
- Job suggest — present in both desktop and mobile with 4 complete cards.

**Layout Issues Found:**
- No clipping or overflow detected in key sections.
- Edge-near distribution remains intact on both devices.
- Decorative layers stay subtle enough to avoid readability conflicts.

**Style Consistency:**
- Updated motifs and card language remain aligned with Lac Minh visual direction.
- Careers-card pattern consistency is preserved in related jobs.

**Issues resolved from previous round:**
- Increased embedded motif richness in background.
- Enforced asymmetric ornamental composition.
- Converted responsibilities/requirements to paragraph prose.
- Replaced all non-final suggestion states with 4 complete cards.

**Remaining issues for next round:**
- None required for current scope.

**Quality gate:** PASS → Round 6 approved

---

## Round 7 Review — careers-detail

**Focus:** Art-direction refinement (extra iteration requested)  
**Base version:** round 6

**PC Review:**
- Section 1 — Mini hero: ornaments are reorganized into clearer layered depth with asymmetric diagonal flow, while headline contrast remains stable.
- Section 2 — Job description: paragraph prose remains intact; spacing rhythm and separator calmness are improved for long-form readability.
- Section 3 — Job suggest: still exactly 4 complete careers-style cards, now with subtle per-card cadence for faster visual scanning.

**Mobile Review:**
- Section 1 — Mini hero: decorative layering remains visible but controlled, with no readability drop.
- Section 2 — Job description: paragraph rhythm is improved for narrow width reading.
- Section 3 — Job suggest: keeps 4 complete cards and touch-friendly cadence without placeholders.

**Canonical Titles:**
- PC: `careers-detail-r07-desktop`
- Mobile: `careers-detail-r07-mobile`

**Cross-Device Section Parity:**
- Mini hero — present in both desktop and mobile.
- Job description — present in both desktop and mobile with paragraph format preserved.
- Job suggest — present in both desktop and mobile with 4 complete cards preserved.

**Layout Issues Found:**
- No clipping or overflow detected.
- Edge-near composition remains intact on both devices.
- No section disappearance observed in mobile.

**Style Consistency:**
- Refined motifs and card cadence remain consistent with Lac Minh design language.
- Shared component behavior and visual tone remain aligned with approved pages.

**Issues resolved from previous round:**
- Better decorative depth hierarchy and eye-flow guidance.
- Improved paragraph reading rhythm.
- Improved related-card scan cadence without changing content structure.

**Remaining issues for next round:**
- None. Round 7 locked as implementation source.

**Quality gate:** PASS → Round 7 approved
