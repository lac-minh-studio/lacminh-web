# Page Assembly Workflow

## Goal

Create a full new route-ready frontend slice from approved Stitch artifacts.

## Mandatory Checkpoint

Before generating any new code, the AI must report all of the following:

- the requested route, page, section, or component target
- whether that target already exists in `src/`
- the names of the existing relevant components found during the scan
- the owning file, if one already exists

If the requested target already exists in `src/` and needs in-place changes, stop and route to `coding-edit`. If no reusable component is relevant, state that explicitly.

## Build Order

1. Layout shell: `main -> article -> section`.
2. Major sections with mock data.
3. States only for data-dependent or interactive sections.
4. Validate semantics and route readiness.
5. Polish without changing the design system.

## Preflight

- Resolve the selected screen from `.stitch/metadata.json` using `status`, `pcCanonicalTitle`, `mobileCanonicalTitle`, `pcId`, and `mobileId`.
- Use the approved round by default, unless the user explicitly requests a different round.
- Read [../resources/heroui-lib.md](../resources/heroui-lib.md), [../resources/tailwind-tokens.md](../resources/tailwind-tokens.md), and [../resources/project-standards.md](../resources/project-standards.md).
- Read the selected desktop and mobile Stitch HTML.
- Review the paired PNGs for visual parity.
- Read `.stitch/DESIGN.md` when available.
- Check `src/components/**` for reusable custom components.
- Check `src/app/globals.css` for existing token utilities.
- Scan `public/**` for reusable assets.

## Output

- Thin `layout.tsx` and `page.tsx` files.
- Feature components.
- Mock data and interfaces.

## Rules

- Desktop is the canonical version when design conflicts appear.
- Preserve content parity first, then responsive reinterpretation, then pixel fidelity.
- Keep pages and components server-first. Add `use client` only where interactivity or browser-only behavior requires it.
- Reuse existing custom components before creating feature-scoped ones.
- Ask the user before creating or modifying shared primitives or global reusable components.
- Keep route files thin. Push real JSX into feature components.
- Static assets must go through `public/` and `next/image`.

## Validation

- Parity across desktop and mobile.
- Route renders with the expected structure.
- Build and lint can pass once implementation is complete.

## Done Criteria

- Route is ready.
- Sections stay semantic.
- States exist where required.