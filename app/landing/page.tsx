import DiagnosisForm from '@/components/ui/DiagnosisForm'
import ProcessSteps from '@/components/ui/ProcessSteps'
import ReviewSlider from '@/components/ui/ReviewSlider'
import PlanCard from '@/components/ui/PlanCard'
import Link from 'next/link'
import { AD_SETTING_PLANS, BUILD_PLANS, CARE_PLANS } from '@/lib/constants'

const ALL_PLAN_CARDS = [
  ...BUILD_PLANS.map((plan) => ({ ...plan, perMonth: plan.perMonth ?? false, isMaster: plan.isMaster ?? false })),
  ...CARE_PLANS.map((plan) => ({ ...plan, perMonth: plan.perMonth ?? false, isMaster: plan.isMaster ?? false })),
  ...AD_SETTING_PLANS.map((plan) => ({ ...plan, perMonth: false, isMaster: false })),
]

const INQUIRY_POINTS = [
  { label: '문의 구조 설계', desc: '단순 홈페이지가 아닌 문의로 이어지는 구조를 설계합니다' },
  { label: '광고 연동 최적화', desc: '네이버·당근 광고와 연동해 문의율을 극대화합니다' },
  { label: '지속적인 운영', desc: '케어플랜으로 꾸준한 업데이트와 광고 최적화를 지원합니다' },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* 좌측 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 1. 메인 카피 */}
        <section className="py-20 md:py-28 bg-[#F9FAFB]">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <p className="text-sm font-medium text-[#1B64DA] mb-4">
              랜딩&홈페이지 제작 · 광고 운영 · 운영 관리
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#191F28] mb-6 leading-tight">
              문의로 이어지는<br />홈페이지,<br />지금 시작하세요
            </h1>
            <p className="text-base text-[#4E5968] leading-relaxed mb-8">
              단순 제작이 아닌 문의 구조까지 설계합니다.<br />
              3~7일 내 빠른 완성, 광고 연동, 사후 관리까지 원스톱.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#diagnosis-form"
                className="bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-md"
              >
                무료 진단 후 견적받기 →
              </a>
              <a
                href="#diagnosis-form"
                className="border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-6 py-3 transition-colors"
              >
                실제 제작 성공 보기 →
              </a>
            </div>
          </div>
        </section>

        {/* 2. WEFLOW CARE PLAN 카드 5개 */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-8">
              WEFLOW CARE PLAN
            </h2>
            <div className="flex flex-col gap-4">
              {CARE_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm p-5 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#191F28]">{plan.name}</p>
                    <p className="text-sm text-[#4E5968] mt-0.5">{plan.features.join(' / ')}</p>
                  </div>
                  <span className="text-sm font-bold text-[#F04452] whitespace-nowrap">
                    {`${plan.salePrice.toLocaleString('ko-KR')}원~/월`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 문의 증가 구조 */}
        <section className="py-20 md:py-28 bg-[#F9FAFB]">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-4">
              문의가 늘어나는 구조를<br />설계합니다
            </h2>
            <p className="text-base text-[#4E5968] mb-8">
              홈페이지만 만드는 게 아닙니다. 방문자가 문의하게 되는 구조를 함께 설계합니다.
            </p>
            <div className="flex flex-col gap-5">
              {INQUIRY_POINTS.map((pt) => (
                <div key={pt.label} className="flex gap-4 border-l-2 border-[#1B64DA] pl-4">
                  <div>
                    <p className="font-semibold text-[#191F28]">{pt.label}</p>
                    <p className="text-sm text-[#4E5968] mt-0.5">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 가격 카드 (8개 전체) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-8">
              제작 플랜 & 가격안내
            </h2>
            <div className="flex flex-col gap-5">
              {ALL_PLAN_CARDS.map((plan) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  originalPrice={plan.originalPrice}
                  salePrice={plan.salePrice}
                  discountRate={plan.discountRate}
                  features={plan.features}
                  isMaster={plan.isMaster}
                  perMonth={plan.perMonth}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/plan" className="text-[#1B64DA] text-sm font-medium hover:underline">
                전체 플랜 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 5. 제작 진행 과정 */}
        <section className="py-20 md:py-28 bg-[#F9FAFB]">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-8">
              제작 진행 과정
            </h2>
            <ProcessSteps variant="detailed" />
          </div>
        </section>

        {/* 6. 무료진단 섹션 */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-4">
              지금 무료진단 받아보세요
            </h2>
            <p className="text-base text-[#4E5968] mb-8">
              무료진단은 완전 무료입니다. 부담 없이 신청하세요.
            </p>
            <Link
              href="/diagnosis"
              className="inline-block bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-8 py-4 transition-colors text-lg shadow-md"
            >
              무료진단 후 견적받기 →
            </Link>
          </div>
        </section>

        {/* 7. 후기 슬라이더 */}
        <section className="py-20 md:py-28 bg-[#F9FAFB] overflow-hidden">
          <div className="max-w-2xl mx-auto px-4 md:px-8 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28]">고객 후기</h2>
          </div>
          <ReviewSlider />
        </section>
      </div>

      {/* 우측 sticky 문의창 (lg 이상에서만 표시) */}
      <div
        id="diagnosis-form"
        className="hidden lg:block lg:w-[380px] xl:w-[420px] shrink-0"
      >
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-6 border-l border-[#E5E8EB] bg-white">
          <p className="text-xs font-bold text-[#1B64DA] mb-2">무료진단 신청</p>
          <h3 className="text-lg font-bold text-[#191F28] mb-4">
            지금 바로 견적받기
          </h3>
          <DiagnosisForm />
        </div>
      </div>

      {/* 모바일: 하단 폼 */}
      <div className="lg:hidden">
        <section className="py-12 bg-white border-t border-[#E5E8EB]">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h3 className="text-xl font-bold text-[#191F28] mb-6">무료진단 신청</h3>
            <DiagnosisForm />
          </div>
        </section>
      </div>
    </div>
  )
}
