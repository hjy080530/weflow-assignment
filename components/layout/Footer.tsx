import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E8EB]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand & Info */}
          <div className="flex flex-col gap-3">
            {/* Logo */}
            <div className="flex items-center gap-1.5 font-bold text-xl tracking-tight text-[#1B64DA]">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#1B64DA" />
                <path d="M6 8l4 10 4-8 4 8 4-10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              WEFLOW
            </div>

            {/* Company Info */}
            <div className="flex flex-col gap-1 text-sm text-[#8B95A1]">
              <p>대표: 신서준 &nbsp;|&nbsp; 사업자등록번호: 884-07-03480</p>
              <p>이메일: contact@weflowlab.kr &nbsp;|&nbsp; 연중무휴 24시간</p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-[#8B95A1]">
              <Link href="/privacy" className="hover:text-[#4E5968] transition-colors">
                개인정보처리방침
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-[#4E5968] transition-colors">
                이용약관
              </Link>
            </div>

            <p className="text-xs text-[#8B95A1] mt-1">© 2026 WEFLOW. All rights reserved.</p>
          </div>

          {/* Links & SNS */}
          <div className="flex flex-col gap-4">
            {/* Service Links */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/service"
                className="text-sm text-[#4E5968] hover:text-[#1B64DA] transition-colors"
              >
                서비스 안내
              </Link>
              <span className="text-[#E5E8EB]">|</span>
              <a
                href="http://pf.kakao.com/_xntCbX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4E5968] hover:text-[#1B64DA] transition-colors"
              >
                상담 문의
              </a>
            </div>

            {/* SNS Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/weflowlab.kr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E8EB] text-[#8B95A1] hover:text-[#1B64DA] hover:border-[#1B64DA] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61590187124682"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="페이스북"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E8EB] text-[#8B95A1] hover:text-[#1B64DA] hover:border-[#1B64DA] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Blog (Naver) */}
              <a
                href="https://m.blog.naver.com/weflowlab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="블로그"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E8EB] text-[#8B95A1] hover:text-[#1B64DA] hover:border-[#1B64DA] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
