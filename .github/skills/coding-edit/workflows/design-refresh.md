# Design Refresh Workflow

## Goal

Update an existing page or section to match a revised design delta.

## Mandatory Checkpoint

Before the first edit, the AI must report all of the following:

- the current existing route, page, section, or component anchor
- the existing relevant component names found during the scan
- the owning file or nearest controlling file
- the revised design delta in brief
- one falsifiable local hypothesis
- one cheap discriminating check

If no reusable component is relevant, state that explicitly before editing.

## Preflight

1. Identify the existing route, page, section, or component that already owns the UI.
2. If revised Stitch artifacts exist, resolve the selected round from `.stitch/metadata.json` and compare the revised desktop and mobile artifacts against the current implementation.
3. List the names of the existing relevant components before editing.
4. Define the design delta section by section.

## Rules

- Edit the current implementation instead of regenerating the page from scratch.
- Preserve route structure, component ownership, and stable public interfaces unless the request explicitly changes them.
- Reuse existing components first.
- Introduce a local extracted subcomponent only when the changed section becomes too large or too entangled.
- Use design tokens and existing CSS utilities before adding new ones.
- Keep desktop as the primary visual reference when the revised desktop and mobile artifacts diverge.

## Validation

- Typecheck the affected slice.
- Lint the touched file or files.
- Check the revised page or section against the requested design delta.
- Confirm the refreshed UI did not force unrelated structural changes.

## Done Criteria

- Revised delta is reflected in the existing implementation.
- Validation passed on the touched slice.
- The edit did not widen into a rebuild.