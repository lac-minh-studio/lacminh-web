# Project Standards

## Scope

- This skill handles design-to-code conversion only.
- No backend, API wiring, SEO, or Stitch prompt design.
- Resolve approved artifacts from `.stitch/metadata.json` unless the user explicitly selects another round.
- Ask focused questions when route, round, asset, or design intent is unclear.

## Structure

- Route files stay thin in `src/app/**`.
- Feature components live in `src/components/{feature}/`.
- Shared wrappers live in `src/components/hero-ui/` or `src/components/global/`.
- Mock data lives in `src/data/{domain}.ts`.
- Interfaces live in `src/types/{domain}.ts`.
- Helpers stay in `src/lib/`.

## Rules

- No `any`.
- No inline style for design work.
- No arbitrary Tailwind values.
- No new library without checking `package.json` and getting approval when the dependency is missing.
- No file deletion without explicit confirmation.
- No uncontrolled abstraction.

- Server Components are the default.
- Use a Client Component only when hooks, event handlers, or browser-only APIs are required.
- Always lock props and states before responsive refinement.
- Split a component when it exceeds 300 lines or when a subcomponent is reused in two or more places.

## Semantics

- Prefer semantic structure: `main`, `article`, `section`, `form`, `label`, and meaningful headings.
- Use `next/link` instead of plain anchors for internal navigation.
- Use `next/image` instead of `img`.
- Wrap every `Image` with a `div` container.
- Include `alt`, `title`, `sizes`, and `quality` when appropriate, plus width and height or a valid fill pattern.

## States

- Any section with data dependencies or interactive state must account for loading, empty, and error states.
- Use mock data first to verify composition before real data exists.
- Static assets are part of page assembly and must be routed through `public/` and `next/image`.