import { expect, type Page } from '@playwright/test'

/**
 * 관리자 로그인.
 * 개발 모드에서 하이드레이션 완료 전 submit을 누르면 폼이 네이티브 GET으로
 * 제출돼 `/admin/login?email=...`로 머무는 레이스가 있다. 리다이렉트가 안 되면
 * 로그인 페이지를 다시 열고 재시도해 하이드레이션 이후 동작을 보장한다.
 */
export async function adminLogin(page: Page): Promise<void> {
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.goto('/admin/login')
    await expect(page.locator('[name="email"]')).toBeVisible()
    await page.fill('[name="email"]', 'badeagle85@gmail.com')
    await page.fill('[name="password"]', '1111')
    await page.click('button[type="submit"]')
    try {
      await page.waitForURL('**/admin', { timeout: 5000 })
      return
    } catch {
      // 네이티브 GET 제출로 로그인 페이지에 머문 경우 재시도
    }
  }
  throw new Error('관리자 로그인 실패: /admin 리다이렉트가 발생하지 않음')
}
