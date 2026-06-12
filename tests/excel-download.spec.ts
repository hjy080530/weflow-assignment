import { test, expect } from '@playwright/test'

test('엑셀 다운로드 — 예약/문의/전체 3종', async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('[name="email"]', 'badeagle85@gmail.com')
  await page.fill('[name="password"]', '1111')
  await page.click('button[type="submit"]')
  await page.goto('/admin')

  // 예약 엑셀
  const [reservationDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-reservations"]')
  ])
  expect(reservationDownload.suggestedFilename()).toMatch(/reservation.*\.xlsx$/)

  // 문의 엑셀
  const [inquiryDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-inquiries"]')
  ])
  expect(inquiryDownload.suggestedFilename()).toMatch(/inquiry.*\.xlsx$/)

  // 전체 통합 엑셀
  const [allDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-all"]')
  ])
  expect(allDownload.suggestedFilename()).toMatch(/weflow-all.*\.xlsx$/)
})
