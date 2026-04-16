'use client'

// HeroUI v3 does not export HeroUIProvider — passthrough wrapper kept for future use
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
