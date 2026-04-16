# Home Page — Design Analytics (R4 Approved)

**Screen:** home | **Source:** Stitch R4 (`a4ed39dfb1bd4cf395b7fdcdcc4caac1`) | **Status:** Approved

---

## A. Component Hierarchy

```
page.tsx (src/app/page.tsx)
├── Navbar                        src/components/home/Navbar.tsx
├── HeroSection                   src/components/home/HeroSection.tsx
├── VisionSection                 src/components/home/VisionSection.tsx
├── StatSeparator                 src/components/home/StatSeparator.tsx
├── ProjectsSection               src/components/home/ProjectsSection.tsx
│   └── ProjectCard (×3)          src/components/home/ProjectCard.tsx
├── RoadmapSection                src/components/home/RoadmapSection.tsx
├── ContactSection                src/components/home/ContactSection.tsx
│   ├── ContactForm (client)      src/components/home/ContactForm.tsx
│   └── ContactInfo               src/components/home/ContactInfo.tsx
└── Footer                        src/components/home/Footer.tsx
```

## B. Props & State Mapping

### Navbar — Server Component
- Props: none (static nav links from data file)

### HeroSection — Server Component
- Props: none; composites stat strip

### VisionSection — Server Component
- Props: none; Trống Đồng image from trongdong.png

### StatSeparator — Server Component
- Props: none

### ProjectCard — Server Component
- Props: `project: IProject`

### ProjectsSection — Server Component
- Props: none; renders 3 × ProjectCard

### RoadmapSection — Server Component
- Props: none; renders 4 milestone nodes

### ContactForm — Client Component
- State: name, email, phone, investmentType, notes (strings), phoneError

### ContactInfo — Server Component
- Props: none

### ContactSection — Server Component
- Composes ContactForm + ContactInfo

### Footer — Server Component
- Props: none

## C. Data Shapes

See src/types/home.ts

## D. Implementation Order (bottom-up)

- [ ] src/types/home.ts
- [ ] src/data/home.ts
- [ ] src/lib/utils.ts
- [ ] globals.css + layout.tsx updates
- [ ] Navbar
- [ ] HeroSection
- [ ] VisionSection
- [ ] StatSeparator
- [ ] ProjectCard
- [ ] ProjectsSection
- [ ] RoadmapSection
- [ ] ContactForm (client)
- [ ] ContactInfo
- [ ] ContactSection
- [ ] Footer
- [ ] page.tsx

## Asset Usage

| Asset | Component |
|---|---|
| /logo.png | Navbar, Footer |
| hero_background.png | HeroSection |
| trongdong.png | VisionSection |
| cultivation.jpg | ProjectCard 1 |
| interactive_story.png | ProjectCard 2 |
| void_map.png | ProjectCard 3 |

---

# Careers Page — Design Analytics (R6 Approved)

**Screen:** careers | **Source:** Stitch R6 (`88f52bd3838f466d8e2a809523f1b103`) | **Status:** Implemented

---

## A. Component Hierarchy

```
src/app/careers/page.tsx
└── main
    ├── CareersHero              src/components/careers/CareersHero.tsx
    │   ├── Image (hero_background.png)
    │   ├── badge pill (Tuyển Dụng)
    │   ├── h1 (Gia Nhập / Huyền Sử)
    │   ├── AppButton × 2
    │   ├── scroll indicator (ChevronDown)
    │   └── glass-stat-strip (ICareerStat × 3)
    ├── StudioVision             src/components/careers/StudioVision.tsx
    │   └── 2-col grid
    │       ├── left: intro + ValuePillarCard × 3
    │       └── right: Image (trongdong.png)
    ├── JobListings              src/components/careers/JobListings.tsx
    │   ├── JobCard × 5          src/components/careers/JobCard.tsx
    │   └── open-application CTA card
    ├── ContactSection           src/components/global/ContactSection.tsx (reuse)
    └── Footer                   src/components/global/Footer.tsx (reuse)
```

## B. Props & State Mapping

### CareersHero — Client Component (smooth scroll handler)
- Props: none
- State: none
- Handlers: `scrollToJobs()` → `document.getElementById('job-listings')?.scrollIntoView`

### StudioVision — Server Component
- Props: none

### JobListings — Server Component
- Props: none

### JobCard — Server Component
- Props: `{ job: IJobPosition }` — required

## C. Data Shapes

See `src/types/careers.ts`

## D. Build Order (completed)

- [x] `src/types/careers.ts` — `IJobPosition`, `IValuePillar`, `ICareerStat`
- [x] `src/data/careers.ts` — 5 positions, 3 value pillars, 3 career stats
- [x] `JobCard` — `src/components/careers/JobCard.tsx`
- [x] `StudioVision` — `src/components/careers/StudioVision.tsx`
- [x] `CareersHero` — `src/components/careers/CareersHero.tsx`
- [x] `JobListings` — `src/components/careers/JobListings.tsx`
- [x] `CareersPage` — `src/app/careers/page.tsx`

## Asset Usage

| Asset | Component |
|---|---|
| hero_background.png | CareersHero |
| trongdong.png | StudioVision |
