import { PROJECT_HERO, PROJECT_TALL, PROJECTS_LITE } from '@/data/projects'
import { ProjectCardHero } from './ProjectCardHero'
import { ProjectCardTall } from './ProjectCardTall'
import { ProjectCardLite } from './ProjectCardLite'
import { ComingSoonStrip } from './ComingSoonStrip'

export function ProjectsBentoGrid() {
  return (
    <section className="w-full bg-background projects-section py-16">
      <div className="projects-inner flex flex-col gap-4">
        {/* 70 / 30 bento row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-bento-row">
          {/* LEFT column — 70% */}
          <div className="flex flex-col w-full lg:w-bento-left gap-4 h-full">
            {/* Sen-City hero card — top portion */}
            <ProjectCardHero
              card={PROJECT_HERO}
              className="flex-[1.23] min-h-48"
            />
            {/* Bottom row — 2 web project cards */}
            <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-48">
              {PROJECTS_LITE.map((card) => (
                <ProjectCardLite
                  key={card.id}
                  card={card}
                  className="flex-1 min-h-48"
                />
              ))}
            </div>
          </div>

          {/* RIGHT column — 30% (Khế ước tall portrait) */}
          <div className="w-full lg:w-bento-right h-80 lg:h-full">
            <ProjectCardTall
              card={PROJECT_TALL}
              className="h-full"
            />
          </div>
        </div>

        {/* Coming Soon strip — below the grid */}
        <ComingSoonStrip />
      </div>
    </section>
  )
}
