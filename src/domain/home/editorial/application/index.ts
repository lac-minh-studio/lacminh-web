import type { IBlogPost, IStatItem } from '../model/editorial'
import {
  BLOG_FILTERS as STATIC_BLOG_FILTERS,
  BLOG_HERO_STATS as STATIC_BLOG_HERO_STATS,
  mockCarouselSlides as staticCarouselSlides,
  mockGridPosts as staticGridPosts,
} from '../infrastructure/static/editorial'

export const BLOG_FILTERS: string[] = STATIC_BLOG_FILTERS
export const BLOG_HERO_STATS: IStatItem[] = STATIC_BLOG_HERO_STATS
export const mockCarouselSlides: IBlogPost[] = staticCarouselSlides
export const mockGridPosts: IBlogPost[] = staticGridPosts
