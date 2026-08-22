import type { IJobPosition, IStatItem } from '../model/recruitment'
import {
  CAREER_STATS as STATIC_CAREER_STATS,
  JOB_POSITIONS as STATIC_JOB_POSITIONS,
} from '../infrastructure/static/recruitment'

export interface IJobSummaryItem {
  label: string
  value: string
}

export type IJobCardView = IJobPosition & {
  linkHref: string
}

export type IJobDetailView = IJobPosition & {
  summary: IJobSummaryItem[]
}

const JOB_SUMMARY_BY_ID: Record<string, IJobSummaryItem[]> = {
  'unity-gameplay-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Full time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
  'game-artist-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Part time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/06/2026' },
  ],
  'ba-game-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Part time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
  'frontend-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Part time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
  'backend-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Part time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
  'ba-web-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Hình thức', value: 'Part time' },
    { label: 'Hỗ trợ', value: 'Mộc thực tập' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
  'game-designer-intern': [
    { label: 'Địa điểm', value: 'Remote' },
    { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
    { label: 'Hạn nộp', value: '30/05/2026' },
  ],
}

export const CAREER_STATS: IStatItem[] = STATIC_CAREER_STATS
export const JOB_POSITIONS: IJobPosition[] = STATIC_JOB_POSITIONS

export function getJobLinkHref(job: Pick<IJobPosition, 'slug'>): string {
  return `/careers/${job.slug}`
}

function toJobCardView(job: IJobPosition): IJobCardView {
  return {
    ...job,
    linkHref: getJobLinkHref(job),
  }
}

function toJobDetailView(job: IJobPosition): IJobDetailView {
  return {
    ...job,
    summary: JOB_SUMMARY_BY_ID[job.id] ?? [],
  }
}

export const JOB_POSITION_CARDS: IJobCardView[] = STATIC_JOB_POSITIONS.map(toJobCardView)

export function getJobBySlug(slug: string): IJobDetailView | undefined {
  const job = STATIC_JOB_POSITIONS.find((position) => position.slug === slug)

  return job ? toJobDetailView(job) : undefined
}

export function getRelatedJobs(slug: string, limit = 4): IJobCardView[] {
  return STATIC_JOB_POSITIONS
    .filter((job) => job.slug !== slug)
    .slice(0, limit)
    .map(toJobCardView)
}
