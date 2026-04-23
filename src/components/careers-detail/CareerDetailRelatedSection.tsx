import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { IJobPosition } from '@/types/careers'
import { JobCard } from '@/components/careers/JobCard'

interface CareerDetailRelatedSectionProps {
  jobs: IJobPosition[]
}

export function CareerDetailRelatedSection({ jobs }: CareerDetailRelatedSectionProps) {
  if (jobs.length === 0) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-24">
      <Image
        src="/void_map.png"
        alt="Hoa văn"
        width={440}
        height={440}
        className="pointer-events-none absolute -right-16 top-2 w-64 opacity-10"
      />
      <Image
        src="/void_map.png"
        alt="Hoa văn"
        width={520}
        height={520}
        className="pointer-events-none absolute -bottom-20 left-0 w-72 opacity-10"
      />

      <div className="content-container relative z-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-2xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Không gian mới
            </p>
            <h2
              className="text-heading-md md:text-5xl text-text-dark font-semibold"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Vị trí cũng đang mở
            </h2>
          </div>
          <Link
            href="/careers"
            className="hidden md:inline-flex items-center gap-2 text-2xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
          >
            Tất cả vị trí
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
