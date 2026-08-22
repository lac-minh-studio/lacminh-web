import { Footer, Navbar } from '@/domain/home/ui'

export function HomeShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
