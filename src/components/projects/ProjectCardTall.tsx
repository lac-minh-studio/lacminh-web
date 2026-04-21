import Image from 'next/image'
import type { IProjectCardTall } from '@/types/projects'
import { cn } from '@/lib/utils'

interface ProjectCardTallProps {
  card: IProjectCardTall
  className?: string
}

export function ProjectCardTall({ card, className }: ProjectCardTallProps) {
  return (
    <article
      className={cn(
        'relative w-full overflow-hidden rounded-xl shadow-neu-light',
        'group transition-all duration-500 hover:shadow-bronze-glow',
        className
      )}
    >
      {/* Locked asset: /cultivation.jpg — exact file swapped here in Next.js */}
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 30vw"
      />

      {/* Warm amber-brown tint overlay */}
      <div className="project-card-tall-tint absolute inset-0" />

      {/* Bottom info panel */}
      <div className="project-card-panel absolute bottom-0 left-0 w-full p-6 z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {card.tags.map((tag) => (
            <span
              key={tag.label}
              className="glass-card px-3 py-0.5 rounded-full text-text-light text-2xs tracking-widest border-primary/60 shadow-bronze-glow/20"
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h2
          className="text-3xl font-bold text-text-light leading-tight mb-2"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {card.title}
        </h2>
        <div className="flex gap-4 text-text-light/70 font-label text-xs">
          <span>{card.productionStage}</span>
          <span>{card.engine}</span>
        </div>
      </div>
    </article>
  )
}
