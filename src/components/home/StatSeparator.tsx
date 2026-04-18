import { SEPARATOR_STATS } from '@/data/home'

export function StatSeparator() {
  return (
    <div className="w-full bg-surface-dark flex items-center py-4 md:py-0 md:h-16">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10 text-center gap-y-3 md:gap-y-0">
        {SEPARATOR_STATS.map((item) => (
          <div
            key={item.value}
            className="text-text-light text-xs font-bold tracking-widest uppercase opacity-80 md:whitespace-nowrap"
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}
