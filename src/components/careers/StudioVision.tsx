import Image from 'next/image'
import { Sparkles, Globe, Flame } from 'lucide-react'
import { VALUE_PILLARS } from '@/data/careers'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Sparkles,
  Globe,
  Flame,
}

export function StudioVision() {
  return (
    <section className="py-24 bg-background">
      <div className="content-container">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-2xs font-bold uppercase tracking-[0.3em] text-primary">
            Tầm Nhìn
          </span>
          <h2
            className="text-4xl md:text-heading-md text-text-dark mt-3 font-semibold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Vì Sao Chọn Lạc Minh?
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: value pillars */}
          <div className="flex flex-col gap-8">
            <p className="text-body text-text-secondary leading-relaxed">
              Lạc Minh Studio là nơi những người trẻ Việt Nam xây dựng di sản số —
              nơi huyền sử nghìn năm gặp gỡ công nghệ tiên tiến để tạo ra những
              trải nghiệm có chiều sâu và bản sắc.
            </p>

            <div className="flex flex-col gap-6">
              {VALUE_PILLARS.map((pillar) => {
                const Icon = ICON_MAP[pillar.icon]
                return (
                  <div
                    key={pillar.id}
                    className="glass-card rounded-2xl p-6 flex gap-5 items-start"
                    style={{ boxShadow: 'var(--shadow-neu-light)' }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                      {Icon && (
                        <Icon size={22} strokeWidth={1.5} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold text-text-dark mb-1"
                        style={{ fontFamily: 'var(--font-headline)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-tiny text-text-secondary leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Trống Đồng decorative image */}
          <div className="relative flex justify-center items-center">
            <div
              className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-hero-image)' }}
            >
              <Image
                src="/trongdong.png"
                alt="Trống đồng — biểu tượng văn hóa Lạc Việt"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 hero-overlay opacity-30" />
            </div>

            {/* Decorative bronze ring */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border-4 border-primary/20 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-primary/15 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
