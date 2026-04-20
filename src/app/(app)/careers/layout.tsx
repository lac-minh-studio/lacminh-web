import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuyển Dụng — Lạc Minh Studio',
  description:
    'Gia nhập Lạc Minh Studio — nơi những người trẻ Việt Nam xây dựng huyền sử số. Xem các vị trí intern đang tuyển dụng.',
}

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
