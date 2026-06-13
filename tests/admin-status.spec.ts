import { test, expect } from '@playwright/test'
import { adminLogin } from './utils'

test('관리자 상태 변경 → 즉시 DB 반영 + UI 업데이트', async ({ page }) => {
  await adminLogin(page)

  // 첫 번째 문의 행이 로드될 때까지 대기 후 "진행중" 버튼 클릭
  const firstRow = page.locator('[data-testid="inquiry-row"]').first()
  await expect(firstRow).toBeVisible({ timeout: 10000 })
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
