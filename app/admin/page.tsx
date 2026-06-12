'use client'

import { useRouter } from 'next/navigation'
import { useAdminTable } from '@/hooks/useAdminTable'
import ReservationTable from '@/components/admin/ReservationTable'
import InquiryTable from '@/components/admin/InquiryTable'
import { downloadAllExcel } from '@/lib/excel'
import type { Status } from '@/types'

const FILTERS: (Status | '전체')[] = ['전체', '대기', '진행중', '완료']

export default function AdminPage() {
  const router = useRouter()
  const { reservations, inquiries, filter, setFilter, loading, updateStatus, deleteRow } =
    useAdminTable()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-[#E5E8EB] px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#191F28]">WEFLOW 관리자</h1>
          <div className="flex items-center gap-3">
            <button
              data-testid="download-all"
              onClick={() => downloadAllExcel(reservations, inquiries)}
              className="text-sm border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-4 py-2 transition-colors"
            >
              전체 엑셀 다운로드
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-[#8B95A1] hover:text-[#191F28] transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* 상태 필터 */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-testid={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#1B64DA] text-white'
                  : 'bg-white border border-[#E5E8EB] text-[#4E5968] hover:border-[#1B64DA]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#8B95A1]">불러오는 중...</div>
        ) : (
          <>
            <ReservationTable
              reservations={reservations}
              filter={filter}
              onUpdateStatus={(id, status) => updateStatus('reservations', id, status)}
              onDelete={(id) => deleteRow('reservations', id)}
            />
            <InquiryTable
              inquiries={inquiries}
              filter={filter}
              onUpdateStatus={(id, status) => updateStatus('inquiries', id, status)}
              onDelete={(id) => deleteRow('inquiries', id)}
            />
          </>
        )}
      </div>
    </div>
  )
}
