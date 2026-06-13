import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedPrice from '@/components/ui/AnimatedPrice'
import PlanCard from '@/components/ui/PlanCard'
import { AD_SETTING_PLANS, BUILD_PLANS, CARE_PLANS, PLAN_NOTES } from '@/lib/constants'

export const metadata: Metadata = {
  title: '제작플랜 & 가격안내 | WEFLOW',
  description: 'WEFLOW 홈페이지 제작 플랜, 케어 플랜, 광고 세팅 가격을 안내합니다.',
}

function AdSettingCard({
  name,
  originalPrice,
  salePrice,
  discountRate,
  features,
}: (typeof AD_SETTING_PLANS)[number]) {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col">
      <h3 className="text-lg font-semibold text-[#191F28] mb-4">{name}</h3>
      <div className="mb-5">
        <span className="text-sm text-[#8B95A1] line-through block tabular-nums">
          <AnimatedPrice amount={originalPrice} className="count-flash" suffix="원" duration={1100} />
          ~
        </span>
        <div className="flex items-baseline gap-1 flex-wrap">
          <AnimatedPrice
            amount={salePrice}
            className="text-3xl font-bold text-[#F04452] tabular-nums count-flash"
            suffix="원"
            duration={1500}
          />
          <span className="text-3xl font-bold text-[#F04452]">~</span>
          <span className="ml-1 text-sm font-medium text-[#F04452]">{discountRate}</span>
        </div>
        <span className="text-xs text-[#8B95A1] mt-1 block">VAT 포함</span>
      </div>
      <ul className="flex-1 space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[#4E5968]">
            <span className="text-[#1B64DA] font-bold mt-0.5 shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/diagnosis"
        className="block text-center bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
      >
        무료상담 시작하기
      </Link>
    </div>
  )
}

export default function PlanPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm font-semibold text-[#1B64DA] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-4">
            제작플랜 &amp; 가격안내
          </h1>
          <p className="text-base text-[#4E5968] leading-relaxed max-w-xl mx-auto">
            제작 플랜, 케어 플랜, 광고 세팅까지
            <br className="hidden md:block" />
            필요한 구성만 명확하게 선택할 수 있도록 정리했습니다.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              제작 플랜
            </h2>
            <p className="text-base text-[#4E5968]">
              랜딩부터 홈페이지+랜딩까지 제작 범위에 맞춰 선택하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BUILD_PLANS.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              케어 플랜
            </h2>
            <p className="text-base text-[#4E5968]">
              유지보수와 채널 운영을 정기적으로 맡길 수 있는 월간 플랜입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARE_PLANS.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              광고 세팅
            </h2>
            <p className="text-base text-[#4E5968]">
              광고 채널 세팅부터 문의 연결 구조까지 함께 정리합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AD_SETTING_PLANS.map((plan) => (
              <AdSettingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-t border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ul className="space-y-1.5">
            {PLAN_NOTES.map((note) => (
              <li key={note} className="text-sm text-[#8B95A1]">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
