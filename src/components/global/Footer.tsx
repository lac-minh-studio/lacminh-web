import { Globe, Video, Share2 } from 'lucide-react'
import { FOOTER_SECTIONS } from '@/data/home'

const SOCIAL_LINKS = [
  { icon: Globe, label: 'Website' },
  { icon: Video, label: 'YouTube' },
  { icon: Share2, label: 'Social' },
]

export function Footer() {
  return (
    <footer className="bg-deep-moss pt-12">
      <div className="content-container grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 pr-6">
          <div
            className="text-3xl text-text-light font-bold mb-6 italic"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Lạc Minh Studio
          </div>
          <p className="text-tiny text-text-light/50 leading-relaxed">
            Đơn vị tiên phong trong việc kết hợp văn hóa truyền thống Việt Nam
            với công nghệ game hiện đại.
          </p>
        </div>

        {/* Link sections */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.heading}>
            <h4 className="text-primary font-bold text-2xs uppercase tracking-[0.2em] mb-6">
              {section.heading}
            </h4>
            <ul className="space-y-3 text-tiny">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-light/80 hover:text-primary text-tiny transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social */}
        <div>
          <h4 className="text-primary font-bold text-2xs uppercase tracking-[0.2em] mb-6">
            Theo dõi
          </h4>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 min-w-10 rounded-lg flex items-center justify-center text-text-light border border-primary/20 bg-white/5 hover:bg-primary transition-all"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="content-container mt-8 py-6 border-t border-white/5 text-center">
        <p className="text-xs text-text-muted tracking-wide opacity-80">
          © 2026 Lạc Minh Studio đồng hành cùng <a target='_blank' href="https://thuandiep.dev/">Thuan Diep Corp</a>
        </p>
      </div>
    </footer>
  )
}
