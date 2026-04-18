import { Check, Rocket, Clock, Users } from 'lucide-react'
import { Card, CardContent } from '@heroui/react'
import { MILESTONES } from '@/data/home'
import type { IMilestone } from '@/types/home'
import { cn } from '@/lib/utils'

function MilestoneNode({ milestone }: { milestone: IMilestone }) {
  const isCompleted = milestone.state === 'completed'
  const isActive = milestone.state === 'active'
  const isFuture = milestone.state === 'future'

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <div className="relative mb-8">
        {isActive && (
          <>
            <div className="absolute -inset-2 border-2 border-primary/40 rounded-full animate-ping" />
            <div className="absolute -inset-1 border-2 border-primary/60 rounded-full" />
          </>
        )}
        <div
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center relative z-10',
            isCompleted && 'bg-primary shadow-(--shadow-bronze-glow)',
            isActive && 'bg-primary shadow-2xl',
            isFuture && 'border-2 border-primary/40 bg-transparent'
          )}
        >
          {isCompleted && <Check size={18} strokeWidth={2.5} className="text-text-light" />}
          {isActive && <Rocket size={20} strokeWidth={2} className="text-text-light" />}
          {isFuture && <Clock size={18} strokeWidth={1.5} className="text-primary/40" />}
        </div>
      </div>

      {/* Card */}
      <Card
        className={cn(
          'glass-card rounded-2xl w-full',
          isCompleted && 'border-t-4 border-primary',
          isActive && 'border-t-4 border-primary bg-background/60 shadow-xl',
          isFuture && 'opacity-50 grayscale-[0.5]'
        )}
      >
        <CardContent className="p-4 sm:p-6 text-center">
          <span
            className={cn(
              'text-lg sm:text-2xl font-bold block mb-1',
              isFuture ? 'text-text-secondary' : 'text-primary'
            )}
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {milestone.year}
          </span>
          <h4
            className="text-sm sm:text-md font-bold text-text-dark mb-2"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {milestone.title}
          </h4>
          <p
            className={cn(
              'text-xs uppercase font-bold tracking-widest',
              isCompleted && 'text-primary',
              isActive && 'text-primary animate-pulse',
              isFuture && 'text-text-dark/40'
            )}
          >
            {isCompleted ? 'Completed' : isActive ? 'Active Now' : 'Future Plan'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 md:py-32 lg:py-40 bg-background relative overflow-hidden">
      <div className="content-container relative">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12 md:mb-16 lg:mb-24">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-text-dark font-semibold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Lộ Trình Phát Triển
          </h2>
          <Card
            className="hidden lg:block bg-white/40 backdrop-blur-md border border-primary/20"
          >
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users size={20} strokeWidth={1.5} className="text-primary" />
              </div>
              <div>
                <div className="text-text-dark font-bold text-sm">
                  🎯 100+ người đặt trước beta
                </div>
                <div className="text-text-secondary text-2xs uppercase tracking-wider font-bold opacity-60">
                  Cập nhật 24h qua
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-5.5 left-0 w-full h-px timeline-dashed hidden lg:block" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {MILESTONES.map((milestone) => (
              <MilestoneNode key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
