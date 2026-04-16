import type { IJobPosition, IValuePillar, ICareerStat } from '@/types/careers'

export const CAREER_STATS: ICareerStat[] = [
  { value: '3+', label: 'Năm phát triển' },
  { value: '4', label: 'Dự án lớn' },
  { value: '12', label: 'Thành viên' },
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
    title: 'Frontend Developer Intern',
    department: 'Web',
    description:
      'Xây dựng giao diện web sống động cho hệ sinh thái Lạc Minh — từ landing page đến dashboard nội bộ.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    level: 'intern',
    linkHref: '#contact',
  },
  {
    id: 'backend-intern',
    title: 'Backend Developer Intern',
    department: 'Web',
    description:
      'Thiết kế API và hệ thống dữ liệu phục vụ các sản phẩm số của Lạc Minh Studio.',
    skills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker'],
    level: 'intern',
    linkHref: '#contact',
  },
  {
    id: 'game-designer-intern',
    title: 'Game Designer Intern',
    department: 'Game',
    description:
      'Thiết kế gameplay, cơ chế và hành trình người chơi cho các tựa game huyền sử Việt Nam.',
    skills: ['Game Design', 'Unity', 'Prototyping', 'UX Research'],
    level: 'intern',
    linkHref: '#contact',
  },
  {
    id: 'game-artist-intern',
    title: 'Game Artist Intern',
    department: 'Game',
    description:
      'Tạo ra thế giới nghệ thuật đặc trưng mang đậm bản sắc văn hóa Đông Nam Á cổ đại.',
    skills: ['Concept Art', 'Photoshop', 'Illustration', '2D/3D Art'],
    level: 'intern',
    linkHref: '#contact',
  },
  {
    id: 'ba-intern',
    title: 'Business Analyst Intern',
    department: 'Business',
    description:
      'Phân tích thị trường, nghiên cứu người dùng và xây dựng chiến lược phát triển sản phẩm.',
    skills: ['Research', 'Excel', 'Figma', 'Market Analysis'],
    level: 'intern',
    linkHref: '#contact',
  },
]
