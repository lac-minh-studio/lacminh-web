import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CareerDetailView } from '@/components/careers-detail'
import { JOB_POSITIONS, getJobBySlug, getRelatedJobs } from '@/data/careers'

interface CareerDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return JOB_POSITIONS.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({
  params,
}: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    return {
      title: 'Vị trí tuyển dụng không tồn tại — Lạc Minh Studio',
    }
  }

  return {
    title: `${job.title} — Lạc Minh Studio`,
    description: job.description,
  }
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = getRelatedJobs(job.slug, 4)

  return (
    <CareerDetailView
      job={job}
      relatedJobs={relatedJobs}
    />
  )
}
