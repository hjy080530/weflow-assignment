'use client'

import { useState } from 'react'
import { useReservation } from '@/hooks/useReservation'
import { SERVICE_TYPES, TIME_SLOTS } from '@/lib/constants'
import type { ServiceType } from '@/types'

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function toDateString(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

function getTodayString(): string {
  const now = new Date()
  return toDateString(now.getFullYear(), now.getMonth(), now.getDate())
}

function getTomorrowString(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return toDateString(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
}

const MONTH_NAMES = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
]

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

export default function ReservationPage() {
  const today = getTodayString()
  const tomorrow = getTomorrowString()

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [customTime, setCustomTime] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceType, setServiceType] = useState<ServiceType>(SERVICE_TYPES[0])
  const [businessType, setBusinessType] = useState('')
  const [note, setNote] = useState('')
  const [agreed, setAgreed] = useState(false)

  const { loading, error, success, submit } = useReservation()

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const effectiveTime = customTime.trim() || selectedTime

  const calendarCells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

  function prevMonth() {
    setCurrentMonth(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() - 1)
      return d
    })
  }

  function nextMonth() {
    setCurrentMonth(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + 1)
      return d
    })
  }

  function isTimeDisabled(slot: string): boolean {
    if (selectedDate !== today) return false
    const [slotH, slotM] = slot.split(':').map(Number)
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    return slotH * 60 + slotM <= nowMinutes
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !effectiveTime) return
    await submit({
      name,
      phone,
      date: selectedDate,
      time: effectiveTime,
      service_type: serviceType,
      business_type: businessType,
      note,
    })
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <div
          data-testid="submit-success"
          className="bg-white rounded-2xl border border-[#E5E8EB] shadow-sm p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-[#1B64DA]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#1B64DA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#191F28] mb-3">예약 신청 완료!</h2>
          <p className="text-[#4E5968] leading-relaxed mb-2">
            <span className="font-semibold text-[#191F28]">{selectedDate}</span> {effectiveTime} 예약이 접수되었습니다.
          </p>
          <p className="text-sm text-[#8B95A1]">확인 후 빠르게 연락드리겠습니다. 감사합니다.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block bg-[#1B64DA]/10 text-[#1B64DA] text-sm font-semibold px-3 py-1 rounded-full mb-4">
            상담 예약
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-3">
            예약 신청
          </h1>
          <p className="text-[#4E5968] leading-relaxed">
            원하시는 날짜와 시간을 선택해 주세요.<br className="hidden md:block" />
            확인 후 빠르게 연락드리겠습니다.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Calendar */}
          <section className="bg-white rounded-2xl border border-[#E5E8EB] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#191F28] mb-5">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#1B64DA] text-white text-xs font-bold rounded-full mr-2">1</span>
              날짜 선택
            </h2>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F9FAFB] border border-[#E5E8EB] text-[#4E5968] transition-colors"
                aria-label="이전 달"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-base font-semibold text-[#191F28]">
                {year}년 {MONTH_NAMES[month]}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F9FAFB] border border-[#E5E8EB] text-[#4E5968] transition-colors"
                aria-label="다음 달"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(day => (
                <div
                  key={day}
                  className={`text-center text-xs font-semibold py-1 ${
                    day === '일' ? 'text-red-400' : day === '토' ? 'text-blue-400' : 'text-[#8B95A1]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />
                }
                const dateStr = toDateString(year, month, day)
                const isPast = dateStr < today
                const isSelected = dateStr === selectedDate
                const isToday = dateStr === today
                const isTomorrow = dateStr === tomorrow
                const colIndex = (firstDay + day - 1) % 7

                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={isPast}
                    data-testid={isTomorrow ? 'calendar-next-day' : undefined}
                    onClick={() => {
                      setSelectedDate(dateStr)
                      setSelectedTime('')
                      setCustomTime('')
                    }}
                    className={[
                      'aspect-square flex items-center justify-center text-sm rounded-full transition-colors font-medium',
                      isPast
                        ? 'cursor-not-allowed opacity-40 text-[#8B95A1]'
                        : isSelected
                        ? 'bg-[#1B64DA] text-white'
                        : isToday
                        ? 'border-2 border-[#1B64DA] text-[#1B64DA] hover:bg-[#1B64DA]/10'
                        : colIndex === 0
                        ? 'text-red-400 hover:bg-red-50'
                        : colIndex === 6
                        ? 'text-blue-400 hover:bg-blue-50'
                        : 'text-[#191F28] hover:bg-[#F9FAFB]',
                    ].join(' ')}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {selectedDate && (
              <p className="mt-4 text-sm text-[#1B64DA] font-semibold text-center">
                선택: {selectedDate}
              </p>
            )}
          </section>

          {/* Step 2: Time slots */}
          <section className="bg-white rounded-2xl border border-[#E5E8EB] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#191F28] mb-5">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#1B64DA] text-white text-xs font-bold rounded-full mr-2">2</span>
              시간 선택
            </h2>

            {!selectedDate && (
              <p className="text-sm text-[#8B95A1] text-center py-4">날짜를 먼저 선택해 주세요.</p>
            )}

            {selectedDate && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {TIME_SLOTS.map(slot => {
                  const disabled = isTimeDisabled(slot)
                  const isSelected = slot === selectedTime

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      data-testid="time-slot"
                      onClick={() => {
                        setSelectedTime(slot)
                        setCustomTime('')
                      }}
                      className={[
                        'py-2 px-1 text-sm font-medium rounded-xl transition-colors',
                        disabled
                          ? 'cursor-not-allowed opacity-40 bg-[#F9FAFB] text-[#8B95A1]'
                          : isSelected
                          ? 'bg-[#1B64DA] text-white'
                          : 'border border-[#E5E8EB] text-[#191F28] hover:border-[#1B64DA] hover:text-[#1B64DA]',
                      ].join(' ')}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            )}

            {selectedDate && (
              <div className="mt-5">
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="custom-time">
                  원하시는 시간대(직접 입력)
                </label>
                <input
                  id="custom-time"
                  name="custom_time"
                  type="text"
                  value={customTime}
                  onChange={(event) => {
                    setCustomTime(event.target.value)
                    setSelectedTime('')
                  }}
                  placeholder="예: 19:00 이후, 14:15"
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm"
                />
              </div>
            )}
          </section>

          {/* Step 3: Form */}
          <section className="bg-white rounded-2xl border border-[#E5E8EB] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#191F28] mb-5">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#1B64DA] text-white text-xs font-bold rounded-full mr-2">3</span>
              정보 입력
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="res-name">
                  이름 <span className="text-[#F04452]">*</span>
                </label>
                <input
                  id="res-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="res-phone">
                  연락처 <span className="text-[#F04452]">*</span>
                </label>
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm"
                />
              </div>

              {/* Service type */}
              <div>
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="res-service">
                  제작 종류 <span className="text-[#F04452]">*</span>
                </label>
                <select
                  id="res-service"
                  name="service_type"
                  required
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value as ServiceType)}
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm bg-white"
                >
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Business type */}
              <div>
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="res-business">
                  업종
                </label>
                <input
                  id="res-business"
                  name="business_type"
                  type="text"
                  value={businessType}
                  onChange={e => setBusinessType(e.target.value)}
                  placeholder="예: 미용실, 카페, PT샵 등"
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-[#191F28] mb-1.5" htmlFor="res-note">
                  추가 요청사항
                </label>
                <textarea
                  id="res-note"
                  name="note"
                  rows={4}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="문의하실 내용이나 요청사항을 자유롭게 적어주세요."
                  className="w-full rounded-xl border border-[#E5E8EB] px-4 py-3 text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#1B64DA] focus:ring-2 focus:ring-[#1B64DA]/20 transition-colors text-sm resize-none"
                />
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 bg-[#F9FAFB] rounded-xl p-4">
                <input
                  id="res-agreed"
                  name="agreed"
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#1B64DA] cursor-pointer"
                />
                <label htmlFor="res-agreed" className="text-sm text-[#4E5968] leading-relaxed cursor-pointer">
                  <span className="font-semibold text-[#191F28]">개인정보 수집 및 이용에 동의합니다.</span>{' '}
                  수집된 정보는 상담 예약 목적으로만 사용되며, 목적 달성 후 즉시 파기됩니다.{' '}
                  <span className="text-[#F04452]">*</span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Selected summary */}
              {(selectedDate || effectiveTime) && (
                <div className="rounded-xl bg-[#1B64DA]/5 border border-[#1B64DA]/20 px-4 py-3 text-sm text-[#1B64DA]">
                  <span className="font-semibold">예약 정보: </span>
                  {selectedDate || '날짜 미선택'}
                  {effectiveTime ? ` · ${effectiveTime}` : ' · 시간 미선택'}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !selectedDate || !effectiveTime || !agreed}
                className="w-full bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? '제출 중...' : '예약 신청하기'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
