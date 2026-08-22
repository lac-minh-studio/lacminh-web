import type {
  IMilestone,
  IStatItem,
  ITimelineMilestone,
  IValuePillar,
} from '../../model/studio'

export const HERO_STATS: IStatItem[] = [
  { value: '5+', label: 'Năm kinh nghiệm' },
  { value: '3', label: 'Dự án lớn' },
  { value: '12', label: 'Đối tác' },
  { value: '18', label: 'Thành viên' },
]

export const SEPARATOR_STATS: IStatItem[] = [
  { value: 'Thành lập 2026', label: '' },
  { value: '3 tựa game', label: '' },
  { value: '18 nhân sự', label: '' },
  { value: 'Seed Round 2026', label: '' },
]

export const VALUE_PILLARS: IValuePillar[] = [
  {
    id: 'sang-tao',
    title: 'Sáng Tạo Không Ngừng',
    description:
      'Chúng tôi tin rằng mỗi ý tưởng đều có thể trở thành một tác phẩm vĩ đại nếu được nuôi dưỡng đúng cách.',
    icon: 'Sparkles',
  },
  {
    id: 'tien-phong',
    title: 'Tiên Phong Việt Hóa',
    description:
      'Sứ mệnh đưa huyền sử, văn hóa và tâm hồn Việt Nam lên bản đồ game thế giới.',
    icon: 'Globe',
  },
  {
    id: 'ben-bi',
    title: 'Bền Bỉ Vì Đam Mê',
    description:
      'Mỗi thành viên là một người kể chuyện — kiên nhẫn, tận tụy, và cháy hết mình vì dự án.',
    icon: 'Flame',
  },
]

type CompanyTimelineEntry = {
  id: string
  year: string
  title: string
  timelineLabel: string
  state: IMilestone['state']
}

export const COMPANY_TIMELINE: CompanyTimelineEntry[] = [
  {
    id: 'founding',
    year: 'Jan 2026',
    title: 'Thành Lập Studio',
    timelineLabel: 'Thành Lập',
    state: 'completed',
  },
  {
    id: '3games',
    year: 'Apr 2026',
    title: 'Ra Mắt 3 Game',
    timelineLabel: '3 Game',
    state: 'completed',
  },
  {
    id: 'sen-city-launch',
    year: 'Q3 2026',
    title: 'SEN CITY Ra Mắt',
    timelineLabel: 'SEN CITY',
    state: 'active',
  },
  {
    id: 'shadow-bastion',
    year: 'Q4 2026',
    title: 'Shadow Bastion',
    timelineLabel: 'Shadow Bastion',
    state: 'future',
  },
  {
    id: 'khe-uoc',
    year: '2028+',
    title: 'Khế Ước Lạc Hồng',
    timelineLabel: 'Khế Ước',
    state: 'future',
  },
]

const timelineStatusMap: Record<IMilestone['state'], ITimelineMilestone['status']> = {
  active: 'active',
  completed: 'done',
  future: 'pending',
}

export const MILESTONES: IMilestone[] = COMPANY_TIMELINE.map((milestone) => ({
  id: milestone.id,
  year: milestone.year,
  title: milestone.title,
  state: milestone.state,
}))

export const STUDIO_STATS: IStatItem[] = [
  { value: '18', label: 'Thành viên' },
  { value: '6', label: 'Cốt lõi' },
  { value: '3', label: 'Game' },
  { value: '2026', label: 'Năm thành lập' },
]

export const TIMELINE_MILESTONES: ITimelineMilestone[] = COMPANY_TIMELINE.map(
  (milestone) => ({
    id: milestone.id,
    label: milestone.timelineLabel,
    date: milestone.year,
    status: timelineStatusMap[milestone.state],
  })
)
