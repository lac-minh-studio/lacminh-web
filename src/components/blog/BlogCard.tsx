import Image from 'next/image'
import type { IBlogPost } from '@/types/blogs'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: IBlogPost
  variant?: 'compact' | 'full'
  className?: string
}

export function BlogCard({ post, variant = 'full', className = '' }: BlogCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full not-[]:glass-card shadow-(--shadow-neu-light)', className
      )}
    >
      {/* Cover image */}
      <div
        className={'relative overflow-hidden w-full aspect-4/3'}
      >
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1 grow">
        {/* Category */}
        <span className="text-2xs uppercase font-bold text-primary tracking-wider">
          {post.category}
        </span>

        {/* Title */}
        <h4
          className={cn(
            'font-bold leading-snug text-text-dark',
            variant === 'compact' ? 'text-base line-clamp-3 grow' : 'text-lg line-clamp-2',
          )}
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {post.title}
        </h4>

        {/* Excerpt — full variant only */}
        {variant === 'full' && post.excerpt && (
          <p className="text-2xs text-text-secondary line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-1 flex items-center justify-between gap-2">
          {variant === 'full' && post.author && (
            <span className="text-2xs text-text-muted truncate">{post.author}</span>
          )}
          <span className="text-2xs text-text-secondary font-semibold ml-auto">
            {post.date}
          </span>
        </div>
      </div>
    </article>
  )
}
