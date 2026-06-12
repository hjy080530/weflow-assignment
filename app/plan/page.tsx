import type { Metadata } from 'next'
import Link from 'next/link'
import PlanCard from '@/components/ui/PlanCard'

export const metadata: Metadata = {
  title: '제작플랜 & 가격안내 | WEFLOW',
  description: 'WEFLOW 홈페이지 제작 플랜, 케어 플랜, 광고 세팅 가격을 안내합니다.',
}

const BUILD_PLANS = [
  {
    name: 'START',
    originalPrice: '498,000원',
    salePrice: '249,000원',
    discountRate: '50% OFF',
    isMaster: false,
    features: [
      '랜딩페이지 1종',
      '모바일 반응형',
      '기본 SEO',
      '1개월 무료 수정',
      '도메인 연결',
    ],
  },
  {
    name: 'GROW',
    originalPrice: '1,980,000원',
    salePrice: '990,000원',
    discountRate: '50% OFF',
    isMaster: false,
    features: [
      '홈페이지 5페이지',
      '모바일 반응형',
      'SEO 최적화',
      '3개월 무료 수정',
      '도메인+호스팅',
      '카카오톡 채널 연동',
    ],
  },
  {
    name: 'MASTER',
    originalPrice: '2,980,000원',
    salePrice: '1,490,000원',
    discountRate: '50% OFF',
    isMaster: true,
    features: [
      '홈페이지 10페이지',
      '모바일 반응형',
      'SEO 풀패키지',
      '6개월 무료 수정',
      '도메인+호스팅',
      '카카오톡 연동',
      '광고 세팅 포함',
      '브랜딩 컨설팅',
    ],
  },
]

const CARE_PLANS = [
  {
    name: 'WE CARE',
    originalPrice: '170,000원/월',
    salePrice: '89,000원',
    discountRate: '47% OFF',
    isMaster: false,
    features: ['월 콘텐츠 2회', '기본 CS 지원', '소셜 관리'],
  },
  {
    name: 'FLOW CARE',
    originalPrice: '378,000원/월',
    salePrice: '189,000원',
    discountRate: '50% OFF',
    isMaster: false,
    features: ['월 콘텐츠 8회', 'CS 우선지원', '광고 모니터링', 'SNS 운영'],
  },
  {
    name: 'WEFLOW CARE',
    originalPrice: '678,000원/월',
    salePrice: '339,000원',
    discountRate: '50% OFF',
    isMaster: true,
    features: [
      '무제한 콘텐츠',
      '24시간 CS',
      '광고 최적화',
      'SNS 풀운영',
      '월간 보고서',
    ],
  },
]

export default function PlanPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* 페이지 헤더 */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm font-semibold text-[#1B64DA] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-4">
            제작플랜 &amp; 가격안내
          </h1>
          <p className="text-base text-[#4E5968] leading-relaxed max-w-xl mx-auto">
            합리적인 가격으로 문의가 오는 홈페이지를 만들어드립니다.
            <br className="hidden md:block" />
            모든 플랜은 무료 상담 후 최종 확정됩니다.
          </p>
        </div>
      </section>

      {/* 제작 플랜 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              제작 플랜
            </h2>
            <p className="text-base text-[#4E5968]">
              비즈니스 규모에 맞는 플랜을 선택하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BUILD_PLANS.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* 케어 플랜 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              케어 플랜
            </h2>
            <p className="text-base text-[#4E5968]">
              제작 후 운영·광고·관리를 지속적으로 지원합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARE_PLANS.map((plan) => (
              <PlanCard key={plan.name} {...plan} perMonth />
            ))}
          </div>
        </div>
      </section>

      {/* 광고 세팅 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-2">
              광고 세팅
            </h2>
            <p className="text-base text-[#4E5968]">
              효과적인 광고 채널을 설정해 잠재 고객을 유입시킵니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-[#191F28] mb-4">
                네이버 키워드
              </h3>
              <div className="mb-5">
                <span className="text-sm text-[#8B95A1] line-through block">
                  298,000원~
                </span>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-3xl font-bold text-[#F04452]">
                    149,000원~
                  </span>
                  <span className="ml-1 text-sm font-medium text-[#F04452]">
                    50% OFF
                  </span>
                </div>
                <span className="text-xs text-[#8B95A1] mt-1 block">VAT 포함</span>
              </div>
              <ul className="flex-1 space-y-2 mb-6">
                {['네이버 키워드광고 세팅', '광고 계정 생성 및 구조 설계', '핵심 키워드 발굴', '소재 문구 작성'].map(
                  (f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4E5968]">
                      <span className="text-[#1B64DA] font-bold mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/diagnosis"
                className="block text-center bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                무료상담 시작하기
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-[#191F28] mb-4">
                당근 플레이스
              </h3>
              <div className="mb-5">
                <span className="text-sm text-[#8B95A1] line-through block">
                  158,000원~
                </span>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-3xl font-bold text-[#F04452]">
                    79,000원~
                  </span>
                  <span className="ml-1 text-sm font-medium text-[#F04452]">
                    50% OFF
                  </span>
                </div>
                <span className="text-xs text-[#8B95A1] mt-1 block">VAT 포함</span>
              </div>
              <ul className="flex-1 space-y-2 mb-6">
                {['당근 플레이스 광고 세팅', '지역 타겟 광고 설정', '프로필 최적화', '리뷰 관리 가이드'].map(
                  (f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4E5968]">
                      <span className="text-[#1B64DA] font-bold mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/diagnosis"
                className="block text-center bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                무료상담 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 안내문구 */}
      <section className="py-10 bg-white border-t border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ul className="space-y-1.5">
            {[
              '※ 도메인 비용 별도 (연 1~3만원)',
              '※ 광고비는 고객이 직접 결제 (최소 월 10만원 권장)',
              '※ VAT(부가세 10%) 포함 가격',
              '※ 케어플랜은 6개월 약정 기준',
              '※ 모든 플랜 무료 상담 후 확정',
            ].map((note, i) => (
              <li key={i} className="text-sm text-[#8B95A1]">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
