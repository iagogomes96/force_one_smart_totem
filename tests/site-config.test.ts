import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWhatsAppUrl, siteConfig } from '../src/lib/site-config';

test('monta o destino do WhatsApp com os dados do formulário', () => {
  const url = new URL(
    buildWhatsAppUrl({ name: 'Marina Silva', city: 'Campinas', projectType: 'Condomínio' }),
  );

  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, `/${siteConfig.contact.whatsappNumber}`);
  assert.equal(
    url.searchParams.get('text'),
    'Olá! Meu nome é Marina Silva, sou de Campinas e conheci o Smart Totem pelo site da Force One. Gostaria de conversar com a equipe para avaliar como a solução pode atender ao meu projeto (Condomínio).',
  );
});
