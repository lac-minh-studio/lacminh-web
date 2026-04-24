# Tailwind And Token Rules

All visual tokens come from Stitch system design.

## Source

- Use `.stitch/DESIGN.md` as the first token source when present.
- Reuse the token model already defined in `src/app/globals.css` before adding anything new.
- If a missing token is required, add a named reusable variable or utility class in `src/app/globals.css`.
- Never use raw hex, `rgba()`, arbitrary bracket values, or inline styles for design translation.

## Breakpoints And Containers

| Viewport | Rule |
|:---|:---|
| 1920px | 1440px content container |
| 1600px | 1200px content container |
| 1000px | tablet or small desktop transition |
| 700px | tablet to mobile transition |
| 400px | small mobile floor |

## Layout

- Use the repo's shared `content-container` utility for inner content wrappers.
- Keep full-bleed backgrounds at section level and place inner content inside the shared container.
- Reuse existing spacing and typography classes before creating new token-backed utilities.
- Mobile-first responsive classes are required even when desktop is the design anchor.

## Checks

- Are all colors expressed through named tokens?
- Are all sizes on the approved scale?
- Is the container strategy using shared utilities?
- Did the implementation reuse an existing class before adding a new one?
- Does desktop lead while mobile still preserves content parity?