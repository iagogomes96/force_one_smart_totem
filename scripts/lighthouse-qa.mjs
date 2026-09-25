import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
try {
  const result = await lighthouse('http://localhost:3001', {
    port: 9222,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    logLevel: 'error',
  });
  await writeFile('.qa/lighthouse.json', result.report);
  console.log(
    JSON.stringify({
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score]),
      ),
      metrics: Object.fromEntries(
        ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'].map(
          (key) => [key, result.lhr.audits[key].displayValue],
        ),
      ),
    }),
  );
} finally {
  await browser.close();
}
