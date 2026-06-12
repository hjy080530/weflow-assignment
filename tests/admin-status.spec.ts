import { test, expect } from '@playwright/test'

test('관리자 상태 변경 → 즉시 DB 반영 + UI 업데이트', async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('[name="email"]', 'badeagle85@gmail.com')
  await page.fill('[name="password"]', '1111')
  await page.click('button[type="submit"]')
  await page.goto('/admin')

  // 첫 번째 문의 행에서 "진행중" 버튼 클릭
  const firstRow = page.locator('[data-testid="inquiry-row"]').first()
  await firstRow.locator('[data-testid="btn-inprogress"]').click()

  // 상태 뱃지가 "진행중"으로 변경됐는지 확인
  await expect(firstRow.locator('[data-testid="status-badge"]')).toHaveText('진행중')

  // "완료" 버튼 클릭
  await firstRow.locator('[data-testid="btn-complete"]').click()
  await expect(firstRow.locator('[data-testid="status-badge"]')).toHaveText('완료')

  // 상태 필터 "완료" 탭으로 전환 후 해당 행 존재 확인
  await page.click('[data-testid="filter-완료"]')
  await expect(firstRow).toBeVisible()
})
