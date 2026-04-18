import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppButton } from '@/components/hero-ui'

interface HeroCTA {
  label: string
  href: string
}

interface HeroStat {
  value: string
  label: string
}

interface HeroSectionProps {
  title: React.ReactNode
  subtitle: string
  primaryCTA: HeroCTA
  secondaryCTA: HeroCTA
  scrollLabel?: string
  stats: HeroStat[]
}

const GRID_CLASS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
}

function getStatBorders(count: number): string[] {
  if (count === 4) {
    return [
      'border-r border-primary/30',
      'md:border-r md:border-primary/30',
      'border-r border-primary/30',
      '',
    ]
  }
  return Array.from({ length: count }, (_, i) =>
    i < count - 1 ? 'border-r border-primary/30' : ''
  )
}

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  scrollLabel = 'Cuộn xuống',
  stats,
}: HeroSectionProps) {
  const borders = getStatBorders(stats.length)
  const gridClass = GRID_CLASS[stats.length] ?? 'grid-cols-4'

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Lạc Minh Studio — hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Vertical decorative text — desktop only */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 opacity-40 z-20 hidden xl:flex">
        <div className="w-px h-32 bg-text-light" />
        <span className="[writing-mode:vertical-rl] font-headline text-text-light tracking-[0.5em] text-lg uppercase font-bold">
          Huyền Sử Lạc Hồng
        </span>
        <div className="w-px h-32 bg-text-light" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full content-container text-center">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-hero text-text-light leading-tight mb-4 sm:mb-6 font-semibold"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {title}
        </h1>

        <p className="text-sm sm:text-md text-text-light/90 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <AppButton href={primaryCTA.href} className="px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-md w-full sm:w-auto">
            {primaryCTA.label}
          </AppButton>
          <AppButton variant="outline" href={secondaryCTA.href} className="px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-md w-full sm:w-auto">
            {secondaryCTA.label}
          </AppButton>
        </div>

        <div className="mt-6 sm:mt-10 text-text-light/60 flex flex-col items-center gap-2 animate-bounce cursor-default">
          <span className="text-xs font-bold tracking-widest uppercase">
            {scrollLabel}
          </span>
          <ChevronDown size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Stat strip */}
      <div className="absolute bottom-4 sm:bottom-10 left-0 w-full">
        <div className="content-container">
          <div className={cn('glass-stat-strip rounded-xl sm:rounded-2xl p-4 sm:p-8 grid gap-3 sm:gap-6 text-center', gridClass)}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={borders[i]}>
                <div
                  className="text-primary text-2xl sm:text-4xl font-bold leading-none mb-1 sm:mb-2"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {stat.value}
                </div>
                <div className="text-text-light text-[0.5rem] sm:text-2xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
