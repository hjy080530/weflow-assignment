import { test, expect } from '@playwright/test'
import { adminLogin } from './utils'

test('무료진단 폼 제출 → 관리자 문의 목록에 실시간 반영', async ({ page, context }) => {
  const name = `진단테스트${Date.now()}`
  const phone = '010-0000-0000'

  // 1. 진단 폼 제출. 하이드레이션 전 클릭은 폼이 네이티브 GET으로 제출돼
  //    POST /api/inquiries가 발생하지 않으므로, POST 응답을 신호로 재시도한다.
  let submitted = false
  for (let attempt = 0; attempt < 4 && !submitted; attempt++) {
    try {
      await page.goto('/diagnosis')
      await page.fill('[name="name"]', name)
      await page.fill('[name="phone"]', phone)
      await page.selectOption('[name="service_type"]', '랜딩페이지 제작')
      await page.fill('[name="business_type"]', '카페')
      await page.fill('[name="note"]', '테스트 요청사항')
      await page.check('[name="agreed"]')
      const [resp] = await Promise.all([
        page.waitForResponse(
          (r) => r.url().includes('/api/inquiries') && r.request().method() === 'POST',
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

  // 3. 문의 목록에 방금 제출한 항목 존재 확인
  await expect(adminPage.getByText(name).first()).toBeVisible({ timeout: 15000 })
  await expect(adminPage.getByText(phone).first()).toBeVisible()
})
