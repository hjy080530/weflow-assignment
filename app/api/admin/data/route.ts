import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthorized } from '@/lib/admin-auth'
import { getInquiries, getReservations } from '@/lib/queries'

export async function GET() {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [reservations, inquiries] = await Promise.all([getReservations(), getInquiries()])
    return NextResponse.json({ reservations, inquiries })
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
