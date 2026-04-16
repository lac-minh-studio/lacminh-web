export type Department = 'Web' | 'Game' | 'Business'

export interface IJobPosition {
  id: string
  title: string
  department: Department
  description: string
  skills: string[]
  level: 'intern'
  linkHref: string
}

export interface IValuePillar {
  id: string
  title: string
  description: string
  icon: string
}

export interface ICareerStat {
  value: string
  label: string
}
