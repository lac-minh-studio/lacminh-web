import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center pt-10">

      {/* ── Background layer ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Lạc Minh Studio background"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Dark overlay to neutralise the bright hero image */}
        <div className="absolute inset-0 hero-dark-overlay" />
      </div>

      {/* ── Trongdong watermark ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pt-10">
        <Image
          src="/trongdong.png"
          alt=""
          width={560}
          height={560}
          className="rounded-full opacity-15 select-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Bokeh orbs ── */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-primary/20 blur-3xl z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-secondary/15 blur-3xl z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary/15 blur-3xl z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-primary/10 blur-3xl z-10 pointer-events-none" />

      {/* ── Glassmorphic panel ── */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 sm:px-0">
        <div className="glass-panel-dark rounded-3xl px-10 sm:px-14 py-14 flex flex-col items-center text-center gap-0">

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Lạc Minh Studio"
            width={160}
            height={64}
            className="h-14 w-auto mb-8 object-contain"
          />

          {/* Error label */}
          <p
            className="text-2xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(196,149,74,0.92)' }}
          >
            404 · Lạc Lối
          </p>

          {/* Headline */}
          <h1
            className="text-4xl font-semibold leading-tight text-text-light mb-3"
            style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em' }}
          >
            Trang Đang Xây Dựng
          </h1>

          {/* Sub-headline */}
          <p
            className="text-body italic leading-relaxed mb-8"
            style={{ color: 'rgba(245,237,216,0.75)', fontFamily: 'var(--font-headline)' }}
          >
            Vùng đất này chưa được khai phá.<br />
            Hãy quay lại khi những áng mây tan biến...
          </p>

          {/* Gold divider */}
          <div
            className="w-20 h-px mb-8"
            style={{ background: 'rgba(196,149,74,0.35)' }}
            aria-hidden="true"
          />

          {/* Body copy */}
          <p
            className="text-md leading-relaxed max-w-md mb-10"
            style={{ color: 'rgba(245,237,216,0.80)' }}
          >
            Trang bạn tìm kiếm vẫn đang trong quá trình phát triển.
            Lạc Minh Studio đang chuẩn bị những nội dung thú vị sắp ra mắt.
          </p>

          {/* CTA button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary text-text-dark font-semibold text-md tracking-wide rounded-xl px-10 py-3.5 transition-colors hover:bg-secondary w-full sm:w-auto"
          >
            Quay về Trang Chủ
          </Link>

          {/* Secondary link */}
          <Link
            href="/projects"
            className="mt-4 text-tiny font-medium transition-colors hover:text-primary"
            style={{ color: 'rgba(196,149,74,0.78)' }}
          >
            Xem các dự án đang phát triển →
          </Link>
        </div>
      </div>
    </div>
  )
}
