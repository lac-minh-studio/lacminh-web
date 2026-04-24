---
name: coding-edit
description: "Use when: edit old design, change old design, refresh existing Next.js UI that already exists in the current src codebase, update an existing route, page, section, or component in place to match a revised Stitch design or a new UI requirement, fix layout drift in existing frontend code, or make surgical frontend edits without rebuilding from scratch. Existing-code skill; not for brand-new route, page, section, or component generation from approved Stitch rounds, backend, API wiring, SEO analysis, or UI design generation."
---

# Coding Edit Skill

Edit existing frontend code in this repo.

## Scope

- Edit-only.
- Use only when the target already exists in `src/` and must be changed in place.
- Input: failing behavior, visible mismatch, or revised design delta.
- Output: surgical edits to existing frontend code.

## Hard Boundaries

- If the target does not exist in `src/`, route to `coding-fe`.
- No backend, API wiring, SEO, or Stitch design generation.
- No broad refactors for a local change.
- No shared primitive or global reusable component changes without user approval.

## Required Reads Before Coding

1. Read [../../instructions/coding-standards.md](../../instructions/coding-standards.md).
2. Read [resources/anchor-selection.md](resources/anchor-selection.md), [resources/validation-rules.md](resources/validation-rules.md), and [resources/project-standards.md](resources/project-standards.md).
3. Identify the anchor from the failing behavior, visible mismatch, or user-named page, section, component, or route.
4. Read only the anchor file first. Expand to the nearest controlling parent component or hook only if the current hypothesis requires it.
5. If a revised Stitch artifact exists, resolve the selected round from `.stitch/metadata.json`, then compare the revised artifact against the current implementation instead of rebuilding from scratch.
6. Scan the existing components, styles, and assets used by the touched slice before editing.
7. If requirements are ambiguous, ask focused questions before editing.

## Checkpoint

Before the first edit, the AI must report:

- the current anchor
- confirmation that the requested target already exists in `src/`
- the existing component names relevant to the change
- the owning file or nearest controlling files
- one falsifiable local hypothesis
- one cheap discriminating check

If the requested target does not exist in `src/`, stop and route to `coding-fe`. If no reusable component is relevant, the AI must state that explicitly before editing.

## Workflow Routing

| Need | Workflow |
|:---|:---|
| Make a local UI fix or targeted structural edit | [surgical-update](workflows/surgical-update.md) |
| Refresh an existing page or section to match a revised design delta | [design-refresh](workflows/design-refresh.md) |

## Rules

- Anchor on failing behavior or visible mismatch.
- Read narrow. Max 2 abstraction hops.
- First edit must be the smallest plausible test.
- Validate immediately: typecheck, lint, then the narrowest behavior check.
- If validation falsifies the hypothesis, move vertically to the nearest controlling parent or hook.
- Ignore unrelated dead code. Mention it only in the result.
- Preserve tokens, HeroUI usage, semantics, and route structure unless the task explicitly changes them.
- Server-first. Client only for hooks, handlers, or browser-only APIs.

## Output

- the existing route files already involved in the feature
- existing feature components
- local extracted subcomponents when required by the touched slice
- token or utility entries in `src/app/globals.css` only when directly required by the requested design change

## Resources

- [resources/anchor-selection.md](resources/anchor-selection.md)
- [resources/validation-rules.md](resources/validation-rules.md)
- [resources/project-standards.md](resources/project-standards.md)
- [workflows/surgical-update.md](workflows/surgical-update.md)
- [workflows/design-refresh.md](workflows/design-refresh.md)