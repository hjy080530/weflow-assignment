import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/constants'

const SERVICE_LINKS = [
  { label: '홈페이지 제작', href: '/plan' },
  { label: '랜딩페이지 제작과정', href: '/landing' },
  { label: '광고 안내', href: '/service' },
]

const CARE_LINKS = [
  { label: 'WE CARE', href: '/plan' },
  { label: 'FLOW CARE', href: '/plan' },
  { label: 'WEFLOW CARE', href: '/plan' },
]

const CONTACT_LINKS = [
  { label: '전화', href: `tel:${EXTERNAL_LINKS.phone}` },
  { label: '이메일', href: `mailto:${EXTERNAL_LINKS.email}` },
  { label: '카카오톡', href: EXTERNAL_LINKS.kakao },
  { label: '인스타그램', href: EXTERNAL_LINKS.instagram },
  { label: '페이스북', href: EXTERNAL_LINKS.facebook },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E8EB]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#1B64DA]">
              <Image
                src="/logo.png"
                alt="WEFLOW 로고"
                width={30}
                height={30}
                className="h-[30px] w-[30px] rounded-lg"
              />
              WEFLOW
            </div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              제작부터 관리까지, 문의로 이어지는 홈페이지 운영을 한 번에 지원합니다.
            </p>
            <div className="flex flex-col gap-1 text-sm text-[#8B95A1]">
              <p>대표: 신서준 | 사업자등록번호: 884-07-03480</p>
              <p>이메일: {EXTERNAL_LINKS.email} | 연중무휴 24시간</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#8B95A1]">
              <Link href="/privacy" className="hover:text-[#4E5968] transition-colors">
                개인정보처리방침
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-[#4E5968] transition-colors">
                이용약관
              </Link>
            </div>
            <p className="text-xs text-[#8B95A1]">© 2026 WEFLOW. All rights reserved.</p>
          </div>

          <FooterColumn title="서비스 링크" links={SERVICE_LINKS} />
          <FooterColumn title="케어플랜" links={CARE_LINKS} />
          <FooterColumn title="상담문의" links={CONTACT_LINKS} external />
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string
  links: { label: string; href: string }[]
  external?: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-[#191F28]">{title}</h3>
      <div className="flex flex-col gap-2 text-sm text-[#4E5968]">
        {links.map((link) =>
          external ? (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hover:text-[#1B64DA] transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} href={link.href} className="hover:text-[#1B64DA] transition-colors">
              {link.label}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
