'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingBar from './FloatingBar'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <div className="flex flex-1 flex-col pb-20">
      <Navbar />
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
      <FloatingBar />
    </div>
  )
}
