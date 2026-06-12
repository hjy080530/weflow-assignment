import * as XLSX from 'xlsx'
import type { Reservation, Inquiry } from '@/types'

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10).replace(/-/g, '')
}

export function downloadReservationsExcel(reservations: Reservation[]): void {
  const rows = reservations.map((r) => ({
    이름: r.name,
    연락처: r.phone,
    예약일: r.date,
    시간: r.time,
    제작종류: r.service_type,
    업종: r.business_type,
    추가요청사항: r.note,
    상태: r.status,
    접수일: r.created_at ? new Date(r.created_at).toLocaleString('ko-KR') : '',
  }))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, '예약')
  XLSX.writeFile(wb, `reservation-${todayStamp()}.xlsx`)
}

export function downloadInquiriesExcel(inquiries: Inquiry[]): void {
  const rows = inquiries.map((i) => ({
    이름: i.name,
    연락처: i.phone,
    제작종류: i.service_type,
    업종: i.business_type,
    추가요청사항: i.note,
    상태: i.status,
    접수일: i.created_at ? new Date(i.created_at).toLocaleString('ko-KR') : '',
  }))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, '문의')
  XLSX.writeFile(wb, `inquiry-${todayStamp()}.xlsx`)
}

export function downloadAllExcel(
  reservations: Reservation[],
  inquiries: Inquiry[]
): void {
  const reservationRows = reservations.map((r) => ({
    이름: r.name,
    연락처: r.phone,
    예약일: r.date,
    시간: r.time,
    제작종류: r.service_type,
    업종: r.business_type,
    추가요청사항: r.note,
    상태: r.status,
    접수일: r.created_at ? new Date(r.created_at).toLocaleString('ko-KR') : '',
  }))

  const inquiryRows = inquiries.map((i) => ({
    이름: i.name,
    연락처: i.phone,
    제작종류: i.service_type,
    업종: i.business_type,
    추가요청사항: i.note,
    상태: i.status,
    접수일: i.created_at ? new Date(i.created_at).toLocaleString('ko-KR') : '',
  }))

  const wb = XLSX.utils.book_new()

  const wsReservations = XLSX.utils.json_to_sheet(reservationRows)
  XLSX.utils.book_append_sheet(wb, wsReservations, '예약')

  const wsInquiries = XLSX.utils.json_to_sheet(inquiryRows)
  XLSX.utils.book_append_sheet(wb, wsInquiries, '문의')

  XLSX.writeFile(wb, `weflow-all-${todayStamp()}.xlsx`)
}
