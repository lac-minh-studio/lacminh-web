import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Lạc Minh Studio',
  description:
    'Khám phá những câu chuyện, nghiên cứu và góc nhìn về văn hóa, lịch sử Việt Nam từ đội ngũ Lạc Minh Studio.',
  openGraph: {
    title: 'Blog — Lạc Minh Studio',
    description:
      'Khám phá những câu chuyện, nghiên cứu và góc nhìn về văn hóa, lịch sử Việt Nam từ đội ngũ Lạc Minh Studio.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
