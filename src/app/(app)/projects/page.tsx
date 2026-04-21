import {
  ProjectsMiniHero,
  ProjectsBentoGrid,
  OrnamentalDivider,
  ProjectsCTAStrip,
  ManifestoSection,
} from '@/components/projects'
import { ContactSection } from '@/components/global'

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsMiniHero />
      <ProjectsBentoGrid />
      <div className="projects-section">
        <div className="projects-inner py-8">
          <OrnamentalDivider />
        </div>
      </div>
      <ProjectsCTAStrip />
      <ManifestoSection />
      <ContactSection />
    </main>
  )
}
