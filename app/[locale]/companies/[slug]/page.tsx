import { notFound } from 'next/navigation';
import Link from 'next/link';
import companiesData from '@/data/companies-fallback.json';
import jobsData from '@/data/jobs-fallback.json';
import JobCard from '@/components/JobCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

const companies = companiesData as Array<{
  id: string; name: string; slug: string; hq: string; size: string;
  visaApprovalRate: number; h1bPetitions: number; avgSalary: string;
  website: string; verified: boolean; description: string;
}>;

const jobs = jobsData as Array<{
  id: string; title: string; company: string; slug: string;
  country: string; visa: string; role: string; salary: string;
  remote: string; postedDate: string; applyUrl: string; description: string;
}>;

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) return { title: 'Company Not Found' };
  return {
    title: `${company.name} — H1B Sponsorship History & Open Jobs`,
    description: `${company.name} sponsors work visas with ${company.visaApprovalRate}% approval rate. ${company.h1bPetitions.toLocaleString()} H1B petitions filed. Avg salary: ${company.avgSalary}.`,
  };
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) notFound();

  const companyJobs = jobs.filter((j) => j.company === company.name);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.website,
    description: company.description,
    numberOfEmployees: { '@type': 'QuantitativeValue', description: company.size },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href={`/${locale}/companies`} className="text-sm text-[#7c3aed] hover:underline mb-4 inline-block">
            ← All Companies
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company header */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1e1b4b]">{company.name}</h1>
                {company.verified && (
                  <span className="bg-[#ede9fe] text-[#7c3aed] text-xs px-3 py-1 rounded-full font-semibold">
                    ✓ Verified Visa Sponsor
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-1">{company.hq} · {company.size} employees</p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{company.description}</p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#7c3aed] mt-3 hover:underline"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>

        {/* H1B History */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">📊 Visa Sponsorship History</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'H1B Petitions Filed', value: company.h1bPetitions.toLocaleString(), color: 'text-[#7c3aed]' },
              { label: 'Approval Rate', value: `${company.visaApprovalRate}%`, color: 'text-emerald-600' },
              { label: 'Avg Salary', value: company.avgSalary, color: 'text-blue-600' },
              { label: 'Open Positions', value: companyJobs.length.toString(), color: 'text-orange-600' },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-purple-50 rounded-xl p-4">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Approval rate bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>H1B Approval Rate</span>
              <span className="font-semibold text-emerald-600">{company.visaApprovalRate}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                style={{ width: `${company.visaApprovalRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Open Roles */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">
            Open Roles at {company.name}
            {companyJobs.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">({companyJobs.length} positions)</span>
            )}
          </h2>
          {companyJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companyJobs.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-purple-100">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-gray-500">No active listings at the moment</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon or visit their careers page</p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-[#7c3aed] hover:underline"
              >
                Visit {company.name} Careers →
              </a>
            </div>
          )}
        </div>

        <AdPlaceholder type="native" />
      </div>
    </>
  );
}
