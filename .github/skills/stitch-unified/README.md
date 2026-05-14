# Stitch Unified Skill

**Kết hợp 3 skills thành 1 workflow toàn diện:**
- `stitch-design` → Prompt optimization & dual-device generation
- `stitch-loop` → 6-round refinement workflow với baton system
- `design-suggestion` → Bold aesthetic philosophy & anti-generic design

## Tính Năng Chính

### 🎨 Design Thinking (Rounds 1 & 2)
Mỗi project bắt đầu với **bold aesthetic direction**:
- Chọn tone đặc biệt (brutalist/maximalist/luxury/retro...)
- Typography đặc sắc (KHÔNG dùng Inter, Roboto, Arial)
- Color strategy với dominant colors + sharp accents
- Motion choreography (staggered reveals, scroll effects)
- Spatial composition (asymmetry, overlap, diagonal flow)
- **Unforgettable element** — điều gì làm design này đáng nhớ?

### 🔄 Auto-Pilot 6-Round Loop
Tự động chạy 6 vòng refinement **không dừng**:
1. **Concept & Layout** → Skeleton structure + design thinking
2. **Visual Identity** → Brand colors, typography, spacing + design thinking
3. **Component Detail** → Refine components, micro-states
4. **Data & Content** → Realistic mock data
5. **Edge Cases & Density** → Empty/error/loading states
6. **Polish & Accessibility** → Final contrast, focus, responsive

### 📱 Dual-Device Generation
Mỗi round tạo **2 designs**:
- **PC** (DESKTOP) — full desktop layout
- **Mobile** (MOBILE, ≤450px) — sequential adaptation từ PC design

### 🤖 Auto-Generate DESIGN.md
Nếu `.stitch/DESIGN.md` chưa tồn tại → **tự động tạo** từ design thinking exercise trong Round 1

### ✅ Quality Gate
Sau Round 6, tự động kiểm tra:
- ✅ Layout integrity (no overlaps, overflows, misalignments)
- ✅ Cross-device parity (all sections present on PC + Mobile)
- ✅ Style consistency (matches other approved pages)
- ✅ Aesthetic execution (design thinking vision realized)
- ✅ Accessibility (contrast, focus indicators, touch targets)

Nếu pass → approve + download HTML → hand off to `coding-fe`  
Nếu fail → document defects + continue Round 7+

## Cấu Trúc Files

```
.github/skills/stitch-unified/
├── SKILL.md                          # Main workflow
├── README.md                         # This file
└── resources/
    ├── design-philosophy.md          # Bold aesthetic principles (from design-suggestion)
    ├── design-mappings.md            # Vague → professional terminology (from stitch-design)
    ├── prompt-keywords.md            # Stitch UI vocabulary (from stitch-design)
    ├── tool-schemas.md               # MCP call signatures (from stitch-design)
    └── baton-schema.md               # Baton file structure (from stitch-loop)
```

## Cách Sử Dụng

### Invocation
```
User: "Design the pricing page"
User: "Continue" (để resume từ baton hiện tại)
```

### Workflow Flow
1. Kiểm tra `.stitch/designs/{screen}/baton.md`
   - Nếu không tồn tại → start fresh at Round 1
   - Nếu tồn tại → resume từ round hiện tại
2. Kiểm tra `.stitch/DESIGN.md`
   - Nếu missing → **auto-generate** từ design thinking
3. **Round 1 & 2**: Run design thinking exercise
4. **All rounds**:
   - **Pre-generation review** (Rounds 2+): Section-by-section critique of previous PNGs
   - Enhance prompt → Generate PC + Mobile
   - **Download PNG screenshots** (MANDATORY): PC + Mobile from screenshot URLs
   - **Append review** to cumulative review.md
   - Update metadata + advance baton
5. **After Round 6**: Quality check → Approve or continue refinement
6. **After approval**: Download HTML (PC + Mobile) → Hand off to coding-fe

## So Sánh với Skills Gốc

| Aspect | stitch-design | stitch-loop | stitch-unified |
|--------|--------------|-------------|----------------|
| **Workflow** | Manual per round | Manual per round | **Auto-pilot 6 rounds** |
| **Aesthetic** | User provides | User provides | **Auto from design-philosophy** |
| **DESIGN.md** | Manual create | Manual create | **Auto-generate** |
| **Mobile** | Parallel design | Parallel design | **Sequential (adapt from PC)** |
| **Quality Gate** | Manual review | Manual review | **Auto after Round 6** |
| **PNG Download** | Manual | **Mandatory per round** | **Mandatory per round** |
| **Review Process** | Optional | **Mandatory section-by-section** | **Mandatory section-by-section** |
| **HTML Download** | Manual | Only for approved round | **Only for approved round** |

## Configuration Summary

Từ user input:
- ✅ **Aesthetic priority**: Medium — Rounds 1 & 2 only
- ✅ **Workflow mode**: Auto-pilot — 6 rounds continuous
- ✅ **DESIGN.md**: Always auto-generate if missing
- ✅ **Mobile strategy**: Sequential — PC first, adapt to Mobile

## Lợi Ích

### 🚀 Tốc độ
- Auto-pilot chạy 6 rounds không dừng
- Không cần manual trigger từng round
- Auto-generate DESIGN.md → tiết kiệm setup time

### 🎨 Chất lượng
- Design thinking exercise bắt buộc ở Rounds 1 & 2
- Tránh generic AI aesthetics (Inter, purple gradients, cookie-cutter layouts)
- Quality gate tự động → đảm bảo standards
- **Section-by-section review mandatory** từ Round 2+ → phát hiện defects sớm

### 📐 Consistency
- Cross-page style consistency checks
- Shared design tokens từ DESIGN.md
- Section-by-section review mandatory từ Round 2+
- **PNG artifacts từ mọi rounds** → dễ dàng compare và track progress

### 🔧 Maintainability
- Baton system → clear round tracking
- Canonical local titles → không phụ thuộc Stitch UI titles
- HTML download chỉ cho approved round → tránh clutter
- **Cumulative review.md** → single source of truth cho mọi round findings

## Quy Trình Download & Review

### Sau Mỗi Round (MANDATORY)
```
1. Generate/Edit PC design
2. get_screen (PC) → Download PNG → Save round-{N}-pc.png
3. Generate/Edit Mobile design  
4. get_screen (Mobile) → Download PNG → Save round-{N}-mobile.png
5. Append review findings → review.md
6. Update baton → next round
```

### Trước Mỗi Edit Round (Rounds 2+)
```
1. Read round-{N-1}-pc.png + round-{N-1}-mobile.png
2. Section-by-section critique:
   - What exists in each section
   - What's missing or incomplete
   - Cross-device parity check
   - Layout defects (overlap, clip, misalign)
   - Full-bleed integrity check
3. Compare with other approved pages
4. Document critique → use for edit prompt
```

### Sau Khi Approved (HTML cho Code)
```
1. Quality check PASSES
2. get_screen (approved PC) → Download HTML → Save round-{N}-pc.html
3. get_screen (approved Mobile) → Download HTML → Save round-{N}-mobile.html
4. Hand off to coding-fe with HTML paths
```

## Anti-Patterns Tránh

❌ Skipping rounds — 6 rounds là bắt buộc  
❌ Generic aesthetics — Inter, purple gradients, centered grids  
❌ Missing design thinking — Rounds 1 & 2 cần aesthetic exercise  
❌ Code before approval — HTML chỉ download sau khi pass quality gate  
❌ Style drift — Mỗi page mới phải match existing pages  
❌ **Skipping PNG downloads** — Sau mỗi round PHẢI download cả PC và Mobile PNGs  
❌ **Skipping review** — Rounds 2+ BẮT BUỘC section-by-section critique trước khi edit  
❌ **Download HTML cho review rounds** — HTML chỉ cho approved implementation round  
❌ **Multiple review files** — Chỉ duy nhất 1 file review.md per screen (cumulative)  

## Success Patterns

✅ Bold aesthetic choices — Commit to extreme và execute đầy đủ  
✅ Distinctive typography — Tránh generic fonts  
✅ Delta-only edits — Round 2+ chỉ mô tả changes, không full spec  
✅ Section-by-section review — Explicit critique trước mỗi edit  
✅ Cross-device parity — Tất cả core sections có ở cả PC và Mobile  
✅ Style consistency — Mọi page cảm giác cùng 1 design system  
✅ **PNG downloads mandatory** — Sau mọi round, download cả PC và Mobile cho review  
✅ **Cumulative review log** — Single review.md per screen với tất cả rounds  
✅ **HTML only when approved** — Download HTML chỉ cho locked implementation round  
✅ **Pre-edit critique** — Rounds 2+ review PNGs trước khi generate changes  

## Next Steps

Sau khi skill này được approve:
1. Cập nhật `.github/copilot-instructions.md` routing:
   - **UI design generation from prompt** → use `stitch-unified`
   - Xóa references đến `stitch-design` và `stitch-loop` riêng lẻ
2. Test với 1 screen mới để verify auto-pilot flow
3. Document findings vào `/memories/repo/stitch-workflow.md`
