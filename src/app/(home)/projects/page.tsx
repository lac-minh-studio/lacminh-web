import {
  ContactSection,
} from '@/domain/home/partnership/presentation'
import {
  ProjectsHero,
  ProjectsGameUniverse,
  ProjectsCommercial,
  TechPlatformStrip,
} from '@/domain/home/portfolio/presentation'
import { ProjectsStudioSection } from '@/domain/home/studio/presentation'

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsStudioSection />
      <ProjectsGameUniverse />
      <TechPlatformStrip />
      <ProjectsCommercial />
      <ContactSection />
    </main>
  )
}
