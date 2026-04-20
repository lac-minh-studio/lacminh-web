'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

import { BlogCard } from './BlogCard'
import type { IBlogPost } from '@/types/blogs'

interface BlogSwiperProps {
  posts: IBlogPost[]
}

export function BlogSwiper({ posts }: BlogSwiperProps) {
  return (
    <section className="w-full space-y-4 mb-4">
      <div className="flex items-center">
        <h2
          className="text-xl font-bold text-text-dark flex items-center gap-2"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          <span className="w-1.5 h-5 bg-primary rounded-full shrink-0" aria-hidden="true" />
          BÀI VIẾT MỚI NHẤT
        </h2>
      </div>
      <Swiper
        modules={[FreeMode]}
        freeMode
        grabCursor
        slidesPerView="auto"
        spaceBetween={14}
        className="p-3 h-90 md:h-112 rounded-2xl"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="w-72! md:w-80!">
            <BlogCard post={post} variant="full" isShadow={false}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
