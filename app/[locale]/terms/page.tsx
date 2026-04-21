import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Terms of Use | RemoteVisaJobsBoard',
    description:
      'Terms of Use for RemoteVisaJobsBoard. Job listings are from public sources. We are not an employer or visa attorney. Verify all job details directly with employers.',
    alternates: {
      canonical: `https://remote-visa-jobs-board.vercel.app/${locale}/terms`,
      languages: {
        en: '/en/terms',
        ko: '/ko/terms',
        ja: '/ja/terms',
        zh: '/zh/terms',
        es: '/es/terms',
        fr: '/fr/terms',
        de: '/de/terms',
        pt: '/pt/terms',
      },
    },
  };
}

const LAST_UPDATED = 'April 13, 2025';
const CONTACT_EMAIL = 'legal@remotevisajobsboard.com';
const SITE_NAME = 'RemoteVisaJobsBoard';
const SITE_URL = 'https://remote-visa-jobs-board.vercel.app';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        `By accessing or using ${SITE_URL} (the "Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the Site. We may update these Terms at any time; continued use of the Site constitutes acceptance of the updated Terms.`,
    },
    {
      title: '2. Nature of the Service',
      content:
        `${SITE_NAME} is a job listing aggregation service. We collect and display publicly available job postings from employer career pages, third-party job boards, and other public sources. We are not an employer, staffing agency, or recruitment firm. We do not hire, place, or represent any candidates or employers.`,
    },
    {
      title: '3. Job Listings from Public Sources',
      content:
        'All job listings displayed on the Site are sourced from publicly available information. We do not create job listings ourselves. While we strive to maintain accurate and up-to-date listings, we make no guarantees regarding the accuracy, completeness, timeliness, or availability of any listing. Jobs may be filled, expired, modified, or withdrawn at any time without notice. Always verify current job status directly with the employer.',
    },
    {
      title: '4. We Are Not an Employer',
      content:
        `${SITE_NAME} is not an employer and does not participate in, control, or take responsibility for any hiring, employment, or visa sponsorship decisions made by any company listed on the Site. Any employment relationship you enter into is solely between you and the employer. We have no control over employer hiring practices, visa sponsorship policies, or the outcome of any job application.`,
    },
    {
      title: '5. Not a Visa Attorney or Immigration Service',
      content:
        `${SITE_NAME} is not a law firm, immigration attorney, or licensed immigration consultant. Nothing on this Site constitutes legal advice, immigration advice, or professional legal services of any kind. Visa and immigration information provided on this Site is for general educational purposes only. Visa eligibility, processes, fees, timelines, and rules vary by individual circumstance and change frequently. You must consult a licensed immigration attorney before making any immigration or employment decision.`,
    },
    {
      title: '6. Verify Job Details Directly with Employers',
      content:
        'Before applying to any job or relying on any information listed on this Site, you must independently verify all details directly with the employer. This includes but is not limited to: job availability, salary ranges, visa sponsorship availability, work location (remote or on-site), required qualifications, and application deadlines. We are not responsible for discrepancies between listed details and actual employer requirements.',
    },
    {
      title: '7. No Warranty',
      content:
        'The Site and all content are provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or harmful components. We do not warrant the accuracy, reliability, completeness, or timeliness of any content.',
    },
    {
      title: '8. Limitation of Liability',
      content:
        `To the fullest extent permitted by applicable law, ${SITE_NAME} and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from: your use of or inability to use the Site, reliance on any information displayed on the Site, any employment decision made based on information from the Site, or any visa or immigration outcome. Our total liability for any claim shall not exceed $100 USD.`,
    },
    {
      title: '9. Third-Party Links',
      content:
        'The Site contains links to third-party websites, including employer career pages and job boards. These links are provided for your convenience only. We have no control over third-party sites and are not responsible for their content, accuracy, privacy practices, or availability. Accessing third-party sites is at your own risk.',
    },
    {
      title: '10. Intellectual Property',
      content:
        `The ${SITE_NAME} name, logo, and original site content are the intellectual property of the Site operators. Job listing content is owned by the respective employers and sourced from publicly available information. You may not reproduce, distribute, or create derivative works from Site content without written permission.`,
    },
    {
      title: '11. Prohibited Use',
      content:
        'You agree not to: scrape or systematically download content from the Site, use the Site for any unlawful purpose, attempt to gain unauthorized access to any system or data, interfere with or disrupt the Site\'s operation, or use automated bots or tools to access the Site without permission.',
    },
    {
      title: '12. Governing Law',
      content:
        'These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these Terms or your use of the Site shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
    },
    {
      title: '13. Contact',
      content:
        `For questions about these Terms, contact us at: ${CONTACT_EMAIL}`,
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] mb-2">Terms of Use</h1>
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED} &bull; Applies to{' '}
            <span className="text-[#7c3aed]">{SITE_URL}</span>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Key notices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: '📋',
              title: 'Public Source Listings',
              desc: 'Job listings are aggregated from public employer and job board sources.',
            },
            {
              icon: '⚖️',
              title: 'Not Legal Advice',
              desc: 'We are not a visa attorney. Nothing here is immigration or legal advice.',
            },
            {
              icon: '✅',
              title: 'Verify with Employers',
              desc: 'Always confirm visa sponsorship and job details directly with the employer.',
            },
          ].map((notice) => (
            <div key={notice.title} className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
              <p className="text-2xl mb-2">{notice.icon}</p>
              <p className="font-semibold text-[#1e1b4b] text-xs mb-1">{notice.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{notice.desc}</p>
            </div>
          ))}
        </div>

        {/* Introduction */}
        <div className="card">
          <p className="text-gray-600 text-sm leading-relaxed">
            These Terms of Use govern your access to and use of {SITE_NAME} at {SITE_URL}.
            Please read them carefully before using the Site.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.title} className="card">
            <h2 className="text-base font-bold text-[#1e1b4b] mb-3">{section.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
          </section>
        ))}

        {/* Final disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-900 mb-2">Summary of Key Points</h3>
          <ul className="space-y-1.5">
            {[
              'Job listings come from public sources — we are not the employer.',
              'Visa sponsorship must be confirmed directly with each employer.',
              'We are not an immigration attorney — nothing here is legal advice.',
              'Consult a licensed immigration attorney for your specific situation.',
              'We make no guarantees about job availability, accuracy, or visa outcomes.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-yellow-800">
                <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}
