# Next.js Coding Standards

These rules apply to every file written in Phase 4. Read this file before generating any component.

---

## 0. Dependency & Library Rules

### Approved Library Stack (use ONLY these — never substitute)

| Concern | Library | Package name |
|---------|---------|-------------|
| Icons | lucide-react | `lucide-react` |
| HTTP / API calls | Axios | `axios` |
| Animation | Framer Motion | `framer-motion` |
| Global state / context | Zustand | `zustand` |
| CSS utility | Tailwind CSS | (already in project) |
| UI components | HeroUI | `@heroui/react` |
| Class merging | clsx + tailwind-merge | `clsx` `tailwind-merge` |

### Installation Rule

Before using any library, check `package.json` dependencies. If the library is **not listed**:
1. Run `npm install {package-name}` before writing any import
2. Confirm the install succeeded (exit code 0) before proceeding
3. Never write an import that references a package not in `package.json`

### Icon Usage (lucide-react)
```tsx
import { ArrowUp, Settings, AlertCircle } from 'lucide-react'

// Always set explicit size and strokeWidth — never rely on defaults
<ArrowUp size={16} strokeWidth={1.5} className="text-emerald-400" />
```

### API Usage (axios)
```ts
// src/lib/api.ts — single axios instance
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
})
```
- Always use the shared `api` instance from `src/lib/api.ts` — never call `axios.get()` directly
- All API calls go in `src/services/{domain}.ts`, never inside components

### Animation Usage (framer-motion)
```tsx
'use client'
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  {children}
</motion.div>
```
- Components using `framer-motion` **must** be Client Components (`'use client'`)
- Keep animation durations under 300ms for UI transitions; 500ms max for page entries

### Global State Usage (zustand + sessionStorage)
```ts
// src/store/{domain}.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user: IUser | undefined
  setUser: (user: IUser) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      clear: () => set({ user: undefined }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage), // always sessionStorage
    }
  )
)
```
- Store files live in `src/store/{domain}.ts`
- **Always use `sessionStorage`** — never `localStorage` for zustand persist
- Store only serializable data — no functions, no class instances, no DOM refs
- Do NOT duplicate server data into zustand — only store UI state and auth tokens

### Component Usage (HeroUI)
- Use HeroUI built-in components as the base: `Button`, `Input`, `Modal`, `Table`, `Card`, `Checkbox`, `Select`, `Tabs`, etc.
- Extend/wrap HeroUI components when custom behavior is needed — never rewrite from scratch what HeroUI provides
- Apply design tokens from `.stitch/DESIGN.md` via Tailwind `className` props on HeroUI components
```tsx
import { Button } from '@heroui/react'

<Button color="primary" variant="solid" size="sm" className="font-medium">
  Save changes
</Button>
```

### Image Usage (Next.js public assets)
```tsx
import Image from 'next/image'

<Image
  src="hero_background.png"
  alt="Atmospheric moonlit hero background"
  width={1440}
  height={900}
  priority
/>
```
- Before introducing any new image, inspect `public/` recursively for existing reusable assets
- Prefer existing project assets in `public/` over remote placeholders, stock art, or newly invented images
- Use `next/image` as the default rendering primitive for assets in `public/`
- Use root-relative paths such as `/logo.png`, `hero_background.png`, or `/lac-minh/lotus-pond.png`
- Record asset usage in the analytics plan before implementation

---

## 1. Project Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (font, global providers), include header, footer and all component used in all page
│   ├── page.tsx                ← HomePage, data-fetching only
│   └── (app)/
│       └── {route}/
│           ├── layout.tsx      ← Layout component — thin, meta SEO only
│           ├── page.tsx        ← Page component — thin, data-fetching only
│           └── {route}         ← Page component for segments route — thin, data-fetching only
│              ├── layout.tsx      ← Layout component — thin, meta SEO only
│              └── page.tsx        ← Page component — thin, data-fetching only
├── components/
│   ├── hero-ui/                ← Primitive/leaf components wrapping HeroUI
│   ├── global/                 ← Primitive/leaf components for all page similar header, footer, navigation, contact form.....
│   └── {feature}/              ← Feature-scoped components (max 300 lines each)
├── store/
│   └── {domain}.ts             ← Zustand stores (always sessionStorage persist)
├── services/
│   └── {domain}.ts             ← All axios API calls (uses src/lib/api.ts)
├── lib/
│   ├── api.ts                  ← Shared axios instance
│   └── utils.ts                ← cn() and other pure utilities
├── data/
│   └── {domain}.ts             ← Mock data arrays (typed with interfaces)
└── types/
    └── {domain}.ts             ← TypeScript interfaces per data domain

public/
├── logo.png                    ← Reusable brand/logo asset
└── {feature}/...               ← Existing backgrounds, illustrations, and section imagery
```

**Naming conventions:**
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities/hooks
- Components: `PascalCase` function names
- Types/Interfaces: `PascalCase` prefixed with `I` for interfaces (e.g., `IUser`), without for plain types
- Constants: `SCREAMING_SNAKE_CASE`
- CSS class strings: use `cn()` utility for conditional Tailwind

---

## 2. Component Rules

### Server Components (default)
All components are Server Components unless they need client-side interactivity.
- No `useState`, `useEffect`, `useRef`, event handlers → Server Component
- Can be `async`, can `await` data fetching directly

### Client Components
Add `'use client'` **only** when the component:
- Uses React hooks (`useState`, `useEffect`, `useReducer`, `useContext`)
- Attaches browser event listeners (`onClick`, `onChange`, `onSubmit`)
- Uses browser-only APIs (`localStorage`, `window`, `document`)

**Rule:** Push `'use client'` as deep into the tree as possible. Never make a layout or page client just to use one interactive element — extract that element into its own Client Component.

### Component HeroUI
- Check first components/hero-ui/** have any component we needs
- Only use component of HeroUI if dev can do
- Try heroUI component first. If one not support, use custom html tag original after

### Component Size Limit

**Hard rule: No component file may exceed 300 lines.**

If a component approaches 300 lines:
1. Identify logical sub-sections (a form block, a table section, a panel)
2. Extract each sub-section into its own named component file
3. The parent component imports and composes them

This includes JSX, hooks, type definitions, and helper functions inside the file. Move types to `src/types/` and helpers to `src/lib/` if needed to stay under the limit.

### Component Template

```tsx
// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  className?: string
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400',
        variant === 'destructive' && 'bg-red-500/10 text-red-400',
        variant === 'default' && 'bg-slate-500/10 text-slate-400',
        className
      )}
    >
      {label}
    </span>
  )
}
```

---

## 3. Props Rules

- **Always define a named interface** for props — never use inline object types or `any`
- **Required vs optional:** Only make a prop optional (`?`) if the component has a meaningful default behavior without it
- **Children:** Type as `React.ReactNode` — never `JSX.Element`
- **Event handlers:** Type explicitly — `onClick?: () => void`, `onChange?: (value: string) => void`
- **No prop drilling beyond 2 levels** — lift state or use context

---

## 4. TypeScript Interfaces

Define interfaces in `src/types/{domain}.ts`. Reference these in all components.

```ts
// src/types/dashboard.ts

export interface IKPICard {
  id: string
  label: string
  value: number
  unit?: string
  trend: {
    delta: number       // percentage change
    direction: 'up' | 'down' | 'neutral'
  }
}

export interface IPullRequest {
  id: string
  title: string
  author: string
  status: 'open' | 'merged' | 'closed'
  createdAt: string    // ISO 8601
  reviewCount: number
  cycleTimeHours: number
}
```

**Rules:**
- **`any` is FORBIDDEN** — no exceptions. Use an explicit interface, `unknown` + type guard, or a generic type parameter instead.
- All dates as ISO 8601 strings — never `Date` objects in interfaces
- Enums as union string literals — never TypeScript `enum` keyword
- IDs always `string` — never `number`
- Avoid `null` — prefer `undefined` for optional fields

---

## 5. Tailwind CSS Rules

- **Token mapping:** Convert Stitch design tokens to Tailwind classes using `.stitch/DESIGN.md` Section 7 (Mythos Token Map):
  - Every colour, shadow, and font value must first be registered as a CSS variable inside `@theme inline` in `src/app/globals.css`
  - Then reference the generated Tailwind class in components (`bg-primary`, `text-text-muted`, `border-surface-dark`, etc.)
  - **Raw hex and `rgba()` values are FORBIDDEN inside component `className` or `style` attributes** — no exceptions
  - Use Tailwind's opacity modifier instead of manual rgba: `text-text-light/80`, `border-primary/30`
  - For complex filters (drop-shadow), define a named CSS utility class in `globals.css` that references the CSS variable
- **No inline `style={}` attributes** — all styling through Tailwind, except `fontFamily` referencing a CSS variable:
  ```tsx
  // ✅ only allowed style prop
  style={{ fontFamily: 'var(--font-headline)' }}
  ```
- **No arbitrary size values:** Never use bracket notation for pixel dimensions — use Tailwind's built-in scale instead.
  - This applies to **all** size-related utilities: `w-`, `h-`, `min-w-`, `max-w-`, `min-h-`, `max-h-`, `p-`, `px-`, `py-`, `pt-`, `pb-`, `pl-`, `pr-`, `m-`, `mx-`, `my-`, `mt-`, `mb-`, `ml-`, `mr-`, `gap-`, `space-x-`, `space-y-`, `text-`, `rounded-`, `border-`, `top-`, `right-`, `bottom-`, `left-`, `translate-`, etc.
  - ❌ `w-[200px]`, `h-[48px]`, `p-[12px]`, `gap-[24px]`, `text-[14px]`
  - ✅ `w-50`, `h-12`, `p-3`, `gap-6`, `text-sm`
  - If no built-in step fits, extend the Tailwind config (`tailwind.config.ts`) with a named token — never use one-off brackets.
- **Responsive:** Mobile-first. Use `sm:` `md:` `lg:` prefixes. Desktop layouts start at `lg:`
- **Dark mode:** Use `dark:` prefix only — never hardcode dark colors without a `dark:` paired light version, unless the app only supports one mode (check `.stitch/DESIGN.md`)

### Content Width Convention

The project uses **one** shared content-width utility — `content-container` (defined in `src/app/globals.css`):
```css
/* max-width: 1440px, padding: 2rem L/R, margin: auto */
.content-container { ... }
```
- **Always use `content-container`** as the inner wrapper for any full-width section — never invent a custom `max-w-*` wrapper.
- Do NOT create page-specific content-zone classes (e.g. `proj-content-zone`) — they duplicate this rule.
- `content-container` is already used by `Navbar`, `ContactSection`, and all editorial projects sections.

- **Utility for conditional classes:**

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 6. Data & State Patterns

### Mock Data
Place mock data in `src/data/{domain}.ts` — never hardcode inline inside components.

```ts
// src/data/dashboard.ts
import { IKPICard } from '@/types/dashboard'

export const mockKPICards: IKPICard[] = [
  {
    id: 'deploys',
    label: 'Deployments Today',
    value: 14,
    trend: { delta: 16.7, direction: 'up' },
  },
  // ...
]
```

### Local State
Use `useState` for ephemeral UI state (open/closed, selected tab, form input value).  
Do NOT use `useState` for data that needs to be shared or persisted — pass as props or use context.

### Server State
For now, import mock data directly. Leave a `// TODO: replace with fetch()` comment where real API calls will go.

---

## 7. Page Component Pattern

Pages are Server Components that compose feature components. They do not contain any JSX markup beyond layout shells.

```tsx
// src/app/(app)/dashboard/page.tsx
import { PageHeader } from '@/components/dashboard/PageHeader'
import { KPIGrid } from '@/components/dashboard/KPIGrid'
import { PullRequestTable } from '@/components/dashboard/PullRequestTable'
import { mockKPICards } from '@/data/dashboard'

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <PageHeader title="Dashboard" />
      <KPIGrid cards={mockKPICards} />
      <PullRequestTable />
    </main>
  )
}
```

---

## 8. File Deletion Rule

> **NEVER delete any file without explicit user confirmation.**

Before deleting any file, you MUST state all three of the following:

1. **Reason** — Why does this file need to be deleted? What specific problem does it solve?
2. **Risk if deleted** — What could break, be lost, or be affected if this file is removed? List concrete dependencies.
3. **Consequence if NOT deleted** — What happens if the file stays? Is it a compile error, a runtime bug, dead code, a security risk?

Only proceed with deletion after the user explicitly confirms ("yes", "go ahead", "confirmed", etc.). A general "do it" on the broader task is NOT sufficient confirmation for file deletion.

---

## 9. Forbidden Patterns

| ❌ Forbidden | ✅ Required instead |
|-------------|-------------------|
| `any` type | Explicit interface, `unknown` + type guard, or generic |
| `style={{ color: '#fff' }}` | Tailwind class or `cn()` |
| Raw hex `#hex` or `rgba()` in `className` | CSS variable token → Tailwind class (see `DESIGN.md` §7) |
| `className="text-[#C4954A]"` | `className="text-primary"` |
| `className="bg-[rgba(45,69,56,0.6)]"` | CSS utility class in `globals.css` (e.g. `.glass-form`) |
| Hardcoded string labels in JSX | Constant or prop |
| `useEffect` for data fetching | Server Component `async/await` |
| Deeply nested ternaries in JSX | Extract to a variable or sub-component |
| `export default` anonymous arrow functions | Named function with `export default` |
| `className="..."` exceeding 5 Tailwind classes inline | Extract to `cn()` with grouped logic |
| Component file > 300 lines | Split into sub-components |
| Arbitrary size brackets `w-[200px]`, `h-[48px]`, `p-[12px]` | Built-in Tailwind scale (`w-50`, `h-12`, `p-3`) or a named token in `tailwind.config.ts` |
| `import axios from 'axios'` directly in a component | Use shared `api` instance from `src/lib/api.ts` |
| `localStorage` in zustand persist | `sessionStorage` only |
| Custom icon SVGs | `lucide-react` icons |
| Inventing new imagery when a matching file exists in `public/` | Reuse the existing public asset via `next/image` |
| Deleting files without user confirmation | State reason + risk + consequence, then ask |
