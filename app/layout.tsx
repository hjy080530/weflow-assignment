import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/layout/SiteShell'

export const metadata: Metadata = {
  title: 'WEFLOW | 홈페이지 제작·광고·운영',
  description: '랜딩&홈페이지 제작, 광고 운영, 운영 관리 원터치 서비스',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
