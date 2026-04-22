import type { IMilestone } from '@/types/home'
import type { IStatItem } from '@/types/global'

// NAV_LINKS and FOOTER_SECTIONS moved to @/data/global (used by global components)

export const HERO_STATS: IStatItem[] = [
  { value: '5+', label: 'Năm kinh nghiệm' },
  { value: '3', label: 'Dự án lớn' },
  { value: '12', label: 'Đối tác' },
  { value: '18', label: 'Thành viên' },
]

export const SEPARATOR_STATS: IStatItem[] = [
  { value: 'Thành lập 2024', label: '' },
  { value: '3 tựa game', label: '' },
  { value: '18 nhân sự', label: '' },
  { value: 'Seed Round 2026', label: '' },
]

// PROJECTS removed — ProjectsSection now uses GAME_PROJECTS from @/data/projects

export const MILESTONES: IMilestone[] = [
  { id: 'founding', year: 'Jan 2026', title: 'Thành Lập Studio', state: 'completed' },
  { id: '3games', year: 'Apr 2026', title: 'Ra Mắt 3 Game', state: 'completed' },
  { id: 'sen-city-launch', year: 'Q3 2026', title: 'SEN CITY Ra Mắt', state: 'active' },
  { id: 'shadow-bastion', year: 'Q4 2026', title: 'Shadow Bastion', state: 'future' },
  { id: 'khe-uoc', year: '2028+', title: 'Khế Ước Lạc Hồng', state: 'future' },
]

// FOOTER_SECTIONS moved to @/data/global
