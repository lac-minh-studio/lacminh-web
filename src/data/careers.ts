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
      'Xây dựng giao diện dashboard CMS cho Lạc Minh — từ quản lý bài viết, hình ảnh đến các công cụ hỗ trợ SEO — với Next.js, làm việc bán thời gian linh hoạt và mentor đồng hành sát sao.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    level: 'intern',
    location: 'Remote',
    workType: 'Part time',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ tham gia xây dựng giao diện dashboard cho hệ thống CMS nội bộ — nơi đội ngũ biên tập viết bài, quản lý nội dung và tối ưu SEO hàng ngày. Đây không phải project giả định: bạn làm việc trên sản phẩm thật, xây dựng các tính năng thiết thực như trình soạn thảo bài viết, quản lý hình ảnh và bộ công cụ hỗ trợ SEO trực quan. Vị trí thực tập bán thời gian này phù hợp với các bạn sinh viên yêu thích giao diện có chiều sâu nghiệp vụ, muốn hiểu cách một sản phẩm nội dung vận hành từ bên trong và trưởng thành dưới sự dẫn dắt của mentor nhiều kinh nghiệm.',
    responsibilities: [
      'Xây dựng giao diện dashboard CMS: trang soạn thảo bài viết, danh sách quản lý nội dung, bộ lọc theo danh mục, tag và trạng thái xuất bản.',
      'Phát triển tính năng quản lý hình ảnh: upload, xem trước, gắn alt text và tổ chức thư viện ảnh phục vụ SEO.',
      'Xây dựng các UI component hỗ trợ SEO: nhập meta title, meta description, slug tùy chỉnh, Open Graph preview và gợi ý tối ưu on-page.',
      'Phối hợp cùng đội backend để tích hợp API, đảm bảo luồng dữ liệu giữa dashboard và hệ thống Firestore mượt mà, nhất quán.',
      'Tham gia code review, tiếp thu best practices từ mentor và đóng góp cải tiến trải nghiệm người dùng cho đội ngũ biên tập.',
    ],
    requirements: [
      'Nắm vững nền tảng HTML, CSS, JavaScript và tư duy xây dựng giao diện hiện đại.',
      'Có kiến thức cơ bản về React; kinh nghiệm với Next.js và Tailwind CSS là lợi thế lớn.',
      'Hiểu biết cơ bản về SEO on-page (meta tags, Open Graph, alt text, slug) là điểm cộng đáng kể.',
      'Chủ động học hỏi, phối hợp nhóm tốt và chú ý chi tiết — chúng tôi đánh giá tiềm năng hơn CV.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn culture fit (online)', 'Bài test kỹ thuật nhỏ (take-home)', 'Thông báo kết quả'],
    summary: [
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Hình thức', value: 'Part time' },
      { label: 'Hỗ trợ', value: 'Mộc thực tập' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/frontend-developer-intern',
  },
  {
    id: 'backend-intern',
    slug: 'backend-developer-intern',
    title: 'Backend Developer Intern',
    department: 'Web',
    description:
      'Xây dựng và vận hành hệ thống backend CMS cho Lạc Minh — quản lý bài viết, tin tức và nội dung kiến thức — với Next.js và Firebase Firestore, làm việc bán thời gian linh hoạt và mentor đồng hành sát sao.',
    skills: ['Next.js', 'Node.js', 'Firebase', 'TypeScript'],
    level: 'intern',
    location: 'Remote',
    workType: 'Part time',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ tham gia xây dựng hệ thống CMS nội bộ — nền tảng quản lý toàn bộ nội dung số của studio, bao gồm bài viết, tin tức, và kho kiến thức chuyên ngành. Đây không phải project giả định: bạn sẽ làm việc trực tiếp trên hệ thống thật, nơi dữ liệu được tổ chức bằng Firebase Firestore và logic nghiệp vụ được xử lý qua Next.js API Routes. Vị trí thực tập bán thời gian này phù hợp với các bạn sinh viên muốn hiểu sâu về thiết kế hệ thống dữ liệu, xây dựng API chuẩn chỉnh và trưởng thành trong môi trường có mentor đồng hành sát sao.',
    responsibilities: [
      'Xây dựng và bảo trì API endpoints phục vụ hệ thống CMS: tạo, cập nhật, truy vấn và phân loại bài viết, tin tức, nội dung kiến thức.',
      'Thiết kế cấu trúc collection Firestore phù hợp với mô hình nội dung đa dạng — hỗ trợ phân loại theo danh mục, tag, trạng thái xuất bản và lịch sử chỉnh sửa.',
      'Xây dựng các tính năng quản trị nội dung: lọc, tìm kiếm, phân trang và sắp xếp dữ liệu hiệu quả trên Firestore.',
      'Phối hợp cùng đội frontend để định nghĩa contract API, đảm bảo tích hợp mượt mà và nhất quán.',
      'Tham gia code review, tiếp thu best practices từ mentor và đóng góp cải tiến kiến trúc hệ thống.',
    ],
    requirements: [
      'Nắm vững nền tảng JavaScript/TypeScript và hiểu cơ bản về lập trình server-side.',
      'Có kiến thức về REST API và tư duy mô hình hóa dữ liệu dạng document (NoSQL) — đặc biệt với các cấu trúc nội dung phân cấp như bài viết, danh mục, tag.',
      'Kinh nghiệm với Firebase Firestore hoặc Next.js API Routes là lợi thế lớn.',
      'Chủ động học hỏi, phối hợp nhóm tốt và cẩn thận trong từng logic — chúng tôi đánh giá tiềm năng hơn CV.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn culture fit (online)', 'Bài test kỹ thuật nhỏ (take-home)', 'Thông báo kết quả'],
    summary: [
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Hình thức', value: 'Part time' },
      { label: 'Hỗ trợ', value: 'Mộc thực tập' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/backend-developer-intern',
  },
  {
    id: 'game-artist-intern',
    slug: 'game-artist-intern',
    title: 'Game Artist Intern',
    department: 'Game',
    description:
      'Tạo dựng thế giới 3D cho SEN CITY — tựa game giả lập nuôi thú cưng, trồng cây và setup căn hộ — với Blender, làm việc bán thời gian linh hoạt và mentor đồng hành sát sao.',
    skills: ['Blender', '3D Modeling', 'Texturing', 'Game Art'],
    level: 'intern',
    location: 'Remote',
    workType: 'Part time',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ tham gia xây dựng thế giới nghệ thuật 3D cho SEN CITY — một tựa game giả lập đời sống căn hộ với quy mô đầy tham vọng: 5 tầng lớp nhà ở từ studio thô đến penthouse xa hoa, hệ thống thú cưng AI với tính cách 8 chiều, ban công farming theo mùa, và mạng xã hội cư dân sôi động. Đây không phải bài tập nghệ thuật — bạn sẽ tạo ra các asset 3D thật sự xuất hiện trong game, từ nội thất căn hộ, chậu cây ban công đến những chú mèo AI đáng yêu. Vị trí này phù hợp với các bạn yêu thích 3D modeling, muốn hiểu quy trình art production trong một game studio thực chiến và trưởng thành dưới sự dẫn dắt của mentor nhiều kinh nghiệm.',
    responsibilities: [
      'Tạo và tối ưu 3D asset cho SEN CITY: nội thất căn hộ, vật dụng trang trí, cây trồng ban công và các vật phẩm theo từng tầng lớp nhà ở.',
      'Modeling và texturing thú cưng 3D (mèo, thú nuôi) với yêu cầu biểu cảm đa dạng phù hợp hệ thống tính cách 8 chiều của game.',
      'Xây dựng environment asset cho các không gian cộng đồng: sảnh chung, khu vực sự kiện, không gian ngoài trời theo mùa thời tiết.',
      'Phối hợp cùng game designer để đảm bảo asset khớp với gameplay, tối ưu polygon count và sẵn sàng cho pipeline tích hợp vào game engine.',
      'Tham gia art review, tiếp thu phản hồi nhanh và lặp thiết kế theo định hướng visual của dự án.',
    ],
    requirements: [
      'Có nền tảng 3D modeling tốt với Blender, ưu tiên có portfolio với asset hoàn chỉnh từ modeling đến texturing.',
      'Hiểu quy trình tối ưu asset cho game: low-poly modeling, UV unwrapping và bake texture cơ bản.',
      'Có cảm quan thẩm mỹ về không gian sống, nội thất và phong cách đời thường — phù hợp với thế giới slice-of-life của SEN CITY.',
      'Chủ động học hỏi, nhận phản hồi cởi mở và lặp thiết kế nhanh — chúng tôi đánh giá tiềm năng hơn CV.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn culture fit (online)', 'Art test (take-home)', 'Thông báo kết quả'],
    summary: [
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Hình thức', value: 'Part time' },
      { label: 'Hỗ trợ', value: 'Mộc thực tập' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/game-artist-intern',
  },
  {
    id: 'ba-game-intern',
    slug: 'business-analyst-game-intern',
    title: 'Business Analyst Intern — Game',
    department: 'Game',
    description:
      'Phân tích yêu cầu và xây dựng tài liệu thiết kế cho SEN CITY — từ game mechanics, hệ thống thú cưng AI đến luồng trải nghiệm người chơi — làm việc bán thời gian linh hoạt và mentor đồng hành sát sao.',
    skills: ['Game Design Document', 'User Story', 'Figma', 'Documentation'],
    level: 'intern',
    location: 'Remote',
    workType: 'Part time',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ đảm nhận vai trò cầu nối giữa ý tưởng sáng tạo và đội ngũ phát triển trong dự án SEN CITY — tựa game giả lập đời sống căn hộ với 5 tầng lớp nhà ở, hệ thống thú cưng AI tính cách 8 chiều, ban công farming theo mùa và mạng xã hội cư dân sôi động. Công việc của bạn là lắng nghe, đặt câu hỏi đúng, rồi chuyển hóa ý tưởng game thành tài liệu rõ ràng để dev, artist và designer có thể thực thi. Đây là vị trí lý tưởng cho các bạn yêu thích game, có tư duy hệ thống và muốn hiểu sâu cách một tựa game được kiến tạo từ bên trong.',
    responsibilities: [
      'Thu thập và phân tích yêu cầu từ game designer, lead developer và các stakeholder nội bộ cho từng tính năng của SEN CITY.',
      'Viết và duy trì tài liệu thiết kế game (GDD): mô tả mechanics, luồng gameplay, hệ thống thú cưng AI, sự kiện cộng đồng và các tầng lớp nhà ở.',
      'Chuyển hóa yêu cầu thành user story, acceptance criteria và flowchart rõ ràng để đội dev và artist triển khai.',
      'Phối hợp cùng đội kỹ thuật và art để làm rõ yêu cầu, phát hiện mâu thuẫn và cập nhật tài liệu theo tiến độ dự án.',
      'Tham gia các buổi review tính năng, ghi nhận phản hồi và cập nhật spec kịp thời.',
    ],
    requirements: [
      'Có tư duy hệ thống tốt, khả năng phân tích và diễn đạt ý tưởng phức tạp thành tài liệu rõ ràng, súc tích.',
      'Yêu thích game và có hiểu biết cơ bản về game mechanics, đặc biệt các thể loại simulation/life-sim là lợi thế lớn.',
      'Có kinh nghiệm viết tài liệu kỹ thuật, GDD hoặc user story ở bất kỳ quy mô nào là điểm cộng đáng kể.',
      'Chủ động đặt câu hỏi, lắng nghe kỹ và làm việc nhóm tốt — chúng tôi đánh giá tiềm năng hơn CV.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn culture fit (online)', 'Bài test viết tài liệu (take-home)', 'Thông báo kết quả'],
    summary: [
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Hình thức', value: 'Part time' },
      { label: 'Hỗ trợ', value: 'Mộc thực tập' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/business-analyst-game-intern',
  },
  {
    id: 'ba-web-intern',
    slug: 'business-analyst-web-intern',
    title: 'Business Analyst Intern — Web',
    department: 'Web',
    description:
      'Phân tích yêu cầu và xây dựng tài liệu sản phẩm cho hệ thống web Lạc Minh — từ CMS quản lý nội dung, luồng đăng bài đến các tính năng hỗ trợ SEO — làm việc bán thời gian linh hoạt và mentor đồng hành sát sao.',
    skills: ['Business Analysis', 'User Story', 'Figma', 'Documentation'],
    level: 'intern',
    location: 'Remote',
    workType: 'Part time',
    intro:
      'Tại Lạc Minh Studio, bạn sẽ đảm nhận vai trò cầu nối giữa đội ngũ nội dung và đội kỹ thuật trong việc phát triển hệ thống web nội bộ — bao gồm CMS quản lý bài viết, tin tức, hình ảnh và bộ công cụ hỗ trợ SEO. Công việc của bạn là lắng nghe nhu cầu từ biên tập viên và stakeholder, rồi chuyển hóa thành tài liệu sản phẩm rõ ràng để đội frontend và backend triển khai đúng hướng. Đây là vị trí lý tưởng cho các bạn có tư duy sản phẩm, quan tâm đến trải nghiệm người dùng và muốn hiểu cách một hệ thống web nội dung được xây dựng từ đầu.',
    responsibilities: [
      'Thu thập và phân tích yêu cầu từ đội nội dung, marketing và các stakeholder nội bộ cho hệ thống CMS và web Lạc Minh.',
      'Viết và duy trì tài liệu sản phẩm (PRD): mô tả tính năng quản lý bài viết, luồng đăng tin, quản lý hình ảnh và các công cụ SEO on-page.',
      'Chuyển hóa yêu cầu thành user story, acceptance criteria và flowchart rõ ràng để đội frontend và backend triển khai.',
      'Phối hợp cùng đội kỹ thuật để làm rõ yêu cầu, phát hiện mâu thuẫn nghiệp vụ và cập nhật tài liệu theo tiến độ dự án.',
      'Tham gia các buổi review tính năng, ghi nhận phản hồi từ người dùng nội bộ và cập nhật spec kịp thời.',
    ],
    requirements: [
      'Có tư duy hệ thống tốt, khả năng phân tích và diễn đạt yêu cầu nghiệp vụ thành tài liệu rõ ràng, súc tích.',
      'Hiểu biết cơ bản về sản phẩm web, luồng quản lý nội dung và các khái niệm SEO on-page là lợi thế lớn.',
      'Có kinh nghiệm viết PRD, user story hoặc tài liệu quy trình ở bất kỳ quy mô nào là điểm cộng đáng kể.',
      'Chủ động đặt câu hỏi, lắng nghe kỹ và làm việc nhóm tốt — chúng tôi đánh giá tiềm năng hơn CV.',
    ],
    hiringProcess: ['Lọc hồ sơ', 'Phỏng vấn culture fit (online)', 'Bài test viết tài liệu (take-home)', 'Thông báo kết quả'],
    summary: [
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Hình thức', value: 'Part time' },
      { label: 'Hỗ trợ', value: 'Mộc thực tập' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/business-analyst-web-intern',
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
    location: 'Remote',
    workType: 'Part time',
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
      { label: 'Địa điểm', value: 'Remote' },
      { label: 'Kinh nghiệm', value: 'Sinh viên năm 3' },
      { label: 'Hạn nộp', value: '30/06/2026' },
    ],
    linkHref: '/careers/game-designer-intern',
  },
]

export function getJobBySlug(slug: string): IJobPosition | undefined {
  return JOB_POSITIONS.find((job) => job.slug === slug)
}

export function getRelatedJobs(slug: string, limit = 4): IJobPosition[] {
  return JOB_POSITIONS.filter((job) => job.slug !== slug).slice(0, limit)
}
