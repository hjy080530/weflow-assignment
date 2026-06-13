import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthorized } from '@/lib/admin-auth'
import { seedTestData } from '@/lib/queries'

export async function POST() {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await seedTestData()
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : '테스트 데이터 입력에 실패했습니다.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
