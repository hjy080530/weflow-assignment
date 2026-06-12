import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase'
import { isAuthorized } from '@/lib/admin-auth'

export async function GET() {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = createServiceClient()
  const [{ data: reservations, error: resError }, { data: inquiries, error: inqError }] =
    await Promise.all([
      client.from('reservations').select('*').order('created_at', { ascending: false }),
      client.from('inquiries').select('*').order('created_at', { ascending: false }),
    ])

  if (resError || inqError) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  return NextResponse.json({ reservations, inquiries })
}
