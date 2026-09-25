import { assetPath, siteConfig } from './site-config';

export const stats = siteConfig.indicators;
export const projectTypes = [
  'Condomínio',
  'Empresa',
  'Comércio',
  'Casa / Residência',
  'Projeto de vizinhança',
  'Outro',
] as const;
export const benefits = [
  {
    title: 'Imagens Full HD',
    text: 'Mais definição para enxergar os detalhes que importam.',
    icon: 'camera',
  },
  {
    title: 'Acesso remoto',
    text: 'Acompanhe seu projeto, mesmo quando estiver longe.',
    icon: 'phone',
  },
  {
    title: 'Até 7 dias de gravação',
    text: 'Consulte registros anteriores, de acordo com o serviço.',
    icon: 'history',
  },
  {
    title: 'Bastian',
    text: 'Tecnologia própria conectando recursos e dispositivos.',
    icon: 'network',
  },
  {
    title: 'Segurança colaborativa',
    text: 'Um ponto que pode fazer parte de uma rede maior.',
    icon: 'users',
  },
];
export const questions = [
  {
    question: 'Mas eu já tenho câmeras.',
    title: 'Ótimo.',
    headline: 'O Smart Totem não precisa substituir o que já funciona.',
    answer:
      'Câmeras internas, controle de acesso, alarmes e portaria continuam cumprindo suas funções. O Smart Totem adiciona outra camada: monitoramento externo, presença visual e possibilidade de conexão com uma estratégia mais ampla.',
  },
  {
    question: 'O Smart Totem substitui minha estrutura?',
    title: 'Não necessariamente.',
    headline: 'Uma nova camada para a sua segurança.',
    answer:
      'A aplicação é avaliada de acordo com o seu projeto. O Smart Totem pode complementar a estrutura existente, ampliando o monitoramento para o entorno e os acessos.',
  },
  {
    question: 'Uma câmera consegue impedir um crime?',
    title: 'Transparência em primeiro lugar.',
    headline: 'Nenhuma tecnologia séria deve prometer risco zero.',
    answer:
      'O monitoramento amplia a visibilidade e ajuda a compreender o contexto. Segurança eficiente envolve tecnologia, pessoas, procedimentos e diferentes camadas de proteção.',
  },
  {
    question: 'Isso funciona apenas para condomínios?',
    title: 'Não.',
    headline: 'A vida acontece em muitos lugares.',
    answer:
      'Empresas, comércios, casas e projetos de vizinhança também podem receber o Smart Totem. A solução é avaliada conforme as características de cada local.',
  },
  {
    question: 'A integração com sistemas públicos é automática?',
    title: 'Não.',
    headline: 'Cada conexão tem seus critérios.',
    answer:
      'Integrações dependem de compatibilidade técnica, adesões, homologações e autorizações dos programas e órgãos responsáveis.',
  },
];
export const applications = [
  {
    title: 'Condomínios',
    text: 'A segurança começa antes do portão abrir.',
    detail: 'Monitoramento do entorno e dos acessos, complementando a estrutura do condomínio.',
    image: assetPath('/assets/application-condominiums.webp'),
  },
  {
    title: 'Empresas',
    text: 'Proteja mais do que a porta de entrada.',
    detail: 'Visibilidade sobre acessos, circulação e pontos estratégicos da operação.',
    image: assetPath('/assets/application-companies.webp'),
  },
  {
    title: 'Casas e residências',
    text: 'Amplie a visão para além do seu muro.',
    detail:
      'O Smart Totem pode complementar a segurança residencial com monitoramento do entorno, acessos, calçada e aproximações ao imóvel, além de permitir que a residência faça parte de uma estratégia maior de Segurança Colaborativa na região.',
    image: assetPath('/assets/application-homes.webp'),
  },
  {
    title: 'Comércios',
    text: 'Mais presença. Mais visibilidade. Mais contexto.',
    detail: 'Uma camada de monitoramento para a rotina do seu negócio.',
    image: assetPath('/assets/application-commerce.webp'),
  },
  {
    title: 'Projetos de vizinhança',
    text: 'A proteção não precisa terminar no próprio imóvel.',
    detail: 'Pontos estratégicos conectados para ampliar a visão da região.',
    image: assetPath('/assets/application-neighborhood.webp'),
  },
];
