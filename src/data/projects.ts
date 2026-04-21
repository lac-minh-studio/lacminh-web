import type { IProjectCardHero, IProjectCardTall, IProjectCardLite } from '@/types/projects'

export const PROJECT_HERO: IProjectCardHero = {
  id: 'sen-city',
  title: 'SEN-CITY',
  tags: [
    { label: 'Unity 3D' },
    { label: 'AI NPC' },
    { label: 'Open World' },
  ],
  // TODO: replace with official Sen-City artwork when available
  imageSrc: '/void_map.png',
  imageAlt: 'Sen-City — open world game concept artwork',
  status: 'Đang phát triển',
  year: '2026',
  meta: '12 thành viên',
}

export const PROJECT_TALL: IProjectCardTall = {
  id: 'khe-uoc-lac-hong',
  title: 'KHẾ ƯỚC LẠC HỒNG',
  tags: [
    { label: 'MMORPG' },
    { label: 'Huyền Sử' },
    { label: 'Concept 3D' },
  ],
  imageSrc: '/cultivation.jpg',
  imageAlt: 'Khế ước Lạc Hồng — cultivation fantasy game artwork',
  productionStage: 'Pre-production',
  engine: 'Unreal Engine 5',
}

export const PROJECTS_LITE: IProjectCardLite[] = [
  {
    id: 'ecommerce-may-thoi-khi',
    title: 'E-COMMERCE MÁY THỔI KHÍ ĐÀI LOAN',
    tags: [
      { label: 'Next.js' },
      { label: 'WooCommerce' },
      { label: 'i18n' },
    ],
    year: '2026',
    outcome: 'Tăng 200% organic traffic',
    iconName: 'storefront',
  },
  {
    id: 'nen-tang-du-hoc',
    title: 'NỀN TẢNG QUẢN LÝ DU HỌC',
    tags: [
      { label: 'React' },
      { label: 'Node.js' },
      { label: 'PostgreSQL' },
    ],
    year: '2026',
    outcome: 'Quản lý 1,200+ hồ sơ',
    iconName: 'school',
  },
]
