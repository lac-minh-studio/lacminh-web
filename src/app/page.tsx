import { ArrowUpRight, Cpu, Library, MoveRight, MoveUpRight, Plus, Sparkle, Video } from "lucide-react";
import Image from "next/image";

const navigationLinks = [
  { href: "#top", label: "Trang chủ", emphasized: true },
  { href: "#services", label: "Dịch vụ" },
  { href: "#universe", label: "Vũ trụ" },
  { href: "#join", label: "Gia nhập" },
];

const stats = [
  { value: "100+", label: "Nguồn Sử Liệu" },
  { value: "4K", label: "Độ Phân Giải Tâm Hồn" },
];

const projectCards = [
  {
    id: "01",
    title: "MMORPG: An Nam Linh Giới",
    description: "Nhập vai, Tu tiên, Diệt ngoại tộc",
    cta: "Tham gia tiền quân",
    href: "#join",
    image: "/lacminh/hero_background.png",
    imageAlt: "Gritty dark MMORPG battlefield with ancient Vietnamese architecture",
    titleColor: "text-[var(--lm-secondary)]",
    kickerColor: "text-[rgba(233,195,73,0.85)]",
  },
  {
    id: "02",
    title: "I/S: Câu Chuyện Đêm Sen",
    description: "Tĩnh lặng, Cảm xúc, Lựa chọn.",
    cta: "Khởi hành tâm thức",
    href: "#services",
    image: "/lacminh/interactive_story.png",
    imageAlt: "Luminous lotus pond at night with moon glow",
    titleColor: "text-[var(--lm-primary)]",
    kickerColor: "text-[rgba(198,198,198,0.9)]",
  },
];

const philosophyCards = [
  {
    icon: <Library />,
    title: "Kho Tàng Sử Liệu",
    description:
      "Mọi chi tiết phục trang, kiến trúc đều được thẩm định bởi các nhà nghiên cứu văn hóa hàng đầu Việt Nam.",
  },
  {
    icon: <Sparkle />,
    title: "Vũ Trụ Sâu Sắc",
    description:
      "Hệ thống lore đa lớp, kết nối những mảnh vỡ thần thoại thành một dòng chảy thống nhất.",
  },
  {
    icon: <Cpu />,
    title: "Kiến Tạo Số",
    description:
      "Làm chủ công nghệ CGI và real-time rendering để phá vỡ giới hạn giữa thực tế và huyền ảo.",
  },
];

const footerColumns = [
  {
    title: "Kết nối",
    links: [
      { href: "#join", label: "Tuyển dụng" },
      { href: "#contact", label: "Liên hệ" },
    ],
  },
  {
    title: "Pháp lý",
    links: [
      { href: "#top", label: "Privacy" },
      { href: "#top", label: "Terms" },
    ],
  },
  {
    title: "Social",
    links: [
      { href: "#top", label: "Facebook" },
      { href: "#top", label: "Behance" },
    ],
  },
];

export default function Home() {
  return (
    <main id="top" className="overflow-x-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(68,71,72,0.25)] bg-[rgba(19,19,19,0.8)] backdrop-blur-[20px]">
        <div className="mx-auto flex max-w-480 items-center justify-between px-6 py-5 md:px-12">
          <a className="flex items-center gap-4" href="#top">
            <Image
              src="/logo.png"
              alt="Lạc Minh Studio logo"
              width={40}
              height={40}
              priority
            />
            <span className="hidden font-display text-xl font-bold tracking-[0.2em] text-(--lm-primary) md:block">
              LẠC MINH STUDIO
            </span>
          </a>

          <div className="hidden items-center gap-10 font-display text-lg italic md:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                className={link.emphasized
                  ? "tracking-widest text-(--lm-secondary) transition-opacity hover:opacity-80"
                  : "tracking-widest text-(--lm-muted) transition-colors hover:text-(--lm-primary)"}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/lacminh/void_map.png"
            alt="Ethereal Vietnamese landscape with moon glow and mist"
            fill
            className="object-cover scale-110"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(16,16,32,0.4)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "url('/lacminh/bronze-drum-hero-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px",
          }}
        />

        <div className="relative z-10 px-4 pt-24 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Large silver metallic Chim Lac sigil icon"
              width={192}
              height={192}
              className="h-32 w-32 opacity-90 drop-shadow-[0_0_30px_rgba(192,192,192,0.3)] md:h-48 md:w-48"
              priority
            />
          </div>
          <h1 className="mb-4 font-display text-5xl font-bold leading-none tracking-[0.25em] text-(--lm-primary) md:text-8xl">
            LẠC MINH STUDIO
          </h1>
          <p className="mb-12 font-display text-xl italic tracking-wide text-[rgba(196,199,199,0.8)] md:text-3xl">
            Nơi Thần Thoại Việt Nam Thức Giấc
          </p>
          <a
            className="group inline-flex items-center gap-4 rounded-full border border-[rgba(192,192,192,0.4)] px-8 py-4 transition-all hover:border-(--lm-secondary)"
            href="#explore"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-(--lm-primary) transition-colors group-hover:text-(--lm-secondary)">
              Khám Phá Vũ Trụ
            </span>
            <MoveRight />
          </a>
        </div>
      </section>

      <section
        id="explore"
        className="relative overflow-hidden bg-(--lm-surface-lowest) py-24 md:py-40"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url('/lacminh/dong-son-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "500px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-360 gap-16 px-6 md:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="h-px w-20 bg-(--lm-secondary)" />
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-(--lm-primary) uppercase md:text-6xl">
              DÒNG MÁU LẠC HỒNG <br />
              <span className="font-light italic text-[rgba(196,199,199,0.6)]">
                &amp; HƠI THỞ CÔNG NGHỆ
              </span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed tracking-wide text-(--lm-muted) md:text-xl">
              Chúng tôi không chỉ làm game. Chúng tôi khai quật những tầng sâu của sử thi, kết hợp cùng sức mạnh của Unity cùng Blender để tái hiện một vũ trụ Việt Nam kỳ ảo, nơi những vị thần không còn là trang giấy cũ mà là những thực thể sống động trong kỷ nguyên số.
            </p>

            <div className="flex gap-12 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-3xl font-bold text-(--lm-secondary)">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-[rgba(196,199,199,0.6)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="flex aspect-square">
              <Image
              src="/lacminh/trongdong.png"
              alt="Lạc Minh Studio logo"
              className="w-full aspect-square"
              width={700}
              height={700}
              />
            </div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 border-b border-l border-[rgba(233,195,73,0.4)]" />
          </div>
        </div>
      </section>

      <section
        id="universe"
        className="grid min-h-409.5 grid-cols-1 md:min-h-screen md:grid-cols-2"
      >
        {projectCards.map((card) => (
          <article
            key={card.title}
            className={"group relative overflow-hidden border-r border-[rgba(68,71,72,0.25)]"}
          >
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover transition-transform duration-2000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 transition-opacity bg-black/60 group-hover:opacity-40`} />
            <div className="relative z-10 flex h-full flex-col justify-end p-12 md:p-20">
              <span className={`mb-4 text-xs uppercase tracking-[0.4em] ${card.kickerColor}`}>
                Dự án {card.id}
              </span>
              <h3 className={`mb-4 font-display text-4xl font-bold tracking-wider md:text-5xl ${card.titleColor}`}>
                {card.title}
              </h3>
              <p className="max-w-md font-display text-xl italic text-[rgba(227,226,226,0.8)] md:text-2xl">
                {card.description}
              </p>
              <div className="mt-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  className="inline-flex items-center gap-3 bg-(--lm-primary) px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#2f3131]!"
                  href={card.href}
                >
                  {card.cta}
                  <MoveRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section
        id="services"
        className="relative overflow-hidden bg-background py-24 md:py-40"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/lacminh/cultivation.jpg')",
            filter: "contrast(150%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-360 px-6 md:px-12">
          <div className="mb-24 text-center">
            <h2 className="mb-6 font-display text-4xl font-bold tracking-widest text-(--lm-primary) md:text-6xl">
              TRIẾT LÝ KIẾN TẠO
            </h2>
            <div className="mx-auto h-px w-24 bg-(--lm-secondary)" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {philosophyCards.map((card) => (
              <article
                key={card.title}
                className="group flex h-full flex-col gap-8 border border-[rgba(220,220,220,0.1)] bg-(--lm-surface-low) p-12 transition-colors hover:border-[rgba(233,195,73,0.4)]"
              >
                <div className="h-10 w-10 text-(--lm-secondary)">
                {card.icon}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-wide text-(--lm-primary) uppercase">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-(--lm-muted)">
                  {card.description}
                </p>
                <div className="mt-auto h-px w-0 bg-(--lm-secondary) transition-all duration-700 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="border-t border-[rgba(68,71,72,0.25)] bg-(--lm-surface-lowest) py-16 md:py-24"
      >
        <div className="mx-auto max-w-360 px-6 md:px-12">
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <div id="join" className="space-y-6">
              <div className="flex items-center gap-4 opacity-70">
                <Image
                  src="/logo.png"
                  alt="Lạc Minh Studio footer logo"
                  width={48}
                  height={48}
                />
                <span className="font-display text-2xl font-bold tracking-widest text-(--lm-primary)">
                  LẠC MINH STUDIO
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-(--lm-muted)">
                Ancient depth, modern soul.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 text-[12px] uppercase tracking-[0.15em] text-(--lm-muted) md:flex md:gap-24">
              {footerColumns.map((column) => (
                <div key={column.title} className="flex flex-col gap-4">
                  <span className="font-bold text-(--lm-primary) opacity-40">
                    {column.title}
                  </span>
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      className="transition-colors hover:text-(--lm-secondary)"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-[rgba(68,71,72,0.25)] pt-8 text-[10px] uppercase tracking-widest text-[rgba(196,199,199,0.4)] md:flex-row">
            <span>© 2026 Lạc Minh Studio. Tất cả bản quyền được bảo lưu.</span>
            <div className="flex gap-8">
              <span>Designed in the void</span>
              <span>Powered by History</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
