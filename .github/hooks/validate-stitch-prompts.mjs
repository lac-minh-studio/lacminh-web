import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { stdin, stdout } from 'node:process'

const MAX_GENERATE_PROMPT_CHARS = 10000
const MAX_EDIT_PROMPT_CHARS = 4500

const REQUIRED_STYLE_TOKENS = [
  'glassmorphism + neumorphism hybrid design',
  'large sections: neumorphism',
  'supporting surfaces: glassmorphism',
  'depth: layered shadows',
  'material: frosted glass',
  'depth recipe: dual-direction neumorphic shadows',
  'glass recipe: translucent fill, background blur, highlight border',
  'flat surfaces: forbidden'
]

const REQUIRED_RESPONSIVE_TIERS = [
  { label: 'pc', lower: 1920, upper: 1600 },
  { label: 'laptop', lower: 1600, upper: 1200 },
  { label: 'tablet', lower: 1200, upper: 900 },
  { label: 'mini-tablet', lower: 900, upper: 700 },
  { label: 'mobile', lower: 700, upper: 0 }
]

const REQUIRED_CANVAS_TOKENS = [
  'stitch canvas: 1280px max desktop frame',
  'desktop scaling: pc 1280/1920, laptop 1280/1600',
  'content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame',
  'overflow rule: no element may exceed the 1280px frame',
  'scale behavior: scale typography, spacing, imagery, and component footprints proportionally',
  'density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements'
]

const REQUIRED_COMPACT_EDIT_STYLE_TOKENS = [
  'glassmorphism + neumorphism hybrid design',
  'depth recipe: dual-direction neumorphic shadows',
  'glass recipe: translucent fill, background blur, highlight border',
  'flat surfaces: forbidden'
]

const REQUIRED_COMPACT_EDIT_CANVAS_TOKENS = [
  '1280px max desktop frame',
  'overflow rule: no element may exceed the 1280px frame',
  'scale behavior: scale typography, spacing, imagery, and component footprints proportionally',
  'density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements'
]

const REQUIRED_ASSET_TOKENS = [
  'asset fidelity: use exact project asset files as canonical imagery',
  'preserve native aspect ratio',
  'if exact rendering is not possible, keep a locked media slot for next.js replacement'
]

const REQUIRED_EDIT_TOKENS = [
  'base version',
  'section-by-section review',
  'update from previous version only',
  'do not regenerate from scratch'
]

const IMAGE_INTENT_KEYWORDS = [
  'logo',
  'hero',
  'background image',
  'background visual',
  'image',
  'illustration',
  'artwork',
  'banner',
  'symbol',
  'map',
  'diagram',
  'scene'
]

const ASSET_FILE_PATTERN = /\.(png|jpe?g|webp|svg|avif)$/i

const rawInput = process.env.HOOK_INPUT_JSON ?? (await readStdin())
const publicAssets = await getPublicAssets()
const designSystemSource = await getDesignSystemSource()

let payload

try {
  payload = JSON.parse(rawInput || '{}')
} catch {
  respondAllow('Hook input was not valid JSON; skipping Stitch prompt validation.')
  process.exit(0)
}

const toolRefs = extractToolNames(payload)
const prompt = extractPrompt(payload)

if (!isStitchPromptToolFromRefs(toolRefs, prompt)) {
  respondAllow('Tool call is not a Stitch prompt generation/edit action.')
  process.exit(0)
}

if (!prompt) {
  respondDeny(
    'Blocked Stitch call: missing prompt text.',
    'Stitch generation and edit tool calls must include a prompt containing the required design-system block.'
  )
  process.exit(0)
}

const normalizedPrompt = normalize(prompt)
const normalizedDesignSystemSource = normalize(designSystemSource)
const roundNumber = extractRoundNumber(normalizedPrompt)
const toolKind = getToolKindFromRefs(toolRefs)
const promptLength = prompt.length
const usesCompactEditPrompt = roundNumber >= 2 && toolKind === 'edit' && hasCompactEditPrompt(normalizedPrompt)
const hasAuthoritativeDesignSystem = designSystemSourceHasRequiredTokens(normalizedDesignSystemSource)
const styleTokensToEnforce = usesCompactEditPrompt && hasAuthoritativeDesignSystem
  ? REQUIRED_COMPACT_EDIT_STYLE_TOKENS
  : REQUIRED_STYLE_TOKENS
const canvasTokensToEnforce = usesCompactEditPrompt && hasAuthoritativeDesignSystem
  ? REQUIRED_COMPACT_EDIT_CANVAS_TOKENS
  : REQUIRED_CANVAS_TOKENS
const missingStyleTokens = styleTokensToEnforce.filter((token) => !normalizedPrompt.includes(token))
const missingResponsiveTiers = usesCompactEditPrompt && hasAuthoritativeDesignSystem
  ? []
  : REQUIRED_RESPONSIVE_TIERS.filter((tier) => !hasResponsiveTier(normalizedPrompt, tier))
const missingCanvasTokens = canvasTokensToEnforce.filter((token) => !normalizedPrompt.includes(token))
const needsProjectAssets = publicAssets.length > 0 && promptNeedsImagery(normalizedPrompt)
const hasProjectAssetBlock = hasAssetGrounding(normalizedPrompt, publicAssets)
const hasAssetLockingInstruction = hasLockedAssetInstruction(normalizedPrompt)
const missingAssetTokens = needsProjectAssets
  ? REQUIRED_ASSET_TOKENS.filter((token) => !normalizedPrompt.includes(token))
  : []

if (roundNumber >= 2 && toolKind === 'generate') {
  respondDeny(
    `Blocked Stitch call: round ${roundNumber} must edit the previous version instead of generating from scratch.`,
    'Round 2 and later must use edit_screens with the previous version as the base. Use BASE VERSION, SECTION-BY-SECTION REVIEW, and the instruction `update from previous version only; do not regenerate from scratch`.'
  )
  process.exit(0)
}

if (toolKind === 'generate' && promptLength > MAX_GENERATE_PROMPT_CHARS) {
  respondDeny(
    `Blocked Stitch call: generate prompt is ${promptLength} characters; keep it under ${MAX_GENERATE_PROMPT_CHARS}.`,
    [
      'Round 1 prompts can be richer, but they still need a size budget.',
      `Keep generate prompts under ${MAX_GENERATE_PROMPT_CHARS} characters to avoid Copilot request-body failures.`,
      'Prefer compact section descriptions, avoid repeated prose, and list only the assets that actually matter for the screen.'
    ].join('\n')
  )
  process.exit(0)
}

if (toolKind === 'edit' && promptLength > MAX_EDIT_PROMPT_CHARS) {
  respondDeny(
    `Blocked Stitch call: edit prompt is ${promptLength} characters; keep round 2+ prompts under ${MAX_EDIT_PROMPT_CHARS}.`,
    [
      'Round 2 and later must be delta-only edit prompts.',
      'Stitch edit_screens already has the previous visual state, so do not paste the round 1 concept or unchanged section specs again.',
      'Use a compact design snapshot, a brief section-by-section review, and only the assets touched in this round.',
      'Keep unchanged areas locked and describe only the net changes for the next edit.'
    ].join('\n')
  )
  process.exit(0)
}

if (roundNumber >= 2 && toolKind === 'edit') {
  const missingEditTokens = REQUIRED_EDIT_TOKENS.filter((token) => !normalizedPrompt.includes(token))

  if (missingEditTokens.length > 0) {
    respondDeny(
      `Blocked Stitch call: round ${roundNumber} edit prompt is missing required continuity tokens: ${missingEditTokens.join(', ')}.`,
      'Round 2 and later edit prompts must include BASE VERSION, SECTION-BY-SECTION REVIEW, and the explicit instruction `update from previous version only; do not regenerate from scratch`.'
    )
    process.exit(0)
  }
}

if (needsProjectAssets && (!hasProjectAssetBlock || !hasAssetLockingInstruction || missingAssetTokens.length > 0)) {
  respondDeny(
    `Blocked Stitch call: prompt needs locked project assets from public/ but does not fully specify them${missingAssetTokens.length > 0 ? `; missing asset fidelity tokens: ${missingAssetTokens.join(', ')}` : ''}.`,
    [
      'This project already has reusable imagery in public/.',
      'When the prompt references a logo, hero, image, background, illustration, symbol, map, banner, or artwork, include:',
      '- PROJECT ASSETS (LOCKED - REUSE EXACT FILES)',
      '- exact root-relative asset paths',
      '- locking language such as `do not replace`, `do not reinterpret`, or `do not generate alternative imagery`',
      '- Asset fidelity: use exact project asset files as canonical imagery',
      '- Preserve native aspect ratio',
      '- If exact rendering is not possible, keep a locked media slot for Next.js replacement',
      ...publicAssets.slice(0, 5).map((asset) => `- ${asset}`)
    ].join('\n')
  )
  process.exit(0)
}

if (missingStyleTokens.length === 0 && missingResponsiveTiers.length === 0 && missingCanvasTokens.length === 0) {
  respondAllow('Stitch prompt contains the required hybrid style recipe, continuity tokens, asset fidelity rules, and desktop canvas scaling rules.')
  process.exit(0)
}

const problems = []

if (missingStyleTokens.length > 0) {
  problems.push(`missing hybrid style tokens: ${missingStyleTokens.join(', ')}`)
}

if (missingResponsiveTiers.length > 0) {
  problems.push(
    `missing responsive tiers: ${missingResponsiveTiers.map((tier) => tier.label).join(', ')}`
  )
}

if (missingCanvasTokens.length > 0) {
  problems.push(`missing desktop canvas tokens: ${missingCanvasTokens.join(', ')}`)
}

respondDeny(
  `Blocked Stitch call: ${problems.join('; ')}.`,
  [
    'Every Stitch prompt must include:',
    '- Depth: layered shadows',
    '- Material: frosted glass',
    '- Depth recipe: dual-direction neumorphic shadows',
    '- Glass recipe: translucent fill, background blur, highlight border',
    '- Flat surfaces: forbidden',
    '- Responsive tiers: pc 1920-1600, laptop 1600-1200, tablet 1200-900, mini-tablet 900-700, mobile <700',
    '- Stitch canvas: 1280px max desktop frame',
    '- Desktop scaling: pc 1280/1920, laptop 1280/1600',
    '- Content width targets: pc 1180-1220px, laptop 1040-1120px within the 1280px frame',
    '- Overflow rule: no element may exceed the 1280px frame',
    '- Scale behavior: scale typography, spacing, imagery, and component footprints proportionally',
    '- Density rule: fill leftover space with secondary modules, metadata, or supporting content instead of oversizing hero elements'
  ].join('\n')
)

function readStdin() {
  return new Promise((resolve) => {
    let buffer = ''

    stdin.setEncoding('utf8')
    stdin.on('data', (chunk) => {
      buffer += chunk
    })
    stdin.on('end', () => resolve(buffer))
    stdin.resume()
  })
}

function extractToolName(value) {
  const visited = new Set()
  const queue = [value]

  while (queue.length > 0) {
    const current = queue.shift()

    if (!current || typeof current !== 'object' || visited.has(current)) {
      continue
    }

    visited.add(current)

    for (const [key, nestedValue] of Object.entries(current)) {
      if (typeof nestedValue === 'string' && ['toolName', 'tool_name', 'recipient_name'].includes(key)) {
        return nestedValue
      }

      if (nestedValue && typeof nestedValue === 'object') {
        queue.push(nestedValue)
      }
    }
  }

  return ''
}

function extractToolNames(value) {
  const visited = new Set()
  const queue = [value]
  const results = []

  while (queue.length > 0) {
    const current = queue.shift()

    if (!current || typeof current !== 'object' || visited.has(current)) {
      continue
    }

    visited.add(current)

    for (const [key, nestedValue] of Object.entries(current)) {
      if (typeof nestedValue === 'string' && ['toolName', 'tool_name', 'recipient_name'].includes(key)) {
        results.push(nestedValue)
      }

      if (nestedValue && typeof nestedValue === 'object') {
        queue.push(nestedValue)
      }
    }
  }

  return results
}

function extractPrompt(value) {
  const visited = new Set()
  const queue = [value]

  while (queue.length > 0) {
    const current = queue.shift()

    if (!current || typeof current !== 'object' || visited.has(current)) {
      continue
    }

    visited.add(current)

    for (const [key, nestedValue] of Object.entries(current)) {
      if (key === 'prompt' && typeof nestedValue === 'string') {
        return nestedValue
      }

      if (nestedValue && typeof nestedValue === 'object') {
        queue.push(nestedValue)
      }
    }
  }

  return ''
}

function toolMatches(toolRefs, parts) {
  const needle = parts.join('_')

  return toolRefs.some((value) => String(value).toLowerCase().includes(needle))
}

function isStitchPromptToolFromRefs(toolRefs, prompt) {
  const normalizedToolRefs = toolRefs.map((value) => normalize(value))

  if (toolMatches(toolRefs, ['generate', 'screen', 'from', 'text'])) {
    return true
  }

  if (toolMatches(toolRefs, ['edit', 'screens'])) {
    return true
  }

  if (toolMatches(toolRefs, ['generate', 'variants'])) {
    return true
  }

  return typeof prompt === 'string' && prompt.length > 0 && normalizedToolRefs.some((value) => value.includes('stitch'))
}

function getToolKindFromRefs(toolRefs) {
  if (toolMatches(toolRefs, ['generate', 'screen', 'from', 'text'])) {
    return 'generate'
  }

  if (toolMatches(toolRefs, ['edit', 'screens'])) {
    return 'edit'
  }

  return 'other'
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[`*_]/g, ' ')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractRoundNumber(normalizedPrompt) {
  const match = normalizedPrompt.match(/round\s+(\d+)/)

  if (!match) {
    return 0
  }

  return Number.parseInt(match[1], 10)
}

function hasResponsiveTier(normalizedPrompt, tier) {
  const includesLabel = normalizedPrompt.includes(tier.label)
  const includesLower = normalizedPrompt.includes(String(tier.lower))
  const includesUpper = normalizedPrompt.includes(String(tier.upper))

  if (tier.label === 'mobile') {
    return includesLabel && (normalizedPrompt.includes('<700') || normalizedPrompt.includes('< 700') || normalizedPrompt.includes('below 700'))
  }

  return includesLabel && includesLower && includesUpper
}

function promptNeedsImagery(normalizedPrompt) {
  return IMAGE_INTENT_KEYWORDS.some((keyword) => normalizedPrompt.includes(keyword))
}

function hasAssetGrounding(normalizedPrompt, publicAssets) {
  const hasAssetHeading = [
    'project assets',
    'assets in this round',
    'locked assets',
    'locked - reuse exact files'
  ].some((token) => normalizedPrompt.includes(token))

  if (!hasAssetHeading) {
    return false
  }

  return publicAssets.some((asset) => normalizedPrompt.includes(normalize(asset)))
}

function hasLockedAssetInstruction(normalizedPrompt) {
  return [
    'locked - reuse exact files',
    'do not replace',
    'do not reinterpret',
    'do not invent',
    'do not generate alternative imagery',
    'preserve native aspect ratio',
    'locked media slot'
  ].some((token) => normalizedPrompt.includes(token))
}

async function getPublicAssets() {
  const publicDir = path.resolve('public')

  try {
    return await walkPublicAssets(publicDir, publicDir)
  } catch {
    return []
  }
}

async function walkPublicAssets(rootDir, currentDir) {
  const entries = await readdir(currentDir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)

    if (entry.isDirectory()) {
      results.push(...(await walkPublicAssets(rootDir, fullPath)))
      continue
    }

    if (!ASSET_FILE_PATTERN.test(entry.name)) {
      continue
    }

    const relativePath = path.relative(rootDir, fullPath).split(path.sep).join('/')
    results.push(`/${relativePath}`)
  }

  return results
}

function respondAllow(reason) {
  stdout.write(
    JSON.stringify({
      continue: true,
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'allow',
        permissionDecisionReason: reason
      }
    })
  )
}

function respondDeny(reason, systemMessage) {
  stdout.write(
    JSON.stringify({
      continue: true,
      systemMessage,
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason
      }
    })
  )
}

async function getDesignSystemSource() {
  try {
    return await readFile(path.resolve('.stitch/DESIGN.md'), 'utf8')
  } catch {
    return ''
  }
}

function designSystemSourceHasRequiredTokens(normalizedDesignSystemSource) {
  if (!normalizedDesignSystemSource) {
    return false
  }

  return REQUIRED_STYLE_TOKENS.every((token) => normalizedDesignSystemSource.includes(token))
    && REQUIRED_RESPONSIVE_TIERS.every((tier) => hasResponsiveTier(normalizedDesignSystemSource, tier))
    && REQUIRED_CANVAS_TOKENS.every((token) => normalizedDesignSystemSource.includes(token))
}

function hasCompactEditPrompt(normalizedPrompt) {
  return [
    'design snapshot (compact)',
    'preserve the current palette, typography, materials, section order, and overall layout hierarchy from the previous version',
    'treat unchanged areas as locked',
    'this round s changes only',
    'delta only'
  ].some((token) => normalizedPrompt.includes(token))
}