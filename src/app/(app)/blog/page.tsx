import { BlogCarousel, BlogSwiper, BlogGridSection } from '@/components/blog'
import { ContactSection, HeroSection } from '@/components/global'
import {
  mockCarouselSlides,
  mockGridPosts,
  BLOG_FILTERS,
  BLOG_HERO_STATS,
} from '@/data/blogs'

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

      {/* Constrained content sections — max-w-7xl (1280px) with 10px side padding */}
      <div className="max-w-350 mx-auto px-2.5 py-7 flex flex-col gap-7">
        <BlogCarousel slides={mockCarouselSlides} />
        <BlogSwiper posts={mockGridPosts} />
        <BlogGridSection posts={mockGridPosts} filters={BLOG_FILTERS} />
      </div>

      {/* Full-bleed contact section */}
      <ContactSection />
    </main>
  )
}
