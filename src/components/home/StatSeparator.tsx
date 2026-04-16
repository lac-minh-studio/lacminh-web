import { SEPARATOR_STATS } from '@/data/home'

export function StatSeparator() {
  return (
    <div className="w-full h-16 bg-surface-dark flex items-center">
      <div className="content-container grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 text-center">
        {SEPARATOR_STATS.map((item) => (
          <div
            key={item.value}
            className="text-text-light text-xs font-bold tracking-widest uppercase opacity-80 py-2"
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}
