import { MapPin, Globe, Video, Mail, Share2 } from 'lucide-react'

const SOCIAL_ICONS = [
  { icon: Globe, label: 'Website' },
  { icon: Video, label: 'YouTube' },
  { icon: Share2, label: 'Social' },
  { icon: Mail, label: 'Email' },
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
        <div className="flex items-start gap-3 text-text-light/70 text-sm leading-relaxed">
          <MapPin
            size={18}
            strokeWidth={1.5}
            className="text-primary mt-0.5 shrink-0"
          />
          <span>18 Nam Kỳ Khởi Nghĩa, Q1, TP. HCM</span>
        </div>
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
          {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="w-10 h-10 rounded-xl bg-white/5 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all cursor-pointer"
            >
              <Icon size={18} strokeWidth={1.5} className="text-primary" />
            </div>
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
