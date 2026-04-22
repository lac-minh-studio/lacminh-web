// ─── Editorial layout interfaces ──────────────────────────────────────────────

export interface IGameProject {
  id: string
  title: string
  /** Display string e.g. "MMORPG · Huyền Sử · UE5" */
  genreLabel: string
  statusLabel: string
  statusType: 'active' | 'pre-production' | 'pending'
  description: string
  /** undefined = castle placeholder rendered */
  imageSrc: string | undefined
  imageAlt: string
  /** Reverse text/image column order for Row B */
  reversed: boolean
}

export interface ITimelineMilestone {
  id: string
  label: string
  date: string
  /** pending = dashed dot */
  status: 'done' | 'active' | 'pending'
}

// IStudioStat removed — use IStatItem from @/types/global instead.

export interface ICommercialProject {
  id: string
  iconName: 'shopping_cart' | 'school' | 'layout'
  title: string
  description: string
  techPills: string[]
  metricValue: string
  metricLabel: string
}

