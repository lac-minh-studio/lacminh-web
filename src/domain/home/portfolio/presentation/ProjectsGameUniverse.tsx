import { GameRow } from './GameRow'
import { GAME_PROJECT_ROWS } from '@/domain/home/portfolio/application'

export function ProjectsGameUniverse() {
  return (
    <section
      id="game-universe"
      className="w-full bg-surface-dark clip-diagonal-top"
    >
      <div className="content-container py-24">
        {/* Section header */}
        <div className="mb-16">
          <span className="proj-section-label block mb-4">VŨ TRỤ GAME</span>
          <h2
            className="text-text-light text-proj-h2 leading-snug"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Ba thế giới — một huyền sử
          </h2>
        </div>

        {/* Game rows with dividers */}
        <div className="flex flex-col gap-6">
          {GAME_PROJECT_ROWS.map(({ game, reversed }, index) => (
            <div key={game.id}>
              <GameRow game={game} reversed={reversed} />
              {index < GAME_PROJECT_ROWS.length - 1 && (
                <div className="h-px bg-primary/15 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
