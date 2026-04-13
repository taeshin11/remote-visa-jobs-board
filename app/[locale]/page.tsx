import { Suspense } from 'react';
import Link from 'next/link';
import jobsData from '@/data/jobs-fallback.json';
import companiesData from '@/data/companies-fallback.json';
import countriesData from '@/data/countries-fallback.json';
import JobCard from '@/components/JobCard';
import CompanyCard from '@/components/CompanyCard';
import CountryCard from '@/components/CountryCard';
import JobFilters from '@/components/JobFilters';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Find Remote Jobs with Visa Sponsorship | RemoteVisaJobsBoard',
    description: 'Browse 50+ remote jobs from companies that sponsor H1B, Skilled Worker, Blue Card and other work visas. Filter by country and role.',
    alternates: {
      canonical: `https://remote-visa-jobs-board.vercel.app/${locale}`,
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
  };
}

const jobs = jobsData as Array<{
  id: string; title: string; company: string; slug: string;
  country: string; visa: string; role: string; salary: string;
  remote: string; postedDate: string; applyUrl: string; description: string;
}>;

const companies = companiesData as Array<{
  id: string; name: string; slug: string; hq: string; size: string;
  visaApprovalRate: number; h1bPetitions: number; avgSalary: string;
  website: string; verified: boolean; description: string;
}>;

const countries = countriesData as Array<{
  code: string; name: string; flag: string; visaTypes: string[];
  primaryVisa: string; description: string; requirements: string;
  processingTime: string; minSalary: string; topCities: string[];
  timeline: string; jobCount: number;
}>;

// Schema.org WebSite JSON-LD
function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RemoteVisaJobsBoard',
    url: 'https://remote-visa-jobs-board.vercel.app',
    description: 'Remote jobs with visa sponsorship — filter by country, role, and visa type',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://remote-visa-jobs-board.vercel.app/en/jobs?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which companies sponsor H1B visas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Major H1B sponsors include Google, Microsoft, Amazon, Apple, Meta, Netflix, Stripe, and hundreds more tech companies. Companies must be registered with USCIS as H1B sponsors.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is visa sponsorship for remote jobs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa sponsorship means an employer will petition for a work visa on your behalf, covering legal fees and supporting your immigration application. Common visa types include H-1B (USA), Skilled Worker (UK), Blue Card (EU), and TSS (Australia).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I work remotely on an H1B visa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can work remotely on an H1B visa as long as your employer has filed the appropriate LCA (Labor Condition Application) for your remote work location.',
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ country?: string; visa?: string; role?: string; remote?: string }>;
}) {
  const { locale } = await params;
  const filters = await searchParams;

  // Filter jobs
  let filtered = jobs;
  if (filters.country) filtered = filtered.filter((j) => j.country === filters.country);
  if (filters.visa) filtered = filtered.filter((j) => j.visa === filters.visa);
  if (filters.role) filtered = filtered.filter((j) => j.role === filters.role);
  if (filters.remote) filtered = filtered.filter((j) => j.remote === filters.remote);

  // Sort by date
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  // Featured jobs (top 6)
  const featured = sorted.slice(0, 6);
  // Hot companies (top 8 by petitions)
  const hotCompanies = [...companies].sort((a, b) => b.h1bPetitions - a.h1bPetitions).slice(0, 8);
  // Featured countries (top 6)
  const featuredCountries = countries.slice(0, 6);

  const jobCountByCompany = jobs.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <WebSiteSchema />
      <FAQSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-purple-200 rounded-full px-4 py-1.5 text-xs text-[#7c3aed] font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {jobs.length}+ Active Remote Jobs with Visa Sponsorship
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e1b4b] mb-4 leading-tight">
            Find Remote Jobs<br />
            <span className="text-[#7c3aed]">with Visa Sponsorship</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Curated listings from verified sponsors. Filter by country, role, and visa type.
            H1B, Skilled Worker, Blue Card & more.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: 'Remote Jobs', value: `${jobs.length}+` },
              { label: 'Verified Sponsors', value: `${companies.length}+` },
              { label: 'Countries', value: `${countries.length}` },
              { label: 'Visa Types', value: '8+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#7c3aed]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/jobs`}
              className="bg-[#7c3aed] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition-colors shadow-md"
            >
              Browse All Jobs →
            </Link>
            <Link
              href={`/${locale}/visa-guide`}
              className="bg-white text-[#7c3aed] border border-purple-300 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Visa Guide
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-3">Filter Jobs</h2>
          <Suspense fallback={<div className="h-20 bg-white rounded-2xl animate-pulse" />}>
            <JobFilters />
          </Suspense>
        </div>

        <AdPlaceholder type="native" />

        {/* Jobs Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1e1b4b]">
              {filtered.length > 0 ? (
                <>
                  <span className="text-[#7c3aed]">{filtered.length}</span> Jobs Found
                </>
              ) : (
                'No Jobs Found'
              )}
            </h2>
            <Link href={`/${locale}/jobs`} className="text-sm text-[#7c3aed] font-medium hover:underline">
              View all →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-purple-100">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 font-medium">No jobs match your filters</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          )}

          {filtered.length > 6 && (
            <div className="text-center mt-6">
              <Link
                href={`/${locale}/jobs`}
                className="inline-flex items-center gap-2 bg-[#7c3aed] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#6d28d9] transition-colors"
              >
                See all {filtered.length} jobs →
              </Link>
            </div>
          )}
        </div>

        {/* Hot Companies */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1e1b4b]">🔥 Top Visa Sponsors</h2>
            <Link href={`/${locale}/companies`} className="text-sm text-[#7c3aed] font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                locale={locale}
                jobCount={jobCountByCompany[company.name] || 0}
              />
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1e1b4b]">🌍 Top Destinations</h2>
            <Link href={`/${locale}/countries`} className="text-sm text-[#7c3aed] font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCountries.map((country) => (
              <CountryCard key={country.code} country={country} locale={locale} />
            ))}
          </div>
        </div>

        {/* Visa info strip */}
        <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-2xl p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">New to Work Visas?</h2>
          <p className="text-purple-200 mb-5">Our comprehensive guide covers H1B, Skilled Worker, Blue Card, and more.</p>
          <Link
            href={`/${locale}/visa-guide`}
            className="inline-flex items-center gap-2 bg-white text-[#7c3aed] px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
          >
            Read the Visa Guide →
          </Link>
        </div>

        <AdPlaceholder type="display" />
      </div>
    </>
  );
}
