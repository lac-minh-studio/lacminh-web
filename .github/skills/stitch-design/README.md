# Stitch Design Skill

Teaches agents to generate high-fidelity, consistent UI designs and maintain project-level design systems using Stitch.

## Install

```bash
npx skills add google-labs-code/stitch-skills --skill stitch-design --global
```

## What It Does

Enables professional-grade UI/UX design workflows through Stitch MCP:

1. **Prompt Enhancement**: Transforms rough intent into structured, high-fidelity prompts with professional terminology and design system context.
2. **Design System Synthesis**: Analyzes existing Stitch projects to create and maintain a `.stitch/DESIGN.md` "source of truth".
3. **Iterative Generation**: Selects the best generation or editing workflow (`edit_screens`, `generate_variants`) based on user intent.
4. **PNG-Only Review Flow**: Uses Stitch screenshots as the review artifact, stores them under `.stitch/designs/{screen}/round-{N}.png`, and avoids HTML download noise.
5. **Consolidated Review Logs**: Keeps exactly one `.stitch/designs/{screen}/review.md` file per screen and appends round notes from `R1` to `R7+`.

## Prerequisites

- Stitch MCP Server access
- A project `projectId` (can be discovered via `list_projects`)

## Usage

```text
Design a premium landing page for a mountain resort with a Glassmorphism + Neumorphism hybrid design, layered shadows, frosted glass, and clear responsive behavior across pc, laptop, tablet, mini-tablet, and mobile.
```

## Skill Structure

```
stitch-design/
├── SKILL.md           — Core instructions & Prompt Pipeline
├── README.md          — This file
├── workflows/         — Specialized pipelines (Text-to-UI, Edit, MD)
└── resources/         — UI/UX keywords & Technical Mappings
```

## Works With

- **`react:components` skill**: Hand-off generated designs for frontend implementation.
- **`stitch-loop` skill**: Provides the `DESIGN.md` context for autonomous building loops.
- **Multi-agent workflows**: Refines prompts before passing design tasks to specialized agents.
- **Next.js pipelines**: Supplies the prompt and design-system foundation before analytics and component development.

## Learn More

See [SKILL.md](./SKILL.md) for complete instructions.
