import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_TOKEN } from '@/lib/admin-auth'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'badeagle85@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '1111'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    )
  }

  const cookieStore = await cookies()
  cookieStore.set('wafs', SESSION_TOKEN, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return NextResponse.json({ ok: true })
}
