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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll()
    const interval = setInterval(fetchAll, 5000)
    return () => clearInterval(interval)
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

    try {
      const res = await fetch('/api/admin/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id, status }),
      })
      if (!res.ok) {
        console.error(`${table} 상태 업데이트 오류`)
        await fetchAll()
      }
    } catch (err) {
      console.error(`${table} 상태 업데이트 오류:`, err)
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

    try {
      const res = await fetch('/api/admin/row', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id }),
      })
      if (!res.ok) {
        console.error(`${table} 삭제 오류`)
        await fetchAll()
      }
    } catch (err) {
      console.error(`${table} 삭제 오류:`, err)
      await fetchAll()
    }
  }

  return {
    reservations,
    inquiries,
    filter,
    setFilter,
    loading,
    updateStatus,
    deleteRow,
  }
}
