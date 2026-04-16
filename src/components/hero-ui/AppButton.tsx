import Link from 'next/link'
import { Button, type ButtonProps } from '@heroui/react'
import { cn } from '@/lib/utils'

type AppVariant = 'primary' | 'outline'

interface AppButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  variant?: AppVariant
  isShadow?: boolean
  href?: string
}

export function AppButton({
  variant = 'primary',
  isShadow= true,
  href,
  className,
  children,
  ...props
}: AppButtonProps) {
  const base = 'font-bold rounded-lg transition-all active:scale-95'

  const variantClass: Record<AppVariant, string> = {
    primary:
      `bg-primary text-text-light shadow-x-0 hover:bg-primary/90 ${isShadow ? 'shadow-(--shadow-neu-cta)' : ''}`,
    outline:
      'border-2 border-text-light text-text-light bg-transparent backdrop-blur-sm hover:bg-white/10',
  }

  const btn = (
    <Button {...props} className={cn(base, variantClass[variant], className)}>
      {children}
    </Button>
  )

  if (href) {
    return <Link href={href}>{btn}</Link>
  }

  return btn
}
