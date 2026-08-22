import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export function ProjectsHero() {
  return (
    <section
      id="projects-hero"
      className="bg-surface-dark relative w-full h-proj-hero mt-20 flex items-center overflow-hidden"
    >
      {/* Watermark — Trống Đồng 8% opacity overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay">
        <Image
          src="/trongdong.png"
          alt=""
          fill
          quality={60}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          aria-hidden
        />
      </div>

      {/* Vignette radial gradient */}
      <div className="absolute inset-0 hero-overlay pointer-events-none z-0" />

      {/* Content zone */}
      <div className="relative z-10 content-container">
        <div className="max-w-3xl">
          <span className="proj-section-label block mb-4">DỰ ÁN</span>
          <h1
            className="text-text-light text-proj-h1 leading-none mb-6 tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Kho Tàng Tác Phẩm
          </h1>
          <p className="text-text-light/90 text-sm leading-relaxed max-w-2xl">
            Lạc Minh Studio kiến tạo những tựa game mang linh hồn huyền sử Việt Nam
            &mdash; nơi 4000 năm văn hiến Lạc Hồng trở thành sức mạnh cho thế hệ
            game thủ mới.
          </p>
        </div>
      </div>

      {/* Bottom ornamental strip (15% opacity bronze line) */}
      <div className="absolute bottom-3 left-0 w-full h-3 pointer-events-none z-0 bg-primary opacity-15" />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce z-10">
        <span className="text-primary text-2xs uppercase tracking-widest font-semibold font-body">
          Khám phá
        </span>
        <ArrowDown size={16} strokeWidth={1.5} className="text-primary" />
      </div>
    </section>
  )
}
