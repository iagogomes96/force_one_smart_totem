# Force One Smart Totem — implementação

## Fonte e decisões

Implementação no repositório existente, com Next.js App Router, React, TypeScript, GSAP/ScrollTrigger, SVG e CSS com tokens. As 12 seções seguem a ordem da especificação master. Manrope é a família provisória, servida localmente por `next/font`, substituível pelos tokens `--font-display` e `--font-body`.

Conteúdo essencial é renderizado no servidor. Motion é progressivo e respeita `prefers-reduced-motion`. Não há scroll hijacking, carrossel, popup automático ou navegação institucional.

## Assets e fidelidade

Os assets finais fornecidos pela Force One estão versionados em `public/assets`. A hero usa o fundo já composto com mapa e conexões; o produto usa o render transparente em alta resolução; e problema, números, rede colaborativa, aplicações e encerramento usam as imagens correspondentes de cada wireframe. Logo Force One e marca Bastian também usam os PNGs oficiais recebidos.

Os títulos, parágrafos, botões e formulários continuam como HTML acessível. As marcações numéricas usadas apenas para identificar os wireframes foram removidas, e as seções compartilham o mesmo fundo e transições suaves para formar uma narrativa contínua.

O wireframe 09 usa a composição final fornecida com as telas reais do aplicativo, sem simulação de cliques ou interfaces automáticas.

Limitação concreta do material recebido:

- Não vieram logos oficiais dos três programas públicos. Os programas são identificados por texto, sem criação ou recoloração de marcas. A nota sobre compatibilidade, homologação e autorização permanece visível.

## Conversão

Todos os CTAs abrem um único `<dialog>` nativo por ação voluntária. Desktop usa modal; mobile usa bottom sheet. Inclui foco contido, Escape, retorno ao gatilho original, bloqueio da rolagem, máscara brasileira e validação por campo.

Após a validação, o navegador dispara o evento de conversão configurado no `dataLayer` e prepara a mensagem do WhatsApp com nome, cidade e tipo de projeto. O site não possui endpoint, CRM ou banco próprio de leads. A conversa só começa quando a pessoa confirma o envio no WhatsApp.

## Analytics e privacidade

Eventos são publicados em `window.dataLayer`. O contêiner do Google Tag Manager pode ser informado em `config.json`; quando o ID estiver vazio, nenhum script externo é carregado. Nome e telefone não são propriedades dos eventos. Para conversões otimizadas, o GTM pode usar os campos identificados do formulário no instante em que `generate_lead` é disparado, conforme a configuração e o consentimento adotados pelo projeto.

`/privacidade` é uma nota provisória transparente sobre a implementação. Antes de produção, fornecer a política institucional, canal de direitos do titular e retenção, usando `NEXT_PUBLIC_PRIVACY_URL` para apontar à URL aprovada.

## Entrega e publicação

O desenvolvimento local não publica a página. Para produção:

1. Definir domínio e `NEXT_PUBLIC_SITE_URL` antes do build.
2. Informar o ID `GTM-...` em `config.json` e configurar o gatilho `generate_lead` no GTM.
3. Fornecer a política de privacidade institucional e a solução de consentimento aplicável.
4. Executar `npm run build` e enviar o conteúdo de `out` para `public_html`.
5. Fazer uma submissão de teste e confirmar o texto preparado no WhatsApp.
6. Validar em aparelhos reais; emulação e WebKit no Windows não equivalem ao Safari iOS.

Os números de instalações, câmeras e clientes são os fornecidos pela especificação e estão centralizados em `src/lib/content.ts`.
