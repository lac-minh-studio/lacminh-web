import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, Chip } from '@heroui/react'
import type { IGameProject } from '@/types/projects'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: IGameProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isActive = project.statusType === 'active'

  return (
    <Card
      className={cn(
        'glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3',
        isActive && 'shadow-xl'
      )}
    >
      <CardContent className="p-0 overflow-visible">
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-surface-dark flex items-center justify-center">
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700"
            />
          ) : (
            <span className="text-6xl select-none">🏯</span>
          )}

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Chip
              size="sm"
              variant="secondary"
              className="bg-text-dark/60 backdrop-blur-md text-text-light text-xs font-bold"
            >
              {project.statusLabel}
            </Chip>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="proj-section-label mb-1">{project.genreLabel}</p>
          <h3
            className="text-xl text-text-dark mb-3 font-bold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary mb-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-5 pt-0">
        <a
          href="/projects"
          className="inline-flex items-center text-primary font-bold text-tiny hover:translate-x-1 transition-transform"
        >
          TÌM HIỂU THÊM <ArrowRight size={16} strokeWidth={2} className="ml-2" />
        </a>
      </CardFooter>
    </Card>
  )
}
