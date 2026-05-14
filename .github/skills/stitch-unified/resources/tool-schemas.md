# Stitch MCP Tool Schemas

Use these examples to format your tool calls to the Stitch MCP server correctly.

---

## 🏗️ Project Management

### `list_projects`
Lists all Stitch projects accessible to you.
```json
// No parameters needed
{}
```

### `get_project`
Retrieves details of a specific project.
```json
{
  "name": "projects/4044680601076201931"
}
```

### `create_project`
Creates a new Stitch project.
```json
{
  "title": "My New App"
}
```

---

## 🎨 Design Generation

**Important limitation:** The generation/edit APIs below are text-only. They do not upload local files from `public/`. If an exact project image must be preserved, describe it as a canonical asset and ask Stitch to keep a locked media slot so Next.js can perform the final replacement.

### `generate_screen_from_text`
Generates a new screen from a text description.
```json
{
  "projectId": "4044680601076201931",
  "prompt": "A modern landing page for a coffee shop with a hero section, menu, and contact form. Use warm brown tones (#4b2c20) and a clean sans-serif font.",
  "deviceType": "DESKTOP" // Options: MOBILE, DESKTOP, TABLET
}
```

### `edit_screens`
Edits existing screens with a text prompt.
```json
{
  "projectId": "4044680601076201931",
  "selectedScreenIds": ["98b50e2ddc9943efb387052637738f61"],
  "prompt": "Change the background color to white (#ffffff) and make the call-to-action button larger."
}
```

---

## 🖼️ Screen Management

**Important limitation:** The current MCP flow lets you read a screen's `title`, but it does not expose a rename operation for changing that title. Use local canonical titles in `.stitch/metadata.json` as the source of truth instead of relying on Stitch's generated titles.

### `list_screens`
Lists all screens within a project.
```json
{
  "projectId": "4044680601076201931"
}
```

### `get_screen`
Retrieves details of a specific screen.
```json
{
  "projectId": "4044680601076201931",
  "screenId": "98b50e2ddc9943efb387052637738f61",
  "name": "projects/4044680601076201931/screens/98b50e2ddc9943efb387052637738f61"
}
```

**Response includes:**
- `title`: Screen title (may be auto-generated; use local canonical titles instead)
- `screenshot.url` or `screenshot.imageUrl`: PNG screenshot download URL
- `screenshot.htmlUrl` or dedicated HTML export endpoint: HTML download URL (for approved implementation round only)

**Usage after generation:**
1. **After every `generate_screen_from_text` or `edit_screens` call**, immediately call `get_screen` to retrieve the full screen details
2. **Download PNG screenshot** from `screenshot.url` and save to `.stitch/designs/{screen}/round-{N}-{device}.png`
3. **Download HTML** (only for approved implementation round) from `screenshot.htmlUrl` and save to `.stitch/designs/{screen}/round-{N}-{device}.html`

**Important:**
- PNG downloads are **mandatory after every round** (used for review and comparison)
- HTML downloads are **ONLY for the approved implementation round** (used for code conversion)
- Save mobile PNGs at the **highest available export resolution** — never downscale after download

---

## 📥 Download Workflow

### After Every Round (Mandatory)
```
1. generate_screen_from_text OR edit_screens (PC)
   ↓
2. get_screen (PC screen ID)
   ↓
3. Download PNG from screenshot.url → save as round-{N}-pc.png
   ↓
4. generate_screen_from_text OR edit_screens (Mobile)
   ↓
5. get_screen (Mobile screen ID)
   ↓
6. Download PNG from screenshot.url → save as round-{N}-mobile.png
   ↓
7. Append review to review.md
   ↓
8. Update baton with new round + screen IDs
```

### After Approval Only (HTML for Code Implementation)
```
1. Quality check passes for Round 6+
   ↓
2. get_screen (approved PC screen ID)
   ↓
3. Download HTML from screenshot.htmlUrl → save as round-{N}-pc.html
   ↓
4. get_screen (approved Mobile screen ID)
   ↓
5. Download HTML from screenshot.htmlUrl → save as round-{N}-mobile.html
   ↓
6. Hand off HTML paths to coding-fe skill
```
