export type Department = 'Web' | 'Game' | 'Business'

export interface IJobMetaItem {
  label: string
  value: string
}

export interface IJobPosition {
  id: string
  slug: string
  title: string
  department: Department
  description: string
  skills: string[]
  level: 'intern'
  location: string
  workType: string
  intro: string
  responsibilities: string[]
  requirements: string[]
  hiringProcess: string[]
  summary: IJobMetaItem[]
  linkHref: string
}

export interface IValuePillar {
  id: string
  title: string
  description: string
  icon: string
}

// ICareerStat removed — use IStatItem from @/types/global instead.
