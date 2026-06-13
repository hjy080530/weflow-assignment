import { test, expect } from '@playwright/test'
import * as XLSX from 'xlsx'
import { adminLogin } from './utils'

function readWorkbook(filePath: string) {
  const workbook = XLSX.readFile(filePath)
  const firstSheetName = workbook.SheetNames[0]
  const firstSheet = workbook.Sheets[firstSheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(firstSheet)

  return {
    workbook,
    firstSheetName,
    rows,
  }
}

function hasRow(
  rows: Array<Record<string, string>>,
  expected: Record<string, string>
): boolean {
  return rows.some((row) =>
    Object.entries(expected).every(([key, value]) => row[key] === value)
  )
}

test('엑셀 다운로드 — 예약/문의/전체 3종', async ({ page }) => {
  await adminLogin(page)
  await expect(page.locator('[data-testid="download-reservations"]')).toBeVisible()
  await expect(page.locator('[data-testid="download-inquiries"]')).toBeVisible()
  await expect(page.locator('[data-testid="download-all"]')).toBeVisible()
  await expect(page.locator('[data-testid="reservation-row"]').first()).toBeVisible()
  await expect(page.locator('[data-testid="inquiry-row"]').first()).toBeVisible()

  // 예약 엑셀
  const [reservationDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-testid="download-reservations"]').click()
  ])
  expect(reservationDownload.suggestedFilename()).toMatch(/reservation.*\.xlsx$/)
  const reservationPath = test.info().outputPath(reservationDownload.suggestedFilename())
  await reservationDownload.saveAs(reservationPath)
  const reservationWorkbook = readWorkbook(reservationPath)
  expect(reservationWorkbook.workbook.SheetNames).toEqual(['예약'])
  expect(reservationWorkbook.firstSheetName).toBe('예약')
  expect(reservationWorkbook.rows.length).toBeGreaterThan(0)
  // 상태는 다른 테스트(상태 변경)에서 바뀔 수 있으므로 단정하지 않는다.
  expect(
    hasRow(reservationWorkbook.rows, {
      이름: '박서연',
      제작종류: '랜딩페이지 제작',
    })
  ).toBe(true)

  // 문의 엑셀
  const [inquiryDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-testid="download-inquiries"]').click()
  ])
  expect(inquiryDownload.suggestedFilename()).toMatch(/inquiry.*\.xlsx$/)
  const inquiryPath = test.info().outputPath(inquiryDownload.suggestedFilename())
  await inquiryDownload.saveAs(inquiryPath)
  const inquiryWorkbook = readWorkbook(inquiryPath)
  expect(inquiryWorkbook.workbook.SheetNames).toEqual(['문의'])
  expect(inquiryWorkbook.firstSheetName).toBe('문의')
  expect(inquiryWorkbook.rows.length).toBeGreaterThan(0)
  expect(
    hasRow(inquiryWorkbook.rows, {
      이름: '오세훈',
      제작종류: '홈페이지 제작',
    })
  ).toBe(true)

  // 전체 통합 엑셀
  const [allDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-testid="download-all"]').click()
  ])
  expect(allDownload.suggestedFilename()).toMatch(/weflow-all.*\.xlsx$/)
  const allPath = test.info().outputPath(allDownload.suggestedFilename())
  await allDownload.saveAs(allPath)
  const allWorkbook = XLSX.readFile(allPath)
  expect(allWorkbook.SheetNames).toEqual(['예약', '문의'])

  const allReservationRows = XLSX.utils.sheet_to_json<Record<string, string>>(
    allWorkbook.Sheets['예약']
  )
  const allInquiryRows = XLSX.utils.sheet_to_json<Record<string, string>>(
    allWorkbook.Sheets['문의']
  )

  expect(allReservationRows.length).toBeGreaterThan(0)
  expect(allInquiryRows.length).toBeGreaterThan(0)
  expect(hasRow(allReservationRows, { 이름: '박서연' })).toBe(true)
  expect(hasRow(allInquiryRows, { 이름: '오세훈' })).toBe(true)
})
