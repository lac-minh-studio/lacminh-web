Git conventions — Machine-readable

Purpose
-------
Unify branch naming, commit/PR format, merge flow, and release tagging.

Branch naming
-------------
- Format: <type>/<title>
- type ∈ {feature, task, bugfix, refactor, docs, style, perf, test, chore, hotfix}
- title: lower-case, hyphen-separated, no spaces
- Example: feature/create-header

Commit and PR title
--------------------
- Format: <word-type>: <description>
- word-type ∈ {feat, fix, docs, style, refactor, perf, test, chore}
- description: imperative, <80 chars
- Example: feat: create header

Merge flow and rules
---------------------
- Allowed flows:
  - task -> feature -> develop -> main
  - bugfix -> feature/develop -> main
- Branch creation: only from develop or feature/*; never from main
- Merge to develop: rebase-and-merge (PR with rebase)
- Merge to main: create merge commit; create a release tag (vX.Y.Z) before merging
- Permissions: devs may merge into develop and open PR to main; only release owner accepts/merges PR to main
- Pre-merge checks for main: PR links issue, CI passing, ≥1 review, no conflicts, release tag created

Recommendations
---------------
- Protect main: disable direct pushes; require PR reviews and passing checks
- Use PR template to require changelog / release notes

Example
- Branch: feature/create-header
- Commit: feat: create header
- Flow: feature/create-header -> develop (rebase) -> PR develop->main (merge commit) -> tag vX.Y.Z

Notes
- This file is the team's required git convention. Update only after team agreement.
