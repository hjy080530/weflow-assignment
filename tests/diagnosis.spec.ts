import { test, expect } from '@playwright/test'

test('무료진단 폼 제출 → 관리자 문의 목록에 실시간 반영', async ({ page, context }) => {
  // 1. 진단 페이지에서 폼 작성
  await page.goto('/diagnosis')
  await page.fill('[name="name"]', '테스트유저')
  await page.fill('[name="phone"]', '010-0000-0000')
  await page.selectOption('[name="service_type"]', '랜딩페이지 제작')
  await page.fill('[name="business_type"]', '카페')
  await page.fill('[name="note"]', '테스트 요청사항')
  await page.check('[name="agreed"]')
  await page.click('button[type="submit"]')

  // 2. 제출 성공 확인
  await expect(page.locator('[data-testid="submit-success"]')).toBeVisible({ timeout: 10000 })

  // 3. 관리자 페이지에서 반영 확인
  const adminPage = await context.newPage()
  await adminPage.goto('/admin/login')
  await adminPage.fill('[name="email"]', 'badeagle85@gmail.com')
  await adminPage.fill('[name="password"]', '1111')
  await adminPage.click('button[type="submit"]')
  await adminPage.goto('/admin')

  // 4. 문의 목록에 방금 제출한 항목 존재 확인
  await expect(adminPage.locator('text=테스트유저')).toBeVisible({ timeout: 5000 })
  await expect(adminPage.locator('text=010-0000-0000')).toBeVisible()
})
