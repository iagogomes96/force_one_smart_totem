'use client';

import { useEffect } from 'react';

export function Motion() {
  useEffect(() => {
    let disposed = false;
    let started = false;
    let revertMotion: (() => void) | undefined;

    const initializeMotion = async () => {
      if (started || disposed) return;
      started = true;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      revertMotion = () => media.revert();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          if (!isMobile) {
            const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
            heroTimeline
              .fromTo(
                '.hero-background-motion',
                { autoAlpha: 0, scale: 1.015 },
                { autoAlpha: 1, scale: 1, duration: 1.35 },
                0,
              )
              .from('.hero-copy .eyebrow', { autoAlpha: 0, x: -10, duration: 0.8 }, 0.55)
              .from('.hero-copy h1', { autoAlpha: 0, y: 26, duration: 1 }, 0.8)
              .from('.hero-copy h1 em', { autoAlpha: 0, y: 26, duration: 1 }, 1.05)
              .from('.hero-copy .lead', { autoAlpha: 0, y: 18, duration: 0.85 }, 1.35)
              .from('#hero-cta', { autoAlpha: 0, y: 18, duration: 0.8 }, 1.65)
              .from('.explore-link', { autoAlpha: 0, y: 12, duration: 0.75 }, 1.9)
              .from(
                ['.hero-caption', '.hero-capabilities > div', '.scroll-caption'],
                { autoAlpha: 0, y: 10, stagger: 0.07, duration: 0.55 },
                1.05,
              );

            gsap.to('.hero-image', {
              y: -30,
              ease: 'none',
              scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
            });
            gsap.to('.hero-background-motion', {
              y: -12,
              ease: 'none',
              scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
            });
            gsap.to('.hero-copy', {
              autoAlpha: 0.58,
              y: -16,
              ease: 'none',
              scrollTrigger: { trigger: '.hero', start: '65% top', end: 'bottom top', scrub: 1 },
            });
          }

          gsap.utils
            .toArray<HTMLElement>('.section .reveal:not(.problem-step)')
            .forEach((element) => {
              gsap.from(element, {
                autoAlpha: 0,
                y: 28,
                duration: 0.95,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 82%',
                  once: true,
                  invalidateOnRefresh: true,
                },
              });
            });

          gsap.utils.toArray<HTMLElement>('.network-map').forEach((map) => {
            const trigger = map.closest('section') || map;
            gsap.fromTo(
              map.querySelectorAll('.network-lines path'),
              { strokeDasharray: 1, strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                stagger: 0.075,
                duration: 0.95,
                ease: 'power1.inOut',
                scrollTrigger: { trigger, start: 'top 72%', once: true },
              },
            );
            gsap.from(map.querySelectorAll('.network-point'), {
              autoAlpha: 0,
              scale: 0,
              transformOrigin: 'center',
              stagger: 0.09,
              duration: 0.62,
              ease: 'power2.out',
              scrollTrigger: { trigger, start: 'top 74%', once: true },
            });
            gsap.from(map.querySelectorAll('.map-labels > g'), {
              autoAlpha: 0,
              scale: 0.96,
              transformOrigin: 'center',
              stagger: 0.1,
              duration: 0.55,
              scrollTrigger: { trigger, start: 'top 62%', once: true },
            });
          });

          const problemImageTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.problem',
              start: 'top top',
              toggleActions: 'play none none reverse',
            },
          });
          problemImageTimeline
            .fromTo(
              '.problem-image-stage',
              { scale: () => (window.innerWidth < 768 ? 1.3 : 1.6) },
              { scale: 1, duration: 1.25, ease: 'power2.inOut' },
            )
            .fromTo(
              '.problem-complete-image',
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 1, ease: 'power1.inOut' },
              0.18,
            );

          const problemSteps = gsap.utils.toArray<HTMLElement>('.problem-step');
          ScrollTrigger.create({
            trigger: '.problem',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            onUpdate: ({ progress }) => {
              const active = Math.min(
                problemSteps.length - 1,
                Math.floor(progress * problemSteps.length),
              );
              problemSteps.forEach((step, index) => {
                step.classList.toggle('motion-active', index === active);
                step.classList.toggle('motion-past', index < active);
              });
            },
          });

          const productBenefits = gsap.utils.toArray<HTMLElement>('.product-visual .benefit');
          const productRevealOrder = [0, 2, 1, 4, 3]
            .map((index) => productBenefits[index])
            .filter(Boolean);
          productRevealOrder[0]?.classList.add('is-revealed');
          ScrollTrigger.create({
            trigger: '.product',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            onUpdate: ({ progress }) => {
              const revealedCount = Math.min(
                productRevealOrder.length,
                Math.floor(progress * productRevealOrder.length) + 1,
              );
              productRevealOrder.forEach((benefit, index) => {
                benefit.classList.toggle('is-revealed', index < revealedCount);
              });
            },
          });

          gsap.fromTo(
            '.numbers-media .section-connections',
            { autoAlpha: 0.2 },
            {
              autoAlpha: 0.72,
              duration: 1.2,
              scrollTrigger: { trigger: '.numbers', start: 'top 72%', once: true },
            },
          );
          gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element, index) => {
            const counter = { value: 0 };
            gsap.to(counter, {
              value: Number(element.dataset.count),
              duration: 2.2,
              delay: index * 0.3,
              ease: 'power2.out',
              scrollTrigger: { trigger: '.stats', start: 'top 60%', once: true },
              onUpdate: () => {
                element.textContent = Math.round(counter.value).toLocaleString('pt-BR');
              },
            });
          });
          gsap.from('.stat', {
            autoAlpha: 0,
            y: 18,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.stats', start: 'top 72%', once: true },
          });

          const collaborativeTimeline = gsap.timeline({
            scrollTrigger: { trigger: '.collaborative-map', start: 'top 68%', once: true },
          });
          collaborativeTimeline
            .fromTo(
              '.collaborative-map .section-connections',
              { autoAlpha: 0, scale: 1.005 },
              { autoAlpha: 1, scale: 1.02, duration: 0.7, delay: 0.5, ease: 'power2.out' },
            )
            .from(
              [
                '.collaborative-map .tag-condo',
                '.collaborative-map .tag-home',
                '.collaborative-map .tag-company',
                '.collaborative-map .tag-shop',
              ],
              {
                autoAlpha: 0,
                scale: 0.88,
                transformOrigin: 'center',
                stagger: 0.3,
                duration: 0.45,
                ease: 'power2.out',
              },
              '>-0.05',
            );
          gsap.from('.collaborative-map .map-note', {
            autoAlpha: 0,
            y: 12,
            duration: 0.65,
            scrollTrigger: { trigger: '.collaborative-map', start: 'center 66%', once: true },
          });

          gsap.from('.bastian-core', {
            autoAlpha: 0,
            scale: 0.88,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.bastian-system', start: 'top 72%', once: true },
          });
          gsap.from('.orbit-label', {
            autoAlpha: 0,
            scale: 0.94,
            stagger: 0.21,
            duration: 0.85,
            scrollTrigger: { trigger: '.bastian-system', start: 'top 66%', once: true },
          });
          gsap.to('.orbit-one', { rotation: 360, duration: 32, repeat: -1, ease: 'none' });
          gsap.to('.orbit-two', { rotation: -360, duration: 38, repeat: -1, ease: 'none' });
          gsap.to('.bastian-core', {
            scale: 1.025,
            filter: 'drop-shadow(0 0 22px rgba(57,232,121,.3))',
            duration: 1.55,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          });

          gsap.from('.ecosystem-center', {
            autoAlpha: 0,
            scale: 0.88,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.ecosystem-diagram', start: 'top 72%', once: true },
          });
          gsap.from('.program', {
            autoAlpha: 0,
            scale: 0.94,
            stagger: 0.22,
            duration: 0.72,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.ecosystem-diagram', start: 'top 65%', once: true },
          });
          gsap.from('.ecosystem-node', {
            autoAlpha: 0,
            scale: 0.94,
            stagger: 0.28,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.ecosystem-diagram', start: 'top 68%', once: true },
          });
          gsap.from('.legal-note', {
            autoAlpha: 0,
            duration: 0.55,
            scrollTrigger: { trigger: '.legal-note', start: 'top 88%', once: true },
          });

          gsap.fromTo(
            '.applications-ambient',
            { autoAlpha: 0 },
            {
              autoAlpha: 0.7,
              duration: 1,
              scrollTrigger: { trigger: '.applications', start: 'top 76%', once: true },
            },
          );
          gsap.from('.application-card', {
            autoAlpha: 0,
            y: 18,
            stagger: 0.19,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.application-grid', start: 'top 82%', once: true },
          });

          gsap.from('.app-screens', {
            autoAlpha: 0,
            x: 45,
            rotation: 2,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.app-visual', start: 'top 78%', once: true },
          });
          gsap.to('.app-screens', {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: '.app-access',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
          gsap.from('.app-features > div', {
            autoAlpha: 0,
            y: 12,
            stagger: 0.08,
            duration: 0.6,
            scrollTrigger: { trigger: '.app-features', start: 'top 86%', once: true },
          });

          gsap.from('.conversion .section-background-image', {
            autoAlpha: 0.4,
            duration: 1,
            scrollTrigger: { trigger: '.conversion', start: 'top 72%', once: true },
          });
          const closingTimeline = gsap.timeline({
            scrollTrigger: { trigger: '.closing', start: 'top 70%', once: true },
          });
          closingTimeline
            .from('.closing-visual', {
              autoAlpha: 0,
              scale: 0.98,
              duration: 1.35,
              ease: 'power3.out',
            })
            .from(
              '.closing .button',
              { scale: 0.985, duration: 0.22, repeat: 1, yoyo: true, ease: 'power2.inOut' },
              '-=0.2',
            );
          gsap.from('.footer-grid', {
            autoAlpha: 0,
            y: 10,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.footer', start: 'top 94%', once: true },
          });
        });

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh, { once: true });
        document.fonts?.ready.then(refresh);

        return () => {
          window.removeEventListener('load', refresh);
          context.revert();
        };
      });
    };

    const startMotion = () => {
      window.removeEventListener('scroll', startMotion);
      window.removeEventListener('pointerdown', startMotion);
      window.removeEventListener('keydown', startMotion);
      void initializeMotion();
    };

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      window.addEventListener('scroll', startMotion, { once: true, passive: true });
      window.addEventListener('pointerdown', startMotion, { once: true, passive: true });
      window.addEventListener('keydown', startMotion, { once: true });
    } else {
      void initializeMotion();
    }

    return () => {
      disposed = true;
      window.removeEventListener('scroll', startMotion);
      window.removeEventListener('pointerdown', startMotion);
      window.removeEventListener('keydown', startMotion);
      revertMotion?.();
    };
  }, []);

  return null;
}
