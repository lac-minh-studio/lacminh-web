# DB migration guidance (Firestore)

Note: Firestore is schema-less. There is no traditional migration tool; follow this safe procedure for data/shape changes.

Procedure

1) Back up data
- Export affected collections (use `gcloud firestore export` or admin-export script).

2) Add new fields alongside old fields
- Prefer additive changes: add fields but keep existing ones until client migration completes.

3) Write idempotent migration script
- Use a Node script that uses `firebase-admin` and paginates writes.
- Run locally or in a short-lived Cloud Run job.

4) Test on staging
- Run script against staging project and validate results.

5) Update security rules
- Update Storage/Firestore rules and deploy alongside feature.

6) Deploy changes
- Deploy Action code, then run migration, then switch clients.

7) Cleanup (optional)
- After all clients migrate, write a cleanup script to remove deprecated fields.

Rollback
- Keep backups. If a migration fails, restore from backup or run compensating script.

Notes
- For structural changes that require co-ordination (large collections), schedule a maintenance window.
- Use `v{n}_` collection prefixes if you need zero-downtime structural versioning.
