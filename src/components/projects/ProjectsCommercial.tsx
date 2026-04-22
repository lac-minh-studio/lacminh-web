import { CommercialCard } from './CommercialCard'
import { COMMERCIAL_PROJECTS } from '@/data/projects'

export function ProjectsCommercial() {
  return (
    <section
      id="commercial"
      className="w-full bg-background"
    >
      <div className="content-container py-24">
        {/* Section header */}
        <div className="mb-4">
          <span className="proj-section-label block mb-4">DỰ ÁN THƯƠNG MẠI</span>
          <h2
            className="text-text-dark text-proj-h2 leading-snug"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Giải pháp kỹ thuật số cho doanh nghiệp
          </h2>
        </div>

        {/* Bronze rule */}
        <div className="h-px bg-linear-to-r from-primary/60 via-primary/20 to-transparent mb-12" />

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMERCIAL_PROJECTS.map((project) => (
            <CommercialCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
