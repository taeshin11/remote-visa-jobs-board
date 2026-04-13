import { notFound } from 'next/navigation';
import Link from 'next/link';
import countriesData from '@/data/countries-fallback.json';
import jobsData from '@/data/jobs-fallback.json';
import JobCard from '@/components/JobCard';
import VisaBadge from '@/components/VisaBadge';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

const countries = countriesData as Array<{
  code: string; name: string; flag: string; visaTypes: string[];
  primaryVisa: string; description: string; requirements: string;
  processingTime: string; minSalary: string; topCities: string[];
  timeline: string; jobCount: number;
}>;

const jobs = jobsData as Array<{
  id: string; title: string; company: string; slug: string;
  country: string; visa: string; role: string; salary: string;
  remote: string; postedDate: string; applyUrl: string; description: string;
}>;

export async function generateStaticParams() {
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const country = countries.find((c) => c.code === code);
  if (!country) return { title: 'Country Not Found' };
  return {
    title: `Remote Jobs in ${country.name} with Visa Sponsorship`,
    description: `Find remote jobs in ${country.name} with ${country.primaryVisa} visa sponsorship. ${country.description}`,
  };
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  const country = countries.find((c) => c.code === code);
  if (!country) notFound();

  const countryJobs = jobs.filter((j) => j.country === code).sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Remote Jobs in ${country.name} with Visa Sponsorship`,
    numberOfItems: countryJobs.length,
    itemListElement: countryJobs.map((job, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: { '@type': 'Organization', name: job.company },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: code } },
        datePosted: job.postedDate,
        description: job.description,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href={`/${locale}/countries`} className="text-sm text-[#7c3aed] hover:underline mb-4 inline-block">
            ← All Countries
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country header */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-2xl font-bold text-[#1e1b4b]">{country.name}</h1>
              <p className="text-gray-600 text-sm mt-1">{country.description}</p>
            </div>
          </div>

          {/* Visa types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {country.visaTypes.map((visa) => (
              <VisaBadge key={visa} visa={visa} size="md" />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Min Salary', value: country.minSalary },
              { label: 'Processing Time', value: country.processingTime },
              { label: 'Active Jobs', value: countryJobs.length.toString() },
              { label: 'Top Cities', value: country.topCities.slice(0, 2).join(', ') },
            ].map((stat) => (
              <div key={stat.label} className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="font-semibold text-[#1e1b4b] text-sm">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1e1b4b] mb-3">📋 Requirements</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{country.requirements}</p>
          </div>
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1e1b4b] mb-3">⏱️ Timeline</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{country.timeline}</p>
            <p className="text-xs text-[#7c3aed] mt-2 font-medium">
              Processing: {country.processingTime}
            </p>
          </div>
        </div>

        <AdPlaceholder type="native" />

        {/* Jobs */}
        <div>
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">
            Remote Jobs in {country.name}
            {countryJobs.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">({countryJobs.length} positions)</span>
            )}
          </h2>

          {countryJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {countryJobs.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-purple-100">
              <p className="text-3xl mb-2">{country.flag}</p>
              <p className="text-gray-500">No current listings for {country.name}</p>
              <Link href={`/${locale}/jobs`} className="inline-block mt-3 text-sm text-[#7c3aed] hover:underline">
                Browse all jobs →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
