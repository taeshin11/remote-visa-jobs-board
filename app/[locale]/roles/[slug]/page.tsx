import { notFound } from 'next/navigation';
import Link from 'next/link';
import rolesData from '@/data/roles-fallback.json';
import jobsData from '@/data/jobs-fallback.json';
import companiesData from '@/data/companies-fallback.json';
import JobCard from '@/components/JobCard';
import CompanyCard from '@/components/CompanyCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

const roles = rolesData as Array<{
  slug: string; name: string; description: string;
  salaryRange: string; topSkills: string[]; topCompanies: string[]; jobCount: number;
}>;

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

export async function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) return { title: 'Role Not Found' };
  return {
    title: `${role.name} Remote Jobs with Visa Sponsorship`,
    description: `Find ${role.name} remote jobs with visa sponsorship. ${role.description} Salary: ${role.salaryRange}.`,
  };
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  const roleJobs = jobs.filter((j) => j.role === slug).sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  const topCompaniesData = role.topCompanies
    .map((name) => companies.find((c) => c.name === name))
    .filter(Boolean) as typeof companies;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${role.name} Remote Jobs with Visa Sponsorship`,
    numberOfItems: roleJobs.length,
    itemListElement: roleJobs.map((job, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: { '@type': 'Organization', name: job.company },
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
          <Link href={`/${locale}/jobs`} className="text-sm text-[#7c3aed] hover:underline mb-4 inline-block">
            ← All Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role header */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#1e1b4b] mb-2">{role.name}</h1>
          <p className="text-gray-600 text-sm mb-4">{role.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="font-bold text-[#7c3aed] text-sm">{role.salaryRange}</p>
              <p className="text-xs text-gray-500 mt-0.5">Salary Range</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="font-bold text-[#7c3aed] text-sm">{roleJobs.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Open Positions</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="font-bold text-[#7c3aed] text-sm">{topCompaniesData.length}+</p>
              <p className="text-xs text-gray-500 mt-0.5">Hiring Companies</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Common Skills</h3>
            <div className="flex flex-wrap gap-2">
              {role.topSkills.map((skill) => (
                <span key={skill} className="bg-purple-100 text-[#7c3aed] text-xs px-3 py-1 rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top companies */}
        {topCompaniesData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">Top {role.name} Employers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topCompaniesData.slice(0, 4).map((company) => (
                <CompanyCard key={company.id} company={company} locale={locale} />
              ))}
            </div>
          </div>
        )}

        <AdPlaceholder type="native" />

        {/* Jobs list */}
        <div>
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">
            {role.name} Jobs with Visa Sponsorship
            <span className="ml-2 text-sm font-normal text-gray-500">({roleJobs.length})</span>
          </h2>

          {roleJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roleJobs.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-purple-100">
              <p className="text-3xl mb-2">💼</p>
              <p className="text-gray-500">No current {role.name} listings</p>
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
