import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase'
import { isAuthorized } from '@/lib/admin-auth'

export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  if (!isAuthorized(cookieStore.get('wafs')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table, id }: { table: 'reservations' | 'inquiries'; id: string } =
    await request.json()

  const client = createServiceClient()
  const { error } = await client.from(table).delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
