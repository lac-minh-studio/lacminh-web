---
description: Analyze a Stitch project's screenshot and extract design tokens into .stitch/DESIGN.md based on what the user has designed.
---

# Workflow: Generate DESIGN.md

## Purpose

Extract the actual design tokens from an existing Stitch project and document them in `.stitch/DESIGN.md`. This workflow does **not** impose any default styles — it captures what the user has already designed.

## Steps

1. **Get project** — Read `projectId` from `.stitch/metadata.json` or call `list_projects`.
2. **Get a representative screen** — Call `list_screens`, then `get_screen` to retrieve `screenshot.downloadUrl`.
3. **Analyze the screenshot** — Extract from the visual:
   - Color roles (background, surface, accent, text colors)
   - Font family, sizes, weights
   - Spacing density and grid system
   - Border radius patterns
   - Shadow and depth styles (whatever the user chose)
   - Overall visual style and atmosphere
4. **Write `.stitch/DESIGN.md`** with this structure:

```markdown
# Design System: [Project Title]
**Project ID:** [projectId]

## 1. Atmosphere
- Style: [describe the actual visual style observed]
- Visual tone: [e.g., dark / light / professional / playful / minimal]
- Density: [compact / comfortable / spacious]

## 2. Color Roles
- Background: [name] (#hex)
- Surface: [name] (#hex)
- Surface Secondary: [name] (#hex)
- Border: [name] (#hex)
- Accent: [name] (#hex)
- Success/Warning/Destructive: (#hex each)
- Text Primary: (#hex) / Text Secondary: (#hex) / Text Muted: (#hex)

## 3. Typography
- Font: [family], [base]px, [line-height]
- Scale: display / heading / body / caption sizes

## 4. Component Styles
- [Describe observed component patterns: buttons, inputs, cards, panels, etc.]
- [Describe observed depth/shadow behavior]
- [Describe observed border radius patterns]

## 5. Layout
- [Observed layout patterns: sidebar width, topbar height, content max-width, grid unit]
- Responsive tiers (if defined by user):
  - [List whatever tiers the user has specified]

## 6. Stitch Prompt Block (copy into every baton)
[Compile the extracted tokens into a compact block that can be pasted into Stitch prompts]
```

**Important:** Do not invent or impose styles that don't exist in the screenshot. Only document what you can actually observe.
