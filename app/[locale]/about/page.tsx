import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About RemoteVisaJobsBoard — Remote Jobs with Visa Sponsorship',
    description:
      'RemoteVisaJobsBoard aggregates remote tech job listings that include visa sponsorship. Helping international workers find US and global opportunities with H-1B, O-1, TN, and other work visas.',
    alternates: {
      canonical: `https://remote-visa-jobs-board.vercel.app/${locale}/about`,
      languages: {
        en: '/en/about',
        ko: '/ko/about',
        ja: '/ja/about',
        zh: '/zh/about',
        es: '/es/about',
        fr: '/fr/about',
        de: '/de/about',
        pt: '/pt/about',
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About RemoteVisaJobsBoard',
    url: `https://remote-visa-jobs-board.vercel.app/${locale}/about`,
    description:
      'RemoteVisaJobsBoard aggregates remote tech job listings that include visa sponsorship for international workers.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] mb-3">
            About RemoteVisaJobsBoard
          </h1>
          <p className="text-gray-600 text-lg">
            Connecting international talent with remote jobs that sponsor work visas.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Mission */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            RemoteVisaJobsBoard was built for one reason: making it easier for international tech
            professionals to find remote jobs that actually offer visa sponsorship. Most job boards
            bury sponsorship details — or list it inconsistently. We surface it front and center.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We aggregate listings from across the web and focus exclusively on roles where employers
            have indicated they will sponsor a work visa. Whether you are searching for your first
            US tech role on an H-1B or looking for European opportunities via the EU Blue Card, this
            board is built for you.
          </p>
        </section>

        {/* What we cover */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-4">What We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                visa: 'H-1B (USA)',
                desc: 'The primary US work visa for specialty occupations. Subject to annual lottery with 85,000 cap.',
              },
              {
                visa: 'O-1 (USA)',
                desc: 'For individuals with extraordinary ability in their field. No lottery, no cap.',
              },
              {
                visa: 'TN Visa (USA/Canada)',
                desc: 'For Canadian and Mexican citizens under USMCA. No lottery, no annual cap.',
              },
              {
                visa: 'L-1 (USA)',
                desc: 'Intracompany transferee visa for managers, executives, and specialized knowledge workers.',
              },
              {
                visa: 'Skilled Worker (UK)',
                desc: 'Replaced Tier 2 post-Brexit. Requires a licensed sponsor and salary above £26,200.',
              },
              {
                visa: 'EU Blue Card',
                desc: 'Covers most EU member states including Germany. Salary-driven eligibility for high-skilled workers.',
              },
              {
                visa: 'TSS 482 (Australia)',
                desc: 'Temporary Skill Shortage visa. Pathway to permanent residency after 3 years in-stream.',
              },
              {
                visa: 'EB-2 NIW (USA)',
                desc: 'Employment-Based green card for workers of exceptional ability in the national interest. Self-petition allowed.',
              },
            ].map((item) => (
              <div key={item.visa} className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="font-semibold text-[#7c3aed] text-sm mb-1">{item.visa}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-4">How It Works</h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'We aggregate listings',
                body: 'Job listings are collected from public sources including company career pages, job boards, and verified employer submissions. We filter for explicit visa sponsorship indicators.',
              },
              {
                step: '2',
                title: 'You filter and find',
                body: 'Use our filters to narrow by country, visa type, role category, salary range, and remote status. Find roles that match your background and immigration needs.',
              },
              {
                step: '3',
                title: 'Apply directly',
                body: 'We link directly to the employer or original job posting. No middleman. You apply directly with the hiring company.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-[#1e1b4b] text-sm mb-1">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Who we are for */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-3">Who This Is For</h2>
          <ul className="space-y-2">
            {[
              'International software engineers, data scientists, designers, and product managers',
              'OPT/CPT students transitioning to full-time employment in the US',
              'Professionals on H-1B or L-1 visas looking to change employers',
              'Workers in Canada, Mexico, or USMCA-eligible countries exploring TN visa roles',
              'Highly skilled workers in Europe seeking EU Blue Card or UK Skilled Worker positions',
              'Anyone exploring EB-2 NIW self-petition for a US green card',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-[#7c3aed] mt-0.5 flex-shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-yellow-800 leading-relaxed">
            RemoteVisaJobsBoard is a job aggregation service, not an employer, recruiter, or
            immigration law firm. We do not guarantee visa sponsorship for any listing. Job details,
            sponsorship availability, and visa eligibility vary and change. Always verify directly
            with the employer and consult a licensed immigration attorney before making decisions.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}/jobs`}
            className="inline-flex items-center gap-2 bg-[#7c3aed] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition-colors shadow-md"
          >
            Browse Visa Sponsorship Jobs →
          </Link>
          <p className="text-gray-400 text-xs mt-3">
            Have questions?{' '}
            <Link href={`/${locale}/how-to-use`} className="text-[#7c3aed] hover:underline">
              See our FAQ
            </Link>
          </p>
        </div>

      </div>
    </>
  );
}
