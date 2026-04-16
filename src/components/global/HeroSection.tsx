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
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full content-container text-center">
        <h1
          className="text-5xl md:text-6xl lg:text-hero text-text-light leading-tight mb-6 font-semibold"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {title}
        </h1>

        <p className="text-md text-text-light/90 max-w-2xl mx-auto mb-12 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <AppButton href={primaryCTA.href} className="px-10 py-5 text-md">
            {primaryCTA.label}
          </AppButton>
          <AppButton variant="outline" href={secondaryCTA.href} className="px-10 py-5 text-md">
            {secondaryCTA.label}
          </AppButton>
        </div>

        <div className="mt-10 text-text-light/60 flex flex-col items-center gap-2 animate-bounce cursor-default">
          <span className="text-xs font-bold tracking-widest uppercase">
            {scrollLabel}
          </span>
          <ChevronDown size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Stat strip */}
      <div className="absolute bottom-10 left-0 w-full">
        <div className="content-container">
          <div className={cn('glass-stat-strip rounded-2xl p-8 grid gap-6 text-center', gridClass)}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={borders[i]}>
                <div
                  className="text-primary text-4xl font-bold leading-none mb-2"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {stat.value}
                </div>
                <div className="text-text-light text-2xs font-medium uppercase tracking-[0.2em]">
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
