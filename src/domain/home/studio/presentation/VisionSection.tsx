import Image from 'next/image'
import { Chip } from '@heroui/react'

export function VisionSection() {
  return (
    <section
      id="vision"
      className="py-20 md:py-32 lg:py-40 bg-background shadow-(--shadow-neu-light)"
    >
      <div className="content-container grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
        {/* Trống Đồng image — locked asset slot */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-50 h-50 md:w-87.5 md:h-87.5 lg:w-112.5 lg:h-112.5 bg-surface/50 rounded-full blur-3xl" />
            <div className="relative z-10 glass-card p-4 rounded-3xl overflow-hidden shadow-2xl w-full max-w-120">
            <Image
              src="/trongdong.png"
              alt="Trống Đồng Đông Sơn — biểu tượng văn hóa Việt Nam"
              width={480}
              height={480}
              quality={65}
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2rem), 480px"
              className="w-full h-auto object-contain drop-shadow-hero-image rounded-2xl"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-6 sm:space-y-10">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              SỨ MỆNH CỦA CHÚNG TÔI
            </span>
            <div className="w-20 h-px bg-primary mt-4" />
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-text-dark leading-tight font-semibold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Từ Đất Thiêng Lạc Hồng,
            <br />
            Vươn Tầm Thế Giới
          </h2>

          <div className="space-y-8">
            <p className="text-text-secondary text-body leading-relaxed italic border-l-4 border-primary/40 pl-6">
              &ldquo;Lạc Minh Studio không chỉ làm game, chúng tôi kể lại những
              chương sử hào hùng của dân tộc bằng ngôn ngữ của tương lai.&rdquo;
            </p>
            <p className="text-text-secondary text-body leading-relaxed">
              Mỗi dự án tại Lạc Minh là một sự chắt lọc tinh hoa từ họa tiết
              Đông Sơn, từ truyền thuyết Lĩnh Nam đến những triết lý nhân sinh
              sâu sắc của người Việt cổ.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {[
              '🏛 4000+ năm huyền sử Việt Nam',
              '⚔ Fantasy RPG & Interactive Story',
              '🇻🇳 Proudly Made in Vietnam',
            ].map((tag) => (
              <Chip
                key={tag}
                variant="soft"
                className="value-pill h-auto text-tiny font-bold text-text-secondary"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
