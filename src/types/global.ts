// ─── Shared types used across multiple pages ───────────────────────────────
// Import from this file for any type that is reused in more than one domain.

/** Generic stat display: a value + label pair. Shared across all pages. */
export interface IStatItem {
  value: string
  label: string
}

export interface INavLink {
  label: string
  href: string
  active?: boolean
}

export interface IFooterSection {
  heading: string
  links: { label: string; href: string }[]
}
