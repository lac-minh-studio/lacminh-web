import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
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
        <meta name="google-site-verification" content="vAsFyLZZhpGD4O8qYJ8OQOAwPPbTdFAb5V74n0-eq-s" />
        <meta name="msvalidate.01" content="6509FBFAD944143EB4B947A82889A140" />
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
        <Analytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
