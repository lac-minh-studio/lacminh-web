import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE, ADDRESS, ADDRESS_LINK } from '@/const'

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email liên hệ', value: CONTACT_EMAIL },
  { icon: Phone, label: 'Điện thoại', value: CONTACT_PHONE },
  { icon: MapPin, label: 'Trụ sở', value: ADDRESS },
]

export function ContactInfo() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h2
          className="text-heading-md text-text-light font-semibold leading-tight"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Cùng Lạc Minh
          <br />
          Kiến Tạo Tương Lai
        </h2>
        <p className="text-text-light/70 text-body leading-relaxed">
          Chúng tôi đang tìm kiếm những đối tác chiến lược có chung tầm nhìn
          đưa giá trị Việt ra thế giới thông qua những sản phẩm giải trí chất
          lượng cao.
        </p>
      </div>

      <div className="space-y-8">
        {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-all shrink-0">
              <Icon size={22} strokeWidth={1.5} className="text-primary" />
            </div>
            <div>
              <div className="text-text-light/50 text-2xs uppercase font-bold tracking-widest mb-1">
                {label}
              </div>
              {label === 'Trụ sở' && ADDRESS_LINK ? (
                <a
                  href={ADDRESS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light font-medium text-lg hover:text-primary transition-colors"
                >
                  {value}
                </a>
              ) : label === 'Email liên hệ' && value ? (
                <a
                  href={`mailto:${value}`}
                  className="text-text-light font-medium text-lg hover:text-primary transition-colors"
                >
                  {value}
                </a>
              ) : (
                <div className="text-text-light font-medium text-lg">{value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
