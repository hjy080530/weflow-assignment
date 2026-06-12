'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCounter } from '@/hooks/useCounter'

const STATS = [
  { target: 300, suffix: '+', label: '제작 완료' },
  { target: 98, suffix: '%', label: '고객 만족도' },
  { target: 7, suffix: '일', label: '최대 납기' },
  { target: 24, suffix: 'h', label: '상담 지원' },
]

function StatItem({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(target, 1400, active)
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <span className="text-3xl md:text-4xl font-bold text-[#1B64DA] tabular-nums">
        {count}
        <span className="text-2xl md:text-3xl">{suffix}</span>
      </span>
      <span className="text-sm text-[#8B95A1] font-medium">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  const { ref, visible } = useScrollReveal(0.3)

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 py-14 md:py-16 border-y border-[#E5E8EB]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {STATS.map((s) => (
        <StatItem key={s.label} {...s} active={visible} />
      ))}
    </div>
  )
}
