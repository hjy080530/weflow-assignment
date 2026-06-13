import { chromium } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.join(dir, 'project-intro.html')
const outPath = path.join(dir, 'WEFLOW-프로젝트소개.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' })
// give web font a moment
await page.evaluate(() => document.fonts.ready)
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})
await browser.close()
console.log('PDF written:', outPath)
