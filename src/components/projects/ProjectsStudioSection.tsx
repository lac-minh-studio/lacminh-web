import { StudioStatsGrid } from './StudioStatsGrid'
import { DevelopmentTimeline } from './DevelopmentTimeline'
import { STUDIO_STATS, TIMELINE_MILESTONES } from '@/data/projects'

export function ProjectsStudioSection() {
  return (
    <section
      id="studio"
      className="w-full bg-background clip-diagonal-bottom"
    >
      <div className="content-container py-24">
        {/* Section label */}
        <span className="proj-section-label block mb-4">STUDIO</span>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left — text + bronze bar */}
          <div className="lg:w-2/5 relative pl-6">
            {/* Bronze left bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary to-transparent rounded-full" />

            <h2
              className="text-text-dark text-proj-h2 leading-snug mb-6"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Chúng tôi là một studio game độc lập Việt Nam với sứ mệnh đưa huyền sử dân tộc lên bản đồ thế giới.
            </h2>

            <p className="font-body text-sm text-text-secondary leading-relaxed">
              Lạc Minh Studio được thành lập năm 2026 bởi những người đam mê văn hóa Việt và công nghệ game. Chúng tôi tin rằng những câu chuyện về Lạc Long Quân, Âu Cơ, Thánh Gióng xứng đáng được kể với chất lượng AAA.
            </p>
          </div>

          {/* Right — stats + timeline */}
          <div className="w-full lg:w-3/5 flex flex-col gap-12">
            <StudioStatsGrid stats={STUDIO_STATS} />

            <div>
              <h3 className="font-body text-2xs uppercase tracking-widest text-primary font-semibold mb-8">
                Lộ trình phát triển
              </h3>
              <DevelopmentTimeline milestones={TIMELINE_MILESTONES} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
