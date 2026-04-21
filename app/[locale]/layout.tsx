import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: 'Remote Jobs with Visa Sponsorship 2025 | RemoteVisaJobsBoard',
    template: '%s | RemoteVisaJobsBoard',
  },
  description:
    'Find remote tech jobs offering visa sponsorship. H-1B, O-1, TN visa jobs updated daily. Filter by skills, salary, and visa type.',
  keywords: [
    'visa sponsorship jobs',
    'H-1B sponsorship',
    'remote jobs visa sponsorship',
    'international job board',
    'work visa jobs',
    'tech jobs visa sponsorship',
    'US visa jobs',
  ],
  metadataBase: new URL('https://remote-visa-jobs-board.vercel.app'),
  openGraph: {
    siteName: 'RemoteVisaJobsBoard',
    type: 'website',
    title: 'Remote Jobs with Visa Sponsorship 2025 | RemoteVisaJobsBoard',
    description:
      'Find remote tech jobs offering visa sponsorship. H-1B, O-1, TN visa jobs updated daily. Filter by skills, salary, and visa type.',
    url: 'https://remote-visa-jobs-board.vercel.app',
    images: [
      {
        url: 'https://remote-visa-jobs-board.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RemoteVisaJobsBoard — Remote Jobs with Visa Sponsorship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Jobs with Visa Sponsorship 2025 | RemoteVisaJobsBoard',
    description:
      'Find remote tech jobs offering visa sponsorship. H-1B, O-1, TN visa jobs updated daily.',
    images: ['https://remote-visa-jobs-board.vercel.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://remote-visa-jobs-board.vercel.app/en',
    languages: {
      en: '/en',
      ko: '/ko',
      ja: '/ja',
      zh: '/zh',
      es: '/es',
      fr: '/fr',
      de: '/de',
      pt: '/pt',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="RemoteVisaJobsBoard" />
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
