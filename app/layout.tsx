import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import { asset } from '@/lib/basePath';
import { buildSearchIndex } from '@/lib/searchIndex';
import './globals.css';

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OpenAPI Initiative',
  description: 'OpenAPI events and conferences',
  icons: { icon: asset('/img/favicon.ico') },
  openGraph: {
    images: [asset('/img/docusaurus-social-card.jpg')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchItems = buildSearchIndex();
  return (
    <html
      lang="en"
      className={onest.variable}
      style={{ ['--bg1-url' as string]: `url('${asset('/img/bg_top.png')}')` }}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Navbar searchItems={searchItems} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
