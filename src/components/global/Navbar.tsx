import Image from 'next/image'
import NextLink from 'next/link'
import { NAV_LINKS } from '@/data/home'
import { cn } from '@/lib/utils'
import { AppButton } from '@/components/hero-ui'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-navbar h-20">
      <div className="content-container flex justify-between items-center h-full">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Lạc Minh Studio logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <span
            className="text-xl lg:text-2xl text-text-dark"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Lạc Minh Studio
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                link.active
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-text-dark hover:text-primary'
              )}
            >
              {link.label}
            </NextLink>
          ))}
        </div>

        <AppButton size="sm" className="px-6 py-2 text-sm">
          Kêu gọi đầu tư
        </AppButton>
      </div>
    </nav>
  )
}
