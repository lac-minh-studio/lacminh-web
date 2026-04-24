# Validation Rules

## Validation Order

1. Typecheck the affected slice.
2. Lint the touched file.
3. Run the narrowest available behavior check for the edited UI.
4. Only widen to broader checks when the narrow checks pass and more confidence is needed.

## Failure Handling

- If validation fails but the current hypothesis still holds, repair the same slice and rerun the same validation.
- If validation falsifies the hypothesis, move to the nearest controlling parent component or hook.
- If validation is ambiguous, do one nearby disambiguating read, then choose between local repair and a one-hop move.

## Do Not

- Do not skip directly to a broad build before running narrow checks.
- Do not resume broad exploration between the first edit and the first focused validation.
- Do not fix unrelated issues while validating the requested change.