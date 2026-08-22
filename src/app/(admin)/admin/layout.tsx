import { AdminShell } from '@/domain/admin/shell/presentation'

export default function AdminRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminShell>{children}</AdminShell>
}
