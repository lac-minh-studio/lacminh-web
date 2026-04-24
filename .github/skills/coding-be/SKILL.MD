---
name: coding-be
description: "Use when: implementing backend logic in Next.js App Router, including Database queries (DAL), Zod Schemas (Validations), and Server Actions. Focused on data integrity, cache revalidation, and type-safe contracts. Backend-only skill; not for UI design, CSS, or SEO metadata."
---

# coding-be

Purpose: machine-only concise rules for implementing backend features (Firestore + Storage).

Hard rules:

- Architecture: Validation -> DAL -> Actions.
- Validation: Zod in `src/lib/validations/{feature}.schema.ts`; export TS types via `z.infer`.
- DAL: Firestore-only in `src/lib/dal/{feature}.dal.ts`; no external HTTP calls; pure async functions.
- Actions: `src/actions/{feature}.action.ts`; use `'use server'`; signature `export async function <name>(ctx, input)`.
- Transactions: Actions must open Firestore transactions when multiple writes or metadata are involved.
- Idempotency: create operations require `Idempotency-Key`; persist in `idempotency_keys` collection; TTL configurable (default 24h); return `IDEMPOTENCY_CONFLICT` on duplicate.
- Revalidation: call `revalidatePath()` for affected FE routes.
- Auth: verify JWT (HS256) using `JWT_SECRET`; roles: `admin` / `employee` / `viewer`.
- Audit: write `audit_logs` for every mutation with fields: `userId, action, resourceType, resourceId, timestamp, ip, userAgent, before, after, meta`.
- Logging: use `pino`; redact `passwordHash` and `idCardImagePath`.
- Error shape: always return `{ success: boolean }`; on failure `error: { code:string, message:string, httpStatus:number, details?:object }`.
- Error codes mapping: VALIDATION_ERROR=400, AUTH_ERROR=401, FORBIDDEN=403, NOT_FOUND=404, CONFLICT=409, RATE_LIMIT=429, IDEMPOTENCY_CONFLICT=409, STORAGE_ERROR=503, INTERNAL_ERROR=500.
- Storage: Firebase Storage; max upload 40MB; allowed MIME: image/jpeg,image/png,application/pdf.
- TypeScript: strict mode; no `any`.
- File naming: follow `feature.schema.ts`, `feature.dal.ts`, `feature.action.ts`; use named exports only.

Behavioral rule: produce only code and machine-consumable artifacts that follow these rules. Do not add human-oriented explanations.

Resources: see `resources/` and `examples/` for minimal templates.