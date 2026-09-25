import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import './globals.css';
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Force One Smart Totem | Segurança colaborativa',
  description:
    'Conheça o Force One Smart Totem: monitoramento Full HD, acesso remoto e tecnologia Bastian conectando pessoas, patrimônios e regiões em uma rede de segurança.',
  openGraph: {
    title: 'Uma câmera monitora um ponto. Uma rede ajuda a proteger uma região.',
    description: 'Force One Smart Totem. Segurança colaborativa começa pela conexão.',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
