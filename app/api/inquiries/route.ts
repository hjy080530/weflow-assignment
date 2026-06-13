import { NextResponse } from 'next/server'
import { insertInquiry } from '@/lib/queries'
import type { DiagnosisFormData } from '@/types'

type InquiryRequest = Omit<DiagnosisFormData, 'agreed'>

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryRequest

    await insertInquiry({
      name: body.name,
      phone: body.phone,
      service_type: body.service_type,
      business_type: body.business_type ?? '',
      note: body.note ?? '',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '문의 접수 중 오류가 발생했습니다.'

    return NextResponse.json({ error: message }, { status: 400 })
  }
}
