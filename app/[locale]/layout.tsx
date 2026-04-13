import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'RemoteVisaJobsBoard — Remote Jobs with Visa Sponsorship',
    template: '%s | RemoteVisaJobsBoard',
  },
  description: 'Find remote jobs with visa sponsorship. Filter by country, role, and visa type.',
  metadataBase: new URL('https://remote-visa-jobs-board.vercel.app'),
  openGraph: {
    siteName: 'RemoteVisaJobsBoard',
    type: 'website',
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
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
