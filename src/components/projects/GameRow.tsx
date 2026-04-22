import Image from 'next/image'
import type { IGameProject } from '@/types/projects'
import { cn } from '@/lib/utils'

interface GameRowProps {
  game: IGameProject
}

export function GameRow({ game }: GameRowProps) {
  return (
    <div
      className={cn(
        'glass-card-dark rounded-xl overflow-hidden flex flex-col md:flex-row relative',
        game.reversed && 'md:flex-row-reverse',
      )}
    >
      {/* Bronze left-edge chapter bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary/80 to-transparent z-10 rounded-full" />

      {/* Text content — 60% width */}
      <div className="p-10 md:w-3/5 flex flex-col justify-center pl-12">
        {/* Tags row */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="font-body text-2xs text-text-light uppercase tracking-widest border border-primary/40 px-2 py-0.5 rounded-full">
            {game.genreLabel}
          </span>
          <span
            className={cn(
              'font-body text-2xs text-text-light uppercase tracking-widest border border-primary/40 px-2 py-0.5 rounded-full flex items-center gap-1.5',
            )}
          >
            {game.statusType === 'active' && (
              <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.8)]" />
            )}
            {game.statusLabel}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-proj-h3 text-text-light mb-6"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {game.title}
        </h3>

        {/* Description */}
        <p className="font-body text-text-light/90 text-sm leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Image slot — 40% width, first on mobile */}
      <div className="relative md:w-2/5 h-72 md:h-auto order-first md:order-0">
        {game.imageSrc ? (
          <Image
            src={game.imageSrc}
            alt={game.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          /* Castle placeholder for Shadow Bastion */
          <div className="w-full h-full bg-surface-dark/50 flex items-center justify-center border-l border-primary/30">
            <span
              className="text-text-muted text-8xl select-none"
              aria-hidden
            >
              🏯
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
