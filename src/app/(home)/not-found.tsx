import { PublicNotFoundContent } from '@/domain/home/shell/presentation'
import { HomeShell } from './home-shell'

export default function HomeNotFound() {
  return (
    <HomeShell>
      <PublicNotFoundContent />
    </HomeShell>
  )
}
