# Force One Smart Totem

Landing page responsiva com 12 seções, rede progressiva em SVG, scrollytelling, FAQ acessível e formulário de leads em modal/bottom sheet.

## Executar

Requer Node.js 20.9+ e npm.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abra [localhost:3000](http://localhost:3000).

```powershell
npm run build
```

O build estático é gerado em `out`. Para publicar em uma hospedagem Apache/cPanel, envie o
conteúdo dessa pasta para `public_html`.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida cada pull request direcionado à `main`.
Depois do merge, ele gera a versão com o prefixo `/force_one_smart_totem` e publica o site em
`https://iagogomes96.github.io/force_one_smart_totem/`.

No repositório do GitHub, selecione uma única vez **Settings → Pages → Source → GitHub Actions**.
O build local e a publicação no cPanel continuam usando a raiz do domínio porque o prefixo só é
definido dentro do workflow do GitHub Pages.

## Verificações

```powershell
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npx playwright install firefox webkit
npm run test:browsers
node scripts/accessibility-qa.mjs
node scripts/visual-qa.mjs
```

Os testes de envio não abrem o WhatsApp nem enviam mensagens a terceiros. A suíte completa inclui Edge e exige o navegador instalado; em outras plataformas, use `npx playwright test --project=chromium --project=firefox --project=webkit`.

## Configuração

Veja `.env.example` para configurar o domínio público antes do build. O formulário valida os dados no navegador, dispara o evento configurado para o `dataLayer` e abre o WhatsApp com a mensagem pronta. Não existe armazenamento de leads no site.

Os dados editoriais que precisam de manutenção frequente ficam em `config.json`: número de destino do WhatsApp, modelo da mensagem, Instagram, política de privacidade, link da Nebulabs, indicadores, ID do GTM e nome do evento de conversão. Informe o WhatsApp somente com DDI e números, sem `+`, espaços ou pontuação.

Os assets finais entregues pela Force One estão em `public/assets`, incluindo a composição com telas reais do aplicativo. As marcas oficiais dos programas públicos ainda precisam ser fornecidas. As decisões e limitações atuais estão em [docs/IMPLEMENTACAO.md](docs/IMPLEMENTACAO.md).

## Organização

- `src/app`: página, metadata/Open Graph e privacidade.
- `src/components`: layout, rede SVG, animação e modal.
- `src/lib`: conteúdo, validação, eventos e rate limit.
- `public/assets`: imagens finais fornecidas para a landing page.
- `public/images`: recortes legados mantidos apenas para referência.
- `tests`: validação, endpoint e fluxos em navegador.
- `scripts`: extração de assets e verificações visual, acessível e de desempenho.
