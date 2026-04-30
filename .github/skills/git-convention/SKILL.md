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

Strict enforcement
------------------
- Branch name pattern (mandatory):
  - Regex: ^(feature|task|bugfix|refactor|docs|style|perf|test|chore|hotfix)/(?=.{1,79}$)(?=.*[A-Za-z])[a-z0-9-]+$
  - Requirement: the title segment MUST include at least one ASCII letter (a-z or A-Z). Numeric-only titles (e.g., "auto-20260430171634") are forbidden.
- PR title & commit message pattern (mandatory):
  - Regex: ^(feat|fix|docs|style|refactor|perf|test|chore):\s.{1,79}$
  - Requirement: description must be imperative and under 80 characters.
- Merge-to-main policy (strict):
  - Only the designated release owner/team may accept/merge PRs into `main`.
  - All merges to `main` must be via an approved PR that matches branch and PR/commit patterns above.
  - Merge method for `develop -> main` must be a merge commit; do NOT fast-forward.
  - A semantic version tag (`vMAJOR.MINOR.PATCH`) must be created prior to merging into `main`.
- Branch creation rule:
  - New branches must be created from `develop` or `feature/*` only.
  - Branches that do not match the branch-name regex must be renamed before any PR is opened.
- Violation handling:
  - Any merge into `main` that violates these rules must be reverted and the author must rename and recreate the branch/PR following the rules.
  - Repeated violations may result in revoked push/merge privileges.

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
