import { Suspense } from 'react';
import Link from 'next/link';
import jobsData from '@/data/jobs-fallback.json';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remote Jobs with Visa Sponsorship',
  description: 'Browse all remote jobs with visa sponsorship. Filter by country, role, visa type, and salary range.',
};

const jobs = jobsData as Array<{
  id: string; title: string; company: string; slug: string;
  country: string; visa: string; role: string; salary: string;
  remote: string; postedDate: string; applyUrl: string; description: string;
}>;

const JOBS_PER_PAGE = 12;

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    country?: string; visa?: string; role?: string; remote?: string; page?: string;
  }>;
}) {
  const { locale } = await params;
  const filters = await searchParams;
  const page = parseInt(filters.page || '1');

  let filtered = jobs;
  if (filters.country) filtered = filtered.filter((j) => j.country === filters.country);
  if (filters.visa) filtered = filtered.filter((j) => j.visa === filters.visa);
  if (filters.role) filtered = filtered.filter((j) => j.role === filters.role);
  if (filters.remote) filtered = filtered.filter((j) => j.remote === filters.remote);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  const totalPages = Math.ceil(sorted.length / JOBS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  // Schema.org ItemList
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Remote Jobs with Visa Sponsorship',
    numberOfItems: filtered.length,
    itemListElement: paginated.map((job, i) => ({
      '@type': 'ListItem',
      position: (page - 1) * JOBS_PER_PAGE + i + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: { '@type': 'Organization', name: job.company },
        datePosted: job.postedDate,
        description: job.description,
        employmentType: 'FULL_TIME',
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
          <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2">Remote Jobs with Visa Sponsorship</h1>
          <p className="text-gray-600">
            Browse <span className="font-semibold text-[#7c3aed]">{jobs.length}+</span> remote jobs from companies that sponsor work visas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="h-20 bg-white rounded-2xl animate-pulse mb-6" />}>
          <div className="mb-6">
            <JobFilters />
          </div>
        </Suspense>

        <AdPlaceholder type="native" />

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-[#1e1b4b]">{(page - 1) * JOBS_PER_PAGE + 1}–{Math.min(page * JOBS_PER_PAGE, sorted.length)}</span> of <span className="font-semibold text-[#7c3aed]">{sorted.length}</span> jobs
          </p>
        </div>

        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {page > 1 && (
                  <Link
                    href={`/${locale}/jobs?${new URLSearchParams({ ...filters, page: String(page - 1) })}`}
                    className="px-4 py-2 text-sm border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/${locale}/jobs?${new URLSearchParams({ ...filters, page: String(p) })}`}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      p === page
                        ? 'bg-[#7c3aed] text-white'
                        : 'border border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link
                    href={`/${locale}/jobs?${new URLSearchParams({ ...filters, page: String(page + 1) })}`}
                    className="px-4 py-2 text-sm border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-purple-100">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <Link href={`/${locale}/jobs`} className="text-[#7c3aed] font-medium hover:underline">
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
