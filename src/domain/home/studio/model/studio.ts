export interface IStatItem {
  value: string
  label: string
}

export interface IValuePillar {
  id: string
  title: string
  description: string
  icon: string
}

export interface IMilestone {
  id: string
  year: string
  title: string
  state: 'completed' | 'active' | 'future'
}

export interface ITimelineMilestone {
  id: string
  label: string
  date: string
  status: 'done' | 'active' | 'pending'
}
