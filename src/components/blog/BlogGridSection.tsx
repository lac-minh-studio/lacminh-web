'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { BlogCard } from './BlogCard'
import type { IBlogPost } from '@/types/blogs'
import { cn } from '@/lib/utils'

const LOAD_MORE_STEP = 4

interface BlogGridSectionProps {
  posts: IBlogPost[]
  filters: string[]
}

export function BlogGridSection({ posts, filters }: BlogGridSectionProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesFilter = activeFilter === filters[0] || p.category === activeFilter
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [posts, activeFilter, searchQuery, filters])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const handleFilterChange = (f: string) => {
    setActiveFilter(f)
    setVisibleCount(8)
  }

  return (
    <section className="w-full space-y-6">
      {/* Filter bar */}
      <div className="glass-card rounded-3xl px-4 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 grow">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border',
                activeFilter === f
                  ? 'bg-primary text-text-light border-primary'
                  : 'bg-transparent text-text-secondary border-primary/30 hover:bg-primary/10',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative shrink-0">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="pl-8 pr-4 py-1.5 rounded-full bg-background/60 border border-primary/20 text-tiny text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary/60 w-full sm:w-48"
          />
        </div>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {visible.map((post) => (
          <BlogCard key={post.id} post={post} variant="full" />
        ))}
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <p className="text-center text-text-muted text-tiny py-12">
          Không tìm thấy bài viết phù hợp.
        </p>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
            className="w-56 py-2.5 rounded-full border border-primary text-primary text-tiny font-semibold hover:bg-primary/10 transition-colors"
          >
            Xem thêm bài viết
          </button>
        </div>
      )}
    </section>
  )
}
