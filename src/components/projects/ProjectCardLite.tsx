import { ShoppingBag, GraduationCap } from 'lucide-react'
import type { IProjectCardLite } from '@/types/projects'
import { cn } from '@/lib/utils'

const ICON_MAP = {
  storefront: ShoppingBag,
  school: GraduationCap,
} as const

interface ProjectCardLiteProps {
  card: IProjectCardLite
  className?: string
}

export function ProjectCardLite({ card, className }: ProjectCardLiteProps) {
  const Icon = ICON_MAP[card.iconName]

  return (
    <article
      className={cn(
        'relative w-full rounded-xl bg-background shadow-neu-light p-6',
        'flex flex-col justify-between border border-primary/10 overflow-hidden',
        'group hover:shadow-bronze-glow transition-all duration-300',
        className
      )}
    >
      {/* Decorative icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Icon size={64} strokeWidth={1} className="text-primary" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {card.tags.map((tag) => (
          <span
            key={tag.label}
            className="glass-card px-3 py-1 rounded-full text-text-dark text-2xs tracking-widest"
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4">
        <h2
          className="text-heading-sm text-text-dark leading-tight mb-2"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {card.title}
        </h2>
        <div className="w-12 h-px bg-primary rounded mb-2" />
        <div className="flex flex-col gap-1 text-text-muted font-label text-xs mb-4">
          <span>{card.year}</span>
          <span className="italic">Outcome: {card.outcome}</span>
        </div>
        <span className="text-primary text-tiny font-label flex items-center gap-1 group-hover:translate-x-2 transition-transform">
          Xem chi tiết →
        </span>
      </div>
    </article>
  )
}
