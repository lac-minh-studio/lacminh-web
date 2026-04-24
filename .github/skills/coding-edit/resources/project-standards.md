# Project Standards

## Scope

- This skill edits existing frontend code only.
- No backend, API wiring, SEO, or Stitch prompt design.
- Ask focused questions when the edit target or design delta is unclear.

## Edit Rules

- Match existing style and structure unless the request explicitly changes them.
- Do not refactor adjacent code that is not part of the request.
- Do not delete files without explicit confirmation.
- If the edit creates an orphan import or helper in the touched slice, clean up only that orphan.
- If unrelated dead code is discovered, do not change it. Mention it only in the result.

## Rules

- No `any`.
- No inline style for design work.
- No arbitrary Tailwind values.
- Reuse existing token classes and `globals.css` utilities before adding new ones.
- No new library without checking `package.json` and getting approval when the dependency is missing.
- Server Components are the default.
- Use a Client Component only when hooks, event handlers, or browser-only APIs are required.
- Prefer editing an existing component over introducing a new abstraction.
- Extract a local subcomponent only when the touched file would otherwise exceed the repo's size or clarity limits.
- Ask the user before creating or changing shared primitives or global reusable components.

## Semantics

- Preserve semantic HTML while editing.
- Use `next/link` instead of plain anchors for internal navigation.
- Use `next/image` instead of `img`.
- Keep `Image` wrapped in a `div` container.
- Preserve `alt`, `title`, `sizes`, and `quality` when they are required by the touched UI.