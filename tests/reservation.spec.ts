import { test, expect } from '@playwright/test'

test('예약 폼 제출 → 관리자 예약 목록에 실시간 반영', async ({ page, context }) => {
  await page.goto('/reservation')

  // 달력에서 내일 날짜 선택
  await page.click('[data-testid="calendar-next-day"]')

  // 시간대 선택 (활성화된 첫 번째 시간)
  await page.click('[data-testid="time-slot"]:not([disabled]):first-child')

  await page.fill('[name="name"]', '예약테스트')
  await page.fill('[name="phone"]', '010-1111-2222')
  await page.selectOption('[name="service_type"]', '홈페이지 제작')
  await page.fill('[name="business_type"]', '미용실')
  await page.check('[name="agreed"]')
  await page.click('button[type="submit"]')

  await expect(page.locator('[data-testid="submit-success"]')).toBeVisible({ timeout: 10000 })

  const adminPage = await context.newPage()
  await adminPage.goto('/admin/login')
  await adminPage.fill('[name="email"]', 'badeagle85@gmail.com')
  await adminPage.fill('[name="password"]', '1111')
  await adminPage.click('button[type="submit"]')
  await adminPage.goto('/admin')

  await expect(adminPage.locator('text=예약테스트')).toBeVisible({ timeout: 5000 })
})
