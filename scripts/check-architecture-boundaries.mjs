import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const sourceRoot = path.join(projectRoot, 'src')
const appRoot = path.join(sourceRoot, 'app')
const domainRoot = path.join(sourceRoot, 'domain')
const rootPresentation = path.join(sourceRoot, 'presentation')

const scanExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'])
const topLevelDomains = new Set(['home', 'admin', 'api'])
const routeReservedNames = new Set([
  'default.tsx',
  'error.tsx',
  'global-error.tsx',
  'layout.tsx',
  'loading.tsx',
  'manifest.ts',
  'not-found.tsx',
  'page.tsx',
  'robots.ts',
  'route.ts',
  'route.tsx',
  'sitemap.ts',
  'template.tsx',
])

const violations = []
const stats = {
  scannedFiles: 0,
  importStatements: 0,
  rules: [
    'top-level domain modules may not import another top-level domain',
    'App Router files may not import root domain presentation barrels',
    'src/app may contain only reserved route files plus narrow *-shell adapters',
    'root presentation buckets such as src/presentation and src/domain/*/presentation/index.ts are forbidden',
  ],
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/')
}

function relativeToProject(absolutePath) {
  return toPosix(path.relative(projectRoot, absolutePath))
}

function addViolation(filePath, rule, message) {
  violations.push({
    file: relativeToProject(filePath),
    rule,
    message,
  })
}

function exists(absolutePath) {
  return fs.existsSync(absolutePath)
}

function walkFiles(root) {
  if (!exists(root)) {
    return []
  }

  const files = []
  const stack = [root]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })

    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name)

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
          continue
        }
        stack.push(absolutePath)
        continue
      }

      if (entry.isFile() && scanExtensions.has(path.extname(entry.name))) {
        files.push(absolutePath)
      }
    }
  }

  return files.sort((left, right) => left.localeCompare(right))
}

function readFile(absolutePath) {
  return fs.readFileSync(absolutePath, 'utf8')
}

function topLevelDomainFor(absolutePath) {
  const relative = toPosix(path.relative(domainRoot, absolutePath))
  const [domainName] = relative.split('/')
  return topLevelDomains.has(domainName) ? domainName : null
}

function resolveImport(fromFile, specifier) {
  if (specifier.startsWith('@/')) {
    return path.join(sourceRoot, specifier.slice(2))
  }

  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    return path.resolve(path.dirname(fromFile), specifier)
  }

  return null
}

function findImports(content) {
  const imports = []
  const importFromPattern = /\b(?:import|export)\b[\s\S]*?\bfrom\s*['"]([^'"]+)['"]/g
  const sideEffectPattern = /^\s*import\s*['"]([^'"]+)['"]/gm
  const dynamicPattern = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g

  for (const pattern of [importFromPattern, sideEffectPattern, dynamicPattern]) {
    pattern.lastIndex = 0
    let match = pattern.exec(content)
    while (match) {
      imports.push(match[1])
      match = pattern.exec(content)
    }
  }

  return [...new Set(imports)]
}

function assertNoCrossDomainImports(filePath, content) {
  const sourceDomain = topLevelDomainFor(filePath)
  if (!sourceDomain) {
    return
  }

  for (const specifier of findImports(content)) {
    stats.importStatements += 1
    const resolved = resolveImport(filePath, specifier)
    if (!resolved) {
      continue
    }

    const targetDomain = topLevelDomainFor(resolved)
    if (targetDomain && targetDomain !== sourceDomain) {
      addViolation(
        filePath,
        'domain-boundary-import',
        `domain/${sourceDomain} imports domain/${targetDomain} via "${specifier}".`,
      )
    }
  }
}

function assertNoRootPresentationImports(filePath, content) {
  for (const specifier of findImports(content)) {
    if (/^@\/domain\/(home|admin|api)\/presentation(?:\/index)?$/.test(specifier)) {
      addViolation(
        filePath,
        'root-presentation-import',
        `Import "${specifier}" targets a root presentation barrel instead of a module owner.`,
      )
    }
  }
}

function isAllowedAppShellAdapter(filePath, content) {
  const filename = path.basename(filePath)
  if (!filename.endsWith('-shell.tsx')) {
    return false
  }

  if (!/\bexport\s+function\s+\w*Shell\b/.test(content)) {
    return false
  }

  return !/@\/domain\/(home|admin|api)\/(application|model|infrastructure|domain)\b/.test(content)
}

function assertAppRouterPlacement(filePath, content) {
  if (!filePath.startsWith(appRoot + path.sep)) {
    return
  }

  const filename = path.basename(filePath)
  if (routeReservedNames.has(filename) || isAllowedAppShellAdapter(filePath, content)) {
    return
  }

  addViolation(
    filePath,
    'app-router-placement',
    'src/app should contain route/layout/metadata/error/not-found/composition adapter files only.',
  )
}

function assertNoRootPresentationBuckets() {
  if (exists(rootPresentation)) {
    addViolation(
      rootPresentation,
      'root-presentation-bucket',
      'src/presentation creates a root technical presentation bucket outside an owning domain.',
    )
  }

  for (const domainName of topLevelDomains) {
    const barrel = path.join(domainRoot, domainName, 'presentation', 'index.ts')
    if (exists(barrel)) {
      addViolation(
        barrel,
        'root-domain-presentation-barrel',
        `src/domain/${domainName}/presentation/index.ts is a root presentation barrel outside a functional module owner.`,
      )
    }
  }
}

assertNoRootPresentationBuckets()

for (const filePath of [...walkFiles(appRoot), ...walkFiles(domainRoot)]) {
  const content = readFile(filePath)
  stats.scannedFiles += 1
  assertNoCrossDomainImports(filePath, content)
  assertNoRootPresentationImports(filePath, content)
  assertAppRouterPlacement(filePath, content)
}

if (violations.length > 0) {
  console.error('Architecture boundary scan failed.')
  console.error(`Checked ${stats.scannedFiles} files.`)
  for (const violation of violations) {
    console.error(`- ${violation.file}: [${violation.rule}] ${violation.message}`)
  }
  process.exitCode = 1
} else {
  console.log('Architecture boundary scan passed.')
  console.log(`Checked ${stats.scannedFiles} files.`)
  console.log('Rules:')
  for (const rule of stats.rules) {
    console.log(`- ${rule}`)
  }
}
