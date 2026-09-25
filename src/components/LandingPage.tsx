'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Eye,
  Network,
  Users,
  Building2,
  Smartphone,
  History,
  Radio,
  Plus,
  Minus,
  Link2,
  SlidersHorizontal,
  ChartNoAxesColumnIncreasing,
  MapPin,
  PersonStanding,
  Car,
  CircleAlert,
  ShieldCheck,
  MessageCircle,
  Instagram,
  ExternalLink,
} from 'lucide-react';
import { LeadModal } from './LeadModal';
import { Motion } from './Motion';
import { applications, benefits, questions, stats } from '@/lib/content';
import { track } from '@/lib/analytics';
import { assetPath, siteConfig, sitePath } from '@/lib/site-config';
const benefitIcons = [Camera, Smartphone, History, Network, Users];
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export default function LandingPage() {
  const leadTrigger = useRef<HTMLElement | null>(null);
  const [modal, setModal] = useState(false),
    [ready, setReady] = useState(false),
    [headerVisible, setHeaderVisible] = useState(false),
    [sticky, setSticky] = useState(false),
    [stickyLabel, setStickyLabel] = useState('Quero conhecer o Smart Totem'),
    [stickyBottom, setStickyBottom] = useState(12),
    [faq, setFaq] = useState(0),
    [application, setApplication] = useState<number | null>(null);
  useEffect(() => {
    setReady(true);
    const update = () => {
      const heroSection = document.getElementById('hero');
      const footer = document.getElementById('footer');
      const heroRect = heroSection?.getBoundingClientRect();
      const footerRect = footer?.getBoundingClientRect();
      setHeaderVisible(
        Boolean(
          heroRect && footerRect && heroRect.bottom <= 0 && footerRect.top >= window.innerHeight,
        ),
      );
      const hero = document.getElementById('hero-cta');
      setSticky(!!hero && hero.getBoundingClientRect().bottom < 0);
      if (footerRect) {
        setStickyBottom(Math.max(12, window.innerHeight - footerRect.top + 12));
      }

      const sectionCtas = [
        ['produto', 'Quero conhecer o Smart Totem'],
        ['colaborativa', 'Segurança Colaborativa'],
        ['aplicacoes', 'Quero avaliar meu projeto'],
        ['aplicativo', 'Quero conhecer o Smart Totem'],
        ['duvidas', 'Quero avaliar minha região'],
        ['projeto', 'Quero avaliar minha região'],
        ['conexao', 'Quero avaliar minha região'],
      ] as const;
      const readingLine = window.innerHeight * 0.45;
      const activeCta = sectionCtas.find(([id]) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= readingLine && rect.bottom > readingLine;
      });
      if (activeCta) setStickyLabel(activeCta[1]);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const open = (event: string, trigger?: HTMLElement) => {
    leadTrigger.current = trigger || (document.activeElement as HTMLElement);
    track(event);
    track('lead_modal_open');
    setModal(true);
  };
  const close = () => {
    setModal(false);
    track('lead_modal_close');
  };
  const cta = (
    label = 'Quero conhecer o Smart Totem',
    event = 'conversion_cta_click',
    className = '',
  ) => (
    <button
      className={`button ${className}`}
      disabled={!ready}
      onClick={(click) => {
        click.currentTarget.focus();
        open(event, click.currentTarget);
      }}
    >
      <span key={label} className="cta-label">
        {label}
      </span>
      <ArrowUpRight size={20} aria-hidden="true" />
    </button>
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      {headerVisible && (
        <header className="site-header visible">
          <div className="container header-inner">
            <a href="#hero" aria-label="Force One, início">
              <Image
                src={assetPath('/assets/logo-force-one.webp')}
                alt="Force One Security & Technology"
                width={256}
                height={67}
                priority
                className="brand-logo"
              />
            </a>
            {cta('Solicitar projeto', 'header_cta_click', 'button-outline')}
          </div>
        </header>
      )}
      <main id="conteudo">
        <section
          className="hero"
          id="hero"
          style={
            {
              '--hero-background': `url("${assetPath('/assets/hero-background.webp')}")`,
              '--hero-background-mobile': `url("${assetPath('/assets/hero-background-mobile.webp')}")`,
            } as CSSProperties
          }
        >
          <div className="hero-background-motion" aria-hidden="true" />
          <div className="hero-visual">
            <Image
              className="hero-image"
              src={assetPath('/assets/smart-totem.webp')}
              alt="Smart Totem Force One com câmeras e tecnologia Bastian em uma rua à noite"
              fill
              priority
              fetchPriority="high"
              quality={68}
              sizes="(max-width: 767px) 60vw, 50vw"
            />
            <div className="hero-image-shade" />
          </div>
          <div className="container hero-content">
            <div className="hero-copy">
              <Eyebrow>Force One Smart Totem</Eyebrow>
              <h1>
                Uma câmera monitora
                <br /> um ponto.
                <em>
                  Uma rede ajuda a
                  <br /> proteger uma região.
                </em>
              </h1>
              <p className="lead">
                Segurança colaborativa, tecnologia Bastian e inteligência conectando patrimônio,
                pessoas e cidades.
              </p>
              <div id="hero-cta">{cta(undefined, 'hero_cta_click')}</div>
              <a className="explore-link" href="#problema">
                <span>
                  <ArrowDown size={17} />
                </span>
                Entenda como uma rede pode ampliar a segurança da sua região
              </a>
              <div className="hero-capabilities">
                {[
                  [Eye, 'Monitora'],
                  [Network, 'Conecta'],
                  [Users, 'Protege'],
                  [Building2, 'Cidades mais seguras'],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Eye;
                  return (
                    <div key={String(label)}>
                      <I size={22} />
                      <span>{String(label)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span className="scroll-caption">
              Explore a conexão <ArrowDown size={15} />
            </span>
          </div>
        </section>
        <section className="problem section" id="problema">
          <div className="container">
            <div className="problem-grid">
              <div className="problem-copy">
                <div className="reveal">
                  <Eyebrow>O ponto cego da segurança</Eyebrow>
                  <h2>
                    Seu sistema
                    <br /> enxerga <em>até onde?</em>
                  </h2>
                  <p className="lead">
                    Você monitora o portão.
                    <br /> Mas o que acontece antes de alguém
                    <br /> chegar até ele?
                  </p>
                </div>
                <div className="problem-steps">
                  {[
                    [Eye, 'Você vê quem chega.'],
                    [PersonStanding, 'Mas talvez não veja quem estava observando antes.'],
                    [Car, 'Ou o veículo que permaneceu alguns metros adiante.'],
                    [CircleAlert, 'O que acontece fora do seu campo de visão também importa.'],
                  ].map(([Icon, text], i) => {
                    const I = Icon as typeof Eye;
                    return (
                      <div className="problem-step reveal" key={String(text)}>
                        <span className="problem-step-icon">
                          <I />
                        </span>
                        <p className={i === 3 ? 'problem-conclusion' : ''}>{String(text)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <figure className="problem-scene">
                <div className="problem-image-frame">
                  <div className="problem-image-stage">
                    <Image
                      className="problem-base-image"
                      src={assetPath('/assets/background-condominio-v2.webp')}
                      alt="Entrada de condomínio monitorada por uma câmera"
                      fill
                      sizes="(max-width: 1023px) 100vw, 55vw"
                    />
                    <Image
                      className="problem-complete-image"
                      src={assetPath('/assets/background-condominio-completo.webp')}
                      alt="Campo de visão da câmera no portão e áreas externas que permanecem sem cobertura"
                      fill
                      sizes="(max-width: 1023px) 100vw, 55vw"
                    />
                  </div>
                </div>
                <figcaption>
                  <span className="live-dot" /> Visão limitada. Contexto importa.
                </figcaption>
              </figure>
            </div>
            <div className="section-end reveal">
              O problema não é apenas ter uma câmera.
              <strong>É até onde ela consegue enxergar.</strong>
            </div>
          </div>
        </section>
        <section className="product section" id="produto">
          <div className="product-background" aria-hidden="true">
            <Image
              src={assetPath('/assets/product-background.webp')}
              alt=""
              fill
              sizes="100vw"
              quality={65}
            />
          </div>
          <div className="container">
            <div className="product-grid">
              <div className="product-copy">
                <div className="reveal">
                  <Eyebrow>Conheça o Force One Smart Totem</Eyebrow>
                  <h2>
                    Um novo ponto
                    <br /> de inteligência
                    <br /> <em>para a sua região.</em>
                  </h2>
                  <p className="lead">
                    Monitoramento em alta definição, conectividade,
                    <br className="product-copy-break" /> acesso remoto e tecnologia preparada para
                    <br className="product-copy-break" /> construir uma rede de segurança mais
                    ampla.
                  </p>
                </div>
                {cta()}
                <p className="product-closing-copy reveal">
                  <span>Não é apenas um ponto de monitoramento.</span>
                  <strong>É o começo de uma rede.</strong>
                </p>
              </div>
              <div className="product-visual">
                <div className="product-orbit" />
                <Image
                  className="product-image"
                  src={assetPath('/assets/smart-totem.webp')}
                  alt="Smart Totem: câmeras Full HD e núcleo Bastian"
                  width={214}
                  height={621}
                  loading="eager"
                  fetchPriority="low"
                  quality={68}
                  sizes="(max-width: 767px) 77vw, 420px"
                />
                <span className="product-tag">
                  <span className="live-dot" /> Inteligência em cada conexão
                </span>
                <div className="benefits">
                  {benefits.map((benefit, i) => {
                    const Icon = benefitIcons[i];
                    return (
                      <article className={`benefit benefit-${i + 1}`} key={benefit.title}>
                        <span className="benefit-icon">
                          <Icon size={25} />
                        </span>
                        <div>
                          <h3>{benefit.title}</h3>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="numbers section" id="numeros">
          <div className="numbers-media" aria-hidden="true">
            <Image src={assetPath('/assets/numbers-background.webp')} alt="" fill sizes="100vw" />
            <Image
              className="section-connections"
              src={assetPath('/assets/numbers-connections.webp')}
              alt=""
              fill
              sizes="100vw"
            />
            <span className="numbers-map-label numbers-map-label-people">
              Mais segurança
              <br /> para pessoas
            </span>
            <span className="numbers-map-label numbers-map-label-cities">
              Cidades
              <br /> mais conectadas
            </span>
            <span className="numbers-map-label numbers-map-label-network">
              Uma rede
              <br /> em expansão
            </span>
          </div>
          <div className="container">
            <div className="section-intro reveal">
              <Eyebrow>Presença que gera confiança</Eyebrow>
              <h2>
                Uma rede que
                <br /> <em>já está nas ruas.</em>
              </h2>
              <p className="lead">
                Cada instalação amplia a presença da Force One
                <br className="numbers-copy-break" /> e fortalece a construção de uma rede de
                <br className="numbers-copy-break" /> segurança mais conectada.
              </p>
            </div>
            <div className="stats">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <div className="stat-number">
                    <em>+</em>
                    <span data-count={stat.value}>0</span>
                  </div>
                  <h3>{stat.label}</h3>
                  <p>
                    {stat.description.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
            <div className="section-end reveal">
              Números que representam mais do que equipamentos.
              <strong>Quanto maior a rede, maior o potencial da Segurança Colaborativa.</strong>
            </div>
          </div>
        </section>
        <section className="collaborative section" id="colaborativa">
          <div className="container">
            <div className="split">
              <div className="reveal collaborative-copy">
                <Eyebrow>Mais conexão. Mais segurança.</Eyebrow>
                <h2>
                  E se esses pontos
                  <br /> pudessem
                  <br /> <em>trabalhar juntos?</em>
                </h2>
                <p className="lead">
                  É daí que nasce o conceito de
                  <br /> <strong>Segurança Colaborativa.</strong>
                </p>
                <div className="network-comparison">
                  <figure className="comparison-card comparison-isolated">
                    <div className="comparison-media">
                      <span>Ponto isolado</span>
                      <Image
                        src={assetPath('/assets/isolated-point.webp')}
                        alt="Um ponto isolado de monitoramento"
                        width={310}
                        height={310}
                      />
                    </div>
                    <figcaption>Sozinho, um Totem monitora um ponto.</figcaption>
                  </figure>
                  <ArrowRight className="comparison-arrow" aria-hidden="true" />
                  <figure className="comparison-card comparison-network">
                    <div className="comparison-media">
                      <span>Rede colaborativa</span>
                      <Image
                        src={assetPath('/assets/collaborative-network-card.webp')}
                        alt="Vários pontos ligados em uma rede colaborativa"
                        width={310}
                        height={170}
                      />
                    </div>
                    <figcaption>
                      Juntos, eles ajudam
                      <br /> a proteger uma região.
                    </figcaption>
                  </figure>
                </div>
                {cta(
                  'Quero levar Segurança Colaborativa para minha região',
                  'collaborative_cta_click',
                  'collaborative-cta collaborative-desktop-cta',
                )}
              </div>
              <div className="collaborative-map">
                <Image
                  src={assetPath('/assets/collaborative-background.webp')}
                  alt="Vista aérea noturna de uma região conectada"
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                />
                <Image
                  className="section-connections"
                  src={assetPath('/assets/collaborative-connections.webp')}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                />
                <span className="map-tag tag-condo">
                  <Building2 /> Condomínio
                </span>
                <span className="map-tag tag-company">
                  <Building2 /> Empresa
                </span>
                <span className="map-tag tag-home">
                  <MapPin /> Residencial
                </span>
                <span className="map-tag tag-shop">
                  <Radio /> Comércio
                </span>
                <p className="map-note">
                  Uma imagem mostra um momento.
                  <br /> <strong>Uma rede ajuda a entender um caminho.</strong>
                </p>
              </div>
              <div className="collaborative-mobile-cta">
                {cta('Segurança Colaborativa', 'collaborative_cta_click', 'collaborative-cta')}
              </div>
            </div>
          </div>
        </section>
        <section className="bastian section" id="bastian">
          <Image
            className="bastian-background"
            src={assetPath('/assets/bastian-background.webp')}
            alt=""
            fill
            sizes="100vw"
          />
          <div className="container">
            <div className="split">
              <div className="reveal bastian-copy">
                <Eyebrow>Diferentes pontos. Uma camada de inteligência.</Eyebrow>
                <h2 className="bastian-title">
                  BASTIAN
                  <span>
                    A inteligência
                    <br /> por trás da rede.
                  </span>
                </h2>
                <p className="lead">
                  Bastian é a camada de tecnologia proprietária
                  <br /> desenvolvida pela Force One para conectar
                  <br /> recursos, dispositivos e serviços do ecossistema
                  <br /> Smart Totem, transformando pontos isolados
                  <br /> em uma infraestrutura mais inteligente.
                </p>
              </div>
              <div className="bastian-system">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="bastian-spokes" aria-hidden="true">
                  <i className="spoke-north" />
                  <i className="spoke-east" />
                  <i className="spoke-south" />
                  <i className="spoke-west" />
                </div>
                <div className="bastian-core">
                  <Image
                    src={assetPath('/assets/logo-bastian.webp')}
                    alt="Símbolo Bastian: olhos inclinados, asas e círculo ONE"
                    width={240}
                    height={240}
                  />
                </div>
                {[
                  ['Smart Totem', 'north', assetPath('/assets/bastian-icon-totem.webp')],
                  ['App', 'east', assetPath('/assets/bastian-icon-app.webp')],
                  ['Rede', 'south', assetPath('/assets/bastian-icon-network.webp')],
                  ['Integrações', 'west', assetPath('/assets/bastian-icon-integrations.webp')],
                ].map(([label, pos, src]) => (
                  <span className={`orbit-label ${pos}`} key={label}>
                    <span className="orbit-icon">
                      <Image src={src} alt="" width={70} height={70} />
                    </span>
                    <b>{label}</b>
                  </span>
                ))}
              </div>
            </div>
            <div className="pillars">
              {[
                [Link2, 'Conectividade', 'Dispositivos e pessoas em uma rede.'],
                [SlidersHorizontal, 'Controle', 'Mais visibilidade para a sua gestão.'],
                [Network, 'Inteligência', 'Conexões que ampliam o contexto.'],
                [
                  ChartNoAxesColumnIncreasing,
                  'Evolução',
                  'Uma infraestrutura pronta para crescer.',
                ],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Eye;
                return (
                  <div key={String(title)}>
                    <I />
                    <div>
                      <h3>{String(title)}</h3>
                      <p>{String(text)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bastian-thesis reveal">
              <span aria-hidden="true" />
              <p>
                A rede cresce. A tecnologia precisa crescer com ela.
                <strong>A inteligência não termina no Totem.</strong>
              </p>
            </div>
          </div>
        </section>
        <section className="ecosystem section" id="ecossistema">
          <div className="container">
            <div className="section-intro reveal">
              <Eyebrow>A inteligência não termina no Totem</Eyebrow>
              <h2 className="ecosystem-title">
                <span>Ecossistema público</span>
                <em>
                  Tecnologia privada preparada
                  <br /> para colaborar com
                  <br /> sistemas maiores.
                </em>
              </h2>
              <p className="lead">
                Quando tecnicamente compatível, homologada e autorizada,
                <br /> uma infraestrutura privada pode contribuir com programas
                <br /> públicos de videomonitoramento e segurança, ampliando
                <br /> a conexão entre cidade, tecnologia e colaboração.
              </p>
            </div>
            <div className="ecosystem-diagram">
              <Image
                className="diagram-background"
                src={assetPath('/assets/ecosystem-background.webp')}
                alt=""
                fill
                sizes="100vw"
              />
              <svg
                className="ecosystem-circuits"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M50 50 V24 H50 V10" />
                <path d="M43 54 L33 66 H16 V84" />
                <path d="M57 54 L67 66 H88 V84" />
                <circle cx="50" cy="50" r="1" />
                <circle cx="50" cy="10" r="0.8" />
                <circle cx="16" cy="84" r="0.8" />
                <circle cx="88" cy="84" r="0.8" />
              </svg>
              <div className="ecosystem-center">
                <Image
                  src={assetPath('/assets/logo-bastian.webp')}
                  alt="Bastian, núcleo do ecossistema Force One"
                  width={120}
                  height={120}
                />
              </div>
              <div className="ecosystem-nodes">
                {[
                  ['smart-sampa', assetPath('/assets/program-smart-sampa.webp'), 'Smart Sampa'],
                  [
                    'muralha',
                    assetPath('/assets/program-muralha-paulista.webp'),
                    'Muralha Paulista',
                  ],
                  ['horus', assetPath('/assets/program-olho-horus.webp'), 'Olho de Hórus'],
                ].map(([position, src, name]) => (
                  <div className={`ecosystem-node ${position}`} key={name}>
                    <Image src={src} alt={name} width={190} height={110} />
                  </div>
                ))}
              </div>
            </div>
            <div className="programs">
              {[
                [
                  'Smart Sampa',
                  'Infraestrutura municipal de videomonitoramento com possibilidade de integração de câmeras privadas dentro dos critérios do programa.',
                ],
                [
                  'Muralha Paulista',
                  'Programa estadual estruturado para receber dados e sensores de colaboradores voluntários, ampliando a abrangência das informações.',
                ],
                [
                  'Olho de Hórus',
                  'Programa municipal de Praia Grande que permite integração voluntária de câmeras particulares ao monitoramento da cidade.',
                ],
              ].map(([name, description]) => (
                <div className="program" key={name}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="applications section" id="aplicacoes">
          <div className="container">
            <div className="applications-ambient" aria-hidden="true">
              <Image
                src={assetPath('/assets/applications-background.webp')}
                alt=""
                fill
                sizes="100vw"
              />
              <Image
                className="section-connections"
                src={assetPath('/assets/applications-connections.webp')}
                alt=""
                fill
                sizes="100vw"
              />
            </div>
            <div className="applications-intro reveal">
              <div className="applications-copy">
                <Eyebrow>Tecnologia é importante</Eyebrow>
                <h2>
                  Mas ela precisa
                  <br /> funcionar{' '}
                  <em>
                    onde
                    <br /> a vida acontece.
                  </em>
                </h2>
                <p className="lead">
                  O Smart Totem pode ser aplicado em diferentes contextos para ampliar o
                  monitoramento externo, reforçar a presença de segurança e conectar pontos
                  estratégicos de uma região.
                </p>
                <div className="applications-copy-cta">
                  {cta('Quero avaliar meu projeto', 'applications_cta_click')}
                </div>
              </div>
              <div className="applications-showcase">
                <p>
                  Mais segurança
                  <br /> para pessoas,
                  <br /> lugares e conexões
                  <br /> <em>reais.</em>
                </p>
                <Image
                  src={assetPath('/assets/smart-totem-left.webp')}
                  alt="Smart Totem aplicado a cenários reais"
                  width={1024}
                  height={1536}
                />
              </div>
            </div>
            <div className="application-grid">
              {applications.map((item, i) => (
                <article
                  className={`application-card application-${i} ${application === i ? 'expanded' : ''}`}
                  key={item.title}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title}: Smart Totem aplicado ao contexto`}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                  <div className="application-overlay" />
                  <div className="application-content">
                    <span className="micro">Para {item.title}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <button
                      aria-expanded={application === i}
                      aria-controls={`application-detail-${i}`}
                      aria-label={`Saiba mais: ${item.title}`}
                      onClick={() => setApplication(application === i ? null : i)}
                    >
                      {application === i ? <Minus /> : <ArrowUpRight />}
                    </button>
                    <p
                      className="application-detail"
                      id={`application-detail-${i}`}
                      hidden={application !== i}
                    >
                      {item.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="applications-mobile-cta">
              {cta('Quero avaliar meu projeto', 'applications_cta_click')}
            </div>
          </div>
        </section>
        <section className="app-access section" id="aplicativo">
          <div className="container">
            <div className="split">
              <div className="reveal">
                <Eyebrow>Na rua. Com você.</Eyebrow>
                <h2 className="app-access-title">
                  O Smart Totem está
                  <br /> na rua. Mas a informação
                  <br /> <em>pode estar com você.</em>
                </h2>
                <p className="lead app-access-lead">
                  Acompanhe os pontos vinculados ao seu projeto, consulte
                  <br /> imagens ao vivo e acesse gravações através
                  <br /> do aplicativo disponibilizado pela Force One. Segurança
                  <br /> e controle na palma da sua mão.
                </p>
                {cta(undefined, 'app_cta_click')}
              </div>
              <div className="app-visual">
                <Image
                  className="app-screens"
                  src={assetPath('/assets/app-screens.webp')}
                  alt="Aplicativo Force One mostrando câmeras ao vivo e mapa de pontos conectados"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 767px) 100vw, 52vw"
                />
              </div>
            </div>
            <div className="app-features">
              {[
                [Radio, 'Ao vivo', 'Visualização em tempo real'],
                [History, 'Gravações', 'Consulte registros anteriores'],
                [History, 'Até 7 dias', 'De acordo com o serviço'],
                [Camera, 'Full HD', 'Mais definição nos detalhes'],
              ].map(([Icon, label, desc]) => {
                const I = Icon as typeof Eye;
                return (
                  <div key={String(label)}>
                    <I />
                    <div>
                      <h3>{String(label)}</h3>
                      <p>{String(desc)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="section-end reveal">
              A câmera está onde a segurança precisa estar.
              <strong>O acesso está onde você estiver.</strong>
            </div>
          </div>
        </section>
        <section className="objections section" id="duvidas">
          <Image
            className="section-background-image"
            src={assetPath('/assets/objections-background.webp')}
            alt=""
            fill
            sizes="100vw"
          />
          <div className="container">
            <div className="reveal">
              <Eyebrow>Antes de decidir, é natural ter perguntas</Eyebrow>
              <h2>
                Dúvidas que fazem sentido.
                <br /> <em>Respostas que dão clareza.</em>
              </h2>
            </div>
            <div className="faq-layout">
              <div className="faq-list">
                {questions.map((item, i) => (
                  <div className={`faq-item ${faq === i ? 'active' : ''}`} key={item.question}>
                    <h3>
                      <button
                        id={`faq-trigger-${i}`}
                        aria-expanded={faq === i}
                        aria-controls={`faq-answer-${i}`}
                        onClick={() => {
                          setFaq(i);
                          track('objection_open', { question_index: i });
                        }}
                      >
                        <span className="faq-dot" />
                        {item.question}
                        {faq === i ? <Minus size={19} /> : <Plus size={19} />}
                      </button>
                    </h3>
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      hidden={faq !== i}
                      className="faq-answer"
                    >
                      <span className="answer-title">{item.title}</span>
                      <h3>{item.headline}</h3>
                      <p>{item.answer}</p>
                      <div className="security-layers" aria-hidden="true">
                        <span>Smart Totem</span>
                        <span>Monitoramento interno</span>
                        <span>Controle de acesso</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inline-cta">
              <p>
                Segurança eficiente raramente depende de uma única barreira.
                <br /> <strong>Ela é construída em camadas.</strong>
              </p>
              {cta('Quero avaliar minha região')}
            </div>
          </div>
        </section>
        <section className="conversion section" id="projeto">
          <Image
            className="section-background-image"
            src={assetPath('/assets/conversion-background.webp')}
            alt=""
            fill
            sizes="100vw"
          />
          <div className="container">
            <div className="conversion-copy reveal">
              <Eyebrow>Vamos olhar para a sua região</Eyebrow>
              <h2>
                Sua região
                <br /> <em>pode ser a próxima.</em>
              </h2>
              <p className="lead">
                Uma câmera monitora um ponto.
                <br /> Uma rede ajuda a proteger uma região.
              </p>
              <p>
                A Force One vai entender o seu cenário e avaliar a aplicação do Smart Totem para a
                sua região.
              </p>
              {cta('Quero avaliar minha região')}
              <span className="conversion-note">Seu contexto. Seu projeto. Uma nova conexão.</span>
            </div>
          </div>
        </section>
        <section className="closing section" id="conexao">
          <div className="container">
            <div className="split">
              <div className="reveal">
                <h2 className="closing-title">
                  <span>O futuro da segurança</span>
                  <span>não está em</span>
                  <span>um único ponto.</span>
                  <em>
                    <span>Está na conexão</span>
                    <span>entre eles.</span>
                  </em>
                </h2>
                <p className="lead">
                  Uma câmera monitora um ponto.
                  <br /> Uma rede ajuda a proteger uma região.
                </p>
                <p className="closing-kicker">Force One Smart Totem</p>
                <p className="closing-statement">Segurança colaborativa começa pela conexão.</p>
                {cta('Quero avaliar minha região')}
              </div>
              <div className="closing-visual">
                <Image
                  src={assetPath('/assets/closing-background.webp')}
                  fill
                  alt="Smart Totem integrado a uma rede de pontos conectados"
                  sizes="(max-width: 767px) 100vw, 55vw"
                />
                <span className="product-tag">
                  <span className="live-dot" /> De pontos isolados a uma região conectada.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer" id="footer">
        <div className="container footer-grid">
          <a className="footer-brand" href="#hero" aria-label="Voltar ao início">
            <Image
              src={assetPath('/assets/logo-force-one.webp')}
              alt="Force One Security & Technology"
              width={330}
              height={86}
            />
          </a>
          <div className="footer-content">
            <nav aria-label="Links do rodapé">
              <a
                href={sitePath(siteConfig.links.privacyUrl)}
                onClick={() => track('privacy_click')}
              >
                <ShieldCheck /> <span>Política de Privacidade</span>
              </a>
              <button onClick={(click) => open('footer_contact_click', click.currentTarget)}>
                <MessageCircle /> <span>Contato</span>
              </button>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('footer_instagram_click')}
              >
                <Instagram /> <span>Instagram</span>
              </a>
            </nav>
            <div className="footer-bottom">
              <p>© 2026 Force One Security & Technology.</p>
              <a
                className="nebulabs-link"
                href={siteConfig.links.nebulabsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Desenvolvido por <strong>Nebulabs</strong>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {sticky && (
        <div
          className="sticky-cta"
          style={modal ? { display: 'none' } : { bottom: `${stickyBottom}px` }}
        >
          {cta(stickyLabel, 'sticky_cta_click')}
        </div>
      )}
      {modal && <LeadModal onClose={close} returnFocusTo={leadTrigger.current} />}
      <Motion />
    </>
  );
}
