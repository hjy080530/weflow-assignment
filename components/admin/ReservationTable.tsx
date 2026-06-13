'use client'

import { useState } from 'react'
import type { Reservation, Status } from '@/types'
import { downloadReservationsExcel } from '@/lib/excel'

interface ReservationTableProps {
  reservations: Reservation[]
  filter: Status | '전체'
  searchKeyword: string
  onUpdateStatus: (id: string, status: Status) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const STATUS_COLORS: Record<Status, string> = {
  '대기': 'bg-yellow-100 text-yellow-800',
  '진행중': 'bg-blue-100 text-blue-800',
  '완료': 'bg-green-100 text-green-800',
}

export default function ReservationTable({
  reservations,
  filter,
  searchKeyword,
  onUpdateStatus,
  onDelete,
}: ReservationTableProps) {
  const filtered = reservations.filter((reservation) => {
    const matchesStatus = filter === '전체' || reservation.status === filter
    const matchesName =
      searchKeyword.length === 0 || reservation.name.toLowerCase().includes(searchKeyword)

    return matchesStatus && matchesName
  })

  return (
    <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E8EB]">
        <h3 className="text-lg font-semibold text-[#191F28]">예약 관리</h3>
        <button
          data-testid="download-reservations"
          onClick={() => downloadReservationsExcel(filtered)}
          className="text-sm border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-4 py-2 transition-colors"
        >
          엑셀 다운로드
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E8EB]">
            <tr>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">상태</th>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">이름</th>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">연락처</th>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">접수일</th>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">희망일정</th>
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#8B95A1]">
                  데이터가 없습니다
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <ReservationRow
                key={r.id}
                reservation={r}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ReservationRow({
  reservation: r,
  onUpdateStatus,
  onDelete,
}: {
  reservation: Reservation
  onUpdateStatus: (id: string, status: Status) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <tr
        data-testid="reservation-row"
        className="border-b border-[#E5E8EB] hover:bg-[#F9FAFB] transition-colors"
      >
        <td className="px-4 py-3">
          <span
            data-testid="status-badge"
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}
          >
            {r.status}
          </span>
        </td>
        <td className="px-4 py-3 font-medium text-[#191F28]">{r.name}</td>
        <td className="px-4 py-3 text-[#4E5968]">{r.phone}</td>
        <td className="px-4 py-3 text-[#8B95A1] text-xs">
          {r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR') : '-'}
        </td>
        <td className="px-4 py-3 text-[#4E5968]">
          {r.date} {r.time}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-xs border border-[#E5E8EB] text-[#4E5968] px-2 py-1 rounded-lg hover:border-[#1B64DA] hover:text-[#1B64DA] transition-colors"
              aria-expanded={isOpen}
            >
              상세 {isOpen ? '▲' : '▼'}
            </button>
            <button
              data-testid="btn-inprogress"
              onClick={() => onUpdateStatus(r.id, '진행중')}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
            >
              진행중
            </button>
            <button
              data-testid="btn-complete"
              onClick={() => onUpdateStatus(r.id, '완료')}
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg hover:bg-green-100 transition-colors"
            >
              완료
            </button>
            <button
              data-testid="btn-delete"
              onClick={() => onDelete(r.id)}
              className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg hover:bg-red-100 transition-colors"
            >
              삭제
            </button>
          </div>
        </td>
      </tr>
      {isOpen && (r.service_type || r.business_type || r.note) && (
        <tr className="border-b border-[#E5E8EB] bg-[#F9FAFB]">
          <td colSpan={6} className="px-6 py-3 text-xs text-[#4E5968]">
            <span className="mr-4">제작종류: {r.service_type}</span>
            {r.business_type && <span className="mr-4">업종: {r.business_type}</span>}
            {r.note && <span>요청사항: {r.note}</span>}
          </td>
        </tr>
      )}
    </>
  )
}
