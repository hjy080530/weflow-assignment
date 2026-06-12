import Link from 'next/link'
import ProcessSteps from '@/components/ui/ProcessSteps'

interface AdService {
  title: string
  description: string
}

const AD_SERVICES: AdService[] = [
  { title: '네이버 키워드광고', description: '검색 상단 노출, 키워드 세팅' },
  { title: '당근 플레이스', description: '지역 마케팅, 플레이스 최적화' },
  { title: '카카오톡 채널', description: '고객 문의 채널 운영' },
  { title: 'SNS 콘텐츠', description: '인스타그램·블로그 게시물 제작' },
  { title: '검색 최적화', description: 'SEO 지속 관리, 상위 노출' },
  { title: '월간 보고서', description: '광고 성과·유입 데이터 리포트' },
  { title: '24시간 CS', description: '연중무휴 고객 지원' },
  { title: '무기한 수정', description: '케어플랜 기간 내 무제한 수정' },
]

export default function ServicePage() {
  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      {/* 섹션 1: 히어로 */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E5E8EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm font-semibold text-[#1B64DA] mb-3 tracking-wide uppercase">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#191F28] mb-4">
            WEFLOW 서비스
          </h1>
          <p className="text-base text-[#4E5968] leading-relaxed max-w-xl mx-auto">
            홈페이지 제작부터 광고 운영·사후관리까지
          </p>
        </div>
      </section>

      {/* 섹션 2: 제작 진행 과정 (6단계) */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
              제작 진행 과정
            </h2>
            <p className="text-base text-[#4E5968] leading-relaxed">
              상담부터 배포, 사후관리까지 6단계로 진행됩니다.
            </p>
          </div>
          <ProcessSteps variant="detailed" />
        </div>
      </section>

      {/* 섹션 3: 광고 운영·사후관리 시스템 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
              광고 운영·사후관리 시스템
            </h2>
            <p className="text-base text-[#4E5968] leading-relaxed">
              제작 이후에도 지속적인 성과를 만들어 드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AD_SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col gap-2"
              >
                <h3 className="text-base font-semibold text-[#191F28]">{service.title}</h3>
                <p className="text-sm text-[#4E5968] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 4: CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#191F28]">
            지금 바로 시작해 보세요
          </h2>
          <p className="text-base text-[#4E5968] leading-relaxed max-w-md">
            무료 진단 신청 후 맞춤 견적을 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/diagnosis"
              className="bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors text-center"
            >
              무료 상담 시작하기
            </Link>
            <Link
              href="/plan"
              className="border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-6 py-3 transition-colors text-center"
            >
              제작플랜 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
