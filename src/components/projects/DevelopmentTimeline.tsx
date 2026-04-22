import type { ITimelineMilestone } from '@/types/projects'

interface DevelopmentTimelineProps {
  milestones: ITimelineMilestone[]
}

export function DevelopmentTimeline({ milestones }: DevelopmentTimelineProps) {
  return (
    <div className="relative flex items-center justify-between w-full">
      {/* Connecting line */}
      <div className="absolute w-full h-px bg-primary/30 top-1/2 -translate-y-1/2 pointer-events-none" />

      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className="relative flex flex-col items-center z-10"
        >
          {/* Label above */}
          <span className="font-body text-2xs uppercase text-gold mb-3 font-semibold text-center">
            {milestone.label}
          </span>

          {/* Dot */}
          {milestone.status === 'active' ? (
            <div className="relative flex items-center justify-center">
              <div className="proj-timeline-dot-active" />
              {/* Ping rings */}
              <div className="absolute rounded-full border border-primary animate-ping opacity-75 scale-150 inset-0" />
              <div className="absolute rounded-full border border-primary/50 animate-ping opacity-50 scale-125 -inset-1 proj-delay-500" />
            </div>
          ) : milestone.status === 'pending' ? (
            <div className="proj-timeline-dot-dashed" />
          ) : (
            <div className="proj-timeline-dot" />
          )}

          {/* Date below */}
          <span className="font-body text-xs text-text-dark mt-3 text-center">
            {milestone.date}
          </span>
          {milestone.status === 'pending' && (
            <span className="font-body text-2xs text-text-dark/70 uppercase mt-1 text-center">
              Pending
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
