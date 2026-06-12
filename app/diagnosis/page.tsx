import DiagnosisForm from '@/components/ui/DiagnosisForm'
import ReviewSlider from '@/components/ui/ReviewSlider'

const CHECKLIST = [
  '홈페이지가 없거나 오래됐나요?',
  '광고는 하고 싶은데 어디서 시작할지 모르겠나요?',
  '홈페이지 제작 비용이 걱정되나요?',
  '제작 후 관리가 막막하신가요?',
]

export default function DiagnosisPage() {
  return (
    <main>
      {/* 히어로 */}
      <section className="py-20 md:py-28 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm font-semibold text-[#1B64DA] mb-3">무료 · 부담 없음</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#191F28] mb-4">
            무료진단 신청
          </h1>
          <p className="text-base text-[#4E5968] leading-relaxed max-w-xl mx-auto">
            홈페이지 제작부터 광고 운영까지,
            <br className="hidden md:block" />
            전문가가 직접 맞춤 견적과 전략을 제안드립니다.
          </p>
        </div>
      </section>

      {/* 체크리스트 + 폼 */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* 체크리스트 */}
            <div>
              <p className="text-sm font-semibold text-[#1B64DA] mb-3">이런 분께 추천드립니다</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-8">
                지금 무료진단이
                <br />
                필요한 순간
              </h2>
              <ul className="flex flex-col gap-4">
                {CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white border border-[#E5E8EB] shadow-sm px-5 py-4"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-[#1B64DA] font-bold text-sm">—</span>
                    <span className="text-base text-[#191F28]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-[#EEF4FF] border border-[#C7D9F8] px-6 py-5">
                <p className="text-sm font-semibold text-[#1B64DA] mb-1">무료진단 안내</p>
                <ul className="flex flex-col gap-1.5 text-sm text-[#4E5968]">
                  <li>• 신청 후 평균 2시간 이내 연락드립니다</li>
                  <li>• 맞춤 견적 및 전략을 무료로 제공합니다</li>
                  <li>• 계약 의무 없이 자유롭게 상담 가능합니다</li>
                </ul>
              </div>
            </div>

            {/* 진단 폼 */}
            <div>
              <DiagnosisForm />
            </div>
          </div>
        </div>
      </section>

      {/* 후기 슬라이더 */}
      <ReviewSlider />

      {/* 하단 안내 */}
      <section className="py-16 md:py-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
            무료진단은 완전 무료입니다.
          </p>
          <p className="text-base text-[#4E5968] leading-relaxed mb-6">
            부담 없이 신청하세요. 전문가가 빠르게 연락드립니다.
          </p>
          <a
            href="#diagnosis-form"
            className="inline-block bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-8 py-3.5 transition-colors text-base"
          >
            지금 바로 무료진단 신청하기
          </a>
        </div>
      </section>
    </main>
  )
}
