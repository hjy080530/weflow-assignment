import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN ?? 'weflow-admin-2026'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('wafs')?.value
    if (session !== SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
