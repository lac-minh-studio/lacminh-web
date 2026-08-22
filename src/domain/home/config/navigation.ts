export interface INavLink {
  label: string
  href: string
  active?: boolean
}

export interface IFooterSection {
  heading: string
  links: { label: string; href: string }[]
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Tầm Nhìn', href: '/' },
  { label: 'Dự Án', href: '/projects' },
  { label: 'Tin tức', href: '/blog' },
  { label: 'Tuyển dụng', href: '/careers' },
  { label: 'Liên Hệ', href: '/contact' },
]

export const FOOTER_SECTIONS: IFooterSection[] = [
  {
    heading: 'Liên kết',
    links: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Dự án mới', href: '#' },
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Blog tin tức', href: '/blog' },
    ],
  },
  {
    heading: 'Pháp lý',
    links: [
      { label: 'Điều khoản sử dụng', href: '#' },
      { label: 'Chính sách bảo mật', href: '#' },
      { label: 'Quy định cộng đồng', href: '#' },
    ],
  },
]
