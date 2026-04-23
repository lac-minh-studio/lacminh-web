import { HeroSection } from '@/components/global'
import { StudioVision, JobListings } from '@/components/careers'
import { CAREER_STATS } from '@/data/careers'

export default function CareersPage() {
  return (
    <main>
      <HeroSection
        title={
          <>
            Gia Nhập Huyền Sử
            <br />
            Thức tỉnh Lạc Hồng
          </>
        }
        subtitle="Bạn đam mê văn hóa Việt Nam và muốn tạo nên những trải nghiệm số có ý nghĩa? Cùng Lạc Minh Studio viết nên những trang huyền sử mới."
        primaryCTA={{ label: 'Xem vị trí tuyển dụng', href: '#job-listings' }}
        secondaryCTA={{ label: 'Liên hệ trực tiếp', href: '/contact' }}
        scrollLabel="Khám phá"
        stats={CAREER_STATS}
      />
      <StudioVision />
      <JobListings />
    </main>
  )
}
