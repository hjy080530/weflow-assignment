interface Step {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: '상담·진단',
    description: '현재 상황 파악, 목표 설정, 맞춤 솔루션 제안',
  },
  {
    number: '02',
    title: '기획·설계',
    description: '사이트맵 구성, 와이어프레임, UI/UX 설계',
  },
  {
    number: '03',
    title: '디자인',
    description: '브랜드 아이덴티티 반영, 반응형 디자인 제작',
  },
  {
    number: '04',
    title: '개발·제작',
    description: 'Next.js 기반 고속 개발, SEO 최적화 코드',
  },
  {
    number: '05',
    title: '검수·배포',
    description: 'QA 테스트, 도메인 연결, Vercel 배포',
  },
  {
    number: '06',
    title: '광고운영·사후관리',
    description: '네이버/당근 광고, 콘텐츠 운영, 무기한 CS',
  },
]

interface ProcessStepsProps {
  variant?: 'simple' | 'detailed'
}

export default function ProcessSteps({ variant = 'simple' }: ProcessStepsProps) {
  if (variant === 'simple') {
    return (
      <div className="w-full overflow-x-auto">
        <div className="flex items-center min-w-max gap-0">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 px-4">
                <span className="text-xs font-bold text-[#1B64DA] tracking-widest">{step.number}</span>
                <span className="text-sm font-semibold text-[#191F28] text-center whitespace-nowrap">
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <span className="text-[#8B95A1] text-sm mx-1">›</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // detailed variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {STEPS.map((step) => (
        <div
          key={step.number}
          className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col gap-3"
        >
          <span className="text-xs font-bold text-[#1B64DA] tracking-widest">{step.number}</span>
          <h3 className="text-lg font-semibold text-[#191F28]">{step.title}</h3>
          <p className="text-base text-[#4E5968] leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
