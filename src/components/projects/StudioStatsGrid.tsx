import type { IStatItem } from '@/types/global'

interface StudioStatsGridProps {
  stats: IStatItem[]
}

export function StudioStatsGrid({ stats }: StudioStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.value + stat.label}
          className="proj-neumorphic-card p-8 rounded-lg flex flex-col items-center justify-center text-center"
        >
          <span
            className="text-gold text-proj-stat leading-none mb-2 block"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {stat.value}
          </span>
          <span className="text-text-dark text-xs uppercase tracking-wider opacity-80 font-body">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
