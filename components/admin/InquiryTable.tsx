'use client'

import type { Inquiry, Status } from '@/types'
import { downloadInquiriesExcel } from '@/lib/excel'

interface InquiryTableProps {
  inquiries: Inquiry[]
  filter: Status | '전체'
  onUpdateStatus: (id: string, status: Status) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const STATUS_COLORS: Record<Status, string> = {
  '대기': 'bg-yellow-100 text-yellow-800',
  '진행중': 'bg-blue-100 text-blue-800',
  '완료': 'bg-green-100 text-green-800',
}

export default function InquiryTable({
  inquiries,
  filter,
  onUpdateStatus,
  onDelete,
}: InquiryTableProps) {
  const filtered =
    filter === '전체' ? inquiries : inquiries.filter((i) => i.status === filter)

  return (
    <div className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E8EB]">
        <h3 className="text-lg font-semibold text-[#191F28]">문의 관리</h3>
        <button
          data-testid="download-inquiries"
          onClick={() => downloadInquiriesExcel(filtered)}
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
              <th className="text-left px-4 py-3 text-[#8B95A1] font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[#8B95A1]">
                  데이터가 없습니다
                </td>
              </tr>
            )}
            {filtered.map((inq) => (
              <InquiryRow
                key={inq.id}
                inquiry={inq}
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

function InquiryRow({
  inquiry: inq,
  onUpdateStatus,
  onDelete,
}: {
  inquiry: Inquiry
  onUpdateStatus: (id: string, status: Status) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  return (
    <>
      <tr
        data-testid="inquiry-row"
        className="border-b border-[#E5E8EB] hover:bg-[#F9FAFB] transition-colors"
      >
        <td className="px-4 py-3">
          <span
            data-testid="status-badge"
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[inq.status]}`}
          >
            {inq.status}
          </span>
        </td>
        <td className="px-4 py-3 font-medium text-[#191F28]">{inq.name}</td>
        <td className="px-4 py-3 text-[#4E5968]">{inq.phone}</td>
        <td className="px-4 py-3 text-[#8B95A1] text-xs">
          {inq.created_at ? new Date(inq.created_at).toLocaleDateString('ko-KR') : '-'}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              data-testid="btn-inprogress"
              onClick={() => onUpdateStatus(inq.id, '진행중')}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
            >
              진행중
            </button>
            <button
              data-testid="btn-complete"
              onClick={() => onUpdateStatus(inq.id, '완료')}
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg hover:bg-green-100 transition-colors"
            >
              완료
            </button>
            <button
              data-testid="btn-delete"
              onClick={() => onDelete(inq.id)}
              className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg hover:bg-red-100 transition-colors"
            >
              삭제
            </button>
          </div>
        </td>
      </tr>
      {(inq.service_type || inq.business_type || inq.note) && (
        <tr className="border-b border-[#E5E8EB] bg-[#F9FAFB]">
          <td colSpan={5} className="px-6 py-3 text-xs text-[#4E5968]">
            <span className="mr-4">제작종류: {inq.service_type}</span>
            {inq.business_type && <span className="mr-4">업종: {inq.business_type}</span>}
            {inq.note && <span>요청사항: {inq.note}</span>}
          </td>
        </tr>
      )}
    </>
  )
}
