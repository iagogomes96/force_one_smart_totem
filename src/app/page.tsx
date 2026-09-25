import LandingPage from '@/components/LandingPage';
export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Force One Smart Totem',
    serviceType: 'Monitoramento e segurança colaborativa',
    provider: { '@type': 'Organization', name: 'Force One Security & Technology' },
    description:
      'Monitoramento Full HD, acesso remoto e tecnologia Bastian para uma rede de segurança colaborativa.',
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LandingPage />
    </>
  );
}
