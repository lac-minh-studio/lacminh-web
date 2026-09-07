import type { ReactNode } from 'react'

export type AdminShellProps = Readonly<{
  children: ReactNode
}>

export function AdminShell({ children }: AdminShellProps) {
  return <>{children}</>
}
