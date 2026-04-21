import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Công Trình — Lạc Minh Studio',
  description:
    'Danh mục dự án của Lạc Minh Studio: từ game open-world Sen-City và MMORPG Khế ước Lạc Hồng đến các giải pháp web thương mại hiệu quả cao.',
}

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
