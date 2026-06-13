'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_LINKS = [
  {
    label: '전체 현황',
    href: '/admin#overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: '예약 관리',
    href: '/admin#reservations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
  {
    label: '문의 관리',
    href: '/admin#inquiries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 21 11.5z" />
      </svg>
    ),
  },
]

function Logo() {
  return (
    <Image src="/logo.png" alt="WEFLOW 로고" width={24} height={24} className="h-6 w-6 rounded-md" priority />
  )
}

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[#E5E8EB] bg-white md:flex">
        <Link href="/admin" className="flex flex-col gap-1 px-6 py-6">
          <span className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-bold text-[#1B64DA]">WEFLOW</span>
          </span>
          <span className="text-xs text-[#8B95A1]">관리자</span>
        </Link>

        <nav className="flex flex-col gap-1 border-t border-[#E5E8EB] px-3 py-4">
          {NAV_LINKS.map((link) => {
            const active = pathname === '/admin'
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'text-[#191F28] hover:bg-[#F9FAFB]'
                    : 'text-[#4E5968] hover:bg-[#F9FAFB] hover:text-[#191F28]'
                }`}
              >
                <span className="text-[#8B95A1]">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-4 py-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E8EB] px-4 py-2.5 text-sm text-[#4E5968] transition-colors hover:border-[#1B64DA] hover:text-[#191F28]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 모바일 상단바 */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3 md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-bold text-[#1B64DA]">WEFLOW</span>
          <span className="text-xs text-[#8B95A1]">관리자</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-[#8B95A1] transition-colors hover:text-[#191F28]"
        >
          로그아웃
        </button>
      </header>
    </>
  )
}
