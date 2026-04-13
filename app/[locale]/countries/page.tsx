import Link from 'next/link';
import countriesData from '@/data/countries-fallback.json';
import CountryCard from '@/components/CountryCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Abroad: Visa Guides by Country',
  description: 'Find remote jobs and visa sponsorship information for the USA, UK, Canada, Germany, Netherlands, Australia and more.',
};

const countries = countriesData as Array<{
  code: string; name: string; flag: string; visaTypes: string[];
  primaryVisa: string; description: string; requirements: string;
  processingTime: string; minSalary: string; topCities: string[];
  timeline: string; jobCount: number;
}>;

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2">Work Abroad: Visa Guides by Country</h1>
          <p className="text-gray-600">
            Find remote jobs and visa information for <span className="font-semibold text-[#7c3aed]">{countries.length}</span> top destinations worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder type="native" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {countries.map((country) => (
            <CountryCard key={country.code} country={country} locale={locale} />
          ))}
        </div>

        {/* Info box */}
        <div className="mt-12 bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">How to Choose Your Destination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'United States', tip: 'Highest salaries but H1B lottery. Best for STEM roles.' },
              { icon: '🚀', title: 'Canada & Netherlands', tip: 'Fast-track programs for tech talent. More predictable than US lottery.' },
              { icon: '🇬🇧', title: 'United Kingdom', tip: 'No cap on Skilled Worker visas. Strong tech ecosystem in London.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#1e1b4b] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
