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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://events.openapis.org';
const OG_IMAGE = asset('/img/docusaurus-social-card.jpg');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OpenAPI Events',
    template: '%s | OpenAPI Events',
  },
  description: 'OpenAPI events and conferences',
  icons: { icon: asset('/img/favicon.ico') },
  openGraph: {
    title: 'OpenAPI Events',
    description: 'OpenAPI events and conferences',
    siteName: 'OpenAPI Initiative',
    type: 'website',
    url: '/',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'OpenAPI Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenAPI Events',
    description: 'OpenAPI events and conferences',
    images: [OG_IMAGE],
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
