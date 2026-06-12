import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { DiagnosisFormData } from '@/types'

type InquiryInput = Omit<DiagnosisFormData, 'agreed'>

interface UseInquiryReturn {
  loading: boolean
  error: string | null
  success: boolean
  submit: (data: InquiryInput) => Promise<void>
}

export function useInquiry(): UseInquiryReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function submit(data: InquiryInput): Promise<void> {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: insertError } = await supabase.from('inquiries').insert([
        {
          name: data.name,
          phone: data.phone,
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
      console.error('문의 제출 오류:', err)
      setError('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, submit }
}
