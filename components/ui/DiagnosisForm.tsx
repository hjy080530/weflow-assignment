'use client'

import { useState } from 'react'
import { useInquiry } from '@/hooks/useInquiry'
import { SERVICE_TYPES } from '@/lib/constants'
import type { DiagnosisFormData, ServiceType } from '@/types'

const initialForm: DiagnosisFormData = {
  name: '',
  phone: '',
  service_type: '랜딩페이지 제작',
  business_type: '',
  note: '',
  agreed: false,
}

export default function DiagnosisForm() {
  const [form, setForm] = useState<DiagnosisFormData>(initialForm)
  const [agreedError, setAgreedError] = useState<string | null>(null)
  const { loading, error, success, submit } = useInquiry()

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAgreedError(null)

    if (!form.agreed) {
      setAgreedError('개인정보 수집 및 이용에 동의해 주세요.')
      return
    }

    await submit({
      name: form.name,
      phone: form.phone,
      service_type: form.service_type,
      business_type: form.business_type,
      note: form.note,
    })

    if (!error) {
      setForm(initialForm)
    }
  }

  if (success) {
    return (
      <div
        data-testid="submit-success"
        className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm p-8 text-center"
      >
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-[#191F28] mb-2">문의가 접수되었습니다!</h3>
        <p className="text-[#4E5968] leading-relaxed mb-6">
          빠른 시간 내에 연락드리겠습니다.
          <br />
          평균 응답 시간: 2시간 이내
        </p>
        <button
          onClick={() => setForm(initialForm)}
          className="bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
        >
          새 문의 작성
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm p-6 md:p-8 flex flex-col gap-5"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191F28] mb-1">무료 진단 신청</h2>
        <p className="text-sm text-[#8B95A1]">빠른 연락과 맞춤 견적을 제공합니다</p>
      </div>

      {(error ?? agreedError) && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error ?? agreedError}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="diagnosis-name" className="text-sm font-medium text-[#191F28]">
          이름 <span className="text-[#F04452]">*</span>
        </label>
        <input
          id="diagnosis-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="홍길동"
          className="rounded-xl border border-[#E5E8EB] px-4 py-3 text-base text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="diagnosis-phone" className="text-sm font-medium text-[#191F28]">
          연락처 <span className="text-[#F04452]">*</span>
        </label>
        <input
          id="diagnosis-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="010-0000-0000"
          className="rounded-xl border border-[#E5E8EB] px-4 py-3 text-base text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="diagnosis-service-type" className="text-sm font-medium text-[#191F28]">
          제작종류 <span className="text-[#F04452]">*</span>
        </label>
        <select
          id="diagnosis-service-type"
          name="service_type"
          value={form.service_type}
          onChange={handleChange}
          required
          className="rounded-xl border border-[#E5E8EB] px-4 py-3 text-base text-[#191F28] focus:outline-none focus:border-[#1B64DA] transition-colors bg-white"
        >
          {SERVICE_TYPES.map((type: ServiceType) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="diagnosis-business-type" className="text-sm font-medium text-[#191F28]">
          업종
        </label>
        <input
          id="diagnosis-business-type"
          type="text"
          name="business_type"
          value={form.business_type}
          onChange={handleChange}
          placeholder="예: 카페, 미용실, 학원 등"
          className="rounded-xl border border-[#E5E8EB] px-4 py-3 text-base text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="diagnosis-note" className="text-sm font-medium text-[#191F28]">
          추가요청사항
        </label>
        <textarea
          id="diagnosis-note"
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={4}
          placeholder="원하시는 사항이나 참고 사이트 URL 등을 자유롭게 적어주세요."
          className="rounded-xl border border-[#E5E8EB] px-4 py-3 text-base text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] transition-colors resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="diagnosis-agreed"
          type="checkbox"
          name="agreed"
          checked={form.agreed}
          onChange={handleChange}
          className="mt-0.5 w-4 h-4 rounded border-[#E5E8EB] text-[#1B64DA] focus:ring-[#1B64DA] cursor-pointer"
        />
        <label htmlFor="diagnosis-agreed" className="text-sm text-[#4E5968] cursor-pointer">
          개인정보 수집 및 이용에 동의합니다.{' '}
          <span className="text-[#8B95A1]">(수집항목: 이름, 연락처 / 보유기간: 1년)</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1B64DA] hover:bg-[#1348A8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 transition-colors text-base"
      >
        {loading ? '제출 중...' : '무료진단 후 견적받기'}
      </button>
    </form>
  )
}
