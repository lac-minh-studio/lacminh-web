import Image from 'next/image'
import type { IProjectCardHero } from '@/types/projects'
import { cn } from '@/lib/utils'

interface ProjectCardHeroProps {
  card: IProjectCardHero
  className?: string
}

export function ProjectCardHero({ card, className }: ProjectCardHeroProps) {
  return (
    <article
      className={cn(
        'relative w-full overflow-hidden rounded-xl shadow-neu-light',
        'group transition-all duration-500 hover:ring-2 hover:ring-primary/65',
        className
      )}
    >
      {/* Background image */}
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 70vw"
      />

      {/* Status badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-primary text-text-light font-label text-2xs uppercase px-3 py-1 rounded-full shadow-lg border border-white/20">
          {card.status}
        </span>
      </div>

      {/* Bottom info panel */}
      <div className="project-card-panel absolute bottom-0 left-0 w-full p-8 z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {card.tags.map((tag) => (
            <span
              key={tag.label}
              className="glass-card px-3 py-0.5 rounded-full text-text-light text-2xs tracking-widest"
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h2
          className="text-5xl font-bold text-text-light leading-none mb-1"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {card.title}
        </h2>
        <div className="flex gap-4 text-text-light/70 font-label text-xs mt-2">
          <span>{card.year} · Team: {card.meta}</span>
        </div>
      </div>
    </article>
  )
}
