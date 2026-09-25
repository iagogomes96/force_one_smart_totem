import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('.qa', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.qa/desktop-hero.png' });
for (const id of ['colaborativa', 'bastian', 'aplicacoes', 'duvidas']) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/desktop-${id}.png` });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.qa/mobile-hero.png' });
await page
  .locator('#hero-cta')
  .getByRole('button', { name: 'Quero conhecer o Smart Totem', exact: true })
  .click();
await page.screenshot({ path: '.qa/mobile-modal.png' });
console.log(JSON.stringify({ pageErrors: errors }));
await browser.close();
