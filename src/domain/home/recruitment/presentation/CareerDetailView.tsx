import type {
  IJobCardView,
  IJobDetailView,
} from '@/domain/home/recruitment/application'
import { JOB_POSITIONS } from '@/domain/home/recruitment/application'
import { CareerDetailApplySection } from './CareerDetailApplySection'
import { CareerDetailHero } from './CareerDetailHero'
import { CareerDetailBody } from './CareerDetailBody'
import { CareerDetailRelatedSection } from './CareerDetailRelatedSection'

interface CareerDetailViewProps {
  job: IJobDetailView
  relatedJobs: IJobCardView[]
}

export function CareerDetailView({
  job,
  relatedJobs,
}: CareerDetailViewProps) {
  const positionOptions = JOB_POSITIONS.map((position) => position.title)

  return (
    <main className="pt-22 lg:pt-26">
      <CareerDetailHero job={job} />
      <CareerDetailBody job={job} summary={job.summary} />
      <CareerDetailApplySection
        activeJobTitle={job.title}
        positionOptions={positionOptions}
      />
      <CareerDetailRelatedSection jobs={relatedJobs} />
    </main>
  )
}
