import Link from 'next/link'
import ProcessSteps from '@/components/ui/ProcessSteps'
import ReviewSlider from '@/components/ui/ReviewSlider'
import { CASE_LIST } from '@/lib/constants'
import CaseCard from '@/components/ui/CaseCard'
import StatsSection from '@/components/ui/StatsSection'
import ScrollReveal from '@/components/ui/ScrollReveal'

const BENEFITS = [
  { title: 'WEFLOW 케어플랜', desc: '제작·광고·운영 원스톱 서비스' },
  { title: '빠른 제작', desc: '3~7일 내 완성, 빠른 런칭' },
  { title: '합리적 비용', desc: '50% 할인된 가성비 패키지' },
  { title: '24시간 상담', desc: '연중무휴 전담 상담 지원' },
  { title: '광고·운영 지원', desc: '네이버·당근 광고 직접 운영' },
  { title: '사후 관리', desc: '무기한 수정·CS 제공' },
]

const PROCESS_FLOW = [
  { step: '01', label: '고객 의뢰' },
  { step: '02', label: '접수 후 제작' },
  { step: '03', label: '3~7일 완료' },
  { step: '04', label: '사후 관리' },
]

const CHECKLIST = [
  '홈페이지가 없거나 오래됐나요?',
  '광고는 하고 싶은데 어디서 시작할지 모르겠나요?',
  '홈페이지 제작 비용이 걱정되나요?',
  '제작 후 관리가 막막하신가요?',
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 메인 배너 */}
      <section className="bg-[#F9FAFB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <p className="hero-label text-sm font-medium text-[#1B64DA] mb-4">
            랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션
          </p>
          <h1 className="hero-title text-4xl md:text-5xl font-bold tracking-tight text-[#191F28] mb-6 leading-tight">
            문의로 이어지는<br />홈페이지를 만듭니다
          </h1>
          <p className="hero-body text-base text-[#4E5968] leading-relaxed mb-8 max-w-xl">
            홈페이지 제작부터 광고 연동·운영 관리까지<br />
            단순 제작이 아닌 문의 구조까지 설계합니다
          </p>

          <div className="hero-cta flex flex-wrap gap-3 mb-10">
            <Link
              href="/diagnosis"
              className="bg-[#1B64DA] hover:bg-[#1348A8] active:scale-95 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-150 shadow-md"
            >
              무료 진단 신청
            </Link>
            <Link
              href="/cases"
              className="border border-[#E5E8EB] hover:border-[#1B64DA] active:scale-95 text-[#191F28] rounded-xl px-6 py-3 transition-all duration-150"
            >
              성공 사례 보기
            </Link>
            <Link
              href="/landing"
              className="border border-[#1B64DA] text-[#1B64DA] rounded-xl px-6 py-3 transition-all duration-150 hover:bg-[#1B64DA]/5 active:scale-95"
            >
              WEFLOW 랜딩 페이지
            </Link>
          </div>

          <div className="hero-tags flex flex-wrap gap-3">
            {['케어 플랜 (제작·광고·운영)', '빠른제작 (3일~7일)', '합리적 비용'].map((tag) => (
              <span
                key={tag}
                className="text-sm text-[#1B64DA] bg-[#1B64DA]/10 px-4 py-1.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <StatsSection />
        </div>
      </section>

      {/* 케어 플랜 혜택 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
              WEFLOW 케어플랜 혜택
            </h2>
            <p className="text-base text-[#4E5968]">
              제작부터 운영까지, 한 곳에서 모두 해결하세요
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col gap-2 h-full">
                  <h3 className="text-base font-semibold text-[#191F28]">{b.title}</h3>
                  <p className="text-sm text-[#4E5968]">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 프로세스 플로우 */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-0 bg-[#F9FAFB] rounded-2xl p-6">
              {PROCESS_FLOW.map((p, i) => (
                <div key={p.step} className="flex items-center">
                  <div className="flex flex-col items-center gap-1 px-4 py-2">
                    <span className="text-xs text-[#8B95A1]">{p.step}</span>
                    <span className="text-sm font-semibold text-[#191F28] whitespace-nowrap">{p.label}</span>
                  </div>
                  {i < PROCESS_FLOW.length - 1 && (
                    <span className="text-[#1B64DA] font-bold text-lg mx-1">→</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 성공사례 섹션 */}
      <section className="py-20 md:py-28 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-start gap-12">
            <ScrollReveal className="md:w-1/3 flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#191F28]">
                다양한 업종의<br />성공사례
              </h2>
              <p className="text-base text-[#4E5968] leading-relaxed">
                PT샵, 필라테스, 카페, 미용실 등<br />
                다양한 업종에서 WEFLOW와 함께<br />
                홈페이지 문의를 늘렸습니다
              </p>
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-1 text-[#1B64DA] font-semibold hover:underline"
              >
                살펴보기 →
              </Link>
            </ScrollReveal>
            <div className="md:w-2/3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {CASE_LIST.slice(0, 4).map((c, i) => (
                  <ScrollReveal key={c.id} delay={i * 80}>
                    <CaseCard name={c.name} business={c.business} image={c.image} url={c.url} />
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-6 text-right">
                <Link href="/cases" className="text-[#1B64DA] font-medium hover:underline text-sm">
                  더보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 제작 진행 과정 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 flex flex-col gap-6">
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
                    제작 진행 과정
                  </h2>
                  <p className="text-base text-[#4E5968]">상담부터 사후 관리까지 4단계로 진행됩니다</p>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {PROCESS_FLOW.map((p, i) => (
                  <ScrollReveal key={p.step} delay={i * 100}>
                    <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E8EB] p-5 flex flex-col gap-2 hover:border-[#1B64DA] hover:shadow-sm transition-all duration-200 h-full">
                      <span className="text-xs font-bold text-[#1B64DA]">STEP {p.step}</span>
                      <span className="text-base font-semibold text-[#191F28]">{p.label}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6">
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
                    세부 6단계 프로세스
                  </h2>
                  <p className="text-base text-[#4E5968]">01 상담·진단부터 06 광고운영·사후관리까지</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <ProcessSteps variant="simple" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 무료진단 섹션 */}
      <section className="py-20 md:py-28 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-6">
              지금 무료진단 받아보세요
            </h2>
          </ScrollReveal>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
            {CHECKLIST.map((item, i) => (
              <ScrollReveal key={item} delay={i * 80}>
                <div className="flex items-center gap-2 bg-white border border-[#E5E8EB] rounded-xl px-5 py-3 text-sm text-[#4E5968] hover:border-[#1B64DA] hover:shadow-sm transition-all duration-200">
                  <span className="text-[#1B64DA] font-bold text-sm">—</span>
                  {item}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <Link
              href="/diagnosis"
              className="inline-block bg-[#1B64DA] hover:bg-[#1348A8] active:scale-95 text-white font-semibold rounded-xl px-8 py-4 transition-all duration-150 text-lg shadow-md"
            >
              무료진단 후 견적 받기
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 후기 슬라이더 */}
      <ReviewSlider />
    </div>
  )
}
