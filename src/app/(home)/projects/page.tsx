import {
  ContactSection,
  ProjectsHero,
  ProjectsStudioSection,
  ProjectsGameUniverse,
  TechPlatformStrip,
  ProjectsCommercial,
} from '@/domain/home/presentation'

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
