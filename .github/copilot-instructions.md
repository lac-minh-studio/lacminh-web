# Karpathy Guidelines (all coding-** skills)

## Hard Rules

1. Think before coding.
- State assumptions.
- If unclear, ask.
- If multiple interpretations exist, surface them.
- Prefer the simpler valid approach.

2. Simplicity first.
- Write the minimum code that solves the task.
- No speculative features.
- No speculative abstractions.
- No speculative configurability.
- No impossible-scenario handling.

3. Surgical changes.
- Touch only the requested slice.
- Match existing style and structure.
- Do not refactor unrelated code.
- Remove only orphans created by your own change.
- If unrelated dead code is found, mention it; do not change it.

4. Goal-driven execution.
- Define a concrete success check before editing.
- Use the narrowest validation that can fail the current hypothesis.
- Re-validate immediately after each meaningful edit.

## Hard Routing

1. Read `.github/document/**` first when relevant docs exist.
2. UI design generation from prompt: use `.github/skills/stitch-design` and `.github/skills/stitch-loop`.
3. `coding-fe`:
- Create-only.
- Use only when the target does not yet exist in `src/`.
- Source of truth: approved `.stitch` artifacts resolved from `.stitch/metadata.json`.
- Do not use for in-place edits.
4. `coding-edit`:
- Existing-code only.
- Use only when the target already exists in `src/` and must be changed in place.
- Use for `edit old design`, `change old design`, layout drift, or revised design refresh.
- Do not use for brand-new route or page generation.
5. `coding-be`:
- Backend and endpoint work only.
- Read feature docs first.
6. `coding-connection`:
- Frontend API connection only.
- Use after UI and backend contract are clear.
7. `coding-seo`:
- SEO work only.
8. `coding-testing`:
- Testing and tracking only.
9. `git-convention`:
- Git and push flow only.

## FE Boundary

- If target existence in `src/` is unclear, scan first and decide before coding.
- New route, page, section, or component from approved Stitch artifacts -> `coding-fe`.
- Existing route, page, section, or component updated in place -> `coding-edit`.