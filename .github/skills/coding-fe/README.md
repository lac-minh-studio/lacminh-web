# coding-fe

Create-only frontend skill for approved Stitch-to-Next.js implementation.

## Scope

- Use only when the target does not yet exist in `src/`.
- Source of truth: approved `.stitch` artifacts from `.stitch/metadata.json`.
- Do not use for edit, backend, API wiring, SEO, or design generation.

## Workflow Routing

| Situation | Use |
|:---|:---|
| Convert a small UI slice or component | `workflows/atomic-build.md` |
| Convert a full approved Stitch page into a route slice | `workflows/page-assembly.md` |
| Target does not yet exist in `src/` and must be created from approved Stitch artifacts | Use `coding-fe` |
| Need to edit existing code or fix regressions | Use the dedicated edit skill, not `coding-fe` |

## Process Checklist

1. Resolve approved artifacts from `.stitch/metadata.json`.
2. Read standards and resource modules.
3. Confirm the target does not already exist in `src/`.
4. List existing relevant components before generating code.
5. Build server-first, HeroUI-first, token-safe UI.
6. Validate parity, semantics, and repo structure.