'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export default function ScrollReveal({ children, className = '', delay = 0, threshold }: Props) {
  const { ref, visible } = useScrollReveal(threshold)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
