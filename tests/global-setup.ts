import { request } from '@playwright/test'

/**
 * dev 서버는 라우트를 첫 요청 때 컴파일한다. 테스트 시작 전 주요 페이지·API를
 * 미리 호출해 컴파일을 끝내두면 콜드 스타트로 인한 첫 테스트 플레이크를 막는다.
 */
export default async function globalSetup(): Promise<void> {
  const ctx = await request.newContext({ baseURL: 'http://localhost:3002' })
  const warm = (path: string) => ctx.get(path).catch(() => undefined)
  await Promise.all([
    warm('/diagnosis'),
    warm('/reservation'),
    warm('/admin/login'),
    warm('/api/inquiries'),
    warm('/api/reservations'),
    warm('/api/admin/data'),
    warm('/api/admin/login'),
    warm('/api/admin/status'),
    warm('/api/admin/row'),
  ])
  await ctx.dispose()
}
