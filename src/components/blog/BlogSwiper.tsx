import { BlogCard } from './BlogCard'
import type { IBlogPost } from '@/types/blogs'

interface BlogSwiperProps {
  posts: IBlogPost[]
}

export function BlogSwiper({ posts }: BlogSwiperProps) {
  return (
    <section className="w-full space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-bold text-text-dark flex items-center gap-2"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          <span className="w-1.5 h-5 bg-primary rounded-full shrink-0" aria-hidden="true" />
          BÀI VIẾT MỚI NHẤT
        </h2>
        <a
          href="#"
          className="text-tiny text-primary font-bold hover:underline shrink-0"
        >
          Xem tất cả {'>>'}
        </a>
      </div>

      {/* Horizontal scroll strip — 4.75 items visible on desktop, ~2.5 on mobile */}
      <div className="flex gap-3.5 overflow-x-auto scrollbar-hide h-100 pb-3 pt-1">
        {posts.map((post) => (
            <BlogCard post={post} key={post.id} variant="full" className='flex-[0_0_22%]'/>
        ))}
      </div>
    </section>
  )
}
