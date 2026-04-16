import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, Chip } from '@heroui/react'
import type { IProject } from '@/types/home'
import { cn } from '@/lib/utils'
import { AppButton } from '@/components/hero-ui'

interface ProjectCardProps {
  project: IProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'glass-card rounded-2xl overflow-hidden transition-all duration-500',
        project.featured ? '-translate-y-3 shadow-2xl' : 'hover:-translate-y-3'
      )}
    >
      <CardContent className="p-0 overflow-visible">
        {/* Image */}
        <div className="relative h-50 overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            className={cn(
              'object-cover transition-transform duration-700',
              project.featured ? 'scale-110' : 'group-hover:scale-110'
            )}
          />

          {/* Featured overlay */}
          {project.featured && (
            <div className="absolute inset-0 bg-text-dark/60 backdrop-blur-sm flex items-center justify-center">
              <AppButton size="sm" className="px-6 py-3 text-xs">
                XEM DỰ ÁN
              </AppButton>
            </div>
          )}

          {/* Badges */}
          {!project.featured && (
            <div className="absolute top-4 left-4 flex gap-2">
              <Chip
                size="sm"
                variant="secondary"
                className="bg-text-dark/60 backdrop-blur-md text-text-light text-xs font-bold"
              >
                {project.year}
              </Chip>
              <Chip
                size="sm"
                color="accent"
                variant="primary"
                className="text-text-light text-xs font-bold uppercase"
              >
                {project.platform}
              </Chip>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-8">
          <h3
            className="text-xl text-text-dark mb-3 font-bold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            {project.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8 pt-0">
        <a
          href="#"
          className="inline-flex items-center text-primary font-bold text-tiny hover:translate-x-1 transition-transform"
        >
          TÌM HIỂU THÊM <ArrowRight size={16} strokeWidth={2} className="ml-2" />
        </a>
      </CardFooter>
    </Card>
  )
}
