import {
  ProjectsHero,
  ProjectsStudioSection,
  ProjectsGameUniverse,
  TechPlatformStrip,
  ProjectsCommercial,
} from '@/components/projects'
import { ContactSection } from '@/components/global'

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
