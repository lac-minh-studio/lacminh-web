import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import { Footer, Navbar } from '@/components/global'
const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['vietnamese'],
  weight: ['500', '600', '700'],
  display: 'optional',
  preload: false,
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['vietnamese'],
  weight: ['400', '500', '600'],
  display: 'optional',
  preload: false,
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
      <head>
        <meta name="google-site-verification" content="wsFe-SNqNCWEzU_ZZMwPrQKxR_Bg9bxnTyx8udmE1KA" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-KTZTHNJ5CN`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KTZTHNJ5CN', {
                page_path: window.location.pathname,
              });
            `,
          }}/>
      </head>
      <body>
        <SpeedInsights/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
