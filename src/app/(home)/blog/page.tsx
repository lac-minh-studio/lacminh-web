import {
  BlogCarousel,
  BlogGridSection,
  BlogSwiper,
} from '@/domain/home/editorial/presentation'
import {
  mockCarouselSlides,
  mockGridPosts,
  BLOG_FILTERS,
  BLOG_HERO_STATS,
} from '@/domain/home/editorial/application'
import { ContactSection } from '@/domain/home/partnership/presentation'
import { HeroSection } from '@/domain/home/ui'

export default function BlogPage() {
  return (
    <main>
      <HeroSection
        title={
          <>
            Huyền Sử Việt Nam
            <br />
            Qua Từng Trang Viết
          </>
        }
        subtitle="Những câu chuyện về văn hóa, lịch sử và nghệ thuật Việt Nam từ đội ngũ Lạc Minh Studio — nơi ký ức dân tộc được kể lại bằng ngôn ngữ của tương lai."
        primaryCTA={{ label: 'Đọc bài viết', href: '#featured' }}
        secondaryCTA={{ label: 'Khám phá chủ đề', href: '#grid' }}
        scrollLabel="Đọc ngay"
        stats={BLOG_HERO_STATS}
      />

      {/* Constrained content sections */}
      <div className="content-container py-7 flex flex-col gap-7">
        <BlogCarousel slides={mockCarouselSlides} />
        <BlogSwiper posts={mockGridPosts} />
        <BlogGridSection posts={mockGridPosts} filters={BLOG_FILTERS} />
      </div>

      {/* Full-bleed contact section */}
      <ContactSection />
    </main>
  )
}
