import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function ProjectsMiniHero() {
  return (
    <section className="relative w-full h-mini-hero mt-20 overflow-hidden select-none">
      {/* Background asset */}
      <Image
        src="/hero_background.png"
        alt="Lạc Minh Studio — projects hero background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="hero-dark-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-2.5 text-center">
        <p className="text-primary font-label text-xs tracking-widest uppercase mb-4">
          Lạc Minh Studio · Projects
        </p>
        <h1
          className="text-hero md:text-display font-bold text-text-light leading-none mb-4"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          CÔNG TRÌNH
        </h1>
        <p className="text-text-light/70 font-label text-md max-w-sm">
          Từ kỹ thuật chính xác đến sức sáng tạo và tầm nhìn văn hóa
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className="text-text-light/40 animate-bounce"
        />
      </div>
    </section>
  )
}
