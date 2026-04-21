import { OrnamentalDivider } from './OrnamentalDivider'

export function ManifestoSection() {
  return (
    <section className="w-full bg-background projects-section py-20">
      <div className="projects-inner flex flex-col items-center gap-8">
        <p className="text-text-muted font-label text-xs tracking-widest uppercase">
          Triết lý sáng tạo
        </p>

        {/* Neumorphic card */}
        <div className="manifesto-card rounded-2xl bg-background w-full px-10 py-12 flex flex-col items-center gap-6">
          <OrnamentalDivider />

          <blockquote className="text-center">
            <p
              className="text-5xl md:text-6xl font-light italic text-text-dark leading-snug"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              &ldquo;Không chỉ xây sản phẩm — chúng tôi kiến tạo di sản.&rdquo;
            </p>
          </blockquote>

          <OrnamentalDivider />

          <p className="text-text-muted font-label text-xs tracking-widest text-center">
            Lạc Minh Studio
          </p>
        </div>

        <p className="text-text-secondary font-label text-tiny text-center max-w-xl">
          Mỗi dòng code, mỗi asset đều mang trong mình bản sắc của đội ngũ
          — một studio thuần Việt, kỹ thuật chuẩn xác, sáng tạo không giới hạn.
        </p>
      </div>
    </section>
  )
}
