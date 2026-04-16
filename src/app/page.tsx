import { ContactSection, HeroSection } from '@/components/global'
import { VisionSection, StatSeparator, ProjectsSection, RoadmapSection } from '@/components/home'
import { HERO_STATS } from '@/data/home'

export default function HomePage() {
  return (
      <main>
        <HeroSection
          title={
            <>
              Huyền Sử Lạc Hồng,
              <br />
              Tái Sinh Trong Game
            </>
          }
          subtitle="Lạc Minh Studio kiến tạo những trải nghiệm văn hóa huyền thoại thông qua công nghệ hiện đại, mang hơi thở ngàn năm vào dòng chảy kỹ thuật số."
          primaryCTA={{ label: 'Khám phá dự án', href: '#projects' }}
          secondaryCTA={{ label: 'Xem lộ trình', href: '#roadmap' }}
          stats={HERO_STATS}
        />
        <VisionSection />
        <StatSeparator />
        <ProjectsSection />
        <RoadmapSection />
        <ContactSection />
      </main>
  )
}
