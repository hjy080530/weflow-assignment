import { NextResponse } from 'next/server'
import { insertReservation } from '@/lib/queries'
import type { Reservation } from '@/types'

type ReservationRequest = Omit<Reservation, 'id' | 'created_at' | 'status'>

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationRequest

    await insertReservation({
      name: body.name,
      phone: body.phone,
      date: body.date,
      time: body.time,
      service_type: body.service_type,
      business_type: body.business_type ?? '',
      note: body.note ?? '',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '예약 접수 중 오류가 발생했습니다.'

    return NextResponse.json({ error: message }, { status: 400 })
  }
}
