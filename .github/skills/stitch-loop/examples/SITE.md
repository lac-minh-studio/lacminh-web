---
stitch-project-id: 13534454087919359824
---
# App Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It is the project's "Long-Term Memory."
> If `next-prompt.md` has `status: approved`, pick the next screen from Section 5 (Backlog) and start at `round: 1`.

## 1. Core Identity
* **Project Name:** DevFlow — Developer Analytics Dashboard
* **Stitch Project ID:** `13534454087919359824`
* **App Type:** SaaS dashboard for engineering teams
* **Primary User:** Engineering leads and senior developers tracking team productivity and code health
* **Core Job-to-be-Done:** Surface actionable insights from CI/CD, PR metrics, and deployment data in one place

## 2. Visual Language
*Strictly follow these tokens. Copy Section 6 of `DESIGN.md` into every baton prompt.*

* **Theme:** Dark, data-dense, professional
* **Density:** Compact — maximize information per viewport
* **Style System:** Glassmorphism + Neumorphism hybrid design
* **Primary Surface Rule:** Neumorphism for large sections and major layout containers
* **Supporting Surface Rule:** Glassmorphism for floating cards, overlays, filters, and secondary panels
* **Depth Language:** layered shadows + frosted glass
* **Stitch desktop canvas:** 1280px max width
* **Desktop scaling:** pc `1280/1920`, laptop `1280/1600`
* **Primary Accent:** Indigo (#6366f1)
* **Font:** Inter, 14px base
* **Responsive tiers:** pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`

## 3. Architecture & File Structure
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Stitch output:** `.stitch/designs/{screen}/round-{round}.png`
* **Review log:** `.stitch/designs/{screen}/review.md` (append rounds `R1` to `R7+` in one file)
* **Round 6 code output:** `src/app/(app)/{route}/page.tsx`
* **Shared components:** `src/components/ui/`
* **Project assets:** `public/logo.png`, `public*`, `public/lac-minh/*`

## 4. Screen Inventory (Current State)
*Mark `[x]` only after round 6 passes quality gate.*

* [x] `dashboard` → `src/app/(app)/dashboard/page.tsx` (6/6 rounds complete)
* [ ] `pull-requests` → `src/app/(app)/pull-requests/page.tsx`
* [ ] `deployments` → `src/app/(app)/deployments/page.tsx`
* [ ] `settings` → `src/app/(app)/settings/page.tsx`

## 5. Backlog (Screens to Design)
*Pick the next screen when previous is approved. Always begin at `round: 1`.*

### High Priority
- [ ] **Pull Request Analytics:** Table of open/merged PRs, cycle time chart, review turnaround KPIs
- [ ] **Deployment Timeline:** Chronological deployment log, success/failure rate, rollback actions

### Medium Priority
- [ ] **Team Settings:** Member list, role management, integration tokens, notification preferences
- [ ] **Alerts & Thresholds:** Configure metric alerts, alert history log, severity badges

## 6. Design Notes
*Cross-screen consistency rules.*

1. All screens use a shared 240px sidebar + topbar layout (do not redesign in each screen)
2. Data tables share the same header, row hover, and sort styles across all screens
3. Large sections and primary surfaces use Neumorphism styling with sculpted depth
4. Floating cards, modal layers, filters, and secondary panels use Glassmorphism with frosted glass treatment
5. Depth is expressed through layered shadows
6. Every empty state includes an icon, a headline, a description, and a primary CTA button
7. KPI cards are always the same size and typographic hierarchy (32px value, 12px label)
8. Destructive actions (delete, revoke) always require a confirmation modal
9. Responsive decisions must respect the fixed tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
10. Reuse existing project visuals from `public/` such as `/logo.png`, `hero_background.png`, `/lac-minh/lotus-pond.png`, or `trongdong.png` when they match the screen need
11. Round 2 and later must edit the previous version instead of re-running the original generation prompt
12. Desktop composition must fit inside a 1280px Stitch frame while preserving pc and laptop hierarchy via scale ratios `1280/1920` and `1280/1600`

## 7. Rules of Engagement
1. **Never write code before round 6 is approved.** Design first, code after.
2. Always document critique of the previous round's screenshot before generating the next.
3. Update `next-prompt.md` before completing every iteration — the loop must not break.
4. Each round has a mandatory focus — do not merge two rounds into one.
5. Mark screens complete in Section 4 only after the round 6 review passes the quality gate.
