'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import ProcessSteps from '@/components/ui/ProcessSteps'

interface AfterService {
  title: string
  description: string
}

const AFTER_SERVICES: AfterService[] = [
  { title: '블로그 업로드', description: '네이버·티스토리 정기 포스팅, 키워드 최적화' },
  { title: '인스타 업로드', description: '브랜드 맞춤 피드 콘텐츠 제작·업로드' },
  { title: '스레드 업로드', description: '단문 콘텐츠로 바이럴 확산 유도' },
  { title: '네이버 키워드 광고', description: '검색 상단 노출, 키워드 세팅·입찰 최적화' },
  { title: '당근 플레이스 광고', description: '지역 마케팅, 플레이스 상위 노출 관리' },
  { title: '네이버 서치어드바이저', description: '사이트 색인 점검, 검색 반영 모니터링' },
  { title: '구글 서치 콘솔', description: '구글 색인 등록, 오류 점검·개선' },
  { title: '사이트맵 등록', description: '검색엔진 크롤링 최적화, 전체 URL 관리' },
]

function useRevealOnScroll(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>('.reveal')
    if (!els || els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}

export default function ServicePage() {
  const mainRef = useRef<HTMLElement>(null)
  useRevealOnScroll(mainRef as React.RefObject<HTMLElement>)

  return (
    <main ref={mainRef} className="min-h-screen" style={{ background: '#F9FAFB', color: '#191F28' }}>
      {/* 히어로 (다크) */}
      <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: '#09090F', color: '#F0F0F8' }}>
        {/* 배경 글로우 */}
        <div
          className="hero-glow pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            style={{
              width: '700px',
              height: '400px',
              background: 'radial-gradient(ellipse at center, rgba(27,100,218,0.22) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="hero-label text-sm font-semibold text-blue-400 mb-4 tracking-widest uppercase">
            Services
          </p>
          <h1 className="hero-title text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            상담부터 광고 운영까지,<br className="hidden md:block" />
            <span style={{ color: '#60A5FA' }}>한 팀</span>이 끝까지 책임집니다
          </h1>
          <p className="hero-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: '#9098AA' }}>
            제작은 시작일 뿐입니다. 6단계 프로세스와 운영 시스템으로<br className="hidden md:block" />
            오픈 이후의 성장까지 함께합니다.
          </p>
          <div className="hero-tags flex flex-wrap justify-center gap-3">
            {['6단계 프로세스', '한 팀 전담', '오픈 이후 성장'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(27,100,218,0.15)',
                  border: '1px solid rgba(27,100,218,0.35)',
                  color: '#60A5FA',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div style={{ height: '1px', background: '#E5E8EB' }} />

      {/* 제작 진행 과정 */}
      <section className="py-20 md:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-14 text-center">
            <p className="reveal text-sm font-semibold text-[#1B64DA] mb-3 tracking-widest uppercase">
              Process
            </p>
            <h2 className="reveal reveal-delay-1 text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
              제작 진행 과정
            </h2>
            <p className="reveal reveal-delay-2 text-sm leading-relaxed" style={{ color: '#4E5968' }}>
              상담부터 배포, 사후관리까지 6단계로 진행됩니다.
            </p>
          </div>
          <ProcessSteps variant="detailed" />
        </div>
      </section>

      <div style={{ height: '1px', background: '#E5E8EB' }} />

      {/* 광고 운영·사후관리 시스템 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-14 text-center">
            <p className="reveal text-sm font-semibold text-[#1B64DA] mb-3 tracking-widest uppercase">
              Aftercare
            </p>
            <h2 className="reveal reveal-delay-1 text-2xl md:text-3xl font-bold text-[#191F28] mb-3">
              광고 운영 · 사후관리 시스템
            </h2>
            <p className="reveal reveal-delay-2 text-sm leading-relaxed" style={{ color: '#4E5968' }}>
              오픈 이후가 진짜 시작입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AFTER_SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`reveal reveal-delay-${i + 1} rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3 group`}
              >
                <h3 className="text-sm font-semibold text-[#191F28] group-hover:text-[#1B64DA] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8B95A1' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: '1px', background: '#E5E8EB' }} />

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-7">
          {/* CTA 글로우 */}
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <div
                style={{
                  width: '500px',
                  height: '200px',
                  background: 'radial-gradient(ellipse at center, rgba(27,100,218,0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
            </div>
            <h2 className="reveal relative text-2xl md:text-4xl font-bold text-[#191F28] leading-tight">
              어떤 업종이든,<br />
              <span style={{ color: '#1B64DA' }}>문의가 들어오는 구조</span>부터 설계합니다
            </h2>
          </div>
          <p className="reveal reveal-delay-1 text-sm leading-relaxed max-w-sm" style={{ color: '#4E5968' }}>
            무료 진단 · 견적 · 케어 플랜 안내까지 한 번에.<br />
            전담 매니저가 직접 응대합니다.
          </p>
          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/diagnosis"
              className="btn-ripple shimmer font-semibold rounded-xl px-8 py-3.5 transition-all duration-200 text-center text-sm hover:scale-105 hover:shadow-lg"
              style={{
                background: '#1B64DA',
                color: '#fff',
                boxShadow: '0 0 24px rgba(27,100,218,0.35)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(27,100,218,0.6)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(27,100,218,0.35)'
              }}
            >
              무료 진단 신청
            </Link>
            <a
              href="tel:010-2971-7280"
              className="font-semibold rounded-xl px-8 py-3.5 transition-all duration-200 text-center text-sm hover:scale-105"
              style={{
                border: '1px solid #E5E8EB',
                color: '#191F28',
                background: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1B64DA'
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(27,100,218,0.06)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E5E8EB'
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#FFFFFF'
              }}
            >
              010-2971-7280
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
