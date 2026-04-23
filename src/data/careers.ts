import type { IJobPosition, IValuePillar } from '@/types/careers'
import type { IStatItem } from '@/types/global'

export const CAREER_STATS: IStatItem[] = [
  { value: '5+', label: 'Năm phát triển' },
  { value: '3', label: 'Dự án lớn' },
  { value: '18', label: 'Thành viên' },
  { value: '5+', label: 'Cơ hội mới' },
]

export const VALUE_PILLARS: IValuePillar[] = [
  {
    id: 'sang-tao',
    title: 'Sáng Tạo Không Ngừng',
    description:
      'Chúng tôi tin rằng mỗi ý tưởng đều có thể trở thành một tác phẩm vĩ đại nếu được nuôi dưỡng đúng cách.',
    icon: 'Sparkles',
  },
  {
    id: 'tien-phong',
    title: 'Tiên Phong Việt Hóa',
    description:
      'Sứ mệnh đưa huyền sử, văn hóa và tâm hồn Việt Nam lên bản đồ game thế giới.',
    icon: 'Globe',
  },
  {
    id: 'ben-bi',
    title: 'Bền Bỉ Vì Đam Mê',
    description:
      'Mỗi thành viên là một người kể chuyện — kiên nhẫn, tận tụy, và cháy hết mình vì dự án.',
    icon: 'Flame',
  },
]

export const JOB_POSITIONS: IJobPosition[] = [
  {
    id: 'frontend-intern',
    slug: 'frontend-developer-intern',
    title: 'Frontend Developer Intern',
    department: 'Web',
    description:
      'Xây dựng giao diện web sống động cho hệ sinh thái Lạc Minh — từ landing page đến dashboard nội bộ.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    level: 'intern',
    location: 'TP. HCM',
    workType: 'Toàn thời gian',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ cùng đội ngũ sản phẩm kiến tạo giao diện cho các sản phẩm web mang bản sắc Việt. Vai trò này phù hợp với những bạn yêu thích chất lượng trải nghiệm người dùng và muốn phát triển kỹ năng frontend trong môi trường làm việc thực chiến.',
    responsibilities: [
      'Phát triển các UI components theo design system của studio với độ chính xác cao.',
      'Phối hợp cùng đội thiết kế và backend để tích hợp API, tối ưu luồng trải nghiệm người dùng.',
      'Tối ưu hiệu năng hiển thị và đảm bảo giao diện hoạt động ổn định trên nhiều thiết bị.',
    ],
    requirements: [
      'Nắm vững nền tảng HTML, CSS, JavaScript và tư duy xây dựng giao diện hiện đại.',
      'Có trải nghiệm với React, Next.js và Tailwind CSS là lợi thế lớn.',
      'Có tinh thần chủ động học hỏi, phối hợp nhóm tốt và chú ý chi tiết trong từng màn hình.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn', 'Technical test'],
    summary: [
      { label: 'Mức lương', value: 'Thỏa thuận theo năng lực' },
      { label: 'Kinh nghiệm', value: 'Ưu tiên sinh viên năm cuối' },
      { label: 'Hạn nộp', value: '30/06/2024' },
    ],
    linkHref: '/careers/frontend-developer-intern',
  },
  {
    id: 'backend-intern',
    slug: 'backend-developer-intern',
    title: 'Backend Developer Intern',
    department: 'Web',
    description:
      'Thiết kế API và hệ thống dữ liệu phục vụ các sản phẩm số của Lạc Minh Studio.',
    skills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker'],
    level: 'intern',
    location: 'TP. HCM',
    workType: 'Toàn thời gian',
    intro:
      'Bạn sẽ tham gia xây dựng phần lõi cho các sản phẩm số tại Lạc Minh Studio, từ thiết kế API đến quản trị dữ liệu vận hành. Đây là vị trí dành cho những bạn muốn học sâu về kiến trúc backend và tính ổn định hệ thống.',
    responsibilities: [
      'Thiết kế và phát triển API phục vụ website và các công cụ vận hành nội bộ.',
      'Tối ưu truy vấn dữ liệu, bảo đảm hiệu năng và độ tin cậy cho hệ thống backend.',
      'Phối hợp với frontend để chuẩn hóa contract dữ liệu và quy trình tích hợp.',
    ],
    requirements: [
      'Có kiến thức nền tảng về Node.js, REST API và cơ sở dữ liệu quan hệ.',
      'Biết Docker hoặc có trải nghiệm triển khai dịch vụ là điểm cộng.',
      'Tư duy hệ thống tốt, biết phân tích vấn đề và viết mã dễ bảo trì.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn', 'Technical test'],
    summary: [
      { label: 'Mức lương', value: 'Thỏa thuận theo năng lực' },
      { label: 'Kinh nghiệm', value: 'Intern hoặc Fresher' },
      { label: 'Hạn nộp', value: '30/06/2024' },
    ],
    linkHref: '/careers/backend-developer-intern',
  },
  {
    id: 'game-designer-intern',
    slug: 'game-designer-intern',
    title: 'Game Designer Intern',
    department: 'Game',
    description:
      'Thiết kế gameplay, cơ chế và hành trình người chơi cho các tựa game huyền sử Việt Nam.',
    skills: ['Game Design', 'Unity', 'Prototyping', 'UX Research'],
    level: 'intern',
    location: 'TP. HCM',
    workType: 'Toàn thời gian',
    intro:
      'Lạc Minh Studio tìm kiếm những bạn yêu thiết kế gameplay và có mong muốn kể chuyện Việt bằng ngôn ngữ game. Bạn sẽ cùng đội sản phẩm định hình trải nghiệm người chơi từ ý tưởng đến prototype.',
    responsibilities: [
      'Thiết kế core loop, nhiệm vụ và hành trình trải nghiệm cho từng nhóm người chơi.',
      'Viết tài liệu game design và phối hợp với đội lập trình để hiện thực hóa thiết kế.',
      'Phân tích phản hồi playtest để cải tiến nhịp chơi và độ cân bằng.',
    ],
    requirements: [
      'Có nền tảng về tư duy gameplay, UX game hoặc phân tích hành vi người chơi.',
      'Biết sử dụng công cụ prototype như Unity hoặc Figma để trình bày ý tưởng.',
      'Kỹ năng giao tiếp và trình bày rõ ràng để làm việc liên phòng ban.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn', 'Playtest case'],
    summary: [
      { label: 'Mức lương', value: 'Thỏa thuận theo năng lực' },
      { label: 'Kinh nghiệm', value: 'Intern hoặc Fresher' },
      { label: 'Hạn nộp', value: '30/06/2024' },
    ],
    linkHref: '/careers/game-designer-intern',
  },
  {
    id: 'game-artist-intern',
    slug: 'game-artist-intern',
    title: 'Game Artist Intern',
    department: 'Game',
    description:
      'Tạo ra thế giới nghệ thuật đặc trưng mang đậm bản sắc văn hóa Đông Nam Á cổ đại.',
    skills: ['Concept Art', 'Photoshop', 'Illustration', '2D/3D Art'],
    level: 'intern',
    location: 'TP. HCM',
    workType: 'Toàn thời gian',
    intro:
      'Nếu bạn yêu mỹ thuật và muốn xây dựng thế giới game lấy cảm hứng từ huyền sử Việt, đây là vị trí dành cho bạn. Bạn sẽ cùng đội art tạo concept, mood và key visual cho các dự án của studio.',
    responsibilities: [
      'Phát triển concept art nhân vật, môi trường và vật phẩm theo định hướng dự án.',
      'Phối hợp với game designer để bảo đảm ngôn ngữ hình ảnh hỗ trợ gameplay.',
      'Chuẩn hóa asset art để chuyển giao sang pipeline sản xuất.',
    ],
    requirements: [
      'Có nền tảng mỹ thuật tốt, ưu tiên có portfolio rõ quy trình từ concept đến hoàn thiện.',
      'Sử dụng tốt Photoshop hoặc công cụ minh họa tương đương.',
      'Có khả năng nhận phản hồi và lặp thiết kế nhanh theo yêu cầu dự án.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn', 'Art test'],
    summary: [
      { label: 'Mức lương', value: 'Thỏa thuận theo năng lực' },
      { label: 'Kinh nghiệm', value: 'Intern hoặc Fresher' },
      { label: 'Hạn nộp', value: '30/06/2024' },
    ],
    linkHref: '/careers/game-artist-intern',
  },
  {
    id: 'ba-intern',
    slug: 'business-analyst-intern',
    title: 'Business Analyst Intern',
    department: 'Business',
    description:
      'Phân tích thị trường, nghiên cứu người dùng và xây dựng chiến lược phát triển sản phẩm.',
    skills: ['Research', 'Excel', 'Figma', 'Market Analysis'],
    level: 'intern',
    location: 'TP. HCM',
    workType: 'Toàn thời gian',
    intro:
      'Bạn sẽ đồng hành với đội sản phẩm trong việc nghiên cứu thị trường game và hành vi người dùng để đưa ra khuyến nghị chiến lược. Vai trò BA giúp kết nối dữ liệu kinh doanh với định hướng phát triển sản phẩm tại studio.',
    responsibilities: [
      'Phân tích nhu cầu người dùng, đối thủ và xu hướng thị trường cho từng dự án.',
      'Hỗ trợ xây dựng tài liệu yêu cầu nghiệp vụ và khung KPI theo từng giai đoạn.',
      'Làm việc với các nhóm sản phẩm, kỹ thuật và vận hành để đồng bộ mục tiêu.',
    ],
    requirements: [
      'Có nền tảng về phân tích dữ liệu, nghiên cứu thị trường hoặc quản trị sản phẩm.',
      'Thành thạo công cụ văn phòng và có khả năng trình bày insight mạch lạc.',
      'Tư duy hệ thống, chủ động và có trách nhiệm với đầu việc được giao.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn', 'Business case'],
    summary: [
      { label: 'Mức lương', value: 'Thỏa thuận theo năng lực' },
      { label: 'Kinh nghiệm', value: 'Intern hoặc Fresher' },
      { label: 'Hạn nộp', value: '30/06/2024' },
    ],
    linkHref: '/careers/business-analyst-intern',
  },
]

export function getJobBySlug(slug: string): IJobPosition | undefined {
  return JOB_POSITIONS.find((job) => job.slug === slug)
}

export function getRelatedJobs(slug: string, limit = 4): IJobPosition[] {
  return JOB_POSITIONS.filter((job) => job.slug !== slug).slice(0, limit)
}
