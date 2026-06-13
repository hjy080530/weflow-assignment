'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useAdminTable } from '@/hooks/useAdminTable'
import ReservationTable from '@/components/admin/ReservationTable'
import InquiryTable from '@/components/admin/InquiryTable'
import { downloadAllExcel } from '@/lib/excel'
import type { Status } from '@/types'

const FILTERS: (Status | '전체')[] = ['전체', '대기', '진행중', '완료']

export default function AdminPage() {
  const { reservations, inquiries, filter, setFilter, loading, refresh, updateStatus, deleteRow } =
    useAdminTable()
  const [searchKeyword, setSearchKeyword] = useState('')
  const stats = useMemo(() => {
    const allRows = [...reservations, ...inquiries]
    const today = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Seoul',
    }).format(new Date())

    const todaySubmissions = allRows.filter((row) => row.created_at.slice(0, 10) === today).length
    const completedCount = allRows.filter((row) => row.status === '완료').length
    const waitingCount = allRows.filter((row) => row.status === '대기').length
    const inProgressCount = allRows.filter((row) => row.status === '진행중').length
    const conversionRate = allRows.length === 0 ? 0 : Math.round((completedCount / allRows.length) * 1000) / 10

    return {
      totalReservations: reservations.length,
      totalInquiries: inquiries.length,
      todaySubmissions,
      waitingCount,
      inProgressCount,
      completedCount,
      conversionRate,
    }
  }, [inquiries, reservations])
  const normalizedKeyword = searchKeyword.trim().toLowerCase()

  return (
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* 액션 툴바 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#191F28]">대시보드</h1>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/cases"
              className="text-sm border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-4 py-2 transition-colors"
            >
              CASE 수정
            </Link>
            <button
              data-testid="download-all"
              onClick={() => downloadAllExcel(reservations, inquiries)}
              className="text-sm border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-4 py-2 transition-colors"
            >
              전체 엑셀 다운로드
            </button>
            <button
              onClick={() => void refresh()}
              className="text-sm border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-4 py-2 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>

        <section id="overview" className="grid gap-4 scroll-mt-24 md:grid-cols-2 xl:grid-cols-3">
          <SummaryCard label="예약 접수" value={`${stats.totalReservations}건`} helper="관리자 예약 데이터" />
          <SummaryCard label="문의 접수" value={`${stats.totalInquiries}건`} helper="무료진단 및 일반 문의" />
          <SummaryCard label="오늘 유입" value={`${stats.todaySubmissions}건`} helper="KST 기준 당일 접수" />
          <SummaryCard label="대기" value={`${stats.waitingCount}건`} helper="아직 응대한 전" />
          <SummaryCard label="진행중" value={`${stats.inProgressCount}건`} helper="상담 및 작업 진행" />
          <SummaryCard
            label="완료 전환율"
            value={`${stats.conversionRate}%`}
            helper={`${stats.completedCount}건 완료`}
          />
        </section>

        {/* 상태 필터 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
          <label className="flex w-full items-center gap-2 rounded-xl border border-[#E5E8EB] bg-white px-4 py-2 transition-colors focus-within:border-[#1B64DA] md:max-w-xs">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 shrink-0 text-[#8B95A1]"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              data-testid="admin-name-search"
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="고객명 검색"
              className="w-full bg-transparent text-sm text-[#191F28] outline-none placeholder:text-[#8B95A1]"
            />
          </label>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#8B95A1]">불러오는 중...</div>
        ) : (
          <>
            <div id="reservations" className="scroll-mt-24">
              <ReservationTable
                reservations={reservations}
                filter={filter}
                searchKeyword={normalizedKeyword}
                onUpdateStatus={(id, status) => updateStatus('reservations', id, status)}
                onDelete={(id) => deleteRow('reservations', id)}
              />
            </div>
            <div id="inquiries" className="scroll-mt-24">
              <InquiryTable
                inquiries={inquiries}
                filter={filter}
                searchKeyword={normalizedKeyword}
                onUpdateStatus={(id, status) => updateStatus('inquiries', id, status)}
                onDelete={(id) => deleteRow('inquiries', id)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="rounded-2xl border border-[#E5E8EB] bg-white p-6 shadow-sm">
      <p className="text-sm text-[#8B95A1]">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[#191F28]">{value}</p>
      <p className="mt-2 text-sm text-[#4E5968]">{helper}</p>
    </div>
  )
}
