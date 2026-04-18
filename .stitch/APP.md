# App Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It is the project's "Long-Term Memory."
> To resume a screen, read its baton from `.stitch/designs/{screen}/baton.md`. If a screen's baton has `status: approved`, pick the next screen from Section 5 (Backlog), create a new baton at `.stitch/designs/{next-screen}/baton.md`, and start at round 1. Every screen owns its own baton — never overwrite another screen's file.

## 1. Core Identity
* **Project Name:** Lạc Minh Studio Website
* **Stitch Project ID:** 15105611068859615529
* **App Type:** Corporate / Studio website — game development studio
* **Primary User:** Nhà đầu tư và đối tác muốn thuê hoặc hợp tác phát triển/phát hành game
* **Secondary User:** Game thủ muốn cập nhật tin tức về các dự án game đang phát triển
* **Core Job-to-be-Done:** Giới thiệu studio, giới thiệu các dự án game, tuyển dụng nhân tài, kêu gọi đầu tư, đăng bài viết SEO
* **Brand:** Lạc Minh Studio — phát triển game fantasy lấy cảm hứng từ huyền sử Việt Nam (4000 năm văn hiến, dòng máu Lạc Hồng)
* **Tone:** Huyền sử, tu tiên, hoài niệm, sang trọng — ấm, sáng, tinh tế, cao cấp
* **Language:** Tiếng Việt

## 2. Visual Language
*Reference these tokens when prompting Stitch. Every prompt must include the block from Section 6 of DESIGN.md.*

* **Theme:** Warm light with dark hero sections — "Digital Sanctuary feel"
* **Density:** Comfortable — đầy vừa, không tràn khung
* **Style System:** Glassmorphism + Neumorphism hybrid design
* **Primary Surface Rule:** Use Neumorphism for large sections and major layout containers
* **Supporting Surface Rule:** Use Glassmorphism for floating cards, overlays, filters, modals, and secondary panels
* **Depth Language:** Dual-direction neumorphic shadows + frosted glass layers
* **Stitch desktop canvas:** 1280px max width
* **Desktop scaling:** pc `1280/1920`, laptop `1280/1600`
* **Primary Accent:** Warm Bronze / Muted Gold — #C4954A
* **Background:** Warm Cream — #EDE0C5
* **Font (Heading):** EB Garamond (modern serif — evokes heritage)
* **Font (Body):** Inter (clean sans — readability)
* **Responsive tiers:** pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`

## 3. Architecture & File Structure
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Stitch output (per round):**
  - `.stitch/designs/{screen}/round-{N}-pc.png`
  - `.stitch/designs/{screen}/round-{N}-mobile.png`
* **HTML download (for code, implementation round only):**
  - `.stitch/designs/{screen}/round-{N}-pc.html`
  - `.stitch/designs/{screen}/round-{N}-mobile.html`
* **Baton (per screen):** `.stitch/designs/{screen}/baton.md` — round + status, never shared
* **Review log:** `.stitch/designs/{screen}/review.md` — append all rounds for that screen into one file
* **Code output:** `src/app/{route}/page.tsx` or `src/components/{Name}.tsx`
* **Project assets:** `public/**/*` — reusable logos, hero images, illustrations, symbols, diagrams, and backgrounds

### Asset Inventory
| File | Role |
|------|------|
| `/public/logo.png` | Studio logo — primary brand mark |
| `/publichero_background.png` | Hero section — floating Vietnamese palace in moonlit clouds with cranes and karstic peaks |
| `/publictrongdong.png` | Brand symbol — ancient Đông Sơn bronze drum with glowing 14-point star, textured patina |
| `/publiccultivation.jpg` | Game card — "Tu Tiên" cultivation game — ancient stone tile grid with turquoise mystical mists |
| `/publicinteractive_story.png` | Game card — "Huyền Sử" interactive story — moonlit Vietnamese pavilion on lotus pond with lanterns |
| `/publicvoid_map.png` | Game card / section background — void map concept art |
| `/public/lac-minh/lotus-pond.png` | Decorative section — night lotus pond with full moon and fireflies |

## 4. Screen Inventory (Current State)
*Update when a screen completes round 6 and is approved.*

* [x] `home` → `src/app/page.tsx` ✅ Round 7 approved
* [ ] `about` → `src/app/about/page.tsx`
* [ ] `projects` → `src/app/projects/page.tsx`
* [x] `careers` → `src/app/careers/page.tsx` ✅ Round 7 approved
* [ ] `blog` → `src/app/blog/page.tsx`
* [ ] `contact` → `src/app/contact/page.tsx`

## 5. Backlog (Screens to Design)
*Current screen is `home`. Pick from here when previous screen is approved. Always start at round 1.*

### High Priority
- [ ] **home:** Homepage — hero, vision motto, featured projects gallery, development roadmap, investor contact form, footer
- [ ] **projects:** Projects listing — game cards, genre filter, project detail modal
- [ ] **about:** About studio — team, mission, founding story, studio culture
- [ ] **careers:** Careers page — open positions, requirements, application form

### Medium Priority
- [ ] **blog:** Blog listing — SEO articles, game dev news, Vietnam folklore topics
- [ ] **contact:** Contact page — full contact form, studio address, social links

## 6. Design Notes
*Constraints and patterns to maintain across all screens.*

1. All screens share the same glassmorphic navbar with the studio logo and nav links
2. Hero sections use the dark mystical aesthetic (dark overlay over hero_background.png)
3. Content sections alternate: warm cream neumorphic sections and deep forest-green glass sections
4. Game project cards: gallery 3-column grid on desktop, hover reveals CTA overlay
5. The Trống Đồng motif (`/publictrongdong.png`) may be used as section decorative symbol or watermark (low opacity overlay)
6. Typography: EB Garamond for all headings; Inter for body copy
7. CTA buttons are warm bronze/gold with neumorphic press effect
8. Empty states always include a lotus motif and a primary CTA
9. Contact/investor form uses glassmorphic card treatment
10. Responsive decisions must respect fixed tiers: pc `1920-1600`, laptop `1600-1200`, tablet `1200-900`, mini-tablet `900-700`, mobile `<700`
11. If suitable imagery already exists in `public/`, prompts and code must reuse those files
12. Round 2 and later must edit the previous version instead of regenerating from the original prompt
13. Desktop composition must be designed inside Stitch's 1280px canvas by scaling pc and laptop internals to `1280/1920` and `1280/1600`
14. All Vietnamese text must be accurate and evoke the "huyền sử Lạc Hồng" tone

## 7. Rules of Engagement
1. Never write code before round 6 is approved.
2. Always document critique of previous round before generating the next.
3. Write back to `.stitch/designs/{screen}/baton.md` before completing every iteration. Never overwrite another screen's baton.
4. Mark screens complete in Section 4 only after round 6 passes quality gate.
5. The Trống Đồng and crane motifs are sacred brand symbols — use with intentionality.
6. Avoid: tím neon, xanh điện, đen tuyệt đối — these clash with the warm premium palette.
