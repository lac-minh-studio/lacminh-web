import { AppButton } from '@/components/hero-ui'

export function ProjectsCTAStrip() {
  return (
    <section className="w-full bg-surface-dark projects-section py-20">
      <div className="projects-inner flex flex-col items-center text-center gap-6">
        <p className="text-primary font-label text-xs tracking-widest uppercase">
          Lạc Minh Studio · Hợp tác
        </p>
        <h2
          className="text-3xl md:text-heading-md font-bold text-text-light leading-tight max-w-lg"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Sẵn sàng kiến tạo huyền thoại?
        </h2>
        <p className="text-text-light/60 font-label text-md max-w-md">
          Đưa ý tưởng của bạn vào thực thi cùng đội ngũ Lạc Minh Studio.
        </p>
        <AppButton href="#contact" className="px-10 py-4 text-md">
          Liên hệ chúng tôi
        </AppButton>
      </div>
    </section>
  )
}
