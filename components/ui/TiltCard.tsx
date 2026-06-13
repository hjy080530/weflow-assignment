'use client'
import { useRef } from 'react'
import type { MouseEvent } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className = '', intensity = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02,1.02,1.02)`
  }

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
