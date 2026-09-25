import { test, expect } from '@playwright/test';
import siteConfig from '../../config.json';
test('12 seções, um h1 e nenhum overflow nos viewports da especificação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('main>section')).toHaveCount(12);
  await expect(page.locator('h1')).toHaveCount(1);
  for (const [width, height] of [
    [320, 568],
    [360, 800],
    [390, 844],
    [412, 915],
    [768, 1024],
    [1024, 768],
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1600, 900],
    [1920, 1080],
    [2560, 1440],
  ]) {
    await page.setViewportSize({ width, height });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `overflow em ${width}`,
    ).toBe(true);
  }
});

test('quebras editoriais preservam os espaços no mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const ecosystemText = await page.locator('#ecossistema .section-intro .lead').innerText();
  const appText = await page.locator('#aplicativo .app-access-lead').innerText();

  expect(ecosystemText.replace(/\s+/g, ' ').trim()).toBe(
    'Quando tecnicamente compatível, homologada e autorizada, uma infraestrutura privada pode contribuir com programas públicos de videomonitoramento e segurança, ampliando a conexão entre cidade, tecnologia e colaboração.',
  );
  expect(appText.replace(/\s+/g, ' ').trim()).toBe(
    'Acompanhe os pontos vinculados ao seu projeto, consulte imagens ao vivo e acesse gravações através do aplicativo disponibilizado pela Force One. Segurança e controle na palma da sua mão.',
  );
});

test('totem e todos os cards da seção de produto cabem no mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const visual = await page.locator('#produto .product-visual').boundingBox();
  const productImage = await page.locator('#produto .product-image').boundingBox();
  const lastBenefit = await page.locator('#produto .benefit-5').boundingBox();

  expect(productImage!.y).toBeGreaterThanOrEqual(visual!.y);
  expect(lastBenefit!.y + lastBenefit!.height).toBeLessThanOrEqual(visual!.y + visual!.height);
});

test('indicadores começam em zero e contam até os valores configurados', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  const counters = page.locator('[data-count]');
  await expect(counters).toHaveText(['0', '0', '0']);

  await page.locator('.stats').scrollIntoViewIfNeeded();
  await expect(counters).toHaveText(
    siteConfig.indicators.map((indicator) => indicator.value.toLocaleString('pt-BR')),
    { timeout: 6000 },
  );
});

test('modal valida, prepara o WhatsApp e devolve o foco', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('dialog')).toHaveCount(0);
  const trigger = page
    .locator('#hero-cta')
    .getByRole('button', { name: 'Quero conhecer o Smart Totem', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(page.getByText('Informe seu nome com pelo menos 2 caracteres.')).toBeVisible();
  await page.getByLabel('Nome', { exact: true }).fill('Teste QA');
  await page.getByLabel('WhatsApp', { exact: true }).fill('11999991234');
  await page.getByLabel('Cidade', { exact: true }).fill('Recife');
  await page.getByLabel('Tipo de projeto').selectOption('Empresa');
  await page.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(page.getByText('Mensagem preparada')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Continuar no WhatsApp' })).toHaveAttribute(
    'href',
    new RegExp(`wa\\.me/${siteConfig.contact.whatsappNumber.replace(/\D/g, '')}`),
  );
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('conversão dispara no dataLayer sem expor dados pessoais', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('#hero-cta')
    .getByRole('button', { name: 'Quero conhecer o Smart Totem', exact: true })
    .click();
  await page.getByLabel('Nome', { exact: true }).fill('Pessoa de Teste');
  await page.getByLabel('WhatsApp', { exact: true }).fill('21988881234');
  await page.getByLabel('Cidade', { exact: true }).fill('Niterói');
  await page.getByLabel('Tipo de projeto').selectOption('Condomínio');
  await page.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(page.getByText('Mensagem preparada')).toBeVisible();
  const events = await page.evaluate(() =>
    JSON.stringify((window as typeof window & { dataLayer: unknown[] }).dataLayer),
  );
  expect(events).toContain('generate_lead');
  expect(events).toContain('lead_submit_success');
  expect(events).not.toContain('Pessoa de Teste');
  expect(events).not.toContain('21988881234');
});
test('FAQ mobile tem somente uma resposta e modal prende o foco', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Uma câmera consegue impedir um crime?' }).click();
  await expect(page.locator('.faq-answer:visible')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Nenhuma tecnologia séria deve prometer risco zero.' }),
  ).toBeVisible();
  await page.locator('#duvidas').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Solicitar projeto', exact: true }).click();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
});

test('header aparece após a hero e desaparece ao entrar no footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-header')).toHaveCount(0);
  await page.locator('#problema').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-header')).toBeVisible();
  await page.locator('#footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-header')).toHaveCount(0);
});
test('motion preserva o tamanho do produto e o CTA fixo restaura o foco', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForTimeout(1800);
  expect(await page.locator('.hero-image').evaluate((el) => getComputedStyle(el).position)).toBe(
    'absolute',
  );
  await page.locator('#numeros').scrollIntoViewIfNeeded();
  const sticky = page.locator('.sticky-cta button');
  await expect(sticky).toBeVisible();
  await sticky.click();
  await expect(page.locator('.sticky-cta')).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(sticky).toBeFocused();
});

test('texto dos cards expandidos cabe no tablet', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Saiba mais: Casas e residências' }).click();
  const card = await page.locator('.application-2').boundingBox();
  const content = await page.locator('#application-detail-2').boundingBox();
  expect(content!.y).toBeGreaterThanOrEqual(card!.y);
  expect(content!.y + content!.height).toBeLessThanOrEqual(card!.y + card!.height);
});
