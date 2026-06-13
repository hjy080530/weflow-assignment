import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: false,
  // 단일 Supabase 테스트 데이터 상태를 공유하므로 직렬 실행으로 상호 간섭과
  // 콜드 컴파일 동시 부하를 막는다.
  workers: 1,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3002',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx next dev --webpack -p 3002',
    url: 'http://localhost:3002',
    reuseExistingServer: false,
    timeout: 120000,
  },
})
