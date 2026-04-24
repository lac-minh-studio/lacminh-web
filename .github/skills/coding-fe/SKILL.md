---
name: coding-fe
description: "Use when: design-to-code from Stitch, convert an approved Stitch round into new Next.js App Router UI for a route, page, section, or component that does not yet exist in the current src codebase, translate a Stitch screen or .stitch HTML and PNG into HeroUI-based frontend slices, implement a new route slice from .stitch/metadata.json using approved desktop and mobile artifacts, or create new frontend code from Stitch design patterns. Create-only skill; not for revising existing UI in place, editing old design, fixing layout drift, backend, API wiring, SEO analysis, or UI design generation."
---

# Coding FE Skill

Convert approved Stitch output into new Next.js UI code.

## Scope

- Create-only.
- Use only when the target does not yet exist in `src/`.
- Source of truth: approved `.stitch` artifacts resolved from `.stitch/metadata.json`.
- Output: thin route files, feature components, mock data, interfaces, and required token utilities.

## Hard Boundaries

- If the target already exists in `src/` and needs in-place changes, route to `coding-edit`.
- No backend, API wiring, SEO, or Stitch design generation.
- No new visual direction beyond Stitch and project tokens.
- No shared primitive or global reusable component changes without user approval.

## Required Reads Before Coding

1. Read [../../instructions/coding-standards.md](../../instructions/coding-standards.md).
2. Read [resources/heroui-lib.md](resources/heroui-lib.md), [resources/tailwind-tokens.md](resources/tailwind-tokens.md), and [resources/project-standards.md](resources/project-standards.md).
3. Resolve the implementation source from `.stitch/metadata.json` first. Use only a screen with `status: approved`, unless the user explicitly names a different round.
4. Select the desktop and mobile source pair using `pcCanonicalTitle`, `mobileCanonicalTitle`, `pcId`, and `mobileId` from `.stitch/metadata.json`.
5. Read the selected Stitch HTML for both desktop and mobile from `.stitch/`.
6. Review the paired PNG exports to validate layout, spacing, and parity.
7. Read `.stitch/DESIGN.md` if it exists for tokens, typography, and visual system rules.
8. Scan existing `src/components/**`, `src/app/**`, `src/data/**`, `src/types/**`, `src/app/globals.css`, and `public/**` before creating anything new.
9. If requirements are ambiguous, read the relevant docs first and then ask focused questions.

## Checkpoint

Before generating new code, the AI must report:

- the requested target
- whether the target already exists in `src/`
- the names of existing relevant components found during the scan
- the owning file, if one already exists

If the target already exists and needs in-place changes, stop and route to `coding-edit`. If no reusable component is relevant, state that explicitly.

## Workflow Routing

| Need | Workflow |
|:---|:---|
| Build a small new element or component from Stitch | [atomic-build](workflows/atomic-build.md) |
| Assemble a full page or route slice from Stitch | [page-assembly](workflows/page-assembly.md) |

## Rules

- Desktop is primary when desktop and mobile differ.
- Preserve order: content parity -> responsive reinterpretation -> pixel fidelity.
- HeroUI first. Existing wrappers/components first. No arbitrary values or raw colors.
- Server-first. Client only for hooks, handlers, or browser-only APIs.
- Loading, empty, and error states only for data-dependent or interactive sections.
- Keep feature components under 300 lines.

## Output

- Thin `layout.tsx` and `page.tsx` route files.
- Feature-scoped components under `src/components/{feature}/`.
- Mock data under `src/data/{domain}.ts`.
- Interfaces under `src/types/{domain}.ts`.
- Token or utility additions in `src/app/globals.css` only when required by the design system and only as named reusable classes or variables.

## Resources

- [resources/heroui-lib.md](resources/heroui-lib.md)
- [resources/tailwind-tokens.md](resources/tailwind-tokens.md)
- [resources/project-standards.md](resources/project-standards.md)
- [workflows/atomic-build.md](workflows/atomic-build.md)
- [workflows/page-assembly.md](workflows/page-assembly.md)