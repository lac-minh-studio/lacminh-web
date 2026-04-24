# DB schema reference (Firestore collections)

Purpose: quick collection maps and PII flags for AI to generate DAL and migrations.

Collections

1) `users`
- id: string (document id / uid)
- email: string
- passwordHash: string  # SENSITIVE (must not be logged)
- role: string ("admin" | "employee" | "viewer")
- name: string
- avatarUrl: string | null
- idCardImagePath: string | null  # SENSITIVE (storage path)
- disabled: boolean
- createdAt: timestamp
- updatedAt: timestamp

Indexes: email (unique)

2) `jobs`
- id: string (doc id)
- title: string
- slug: string
- description: string (markdown)
- company: string
- location: string
- tags: string[]
- attachments: array<{ path: string; mimeType: string; size: number; uploadedBy: string }>
- createdBy: userId
- status: string ("draft" | "published" | "archived")
- createdAt: timestamp
- updatedAt: timestamp

Indexes: slug (unique), createdBy, status

3) `projects`
- id: string
- title: string
- description: string
- ownerId: userId
- images: string[] (storage paths)
- repoUrl: string | null
- status: string ("idea" | "active" | "archived")
- createdAt: timestamp
- updatedAt: timestamp

4) `idempotency_keys`
- key: string (document id = provided Idempotency-Key)
- createdAt: timestamp
- usedBy: userId
- resourceType: string
- resourceId: string | null
- responseRef: reference to stored response (optional)

TTL: default 24 hours (IDEMPOTENCY_TTL_HOURS)

5) `audit_logs`
- id: string
- userId: string
- action: string (create/update/delete)
- resourceType: string (users/jobs/projects)
- resourceId: string
- timestamp: timestamp
- ip: string | null
- userAgent: string | null
- before: object | null
- after: object | null
- meta: object | null

Retention: configurable (default 365 days recommended)

Notes
- Firestore is schema-less; these are the canonical shapes agents should generate DAL functions for.
- For sensitive fields (passwordHash, idCardImagePath) use special handling in code templates (masking or storage access rules). 
- Use collection prefixes or `v{n}_` only if you need non-breaking schema migrations.
