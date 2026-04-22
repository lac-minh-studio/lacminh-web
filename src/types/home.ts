// Home-page-specific types only.
// Shared types (IStatItem, INavLink, IFooterSection) live in @/types/global.

export interface IMilestone {
  id: string
  year: string
  title: string
  state: 'completed' | 'active' | 'future'
}
