# coding-edit

Existing-UI frontend editing skill for targeted changes in current Next.js code.

## Scope

- Use only when the target already exists in `src/` and must be updated in place.
- Input: failing behavior, visible mismatch, or revised design delta.
- Do not use for new route generation, backend, API wiring, SEO, or design generation.

## Workflow Routing

| Situation | Use |
|:---|:---|
| Edit an existing component or targeted UI behavior | `workflows/surgical-update.md` |
| Refresh an existing page or section to match revised design | `workflows/design-refresh.md` |
| Target already exists in `src/` and must be updated in place | Use `coding-edit` |
| Build a brand-new page or route from approved Stitch output | Use `coding-fe`, not `coding-edit` |

## Process Checklist

1. Confirm the target already exists in `src/`.
2. Read standards and resource modules.
3. Choose the anchor and list existing relevant components.
4. State one falsifiable local hypothesis and one cheap check.
5. Make the smallest plausible edit.
6. Validate immediately and widen only if forced.