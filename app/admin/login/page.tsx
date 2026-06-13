'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        const data = await res.json()
        setError(data.error ?? '로그인에 실패했습니다.')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5E8EB] shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#191F28]">WEFLOW</h1>
          <p className="text-sm text-[#8B95A1] mt-1">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#191F28]">이메일</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#E5E8EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B64DA] transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#191F28]">비밀번호</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#E5E8EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B64DA] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1B64DA] hover:bg-[#1348A8] disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-3 transition-colors mt-2"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
