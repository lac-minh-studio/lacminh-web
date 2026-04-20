'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { IBlogPost } from '@/types/blogs'
import { cn } from '@/lib/utils'

interface BlogCarouselProps {
  slides: IBlogPost[]
}

export function BlogCarousel({ slides }: BlogCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const slide = slides[activeIndex]

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length)
  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % slides.length)

  return (
    <section aria-label="Tin Nổi Bật" className="w-full">
      <article className="glass-card rounded-2xl overflow-hidden shadow-(--shadow-neu-light)">
        <div className="flex flex-col lg:flex-row">
          {/* Left: cover image — aspect-video on mobile, 4:3 on desktop */}
          <div className="relative aspect-video lg:aspect-4/3 w-full lg:w-3/5 overflow-hidden">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right: content — self-start so text is top-aligned on desktop */}
          <div className="lg:w-2/5 p-5 lg:p-6 flex flex-col gap-4 lg:self-start">
            {/* Category pill */}
            <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-2xs font-bold rounded-full border border-primary/20 uppercase tracking-widest w-fit">
              {slide.category}
            </span>

            {/* Title */}
            <h2
              className="text-heading-sm font-bold leading-tight text-text-dark"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {slide.title}
            </h2>

            {/* Excerpt */}
            {slide.excerpt && (
              <p className="text-tiny text-text-secondary line-clamp-3 leading-relaxed">
                {slide.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center justify-between text-2xs text-text-secondary">
              <span className="font-semibold">{slide.date}</span>
              {slide.readTime && <span>{slide.readTime}</span>}
            </div>

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-1 text-tiny text-primary font-bold hover:underline"
            >
              Đọc chi tiết
              <ChevronRight size={14} />
            </a>

            {/* Navigation row */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrev}
                aria-label="Bài trước"
                className="w-10 h-10 rounded-full bg-surface/50 shadow-(--shadow-neu-light) flex items-center justify-center text-primary transition-transform active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Chuyển đến bài ${i + 1}`}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      i === activeIndex ? 'bg-primary' : 'bg-primary/30',
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Bài tiếp theo"
                className="w-10 h-10 rounded-full bg-surface/50 shadow-(--shadow-neu-light) flex items-center justify-center text-primary transition-transform active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
