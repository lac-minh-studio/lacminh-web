import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Share2, Sparkles } from 'lucide-react'
import type { IJobPosition } from '@/types/careers'
import { SITE_URL } from '@/const'
import { AppButton } from '@/components/hero-ui'

interface CareerDetailBodyProps {
  job: IJobPosition
}

interface SectionHeadingProps {
  title: string
}

interface ProseParagraphsProps {
  content: string[]
}

function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <h2
      className="flex items-center gap-4 text-heading-sm text-text-dark font-semibold md:text-heading-md"
      style={{ fontFamily: 'var(--font-headline)' }}
    >
      <span className="h-9 w-1 rounded-full bg-primary/90" />
      {title}
    </h2>
  )
}

function ProseParagraphs({ content }: ProseParagraphsProps) {
  return (
    <div className="space-y-5 text-justify">
      {content.map((item) => (
        <p key={item} className="text-body text-text-secondary leading-relaxed">
          {item}
        </p>
      ))}
    </div>
  )
}

function BronzeDivider() {
  return <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
}

export function CareerDetailBody({ job }: CareerDetailBodyProps) {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-16">
      <Image
        src="/trongdong.png"
        alt="Trang trí"
        width={420}
        height={420}
        className="pointer-events-none absolute left-2 top-8 w-36 rounded-full opacity-5"
      />
      <Image
        src="/trongdong.png"
        alt="Trang trí"
        width={560}
        height={560}
        className="pointer-events-none absolute -bottom-16 -right-10 w-64 opacity-5"
      />

      <section className="content-container relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <aside className="order-1 space-y-6 lg:order-2 lg:sticky lg:top-20">
          <div className="glass-card rounded-3xl border border-primary/20 p-7 shadow-(--shadow-neu-light)">
            <h3
              className="mb-6 text-heading-sm text-text-dark font-semibold"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Tóm tắt vị trí
            </h3>

            <div className="space-y-4">
              {job.summary.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 border-b border-primary/15 pb-3"
                >
                  <span className="text-2xs font-bold uppercase tracking-widest text-text-muted">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-text-dark text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <AppButton
              isDisabled
              className="h-11.5 w-full"
              >
                Ứng tuyển ngay
                <ArrowRight size={16} strokeWidth={2} />
              </AppButton>
              <Link
                href="https://www.facebook.com/profile.php?id=61579501680356"
                target='_blank'
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
              >
                Liên hệ HR
                <Sparkles size={16} strokeWidth={2} />
              </Link>
            </div>

            <p className="mt-8 text-center text-2xs font-bold uppercase tracking-[0.25em] text-text-muted/70">
              Lạc Minh • Portal
            </p>
          </div>

          <div className="glass-card rounded-3xl border border-primary/20 p-6 shadow-(--shadow-neu-light)">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background">
                <Share2 size={16} strokeWidth={1.7} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-dark">Chia sẻ tin này</p>
                <p className="text-2xs text-text-muted">Giúp bạn bè tìm cơ hội mới</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/careers/${job.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-primary/15 bg-surface/40 px-3 py-2 text-2xs font-bold uppercase tracking-widest text-text-dark transition-colors hover:bg-primary/10 text-center"
              >
                Facebook
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/careers/${job.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-primary/15 bg-surface/40 px-3 py-2 text-2xs font-bold uppercase tracking-widest text-text-dark transition-colors hover:bg-primary/10 text-center"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </aside>

        <article className="order-2 rounded-3xl border border-primary/20 bg-background/70 p-6 shadow-(--shadow-neu-light) md:p-10 lg:order-1 lg:col-span-2 lg:p-12">
          <div className="space-y-10 md:space-y-12">
            <section className="space-y-5">
              <SectionHeading title="Giới thiệu" />
              <p className="text-body text-text-secondary leading-relaxed text-justify">
                {job.intro}
              </p>
            </section>

            <BronzeDivider />

            <section className="space-y-5">
              <SectionHeading title="Trách nhiệm công việc" />
              <ProseParagraphs content={job.responsibilities} />
            </section>

            <BronzeDivider />

            <section className="space-y-5">
              <SectionHeading title="Yêu cầu kỹ năng" />
              <ProseParagraphs content={job.requirements} />
            </section>

            <BronzeDivider />

            <section className="space-y-6">
              <SectionHeading title="Quy trình tuyển dụng" />
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {job.hiringProcess.map((step, index) => (
                  <li
                    key={step}
                    className="relative flex min-h-24 flex-col items-center justify-center rounded-2xl border border-primary/15 bg-surface/40 p-5 text-center"
                  >
                    <p className="mb-1 text-2xs font-bold uppercase tracking-widest text-primary">
                      Bước {index + 1}
                    </p>
                    <p className="text-body text-text-dark font-semibold">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </section>
    </section>
  )
}
