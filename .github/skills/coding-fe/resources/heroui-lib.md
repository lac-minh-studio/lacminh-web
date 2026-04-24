# HeroUI Mapping

HeroUI is the default UI surface.

## Order

1. Existing `src/components/hero-ui/**` wrapper.
2. Existing feature or global component.
3. Raw HeroUI component.
4. Extend HeroUI with repo-safe classes and tokens.
5. Semantic HTML only when HeroUI cannot express the pattern.

## Common Map

| Stitch Pattern | Preferred Base |
|:---|:---|
| Primary or secondary action | HeroUI `Button` |
| Text input, email input, textarea | HeroUI `Input` or `Textarea` |
| Select, dropdown, filter | HeroUI `Select` |
| Checkbox, consent, toggles | HeroUI `Checkbox` or `Switch` |
| Modal or dialog | HeroUI `Modal` |
| Tabs | HeroUI `Tabs` |
| Card or feature block | HeroUI `Card` |
| Table or structured grid | HeroUI `Table` |
| Accordion or FAQ | HeroUI `Accordion` |
| Pagination | HeroUI `Pagination` |
| Drawer or mobile menu | HeroUI `Drawer` if available in repo version, otherwise extend an approved overlay pattern |
| Badge, chip, status label | HeroUI `Chip` or existing wrapper |

## Rules

- Normalize color, variant, size, radius, typography, spacing, and state from Stitch tokens.
- Use tokenized classes only. No one-off restyling that bypasses the design system.
- Structural layout stays semantic HTML.
- Ask before changing shared primitives or global reusable components.