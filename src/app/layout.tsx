import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import { Footer, Navbar } from '@/components/global'

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lạc Minh Studio — Huyền Sử Việt Nam',
  description:
    'Lạc Minh Studio kiến tạo những trải nghiệm văn hóa huyền thoại thông qua công nghệ hiện đại.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-theme="light" className={`${ebGaramond.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
