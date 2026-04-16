import { MapPin, Globe, Video, Mail, Share2 } from 'lucide-react'
import { ADDRESS, ADDRESS_LINK, CONTACT_EMAIL, FACEBOOK_LINK } from '@/const'

const SOCIAL_ICONS = [
  { icon: Globe, label: 'Website', href: '/' },
  { icon: Video, label: 'YouTube', href: '#' },
  { icon: Share2, label: 'Facebook', href: FACEBOOK_LINK },
  { icon: Mail, label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
]

export function CareerContactInfo() {
  return (
    <div className="space-y-10">
      {/* Office */}
      <div className="space-y-3">
        <h4
          className="text-heading-sm text-text-light font-semibold"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Văn phòng Lạc Minh
        </h4>
        <a
          href={ADDRESS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-text-light/70 text-sm leading-relaxed hover:text-primary transition-colors"
        >
          <MapPin
            size={18}
            strokeWidth={1.5}
            className="text-primary mt-0.5 shrink-0"
          />
          <span>{ADDRESS}</span>
        </a>
      </div>

      {/* Social */}
      <div className="space-y-4">
        <h4
          className="text-heading-sm text-text-light font-semibold"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Kết nối với chúng tôi
        </h4>
        <div className="flex gap-4">
          {SOCIAL_ICONS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-white/5 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all cursor-pointer"
            >
              <Icon size={18} strokeWidth={1.5} className="text-primary" />
            </a>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="glass-form rounded-2xl p-6 border border-primary/20">
        <p className="text-text-light/80 text-sm italic leading-relaxed">
          &ldquo;Huyền sử không nằm ở quá khứ, mà nằm ở cách chúng ta tái hiện
          lại trong tương lai.&rdquo;
        </p>
      </div>
    </div>
  )
}
