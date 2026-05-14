# Design Philosophy: Anti-Generic Aesthetics

This resource provides the bold aesthetic principles for stitch-unified. Use this to auto-generate `.stitch/DESIGN.md` and guide design thinking exercises in Rounds 1 & 2.

## Core Principle

**Create distinctive, production-grade interfaces that avoid generic "AI slop" aesthetics.**

Every design should be:
- **Intentional** — Clear conceptual direction executed with precision
- **Memorable** — One unforgettable element people will screenshot
- **Contextual** — True to the app's purpose, audience, and constraints
- **Bold** — Commit to an extreme aesthetic and execute fully

## Aesthetic Direction Catalog

Choose ONE and commit fully. Never blend or compromise:

| Direction | Characteristics | Typography Examples | Color Strategy |
|-----------|----------------|---------------------|----------------|
| **Brutally Minimal** | Generous whitespace, stark hierarchy, surgical precision | Display: Space Mono, IBM Plex Mono<br>Body: Inter Tight, Untitled Sans | Monochrome + single sharp accent |
| **Maximalist Chaos** | Dense layering, overlapping elements, controlled disorder | Display: Druk Wide, Clash Display<br>Body: ABC Whyte, Satoshi | Multi-gradient chaos with intentional clashes |
| **Retro-Futuristic** | Y2K vibes, chrome effects, grid backgrounds, neon | Display: Orbitron, Audiowide<br>Body: Rajdhani, Exo 2 | Neon blues, purples, cyans on dark |
| **Organic Natural** | Soft curves, earthy tones, flowing layouts, texture | Display: Recoleta, Fraunces<br>Body: Crimson Pro, Spectral | Earth tones, muted greens, warm neutrals |
| **Luxury Refined** | Elegant serif, ample breathing room, subtle transitions | Display: Canela, Playfair Display<br>Body: Freight Text, Signifier | Rich jewel tones, gold accents, deep navy |
| **Playful Toy-like** | Rounded everything, bright primaries, bouncy animations | Display: Lexend Peta, Fredoka<br>Body: DM Sans, Outfit | Primary colors, high saturation, contrast |
| **Editorial Magazine** | Strong grid, asymmetric layout, bold typography hierarchy | Display: Graphik, GT America<br>Body: Tiempos Text, Lyon Text | High contrast, editorial black + pops of color |
| **Brutalist Raw** | Exposed structure, sharp edges, industrial feel | Display: Neue Haas Grotesk, Akkurat<br>Body: Suisse Int'l, Atlas Grotesk | Concrete grays, raw blacks, construction yellow |
| **Art Deco Geometric** | Sharp angles, stepped patterns, symmetry + asymmetry | Display: Poppins Black, Montserrat Bold<br>Body: Raleway, Manrope | Gold, black, burgundy, geometric patterns |
| **Soft Pastel** | Low saturation, smooth gradients, gentle transitions | Display: Cabinet Grotesk, Sohne<br>Body: Inter Display, Manrope | Pastel pinks, blues, lavenders, low contrast |
| **Industrial Utilitarian** | Function over form, monospace, grid-locked layout | Display: JetBrains Mono, Roboto Mono<br>Body: Public Sans, Work Sans | Utility orange, safety yellow, industrial gray |

**FORBIDDEN AESTHETICS:**
- ❌ Inter + Roboto + Arial (overused system fonts)
- ❌ Purple gradient on white background (cliche AI aesthetic)
- ❌ Cookie-cutter component patterns (generic card grids)
- ❌ Timid middle-ground (neither bold nor minimal)
- ❌ Evenly-distributed color palettes (no dominant theme)

## Typography: Distinctive Choices

**Rule:** NEVER use Inter, Roboto, Arial, or system fonts as the primary typeface.

**Strategy:** Pair a distinctive display font with a refined body font.

### Display Font Tiers (Headings, Heroes, CTAs)

**Tier 1 — Highly Distinctive:**
- Space Mono (monospace brutalist)
- Druk Wide (ultra-bold condensed)
- Clash Display (geometric futuristic)
- Recoleta (elegant serif with character)
- Orbitron (sci-fi geometric)
- Fraunces (soft super-family with optical sizing)

**Tier 2 — Character with Restraint:**
- IBM Plex Mono (readable monospace)
- Playfair Display (classic serif)
- Lexend (rounded humanist)
- Cabinet Grotesk (editorial sans)
- Montserrat (geometric with personality)

**Tier 3 — Avoid Unless Contextual:**
- Inter (overused, lacks character)
- Roboto (generic Android default)
- Open Sans (safe but boring)

### Body Font Tiers (Paragraphs, Labels, UI Text)

**Tier 1 — Refined Readability:**
- Crimson Pro (elegant serif for long-form)
- Tiempos Text (editorial serif)
- ABC Whyte (humanist sans with warmth)
- Satoshi (geometric sans with character)
- Signifier (luxury serif with contrast)

**Tier 2 — Functional with Personality:**
- DM Sans (clean sans with slightly rounded terminals)
- Manrope (geometric sans, modern feel)
- Work Sans (neutral sans with subtle character)
- Spectral (serif optimized for screens)

**Tier 3 — Last Resort (Contextual Only):**
- Inter Display (if the project already committed)
- Public Sans (government/civic contexts)

### Font Pairing Examples

| Aesthetic | Display | Body | Rationale |
|-----------|---------|------|-----------|
| Brutalist Raw | Space Mono Bold | IBM Plex Sans | Monospace structure + readable sans |
| Luxury Refined | Canela Black | Crimson Pro | High-contrast serif + elegant serif |
| Retro-Futuristic | Orbitron Heavy | Rajdhani Medium | Sci-fi display + technical body |
| Editorial Magazine | Graphik Super | Tiempos Text | Strong sans + editorial serif |
| Playful Toy-like | Lexend Peta | DM Sans | Rounded display + friendly sans |

## Color & Visual System

**Principle:** Dominant colors with sharp accents. Avoid evenly-distributed palettes.

### Color Strategies

**Monochrome + Accent:**
- Base: Black, white, gray scale
- Accent: Single vivid color (neon green, electric blue, hot pink)
- Use: Brutalist, minimal, industrial

**Gradient Chaos:**
- Multi-stop gradients with intentional color clashes
- Overlay gradients on backgrounds, text, borders
- Use: Maximalist, retro-futuristic, playful

**Earthy Harmony:**
- Muted greens, warm browns, terracotta, cream
- Low saturation, high harmony
- Use: Organic, natural, wellness

**Jewel Tones:**
- Rich sapphire, emerald, ruby, amethyst
- Deep saturation, luxury feel
- Use: Premium, refined, art deco

**Pastel Softness:**
- Desaturated pinks, blues, lavenders, peaches
- Gentle gradients, low contrast
- Use: Soft, approachable, calm

**Utility Primaries:**
- Safety yellow, construction orange, traffic red
- Functional, high-visibility
- Use: Industrial, utilitarian, alert-driven

### Background Treatment

**FORBIDDEN:** Solid white or solid color backgrounds everywhere.

**REQUIRED:** Create atmosphere and depth:
- Gradient meshes (multi-stop radial/conic gradients)
- Noise textures (CSS grain overlay or SVG patterns)
- Geometric patterns (repeating shapes, grids, dots)
- Layered transparencies (overlapping colored divs with opacity)
- Dramatic shadows (long shadows, neumorphism, depth layers)
- Decorative borders (custom outlines, double borders, corner accents)
- Custom cursors (context-specific cursor changes)

## Motion Strategy

**Principle:** One high-impact moment > scattered micro-interactions.

### High-Impact Page Load

Use **staggered reveals** with `animation-delay`:
```css
.hero { animation: fadeInUp 0.6s ease-out; }
.section-1 { animation: fadeInUp 0.6s ease-out 0.1s; }
.section-2 { animation: fadeInUp 0.6s ease-out 0.2s; }
.section-3 { animation: fadeInUp 0.6s ease-out 0.3s; }
```

**Choreograph the entrance:**
1. Hero fades in first
2. Nav slides in from top (0.1s delay)
3. CTA pulses in (0.2s delay)
4. Supporting sections cascade (0.1s increments)

### Scroll-Triggered Effects

- **Parallax**: Background moves slower than foreground
- **Fade-in on scroll**: Elements appear as user scrolls down
- **Scale on scroll**: Images or cards grow into view
- **Sticky headers**: Nav sticks at top with subtle shadow transition

### Hover States That Surprise

- **Color shift**: Not just opacity change, full hue rotation
- **Lift + shadow**: Card lifts with expanding shadow
- **Border morph**: Border thickness or color animates
- **Icon animation**: Icons rotate, bounce, or morph on hover
- **Background reveal**: Gradient or pattern slides in from edge

### Animation Libraries

- **CSS-only** (preferred for HTML/static): `@keyframes`, `transition`, `animation`
- **Framer Motion** (React): `motion.div`, `variants`, `whileHover`, `whileInView`
- **GSAP** (advanced): Timeline-based orchestration for complex sequences

## Spatial Composition

**Principle:** Unexpected layouts. Avoid centered, symmetrical grids.

### Layout Patterns

**Asymmetric Grids:**
- One large hero image + stacked smaller sections
- Sidebar that's 40% width (not 33% or 50%)
- Content column that shifts left or right unpredictably

**Overlap:**
- Text overlays images with clipping masks
- Cards stack with z-index layers
- Navigation overlaps hero with transparency

**Diagonal Flow:**
- Sections cut diagonally instead of horizontal lines
- Text paths follow angled trajectories
- Grid rotated 5-10 degrees for tension

**Grid-Breaking Elements:**
- One element intentionally bleeds outside container
- Hero image extends beyond content width
- Decorative shapes break the vertical rhythm

**Negative Space Extremes:**
- Generous whitespace (brutally minimal)
- OR controlled density (maximalist chaos)
- NEVER timid middle ground

## The Unforgettable Element

Every screen needs **one thing** people will remember and share:

- Oversized typography that breaks container bounds
- Animated gradient text with color cycling
- Custom cursor that leaves a trail
- Interactive 3D element (CSS `transform` or WebGL)
- Parallax hero with depth layers
- Micro-interaction that delights (button morphs into confirmation)
- Data visualization that's unexpectedly beautiful
- Asymmetric layout that challenges conventions

## DESIGN.md Auto-Generation Template

When `.stitch/DESIGN.md` is missing, generate it using this structure:

```markdown
# Design System Tokens

## Aesthetic Direction
**Vision:** [Chosen aesthetic from catalog]
**Unforgettable Element:** [The one thing that makes this memorable]

## Typography
**Display Font:** [Font name] — [Weights]
**Body Font:** [Font name] — [Weights]
**Hierarchy:**
- H1: [size/weight/line-height]
- H2: [size/weight/line-height]
- Body: [size/weight/line-height]
- Label: [size/weight/line-height]

## Color System
**Strategy:** [Monochrome + Accent / Gradient Chaos / Earthy / Jewel / Pastel / Utility]
**Palette:**
- Primary: [hex] — [usage]
- Secondary: [hex] — [usage]
- Accent: [hex] — [usage]
- Neutral: [hex scale] — [usage]
**Background Treatment:** [Gradient mesh / Noise / Pattern / Layered / Shadows]

## Motion
**Page Load:** [Staggered reveal / Fade cascade / Scale entrance]
**Scroll Effects:** [Parallax / Fade-in / Sticky nav]
**Hover States:** [Color shift / Lift / Border morph / Icon animate]

## Spatial Composition
**Layout Strategy:** [Asymmetric / Overlap / Diagonal / Grid-breaking / Negative space]
**Grid System:** [Custom grid definition if applicable]

## Component Patterns
**Buttons:** [Shape / Fill / Border / Hover / Active]
**Cards:** [Shadow / Border / Radius / Hover]
**Navigation:** [Style / Sticky / Mobile drawer]
**Forms:** [Input style / Focus state / Validation]

## Canvas Rules (HARDCODED)
- Stitch canvas: 1280px max desktop frame
- PC outer padding: exactly 10px left + 10px right on all section wrappers
- Full-bleed: backgrounds extend to canvas edge; 10px applies to inner content only
- Overflow rule: no element may exceed the 1280px frame
- Scale behavior: scale typography, spacing, imagery, component footprints proportionally
- Density rule: fill leftover space with secondary modules, not oversized heroes
- Responsive tiers: pc 1920-1600, laptop 1600-1200, macbook 1200-900, tablet 900-700, mini-tablet 700-450, mobile <450
```

## Usage in Stitch Prompts

**Round 1 (with design thinking):**
```
[AESTHETIC DIRECTION]
Vision: Brutalist raw with sharp typography and monochrome + neon green accent.
Unforgettable element: Oversized pricing numbers that break grid bounds and overlap sections.

TYPOGRAPHY:
- Display: Space Mono Bold (900) for headings and hero text
- Body: IBM Plex Sans Regular (400) for paragraphs and labels
- Hierarchy: H1 at 72px/900, H2 at 48px/700, Body at 16px/400, Label at 14px/500

COLOR SYSTEM:
- Primary: #000000 (backgrounds, text)
- Secondary: #FFFFFF (contrast text, cards)
- Accent: #00FF41 (CTA, highlights, links)
- Neutral: #E5E5E5, #CCCCCC, #999999, #666666
- Background treatment: Diagonal noise texture overlay on black base

MOTION:
- Page load: Staggered fade-in cascade with 0.1s delays per section
- Scroll: Parallax hero image (0.5x speed), fade-in sections at 80% viewport
- Hover: CTA buttons lift 4px with expanding shadow; nav links get 2px bottom border slide-in

SPATIAL COMPOSITION:
- Asymmetric grid: Hero 60% width left, sidebar 40% right
- Overlap: Pricing cards stack with 20px z-index offset
- Negative space: Generous 120px vertical padding between sections

[Continue with canvas spec and screen structure...]
```

**Round 2+ (reference DESIGN.md):**
```
DESIGN TOKENS (FROM DESIGN.md):
- Aesthetic: Brutalist raw
- Display font: Space Mono Bold
- Body font: IBM Plex Sans
- Primary: #000000, Accent: #00FF41
- Motion: Staggered reveals, parallax hero, lift hovers
- Spatial: Asymmetric 60/40, overlap stacking, generous padding

[Delta-only changes for this round...]
```

## Anti-Patterns to Avoid

❌ **Generic font stacks** — Never default to Inter, Roboto, system fonts  
❌ **Cliche color combos** — Purple gradient on white is AI slop  
❌ **Timid aesthetics** — Commit to bold OR minimal, not lukewarm middle  
❌ **Cookie-cutter layouts** — Centered cards in perfect symmetry is forgettable  
❌ **Solid color backgrounds** — Add texture, gradients, patterns, depth  
❌ **No motion strategy** — Static pages feel lifeless  
❌ **Missing unforgettable element** — Every screen needs one shareable moment  

## Success Checklist

✅ **Aesthetic direction chosen** — Clear conceptual vision committed  
✅ **Distinctive typography** — Display + body pair with character  
✅ **Dominant color strategy** — Not evenly distributed palette  
✅ **Background depth** — Gradients, textures, patterns, not solid  
✅ **Motion choreography** — High-impact page load or scroll effects  
✅ **Spatial surprise** — Asymmetry, overlap, diagonal flow, or generous negative space  
✅ **Unforgettable element** — One thing people will screenshot and share  
