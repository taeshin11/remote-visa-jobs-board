import Link from 'next/link';
import companiesData from '@/data/companies-fallback.json';
import jobsData from '@/data/jobs-fallback.json';
import CompanyCard from '@/components/CompanyCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companies that Sponsor Work Visas',
  description: 'Discover verified companies with a proven track record of H1B and other work visa sponsorship. Find your next sponsor.',
};

const companies = companiesData as Array<{
  id: string; name: string; slug: string; hq: string; size: string;
  visaApprovalRate: number; h1bPetitions: number; avgSalary: string;
  website: string; verified: boolean; description: string;
}>;

const jobs = jobsData as Array<{ company: string; [key: string]: string }>;

export default async function CompaniesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jobCountByCompany = jobs.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sorted = [...companies].sort((a, b) => b.h1bPetitions - a.h1bPetitions);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Companies that Sponsor Work Visas',
    numberOfItems: companies.length,
    itemListElement: sorted.slice(0, 10).map((company, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Organization',
        name: company.name,
        url: company.website,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2">Companies that Sponsor Work Visas</h1>
          <p className="text-gray-600">
            <span className="font-semibold text-[#7c3aed]">{companies.length}</span> verified employers with a track record of visa sponsorship
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder type="native" />

        {/* Top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Petitions Filed', value: sorted.slice(0, 5).reduce((sum, c) => sum + c.h1bPetitions, 0).toLocaleString() + '+' },
            { label: 'Avg Approval Rate', value: Math.round(companies.reduce((sum, c) => sum + c.visaApprovalRate, 0) / companies.length) + '%' },
            { label: 'Companies Listed', value: companies.length.toString() },
            { label: 'Open Roles', value: jobs.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-purple-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-[#7c3aed]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              locale={locale}
              jobCount={jobCountByCompany[company.name] || 0}
            />
          ))}
        </div>
      </div>
    </>
  );
}
