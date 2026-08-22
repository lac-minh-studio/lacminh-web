export type Department = 'Web' | 'Game' | 'Business'

export interface IStatItem {
  value: string
  label: string
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
}
