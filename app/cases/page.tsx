import Link from 'next/link'
import CaseCard from '@/components/ui/CaseCard'
import { CASE_LIST, BUSINESS_TYPES } from '@/lib/constants'

export const metadata = {
  title: '성공사례 | WEFLOW',
  description: '업종별 홈페이지 제작 포트폴리오 — PT샵, 필라테스, 카페, 미용실 등 28개 업종',
}

export default function CasesPage() {
  return (
    <div className="bg-white">
      {/* 헤더 섹션 */}
      <section className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-sm text-[#1B64DA] font-medium bg-[#1B64DA]/10 px-3 py-1 rounded-full mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#191F28] mb-4">
            성공사례
          </h1>
          <p className="text-base md:text-lg text-[#4E5968] leading-relaxed max-w-xl mx-auto">
            업종별 제작 포트폴리오 — 다양한 분야에서 문의를 만들어낸 실제 사례를 확인하세요
          </p>
        </div>
      </section>

      {/* 업종 필터 뱃지 */}
      <section className="py-10 border-b border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <p className="text-sm text-[#8B95A1] mb-4 font-medium">제작 가능 업종</p>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((type) => (
              <span
                key={type}
                className="text-sm text-[#4E5968] bg-[#F9FAFB] border border-[#E5E8EB] px-3 py-1 rounded-full hover:border-[#1B64DA] hover:text-[#1B64DA] transition-colors cursor-default"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 카드 그리드 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CASE_LIST.map((item) => (
              <CaseCard
                key={item.id}
                name={item.name}
                business={item.business}
                image={item.image}
                url={item.url}
              />
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/diagnosis"
              className="border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] hover:text-[#1B64DA] rounded-xl px-6 py-3 font-medium transition-colors"
            >
              더보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 md:py-28 bg-[#F9FAFB] border-t border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
            내 업종 성공사례 보기
          </h2>
          <p className="text-base text-[#4E5968] leading-relaxed mb-8 max-w-lg mx-auto">
            28개 업종 전반에 걸친 포트폴리오를 보유하고 있습니다.
            <br />
            무료진단 후 내 업종에 맞는 제작 사례와 견적을 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/diagnosis"
              className="bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-8 py-3.5 transition-colors"
            >
              무료진단 후 견적받기
            </Link>
            <Link
              href="/reservation"
              className="border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] hover:text-[#1B64DA] rounded-xl px-8 py-3.5 font-medium transition-colors"
            >
              상담 예약하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
