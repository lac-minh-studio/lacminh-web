import Image from 'next/image'
import type { ComponentType } from 'react'
import { BriefcaseBusiness, Clock3, MapPin, Sparkles } from 'lucide-react'
import type { IJobPosition } from '@/types/careers'

interface CareerDetailHeroProps {
  job: IJobPosition
}

function HeroMetaChip({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-2xs font-semibold uppercase tracking-wider text-text-light backdrop-blur-sm">
      <Icon size={14} strokeWidth={1.8} className="text-primary" />
      {label}
    </span>
  )
}

export function CareerDetailHero({ job }: CareerDetailHeroProps) {
  return (
    <section className="w-full bg-background pb-8">
      <div className="content-container">
        <div className="relative min-h-96 overflow-hidden rounded-3xl border border-primary/20 bg-surface-dark shadow-(--shadow-neu-dark) md:min-h-135">
          <Image
            src="/hero_background.png"
            alt="Lạc Minh Studio tuyển dụng"
            fill
            quality={75}
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover opacity-35"
          />
          <div className="hero-overlay absolute inset-0" />
          <Image
            src="/trongdong.png"
            alt="Trang trí trống đồng"
            width={420}
            height={420}
            className="pointer-events-none absolute -left-12 -top-14 w-56 opacity-15 rounded-full grayscale"
          />
          <Image
            src="/trongdong.png"
            alt="Trang trí trống đồng"
            width={520}
            height={520}
            className="pointer-events-none absolute -bottom-24 -right-14 w-72 opacity-15 rounded-full grayscale"
          />

          <div className="relative z-10 flex h-full items-end px-5 pb-8 pt-12 md:px-12 md:pb-12">
            <div className="max-w-5xl">
              <nav className="mb-6 flex items-center gap-2 text-2xs font-semibold uppercase tracking-widest text-text-light/80">
                <span>Nghề nghiệp</span>
                <span>/</span>
                <span className="text-primary">Chi tiết vị trí</span>
              </nav>

              <p className="mb-5 text-2xs font-bold uppercase tracking-[0.35em] text-primary">
                Tuyển dụng Lạc Minh Studio
              </p>

              <h1
                className="text-4xl md:text-7xl text-text-light font-semibold leading-tight"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {job.title}
              </h1>

              <div className="mt-7 flex flex-wrap gap-3">
                <HeroMetaChip icon={BriefcaseBusiness} label={job.department} />
                <HeroMetaChip icon={Sparkles} label={job.level.toUpperCase()} />
                <HeroMetaChip icon={Clock3} label={job.workType} />
                <HeroMetaChip icon={MapPin} label={job.location} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
