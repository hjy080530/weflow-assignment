import { useState } from 'react'
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
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error ?? '문의 제출에 실패했습니다.')
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
