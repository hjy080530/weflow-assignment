'use client'

import { useEffect, useRef, useState } from 'react'
import { useCounter } from '@/hooks/useCounter'

interface AnimatedPriceProps {
  amount: number
  className?: string
  suffix?: string
  duration?: number
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('ko-KR').format(amount)
}

export default function AnimatedPrice({
  amount,
  className,
  suffix = '원',
  duration = 1400,
}: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)
  const count = useCounter(amount, duration, active)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={className}>
      {formatPrice(count)}
      {suffix}
    </span>
  )
}
