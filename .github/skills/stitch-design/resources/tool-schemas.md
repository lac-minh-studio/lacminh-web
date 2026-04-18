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