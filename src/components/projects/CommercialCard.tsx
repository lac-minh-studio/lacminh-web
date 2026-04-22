import { ShoppingCart, GraduationCap, LayoutTemplate } from 'lucide-react'
import type { ICommercialProject } from '@/types/projects'

const ICON_MAP = {
  shopping_cart: ShoppingCart,
  school: GraduationCap,
  layout: LayoutTemplate,
} as const

interface CommercialCardProps {
  project: ICommercialProject
}

export function CommercialCard({ project }: CommercialCardProps) {
  const Icon = ICON_MAP[project.iconName]

  return (
    <article className="proj-neumorphic-card rounded-xl p-8 flex flex-col gap-6">
      {/* Icon + title */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-primary/20">
          <Icon size={22} strokeWidth={1.5} className="text-primary" />
        </div>
        <h3
          className="text-text-dark text-proj-card-h3 leading-snug"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {project.techPills.map((pill) => (
          <span
            key={pill}
            className="font-body text-2xs uppercase tracking-widest text-text-secondary border border-primary/30 px-3 py-1 rounded-full"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Metric */}
      <div className="mt-auto pt-4 border-t border-primary/20">
        <p
          className="text-gold text-proj-metric leading-none block"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {project.metricValue}
        </p>
        <p className="font-body text-tiny text-text-muted uppercase tracking-wider mt-1 block">
          {project.metricLabel}
        </p>
      </div>
    </article>
  )
}
