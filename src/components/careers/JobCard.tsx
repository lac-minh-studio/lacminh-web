import Link from 'next/link'
import { ArrowRight, Ellipsis } from 'lucide-react'
import type { IJobPosition } from '@/types/careers'

const DEPARTMENT_BADGE: Record<IJobPosition['department'], string> = {
  Web: 'bg-primary/15 text-primary border border-primary/30',
  Game: 'bg-success/15 text-success border border-success/30',
  Business: 'bg-secondary/15 text-secondary border border-secondary/30',
}

interface JobCardProps {
  job: IJobPosition
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div
      className="glass-card rounded-2xl p-7 flex flex-col gap-5 h-full"
      style={{ boxShadow: 'var(--shadow-neu-light)' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-2xs font-bold uppercase tracking-[0.25em] text-primary/70">
            INTERN
          </span>
          <h3
            className="text-lg font-semibold text-text-dark leading-snug"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {job.title}
          </h3>
        </div>
        <span className={`shrink-0 text-2xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${DEPARTMENT_BADGE[job.department]}`}>
          {job.department}
        </span>
      </div>

      {/* Description */}
      <p className="text-tiny text-text-secondary leading-relaxed flex-1">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="value-pill text-2xs font-medium text-text-secondary px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={job.linkHref}
        className="flex items-center gap-2 text-tiny font-semibold text-primary hover:text-secondary transition-colors group mt-1"
      >
        Xem thêm
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  )
}

export function JobNewCard() {
  return (
    <div
      className="glass-card rounded-2xl border-dotted! border-4! border-primary! p-7 flex flex-col justify-center items-center h-full opacity-80"
    >
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        <Ellipsis size={30} className='text-primary'/>
        <h3
              className="text-xl font-semibold text-text-dark leading-snug"
              style={{ fontFamily: 'var(--font-headline)' }}
              >
              Sắp mở thêm vị trí...
            </h3>
        <p className="text-tiny text-text-secondary leading-relaxed">
          Chúng tôi luôn tìm kiếm những tài năng cùng đam mê
        </p>
      </div>
      <Link
        href="/contact"
        className="flex items-center gap-2 text-tiny font-semibold text-primary hover:text-secondary transition-colors group mt-1"
      >
        Liên hệ ngay
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  )
}
