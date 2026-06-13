'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Reservation, Inquiry, Status } from '@/types'

type FilterValue = Status | '전체'

interface UseAdminTableReturn {
  reservations: Reservation[]
  inquiries: Inquiry[]
  filter: FilterValue
  setFilter: (filter: FilterValue) => void
  loading: boolean
  refresh: () => Promise<void>
  updateStatus: (
    table: 'reservations' | 'inquiries',
    id: string,
    status: Status
  ) => Promise<void>
  deleteRow: (table: 'reservations' | 'inquiries', id: string) => Promise<void>
}

export function useAdminTable(): UseAdminTableReturn {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState<FilterValue>('전체')
  const [loading, setLoading] = useState(true)

  // 개발 서버 첫 컴파일·SSE 재연결 중 끊긴 연결은 일시적이므로 1회 재시도한다.
  const mutate = useCallback(async (input: RequestInfo, init: RequestInit): Promise<boolean> => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(input, init)
        return res.ok
      } catch {
        if (attempt === 0) {
          await new Promise((resolve) => window.setTimeout(resolve, 300))
          continue
        }
      }
    }
    return false
  }, [])

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data')
      if (!res.ok) return
      const data = await res.json()
      setReservations(data.reservations ?? [])
      setInquiries(data.inquiries ?? [])
    } catch (err) {
      console.error('관리자 데이터 로드 오류:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const initialFetchTimer = window.setTimeout(() => {
      void fetchAll()
    }, 0)
    const pollingTimer = window.setInterval(() => {
      void fetchAll()
    }, 3000)
    const eventSource = new EventSource('/api/admin/stream')

    eventSource.onmessage = () => {
      void fetchAll()
    }

    return () => {
      window.clearTimeout(initialFetchTimer)
      window.clearInterval(pollingTimer)
      eventSource.close()
    }
  }, [fetchAll])

  async function updateStatus(
    table: 'reservations' | 'inquiries',
    id: string,
    status: Status
  ): Promise<void> {
    // Optimistic update
    if (table === 'reservations') {
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } else {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
    }

    const ok = await mutate('/api/admin/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, status }),
    })
    if (!ok) {
      console.warn(`${table} 상태 업데이트 실패 — 서버 데이터로 복원합니다.`)
      await fetchAll()
    }
  }

  async function deleteRow(
    table: 'reservations' | 'inquiries',
    id: string
  ): Promise<void> {
    // Optimistic update
    if (table === 'reservations') {
      setReservations((prev) => prev.filter((r) => r.id !== id))
    } else {
      setInquiries((prev) => prev.filter((i) => i.id !== id))
    }

    const ok = await mutate('/api/admin/row', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id }),
    })
    if (!ok) {
      console.warn(`${table} 삭제 실패 — 서버 데이터로 복원합니다.`)
      await fetchAll()
    }
  }

  return {
    reservations,
    inquiries,
    filter,
    setFilter,
    loading,
    refresh: fetchAll,
    updateStatus,
    deleteRow,
  }
}
