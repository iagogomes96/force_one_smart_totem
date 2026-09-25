import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
const summarize = (result) =>
  result.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
  }));
console.log(
  'desktop',
  JSON.stringify(
    summarize(
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze(),
    ),
  ),
);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page
  .locator('#hero-cta')
  .getByRole('button', { name: 'Quero conhecer o Smart Totem', exact: true })
  .click();
console.log(
  'modal',
  JSON.stringify(
    summarize(
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze(),
    ),
  ),
);
await browser.close();
