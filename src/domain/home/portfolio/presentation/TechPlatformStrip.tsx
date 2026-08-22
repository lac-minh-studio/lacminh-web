const TECH_PILLS = [
  'Unreal Engine 5',
  'Unity 6',
  'Next.js 15',
  'Node.js',
  'PostgreSQL',
  'Figma',
]

export function TechPlatformStrip() {
  return (
    <section
      id="tech-strip"
      className="w-full py-6 bg-tech-strip"
      aria-label="Technology stack"
    >
      <div className="content-container flex flex-wrap items-center justify-center gap-3">
        {TECH_PILLS.map((tech) => (
          <span
            key={tech}
            className="font-body text-tiny text-text-light uppercase tracking-widest border border-primary/40 px-4 py-1.5 rounded-full opacity-80"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
