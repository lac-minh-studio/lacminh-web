# Anchor Selection

## Anchor Priority

1. Failing behavior.
2. Visible design mismatch.
3. User-named page, section, or component.
4. Nearest call site or owning component.

## Reading Budget

- Read the anchor file first.
- Expand only when the current hypothesis cannot be tested from the anchor.
- Move to the nearest controlling parent component or hook before exploring sideways.
- Do not widen past two abstraction hops unless the user broadens scope.

## Rule

- Define one falsifiable local hypothesis.
- Define one cheap check that could disconfirm it.
- Once both are clear, stop searching and edit.

## Reuse

Before editing, list the existing relevant components found during the scan. If none are reusable, state that explicitly.