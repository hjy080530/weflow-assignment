import Link from 'next/link'
import DiagnosisForm from '@/components/ui/DiagnosisForm'
import ProcessSteps from '@/components/ui/ProcessSteps'
import ReviewSlider from '@/components/ui/ReviewSlider'
import PlanCard from '@/components/ui/PlanCard'

const CARE_PLANS = [
  { title: 'WE CARE', desc: '월 콘텐츠 2회 + 기본 CS + 소셜 관리', price: '89,000원~/월' },
  { title: 'FLOW CARE', desc: '월 콘텐츠 8회 + CS 우선지원 + 광고 모니터링', price: '189,000원~/월' },
  { title: 'WEFLOW CARE', desc: '무제한 콘텐츠 + 24시간 CS + 광고 최적화 + SNS 풀운영', price: '339,000원~/월' },
  { title: '네이버 키워드 광고', desc: '검색 상단 노출, 키워드 세팅 대행', price: '149,000원~' },
  { title: '당근 플레이스', desc: '지역 마케팅, 플레이스 최적화 대행', price: '79,000원~' },
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
              <Link
                href="/cases"
                className="border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-6 py-3 transition-colors"
              >
                실제 제작 성공 보기 →
              </Link>
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
                  key={plan.title}
                  className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm p-5 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#191F28]">{plan.title}</p>
                    <p className="text-sm text-[#4E5968] mt-0.5">{plan.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-[#F04452] whitespace-nowrap">
                    {plan.price}
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

        {/* 4. 가격 카드 (제작 플랜 3개) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-8">
              제작 플랜 & 가격안내
            </h2>
            <div className="flex flex-col gap-5">
              <PlanCard
                name="START"
                originalPrice="498,000원"
                salePrice="249,000원"
                discountRate="50% OFF"
                features={['랜딩페이지 1종', '모바일 반응형', '기본 SEO', '1개월 무료 수정']}
              />
              <PlanCard
                name="GROW"
                originalPrice="1,980,000원"
                salePrice="990,000원"
                discountRate="50% OFF"
                features={['홈페이지 5페이지', '모바일 반응형', 'SEO 최적화', '3개월 무료 수정', '카카오톡 연동']}
              />
              <PlanCard
                name="MASTER"
                originalPrice="2,980,000원"
                salePrice="1,490,000원"
                discountRate="50% OFF"
                isMaster
                features={['홈페이지 10페이지', 'SEO 풀패키지', '6개월 무료 수정', '광고 세팅 포함', '브랜딩 컨설팅']}
              />
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
