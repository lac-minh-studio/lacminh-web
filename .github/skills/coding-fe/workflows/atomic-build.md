# Atomic Build Workflow

## Goal

Build the smallest new UI unit from approved Stitch artifacts.

## Mandatory Checkpoint

Before generating any new code, the AI must report all of the following:

- the requested target
- whether the requested target already exists in `src/`
- the names of the existing relevant components found during the scan
- the owning file, if one already exists

If the requested target already exists in `src/` and needs in-place changes, stop and route to `coding-edit`. If no reusable component is relevant, state that explicitly.

## Steps

1. Resolve the approved source pair from `.stitch/metadata.json`.
2. Read the resource modules.
3. Identify the smallest target boundary.
4. Lock props, states, then responsive behavior.
5. Scan existing wrappers, components, and token classes.
6. Implement HeroUI-first and token-safe UI.
7. Add states only when data or interactivity requires them.
8. Keep server-first and split if the file becomes too large.

## Validation

- Typecheck the affected slice.
- Lint the touched file.
- Check desktop-first fidelity and mobile parity.

## Done Criteria

- Matches Stitch intent.
- Uses repo-safe tokens and structure.
- Fits size and routing rules.