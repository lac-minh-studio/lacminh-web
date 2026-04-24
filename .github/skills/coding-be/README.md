# coding-be skill (draft)

Purpose
- Lightweight AI-facing reference for backend engineers and agents implementing server-side features for lacminh-web.
- Focus: Firestore + Firebase Storage, Zod validation, Server Actions (Next.js), idempotency, audit logging, and `revalidatePath()` usage.

Quick facts
- Owner: thuandiep
- Runtime target: Vercel (Next.js server actions)
- DB: Firebase Firestore
- File storage: Firebase Storage
- Auth: Custom JWT (HS256) verified in Actions; env `JWT_SECRET`
- Validation: Zod (TS types derived from schemas)
- Logging: pino
- Idempotency: required for create operations (Idempotency-Key, TTL default 24h)

Environment variables (required)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (newline encoded)
- `FIREBASE_STORAGE_BUCKET`
- `JWT_SECRET`
- `IDEMPOTENCY_TTL_HOURS` (default 24)
- `PINO_LOG_LEVEL` (optional)

Conventions (short)
- Architecture: Validation -> DAL -> Action (orchestrator).
- File locations:
  - `src/lib/validations/{feature}.schema.ts`
  - `src/lib/dal/{feature}.dal.ts`
  - `src/actions/{feature}.action.ts`
- Action signature: `export async function createX(ctx, input)`
- DAL must contain pure Firestore operations only (NO external HTTP calls).
- All mutations should call `revalidatePath()` for affected FE routes.
- Create operations must handle idempotency via `Idempotency-Key` header.
- Audit logs saved to `audit_logs` collection for every mutation.
- Sensitive fields: `passwordHash`, `idCardImagePath` must be protected/masked in logs.

Usage
- Use these docs as the machine-readable contract for agent code generation.
- Keep content concise; the AI only needs the constraints and envs.

Deliverables (in this folder)
- README.md (this file)
- resources/* (db schema reference, response shape, validation rules)
- workflows/* (atomic logic checklist, migration guidance, safety audit)

Notes
- Docs are intentionally terse and AI-oriented.
- Tests and CI are out-of-scope for this skill (separate skill handles testing).
