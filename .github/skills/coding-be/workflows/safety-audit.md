# Safety audit checklist

Scope: Auth, input validation, storage handling, error handling, logging, and PII.

Checklist

- Auth & Roles
  - Verify all Actions check JWT and roles before mutation.
  - Enforce `admin`/`employee`/`viewer` rules per Action.

- Validation
  - Zod validation exists and returns VN messages for input errors.
  - Sanitize markdown/HTML when rendering later (FE responsibility but note here).

- DAL restrictions
  - DAL contains pure Firestore logic only. No external HTTP calls.

- Storage
  - Use temp-upload pattern (upload to temp path, commit in transaction, delete temp on failure).
  - Enforce MIME and size limits server-side in Actions.

- Error handling
  - Map errors to canonical codes (see `resources/action-response.md`).
  - Do not expose stack traces to clients; log stacks with pino.

- Logging & PII
  - Use structured pino logs.
  - Redact/mask `passwordHash` and storage paths referencing ID card images.

- Idempotency
  - Create operations must validate and store `Idempotency-Key` to avoid duplicate side effects.

- Transactions
  - Actions must open transactions when updates span Firestore + metadata writes.

- Secrets
  - No secrets in logs. Use env variables and secret manager in production.

- Rate limiting & abuse
  - Recommend per-IP or per-user rate limiting for public endpoints (outside scope for this skill but required by ops).

- Final verification
  - Confirm audit log entries exist for every mutation and include before/after snapshots.
