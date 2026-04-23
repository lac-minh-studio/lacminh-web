# Analytics - careers-detail Screen (Round 7 Locked)

**Source of truth:**
- `.stitch/designs/careers-detail/round-7-pc.html`
- `.stitch/designs/careers-detail/round-7-mobile.html`

**Locked implementation round:** 7

**Locked screen IDs:**
- PC: `f8d3774693c64020809f3a2f6b7e093c`
- Mobile: `0a7f0435618948509926bf9b1da7c821`

---

## A. Component Hierarchy

```text
CareersDetailPage (Server Component) - src/app/(app)/careers/[slug]/page.tsx
|
|-- GlobalNavbar (reuse existing global navbar behavior)
|-- Main
|   |-- CareersDetailHero
|   |   |-- BreadcrumbTrail
|   |   |-- HeroEyebrow
|   |   |-- HeroTitle
|   |   |-- HeroMetaChips
|   |
|   |-- CareersDetailContent
|   |   |-- ContentTwoColumn (desktop)
|   |   |   |-- LeftEditorialColumn
|   |   |   |   |-- IntroSection
|   |   |   |   |-- ResponsibilitiesSection (paragraph prose)
|   |   |   |   |-- RequirementsSection (paragraph prose)
|   |   |   |   |-- HiringProcessSection (3 steps)
|   |   |   |
|   |   |   |-- RightStickyColumn
|   |   |       |-- JobSummaryCard
|   |   |       |   |-- SummaryMetaList (salary, experience, deadline)
|   |   |       |   |-- ActionButtons (Apply, Contact HR)
|   |   |       |
|   |   |       |-- ShareCard (desktop-visible)
|   |   |
|   |   |-- MobileSingleColumn (mobile)
|   |       |-- IntroSection
|   |       |-- JobSummaryCard
|   |       |-- ResponsibilitiesSection (paragraph prose)
|   |       |-- RequirementsSection (paragraph prose)
|   |
|   |-- RelatedJobsSection
|       |-- RelatedJobsHeader
|       |-- RelatedJobsGrid
|           |-- RelatedJobCard x 4 (all complete cards, no placeholders)
|
|-- GlobalFooter (reuse existing footer behavior)
```

Notes from locked HTML:
- Desktop contains a full 2-column editorial layout with a sticky right rail.
- Mobile collapses into a 1-column flow, preserving hero + core prose + summary + related jobs.
- Responsibilities and requirements are both paragraph-based (not bullet lists).
- Related jobs section is explicitly 4 fully populated cards.

---

## B. Props and State Mapping

### 1) `CareersDetailHero`
Props:
- `title: string`
- `eyebrow: string`
- `breadcrumbs: string[]`
- `chips: JobMetaChip[]`
- `backgroundAsset: string`

Local state:
- None

Server state:
- Receives data from page-level resolver by slug

Handlers:
- None

### 2) `IntroSection`
Props:
- `heading: string`
- `body: string`

Local state:
- None

### 3) `ProseSection`
Props:
- `heading: string`
- `icon: string`
- `paragraphs: string[]`

Local state:
- None

Handlers:
- None

### 4) `HiringProcessSection`
Props:
- `heading: string`
- `steps: HiringStep[]`

Local state:
- None

### 5) `JobSummaryCard`
Props:
- `title: string`
- `items: JobSummaryItem[]`
- `primaryAction: ActionLink`
- `secondaryAction: ActionLink`

Local state:
- None

Handlers:
- `onPrimaryActionClick` (navigate to apply flow)
- `onSecondaryActionClick` (open contact flow)

### 6) `ShareCard`
Props:
- `title: string`
- `subtitle: string`
- `channels: ShareChannel[]`

Local state:
- Optional (if share uses Web Share API fallback UI)

Handlers:
- `onShare(channel)`

### 7) `RelatedJobCard`
Props:
- `job: RelatedJob`
- `variant: RelatedCardVariant`

Local state:
- None

Handlers:
- `onViewDetail(jobSlug)`

### 8) `RelatedJobsSection`
Props:
- `heading: string`
- `jobs: RelatedJob[]` (exactly 4 for this locked design)

Local state:
- None

### 9) `CareersDetailPage`
Props:
- `params: { slug: string }`

Local state:
- None in page component

Server state:
- Resolve job detail data by slug from typed data source
- Resolve related jobs list for section 3

Handlers:
- N/A at page level (handlers delegated to child action components)

---

## C. Data Shape (TypeScript Interfaces)

```ts
// src/types/careers-detail.ts

export interface JobMetaChip {
  label: string
  icon?: string
}

export interface JobSummaryItem {
  key: 'salary' | 'experience' | 'deadline'
  label: string
  value: string
  icon: string
}

export interface ActionLink {
  label: string
  href: string
  icon?: string
}

export interface ProseSectionData {
  id: 'responsibilities' | 'requirements'
  heading: string
  icon: string
  paragraphs: string[]
}

export interface HiringStep {
  order: number
  title: string
}

export type RelatedCardVariant =
  | 'top-motif'
  | 'accent-band'
  | 'outline-strong'
  | 'grain-overlay'

export interface RelatedJob {
  slug: string
  level: string
  department: string
  title: string
  description: string
  skills: string[]
  ctaLabel: string
  variant: RelatedCardVariant
}

export interface ShareChannel {
  id: 'facebook' | 'linkedin'
  label: string
  href: string
}

export interface CareersDetailContent {
  slug: string
  title: string
  eyebrow: string
  breadcrumbs: string[]
  chips: JobMetaChip[]
  intro: string
  proseSections: ProseSectionData[]
  hiringSteps: HiringStep[]
  summaryTitle: string
  summaryItems: JobSummaryItem[]
  primaryAction: ActionLink
  secondaryAction: ActionLink
  shareChannels: ShareChannel[]
  relatedJobsHeading: string
  relatedJobs: RelatedJob[]
}
```

---

## D. Implementation Status

- [x] Extend career domain types in `src/types/careers.ts`
- [x] Extend and reuse mock data in `src/data/careers.ts`
- [x] Add slug detail route in `src/app/(app)/careers/[slug]/page.tsx`
- [x] Create hero section in `src/components/careers-detail/CareerDetailHero.tsx`
- [x] Create editorial body in `src/components/careers-detail/CareerDetailBody.tsx`
- [x] Create related jobs section in `src/components/careers-detail/CareerDetailRelatedSection.tsx`
- [x] Move application section to slug route via global form in `src/components/careers-detail/CareerDetailApplySection.tsx`
- [x] Compose detail view in `src/components/careers-detail/CareerDetailView.tsx`
- [x] Export feature entry in `src/components/careers-detail/index.ts`
- [x] Update list page routing behavior in `src/components/careers/JobCard.tsx`
- [x] Remove in-page career form block in `src/app/(app)/careers/page.tsx`
- [x] Make global form reusable via props in `src/components/global/ContactForm.tsx`

---

## Implementation Locks for Phase 4

- Keep responsibilities and requirements as paragraph prose.
- Keep related jobs as exactly 4 complete cards for this locked round.
- Preserve edge-near layout language and asymmetrical motif direction.
- Keep accessibility focus styling and strong contrast intent from locked design.
- Reuse existing global navigation/footer visual system where applicable to maintain cross-page consistency.
