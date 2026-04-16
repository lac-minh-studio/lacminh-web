export interface IStatItem {
  value: string
  label: string
}

export interface IProject {
  id: string
  title: string
  description: string
  year: string
  platform: string
  imageSrc: string
  imageAlt: string
  featured?: boolean
}

export interface IMilestone {
  id: string
  year: string
  title: string
  state: 'completed' | 'active' | 'future'
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
