import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Reservation } from '@/types'

type ReservationInput = Omit<Reservation, 'id' | 'created_at' | 'status'>

interface UseReservationReturn {
  loading: boolean
  error: string | null
  success: boolean
  submit: (data: ReservationInput) => Promise<void>
}

export function useReservation(): UseReservationReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function submit(data: ReservationInput): Promise<void> {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: insertError } = await supabase.from('reservations').insert([
        {
          name: data.name,
          phone: data.phone,
          date: data.date,
          time: data.time,
          service_type: data.service_type,
          business_type: data.business_type,
          note: data.note,
        },
      ])

      if (insertError) {
        throw insertError
      }

      setSuccess(true)
    } catch (err) {
      console.error('예약 제출 오류:', err)
      setError('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, submit }
}
