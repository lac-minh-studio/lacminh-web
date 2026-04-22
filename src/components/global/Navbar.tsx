'use client'

import { useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/global'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/'
    return href.startsWith('/') && pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-navbar">
      {/* Top bar */}
      <div className="content-container flex justify-between items-center h-16 lg:h-20">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Lạc Minh Studio logo"
            width={40}
            height={40}
            className="h-8 w-auto lg:h-10 object-contain"
            priority
          />
          <span
            className="text-lg lg:text-2xl text-text-dark"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Lạc Minh Studio
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary'
                  : 'text-text-dark hover:text-primary'
              )}
            >
              {link.label}
            </NextLink>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-text-dark hover:bg-primary/10 transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out glass-navbar border-t border-primary/20',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="content-container flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/10 font-bold'
                  : 'text-text-dark hover:bg-primary/5 hover:text-primary'
              )}
            >
              {link.label}
            </NextLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

