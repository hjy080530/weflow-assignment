import Link from 'next/link'

const floatingItems = [
  {
    label: '24시간 상담',
    href: 'tel:010-2971-7280',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: '카카오톡 문의',
    href: 'http://pf.kakao.com/_xntCbX',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: '블로그',
    href: 'https://m.blog.naver.com/weflowlab',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: '무료진단',
    href: '/diagnosis',
    external: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
]

export default function FloatingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] z-50">
      <div className="flex items-stretch justify-around max-w-6xl mx-auto">
        {floatingItems.map((item) => {
          const commonClass =
            'flex flex-col items-center justify-center gap-1 flex-1 py-2.5 text-[#4E5968] hover:text-[#1B64DA] hover:bg-[#1B64DA]/5 transition-colors'

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('tel:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={commonClass}
              >
                <span>{item.icon}</span>
                <span className="text-[11px] font-medium leading-tight">{item.label}</span>
              </a>
            )
          }

          return (
            <Link key={item.label} href={item.href} className={commonClass}>
              <span>{item.icon}</span>
              <span className="text-[11px] font-medium leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
