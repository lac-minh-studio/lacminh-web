import type { IStatItem, IProject, IMilestone, INavLink, IFooterSection } from '@/types/home'

export const NAV_LINKS: INavLink[] = [
  { label: 'Tầm Nhìn', href: '/'},
  { label: 'Dự Án', href: '#projects'},
  { label: 'Lộ Trình', href: '#roadmap'},
  { label: 'Tuyển dụng', href: '/careers'},
  { label: 'Blog', href: '#blog' },
  { label: 'Liên Hệ', href: '#contact' },
]

export const HERO_STATS: IStatItem[] = [
  { value: '5+', label: 'Năm kinh nghiệm' },
  { value: '3', label: 'Dự án lớn' },
  { value: '12', label: 'Đối tác' },
  { value: '18', label: 'Thành viên' },
]

export const SEPARATOR_STATS: IStatItem[] = [
  { value: 'Thành lập 2024', label: '' },
  { value: '3 tựa game', label: '' },
  { value: '18 nhân sự', label: '' },
  { value: 'Seed Round 2026', label: '' },
]

export const PROJECTS: IProject[] = [
  {
    id: 'linh-nam-truyen-ky',
    title: 'Lĩnh Nam Truyền Kỳ',
    description:
      'Game nhập vai thế giới mở dựa trên các truyền thuyết kỳ bí thời Hùng Vương.',
    year: '2025',
    platform: 'PC / Console',
    imageSrc: '/cultivation.jpg',
    imageAlt: 'Lĩnh Nam Truyền Kỳ — game artwork',
  },
  {
    id: 'huyen-su-ky',
    title: 'Huyền Sử Ký',
    description:
      'Trải nghiệm tương tác đa phương tiện đưa người xem nhập vai vào các sự kiện lịch sử.',
    year: '2026',
    platform: 'Web / Mobile',
    imageSrc: '/interactive_story.png',
    imageAlt: 'Huyền Sử Ký — interactive story artwork',
  },
  {
    id: 'coi-hu-vo',
    title: 'Cõi Hư Vô',
    description:
      'Hệ sinh thái Metaverse tái hiện không gian văn hóa tâm linh Việt Nam cổ đại.',
    year: '2027',
    platform: 'Metaverse',
    imageSrc: '/void_map.png',
    imageAlt: 'Cõi Hư Vô — metaverse artwork',
  },
]

export const MILESTONES: IMilestone[] = [
  { id: '2026-q1', year: '2026 Q1', title: 'Khởi tạo Core Engine', state: 'completed' },
  { id: '2026-q2', year: '2026 Q2', title: 'Phát hành Alpha Test', state: 'active' },
  { id: '2026-q3', year: '2026 Q3', title: 'Hợp tác Quốc tế', state: 'future' },
  { id: '2026-q4', year: '2026 Q4', title: 'Grand Launching', state: 'future' },
]

export const FOOTER_SECTIONS: IFooterSection[] = [
  {
    heading: 'Liên kết',
    links: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Dự án mới', href: '#' },
      { label: 'Tuyển dụng', href: '#' },
      { label: 'Blog tin tức', href: '#' },
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
