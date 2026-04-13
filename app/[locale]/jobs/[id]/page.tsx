import { notFound } from 'next/navigation';
import Link from 'next/link';
import jobsData from '@/data/jobs-fallback.json';
import companiesData from '@/data/companies-fallback.json';
import VisaBadge from '@/components/VisaBadge';
import RemoteBadge from '@/components/RemoteBadge';
import JobCard from '@/components/JobCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

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

const countryFlags: Record<string, string> = {
  US: '🇺🇸', Canada: '🇨🇦', UK: '🇬🇧', Germany: '🇩🇪',
  Netherlands: '🇳🇱', Australia: '🇦🇺', Singapore: '🇸🇬', Ireland: '🇮🇪',
};

export async function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) return { title: 'Job Not Found' };
  return {
    title: `${job.title} at ${job.company} — Remote + Visa Sponsorship`,
    description: `${job.title} at ${job.company}. ${job.visa} visa sponsorship. ${job.salary}. Apply now for this remote ${job.role} job.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  const company = companies.find((c) => c.name === job.company);
  const similarJobs = jobs
    .filter((j) => j.id !== job.id && j.role === job.role)
    .slice(0, 3);

  // Extract salary numbers for schema
  const salaryMatch = job.salary.match(/\$?([\d,]+)/g);
  const minSalary = salaryMatch ? parseInt(salaryMatch[0].replace(/[$,]/g, '')) : 0;
  const maxSalary = salaryMatch && salaryMatch[1] ? parseInt(salaryMatch[1].replace(/[$,]/g, '')) : minSalary;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    validThrough: new Date(new Date(job.postedDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: company?.website || '',
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: job.country },
    },
    applicantLocationRequirements: { '@type': 'Country', name: job.country },
    jobLocationType: job.remote === 'full' ? 'TELECOMMUTE' : undefined,
    ...(minSalary > 0 && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: {
          '@type': 'QuantitativeValue',
          minValue: minSalary,
          maxValue: maxSalary,
          unitText: 'YEAR',
        },
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/jobs`} className="text-sm text-[#7c3aed] hover:underline mb-4 inline-block">
            ← All Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-[#1e1b4b] mb-1">{job.title}</h1>
                  <Link href={`/${locale}/companies/${company?.slug || job.company.toLowerCase()}`}
                    className="text-sm text-[#7c3aed] font-medium hover:underline">
                    {job.company}
                  </Link>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {countryFlags[job.country]} {job.country} · Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <VisaBadge visa={job.visa} size="md" />
                <RemoteBadge remote={job.remote} />
                <span className="inline-flex items-center bg-gray-100 text-gray-700 border border-gray-200 text-sm px-3 py-1 rounded-full font-medium capitalize">
                  {job.role}
                </span>
              </div>

              {/* Salary */}
              <div className="bg-purple-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-500 mb-1">Salary Range</p>
                <p className="text-xl font-mono font-bold text-[#7c3aed]">{job.salary}</p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-base font-semibold text-[#1e1b4b] mb-3">About this role</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Visa sponsorship details vary. Please verify visa eligibility directly with the employer. This listing indicates sponsorship intent — confirm specifics during the application process.
                  </p>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">Similar {job.role} Jobs</h2>
                <div className="space-y-3">
                  {similarJobs.map((sj) => (
                    <JobCard key={sj.id} job={sj} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Apply CTA */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
              <h3 className="font-semibold text-[#1e1b4b] mb-1">Ready to Apply?</h3>
              <p className="text-xs text-gray-500 mb-4">
                This position offers {job.visa} visa sponsorship. Click below to apply on the company website.
              </p>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#7c3aed] text-white text-center py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition-colors text-sm"
              >
                Apply on {job.company} →
              </a>
              <p className="text-center text-xs text-gray-400 mt-2">Opens in new tab</p>
            </div>

            {/* Company info */}
            {company && (
              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
                <h3 className="font-semibold text-[#1e1b4b] mb-3">About {company.name}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">HQ</span>
                    <span className="font-medium">{company.hq}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Size</span>
                    <span className="font-medium">{company.size}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">H1B Approval Rate</span>
                    <span className="font-semibold text-emerald-600">{company.visaApprovalRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">H1B Petitions</span>
                    <span className="font-medium">{company.h1bPetitions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avg Salary</span>
                    <span className="font-semibold text-[#7c3aed]">{company.avgSalary}</span>
                  </div>
                </div>
                {company.verified && (
                  <div className="flex items-center gap-1.5 bg-purple-50 rounded-lg px-3 py-2 mb-3">
                    <span className="text-[#7c3aed] text-sm">✓</span>
                    <span className="text-xs text-[#7c3aed] font-medium">Verified Visa Sponsor</span>
                  </div>
                )}
                <Link
                  href={`/${locale}/companies/${company.slug}`}
                  className="block w-full text-center text-sm text-[#7c3aed] border border-[#7c3aed] py-2 rounded-xl hover:bg-purple-50 transition-colors font-medium"
                >
                  View All {company.name} Jobs →
                </Link>
              </div>
            )}

            {/* Visa info */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
              <h3 className="font-semibold text-[#1e1b4b] mb-3">Visa Type: {job.visa}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                {job.visa === 'H1B' && 'The H-1B is a non-immigrant visa that allows US employers to employ foreign workers in specialty occupations. Annual cap of 85,000.'}
                {job.visa === 'TN' && 'The TN visa allows Canadian and Mexican citizens to work in the US under NAFTA/USMCA in specific professional categories.'}
                {job.visa === 'Skilled Worker' && "The UK Skilled Worker visa allows employers to sponsor overseas workers for eligible roles. No annual cap. Replaces Tier 2 General."}
                {job.visa === 'Blue Card' && 'The EU Blue Card is a work permit for highly qualified non-EU nationals. Available in most EU member states.'}
                {job.visa === 'TSS' && 'The TSS visa (subclass 482) allows Australian employers to sponsor skilled overseas workers for up to 4 years.'}
                {job.visa === 'LTSVP' && 'The Long-term Stay Visa Provisional (Knowledge Migrant) allows recognized Dutch sponsors to fast-track skilled worker permits.'}
              </p>
              <Link href={`/${locale}/visa-guide`} className="text-xs text-[#7c3aed] font-medium hover:underline">
                Learn more about {job.visa} →
              </Link>
            </div>

            <AdPlaceholder type="display" />
          </div>
        </div>
      </div>
    </>
  );
}
