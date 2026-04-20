import type { IBlogPost } from '@/types/blogs'

export const BLOG_FILTERS = ['Tất cả', 'Huyền sử', 'Kiến trúc', 'Nghệ thuật', 'Văn hóa']

export const BLOG_HERO_STATS = [
  { value: '50+', label: 'Bài viết' },
  { value: '5', label: 'Chủ đề' },
  { value: '4000+', label: 'Năm huyền sử' },
  { value: '∞', label: 'Câu chuyện' },
]

export const mockCarouselSlides: IBlogPost[] = [
  {
    id: 'featured-1',
    title: 'Truyền thuyết Hùng Vương và khởi nguồn dân tộc',
    excerpt:
      'Khám phá quá trình đầy thử thách của đội ngũ Lạc Minh Studio khi tái hiện lại những bộ giáp oai hùng của nghĩa quân nhà Trần, từ việc nghiên cứu sử liệu đến mô hình hóa chi tiết trên không gian 3 chiều.',
    category: 'Huyền sử',
    author: 'Lạc Minh Studio',
    date: '15 Tháng 4, 2026',
    readTime: '8 phút đọc',
    imageSrc: '/blogs/huyn-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Huyền Sử Việt Nam 3D Fantasy — chiến binh cổ đại trong giáp đồng',
  },
  {
    id: 'featured-2',
    title: 'Kiến trúc đền thờ cổ đại và không gian thiêng liêng',
    excerpt:
      'Nghiên cứu sâu về kiến trúc đền thờ thời Lý – Trần, từ hệ thống mái đao cong vút đến các chi tiết chạm khắc tinh xảo phản ánh tư tưởng Phật giáo và Nho giáo hòa quyện.',
    category: 'Kiến trúc',
    author: 'Lạc Minh Studio',
    date: '10 Tháng 4, 2026',
    readTime: '6 phút đọc',
    imageSrc: '/blogs/thn-thoi-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Kiến trúc đền thờ cổ đại Việt Nam 3D Fantasy',
  },
  {
    id: 'featured-3',
    title: 'Nghệ thuật trang trí Đông Sơn trong game hiện đại',
    excerpt:
      'Từ những họa tiết trên mặt trống đồng Đông Sơn đến game design hiện đại – hành trình chuyển hóa tinh hoa văn hóa Việt vào pixel art và 3D modeling.',
    category: 'Nghệ thuật',
    author: 'Lạc Minh Studio',
    date: '05 Tháng 4, 2026',
    readTime: '7 phút đọc',
    imageSrc: '/blogs/thn-thoi-sn-tinh-thy-tinh-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Sơn Tinh Thủy Tinh 3D Fantasy — nghệ thuật Đông Sơn',
  },
]

export const mockGridPosts: IBlogPost[] = [
  {
    id: 'grid-1',
    title: 'Lịch sử chiến tranh Việt Nam qua lăng kính nghệ thuật',
    excerpt: 'Cách nhìn sáng tạo về những trang sử hào hùng của dân tộc Việt Nam qua ngôn ngữ thị giác hiện đại.',
    category: 'Huyền sử',
    author: 'Nguyễn Văn Lạc',
    date: '20 Tháng 4, 2026',
    imageSrc: '/blogs/huyn-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Chiến tranh Việt Nam qua nghệ thuật fantasy',
  },
  {
    id: 'grid-2',
    title: 'Những mái chùa cong vút trong ký ức người Việt',
    excerpt: 'Hành trình khám phá vẻ đẹp kiến trúc Phật giáo truyền thống qua các ngôi chùa cổ còn lưu giữ đến ngày nay.',
    category: 'Kiến trúc',
    author: 'Trần Minh Đức',
    date: '18 Tháng 4, 2026',
    imageSrc: '/blogs/thn-thoi-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Mái chùa cong vút kiến trúc Phật giáo',
  },
  {
    id: 'grid-3',
    title: 'Họa tiết hoa văn trong nghệ thuật trang phục cổ',
    excerpt: 'Phân tích sâu về ý nghĩa biểu tượng của hoa văn trên trang phục cung đình và dân gian Việt Nam.',
    category: 'Nghệ thuật',
    author: 'Lê Thị Hương',
    date: '16 Tháng 4, 2026',
    imageSrc: '/blogs/blog1.jpeg',
    imageAlt: 'Họa tiết hoa văn trang phục cổ Việt Nam',
  },
  {
    id: 'grid-4',
    title: 'Câu chuyện về truyền thống làng nghề thủ công',
    excerpt: 'Ghi chép về những nghề thủ công truyền thống đang được bảo tồn và phát huy trong thời đại mới.',
    category: 'Văn hóa',
    author: 'Phạm Thanh Hải',
    date: '14 Tháng 4, 2026',
    imageSrc: '/blogs/thn-thoi-sn-tinh-thy-tinh-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Làng nghề thủ công truyền thống Việt Nam',
  },
  {
    id: 'grid-5',
    title: 'Sơn tinh thủy tinh và trận chiến thiên nhiên vĩ đại',
    excerpt: 'Giải mã truyền thuyết dân gian qua lăng kính khảo cổ học và địa lý học hiện đại.',
    category: 'Huyền sử',
    author: 'Hoàng Anh Tuấn',
    date: '12 Tháng 4, 2026',
    imageSrc: '/blogs/thn-thoi-sn-tinh-thy-tinh-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Sơn Tinh Thủy Tinh trận chiến huyền thoại',
  },
  {
    id: 'grid-6',
    title: 'Hình tượng rồng trong văn hóa Đại Việt',
    excerpt: 'Từ biểu tượng thiêng liêng trên bệ rồng ngai vàng đến ngôn ngữ nghệ thuật trong game và phim ảnh.',
    category: 'Nghệ thuật',
    author: 'Nguyễn Phú Vinh',
    date: '10 Tháng 4, 2026',
    imageSrc: '/blogs/huyn-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Hình tượng rồng trong văn hóa Đại Việt',
  },
  {
    id: 'grid-7',
    title: 'Ẩm thực cung đình Huế — nghệ thuật trên mâm cỗ',
    excerpt: 'Khám phá nghệ thuật trình bày ẩm thực đặc sắc của hoàng gia triều Nguyễn — tinh hoa văn hóa miền Trung.',
    category: 'Văn hóa',
    author: 'Đinh Thị Lan',
    date: '08 Tháng 4, 2026',
    imageSrc: '/blogs/blog1.jpeg',
    imageAlt: 'Ẩm thực cung đình Huế nghệ thuật',
  },
  {
    id: 'grid-8',
    title: 'Lễ hội truyền thống và nhịp sống làng quê Việt',
    excerpt: 'Ghi lại những khoảnh khắc sống động trong các lễ hội dân gian đặc sắc khắp ba miền đất nước.',
    category: 'Văn hóa',
    author: 'Vũ Quang Minh',
    date: '06 Tháng 4, 2026',
    imageSrc: '/blogs/thn-thoi-s-vit-nam-3d-fantasy.jpeg',
    imageAlt: 'Lễ hội truyền thống làng quê Việt Nam',
  },
]
