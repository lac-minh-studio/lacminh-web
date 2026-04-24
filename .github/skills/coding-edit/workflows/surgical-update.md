# Surgical Update Workflow

## Goal

Fix the smallest possible existing UI slice.

## Mandatory Checkpoint

Before the first edit, the AI must report all of the following:

- the current anchor
- the existing relevant component names found during the scan
- the owning file or nearest controlling file
- one falsifiable local hypothesis
- one cheap discriminating check

If no reusable component is relevant, state that explicitly before editing.

## Steps

1. Define the anchor from the failing behavior, visible mismatch, or user-named component.
2. Read the anchor file only.
3. State one falsifiable local hypothesis and one cheap discriminating check.
4. List the names of the existing relevant components found during the scan.
5. Edit the smallest owning file that can test the hypothesis.
6. If the anchor only wires or forwards behavior, move one hop to the nearest controlling parent component or hook.
7. Do not exceed two abstraction hops.
8. Run narrow validation immediately: typecheck the affected slice, lint the touched file, then run the narrowest available behavior check.
9. If validation still supports the hypothesis, repair the same slice and rerun the same validation.
10. If validation falsifies the hypothesis, move vertically to the nearest controlling parent component or hook.
11. Note unrelated dead code only in the result. Do not modify it.

## Done Criteria

- Change implemented.
- Scope stayed surgical.
- Narrow validation passed.