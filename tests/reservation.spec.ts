import { test, expect } from '@playwright/test'
import { adminLogin } from './utils'

test('예약 폼 제출 → 관리자 예약 목록에 실시간 반영', async ({ page, context }) => {
  const name = `예약테스트${Date.now()}`

  // 1. 예약 폼 제출. 하이드레이션 전 클릭은 네이티브 GET으로 제출돼
  //    POST /api/reservations가 발생하지 않으므로, POST 응답을 신호로 재시도한다.
  let submitted = false
  for (let attempt = 0; attempt < 4 && !submitted; attempt++) {
    try {
      await page.goto('/reservation')
      await page.click('[data-testid="calendar-next-day"]', { timeout: 5000 })
      // 활성화된 첫 번째 시간대 (위치가 아니라 비활성 여부 기준)
      await page.locator('[data-testid="time-slot"]:not([disabled])').first().click({ timeout: 5000 })
      await page.fill('[name="name"]', name)
      await page.fill('[name="phone"]', '010-1111-2222')
      await page.selectOption('[name="service_type"]', '홈페이지 제작')
      await page.fill('[name="business_type"]', '미용실')
      await page.check('[name="agreed"]')
      const [resp] = await Promise.all([
        page.waitForResponse(
          (r) => r.url().includes('/api/reservations') && r.request().method() === 'POST',
          { timeout: 8000 }
        ),
        page.click('button[type="submit"]', { timeout: 5000 }),
      ])
      if (resp.ok()) {
        submitted = await page
          .locator('[data-testid="submit-success"]')
          .isVisible({ timeout: 5000 })
      }
    } catch {
      submitted = false
    }
  }
  expect(submitted).toBe(true)

  // 2. 관리자 로그인 (리다이렉트 완료까지 대기 → 쿠키 설정 보장)
  const adminPage = await context.newPage()
  await adminLogin(adminPage)

  await expect(adminPage.getByText(name).first()).toBeVisible({ timeout: 15000 })
})
