export interface IProjectTag {
  label: string
}

export interface IProjectCardHero {
  id: string
  title: string
  tags: IProjectTag[]
  imageSrc: string
  imageAlt: string
  status: string
  year: string
  meta: string
}

export interface IProjectCardTall {
  id: string
  title: string
  tags: IProjectTag[]
  imageSrc: string
  imageAlt: string
  productionStage: string
  engine: string
}

export interface IProjectCardLite {
  id: string
  title: string
  tags: IProjectTag[]
  year: string
  outcome: string
  iconName: 'storefront' | 'school'
}
