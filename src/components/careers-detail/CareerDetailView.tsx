import type { IJobPosition } from '@/types/careers'
import { CareerDetailHero } from './CareerDetailHero'
import { CareerDetailBody } from './CareerDetailBody'
import { CareerDetailRelatedSection } from './CareerDetailRelatedSection'

interface CareerDetailViewProps {
  job: IJobPosition
  relatedJobs: IJobPosition[]
}

export function CareerDetailView({
  job,
  relatedJobs,
}: CareerDetailViewProps) {
  return (
    <main className="pt-22 lg:pt-26">
      <CareerDetailHero job={job} />
      <CareerDetailBody job={job} />
      <CareerDetailRelatedSection jobs={relatedJobs} />
    </main>
  )
}
