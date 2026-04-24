# Atomic logic workflow — checklist

Purpose: step-by-step procedure when implementing a single feature (Action + DAL + Validation).

Checklist

1) Contract (Validation)
- Create `src/lib/validations/{feature}.schema.ts` using Zod.
- Error messages for user input must be Vietnamese.
- Export derived TS types with `z.infer`.

2) DAL (Miner)
- Implement pure Firestore operations in `src/lib/dal/{feature}.dal.ts`.
- DAL functions must be async and side-effect free (no external HTTP calls).
- Provide functions for create/get/update/delete/list with pagination params.

3) Action (Orchestrator)
- Implement `src/actions/{feature}.action.ts`
- Use `'use server'` and export functions as `createX(ctx, input)`.
- Responsibilities: validate input, verify auth/roles, manage idempotency keys, run Firestore transaction if needed, write audit log, call DAL, call `revalidatePath()` for affected paths.

4) Idempotency
- For create operations: read `Idempotency-Key` from `ctx` headers; reject or return previous response on duplicate.

5) Audit
- For every mutation, write an `audit_logs` entry with before/after payload, userId, timestamp, ip, userAgent.

6) Revalidation
- Call `revalidatePath()` for the FE path(s) affected by the mutation.
- Use centralized path constants when possible.

7) Logging & Errors
- Log with `pino` (structured). Redact PII (passwordHash, idCardImagePath).
- Map internal errors to canonical error codes and HTTP statuses.

8) PR Checklist
- Validation schema exists and types exported.
- DAL functions are implemented and unit-tested (when applicable).
- Action enforces role checks and writes audit log.
- Idempotency supported for create operations.
- `revalidatePath()` called for mutated paths.
- No sensitive data in logs or responses.

9) Documentation
- Add a short example to the skill `examples/` folder showing schema + dal + action.

10) Optional
- Add security rules updates (Firestore Storage) in a separate PR if file rules change.
