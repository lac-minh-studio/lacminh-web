export interface IGameProject {
  id: string
  title: string
  genreLabel: string
  statusLabel: string
  statusType: 'active' | 'pre-production' | 'pending'
  description: string
  imageSrc: string | undefined
  imageAlt: string
}

export interface ICommercialProject {
  id: string
  iconName: 'shopping_cart' | 'school' | 'layout'
  title: string
  description: string
  techPills: string[]
  metricValue: string
  metricLabel: string
}
