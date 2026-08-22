import { HomeShell } from './home-shell'

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <HomeShell>{children}</HomeShell>
}
