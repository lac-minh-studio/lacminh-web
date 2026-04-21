export function OrnamentalDivider() {
  return (
    <div className="flex items-center w-full gap-4" aria-hidden="true">
      <div className="flex-1 h-px bg-primary/30" />
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <div className="w-2.5 h-2.5 rounded-full border border-primary/60 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-primary/60" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
      </div>
      <div className="flex-1 h-px bg-primary/30" />
    </div>
  )
}
