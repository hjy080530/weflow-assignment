import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthorized } from '@/lib/admin-auth'
import { updateInquiryStatus, updateReservationStatus } from '@/lib/queries'
import type { Status } from '@/types'

export async function PATCH(request: Request) {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table, id, status }: { table: 'reservations' | 'inquiries'; id: string; status: Status } =
    await request.json()

  try {
    if (table === 'reservations') {
      await updateReservationStatus(id, status)
    } else {
      await updateInquiryStatus(id, status)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '상태 변경에 실패했습니다.'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
