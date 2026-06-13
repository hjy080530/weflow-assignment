import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthorized } from '@/lib/admin-auth'
import { deleteInquiry, deleteReservation } from '@/lib/queries'

export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table, id }: { table: 'reservations' | 'inquiries'; id: string } =
    await request.json()

  try {
    if (table === 'reservations') {
      await deleteReservation(id)
    } else {
      await deleteInquiry(id)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '삭제에 실패했습니다.'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
