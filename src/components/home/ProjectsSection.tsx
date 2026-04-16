import { MoveRight } from 'lucide-react'
import { PROJECTS } from '@/data/home'
import { ProjectCard } from './ProjectCard'
import { AppButton } from '@/components/hero-ui'

export function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-20 lg:py-32 bg-surface relative overflow-hidden">
      <div className="content-container relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-16 lg:mb-20 space-y-4">
          <h2
            className="text-5xl text-text-dark font-semibold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Các Dự Án Tâm Huyết
          </h2>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Wide banner CTA */}
        <div className="mt-10 md:mt-20 p-6 md:p-10 bg-surface-dark rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/30">
          <div className="text-center md:text-left">
            <h4
              className="text-text-light text-3xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Khám phá toàn bộ vũ trụ Lạc Minh
            </h4>
            <p className="text-text-light/60 text-md">
              Hơn 10+ ý tưởng đang được ấp ủ từ chất liệu sử thi dân tộc.
            </p>
          </div>
          <AppButton isShadow={false} className="whitespace-nowrap px-10 py-4 flex items-center gap-3">
            Xem tất cả dự án <MoveRight size={18} strokeWidth={2} />
          </AppButton>
        </div>
      </div>
    </section>
  )
}
