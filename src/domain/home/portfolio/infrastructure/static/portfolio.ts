import type { ICommercialProject, IGameProject } from '../../model/portfolio'

export const GAME_PROJECTS: IGameProject[] = [
  {
    id: 'khe-uoc-lac-hong',
    title: 'KHẾ ƯỚC LẠC HỒNG',
    genreLabel: 'MMORPG · Huyền Sử · UE5',
    statusLabel: 'Đang phát triển',
    statusType: 'pre-production',
    description:
      'Sau Đại Chiến Lạc Hồng, Linh Giới tách khỏi trần thế. Con người sống sót bằng cách ký kết khế ước với Tứ Đại Linh Long: Xích Đế Viêm Long (hỏa), Thương Hải Thủy Long (thủy), Hậu Thổ Hoàng Long (thổ), Cửu Tiêu Phong Long (phong). Chín cảnh giới tu luyện từ Linh Sĩ đến Thần định đoạt số phận con người. Chiến tranh lãnh địa, hệ thống PvP lãnh thổ và kinh tế craft hội tụ trong thế giới MMORPG quy mô lớn nhất Việt Nam.',
    imageSrc: '/games/khe-uoc.jpg',
    imageAlt: 'Khế Ước Lạc Hồng — MMORPG cultivation fantasy concept artwork',
  },
  {
    id: 'sen-city',
    title: 'SEN CITY',
    genreLabel: 'Social MMO · Simulation · Unity',
    statusLabel: 'Đang phát triển',
    statusType: 'active',
    description:
      'Mega-Apartment khổng lồ với 5 tầng lớp nhà ở từ studio thô đến penthouse xa hoa, mỗi tầng lớp mở ra cộng đồng cư dân và sự kiện xã hội riêng. Thú cưng AI với hệ thống tính cách 8 chiều, ban công farming theo mùa thời tiết, và mạng xã hội BQLCC với sự kiện cộng đồng ngẫu nhiên — mèo lạc, lễ hội, minigame hợp tác.',
    imageSrc: '/games/sen-city.jpeg',
    imageAlt: 'SEN CITY — social simulation game concept artwork',
  },
  {
    id: 'shadow-bastion',
    title: 'SHADOW BASTION',
    genreLabel: 'Tower Defense · 2.5D · Unity',
    statusLabel: 'Đang phát triển',
    statusType: 'active',
    description:
      'Tháp phòng thủ 2.5D với kiến trúc di sản Việt: Lũy Tre kháng độc, Đình Làng hồi máu đồng minh, Tháp Nỏ Thần xuyên giáp. 4 anh hùng huyền sử: Sơn Tinh triệu đỉnh núi, Thánh Gióng lao lên trời, Thủy Tinh điều khiển lũ lụt, Lạc Minh Thần Tướng (bí ẩn). 3 chiến dịch lịch sử: Hồng Hoang, Thánh Gióng vs Giặc Ân, Bi Kịch Loa Thành.',
    imageSrc: '/games/shadow-bastion.jpeg',
    imageAlt: '',
  },
]

export const COMMERCIAL_PROJECTS: ICommercialProject[] = [
  {
    id: 'ecommerce-khi',
    iconName: 'shopping_cart',
    title: 'E-Commerce Máy Thổi Khí',
    description:
      'Hệ thống thương mại điện tử chuyên dụng B2B, tối ưu hóa quy trình đặt hàng và quản lý kho cho ngành thiết bị công nghiệp nặng.',
    techPills: ['Next.js', 'WooCommerce', 'i18n'],
    metricValue: '+200%',
    metricLabel: 'Tăng trưởng doanh số Online',
  },
  {
    id: 'nen-tang-du-hoc',
    iconName: 'school',
    title: 'Nền Tảng Du Học',
    description:
      'Cổng thông tin kết nối học sinh Việt Nam với các trường Đại học quốc tế, tích hợp hệ thống tư vấn AI và quản lý hồ sơ thông minh.',
    techPills: ['React', 'Node.js', 'PostgreSQL'],
    metricValue: '1.200+',
    metricLabel: 'Hồ sơ xử lý thành công',
  },
  {
    id: 'cms-bat-dong-san',
    iconName: 'layout',
    title: 'CMS Bất Động Sản',
    description:
      'Nền tảng quản lý nội dung đa kênh cho doanh nghiệp bất động sản: listing tự động, SEO cấu trúc, dashboard phân tích thị trường real-time và tích hợp CRM cho đội ngũ môi giới.',
    techPills: ['Next.js', 'Sanity CMS', 'TypeScript'],
    metricValue: '3×',
    metricLabel: 'Tốc độ phát hành nội dung',
  },
]
