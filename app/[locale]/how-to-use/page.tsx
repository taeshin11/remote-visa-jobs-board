import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'How to Use RemoteVisaJobsBoard — FAQ & Guide',
    description:
      'Learn how to find remote jobs with visa sponsorship. FAQ covers H-1B, O-1, L-1, TN, OPT/CPT, EB-2 NIW, and what visa sponsorship means for international workers.',
    alternates: {
      canonical: `https://remote-visa-jobs-board.vercel.app/${locale}/how-to-use`,
      languages: {
        en: '/en/how-to-use',
        ko: '/ko/how-to-use',
        ja: '/ja/how-to-use',
        zh: '/zh/how-to-use',
        es: '/es/how-to-use',
        fr: '/fr/how-to-use',
        de: '/de/how-to-use',
        pt: '/pt/how-to-use',
      },
    },
  };
}

const faqs = [
  {
    q: 'What visas can employers sponsor?',
    a: 'US employers commonly sponsor H-1B, O-1, L-1, TN (for Canadian/Mexican citizens), and EB-2/EB-3 green cards. UK employers sponsor Skilled Worker visas. EU employers can sponsor EU Blue Cards. Australian employers sponsor TSS 482 visas. Sponsorship availability varies by company, role, and country.',
  },
  {
    q: 'What is H-1B sponsorship?',
    a: 'H-1B sponsorship means a US employer files a petition with USCIS to hire you in a "specialty occupation" — typically requiring at least a bachelor\'s degree in a relevant field. The employer pays filing fees (and typically attorney fees), files a Labor Condition Application with the Department of Labor, and submits your H-1B petition. If selected in the annual lottery, you can begin work on October 1.',
  },
  {
    q: 'What does visa sponsorship include?',
    a: 'Visa sponsorship typically includes: the employer filing the work authorization petition on your behalf, paying USCIS filing fees (often $1,000–$6,000+), covering immigration attorney fees, and supporting your work authorization application. It does NOT automatically include a green card — permanent residency is a separate, longer process.',
  },
  {
    q: 'What is the H-1B lottery?',
    a: 'Each year, USCIS receives far more H-1B petitions than the 85,000 available slots (65,000 general cap + 20,000 for US master\'s degree holders). Applications open in late March/early April. USCIS runs a random electronic lottery to select which petitions to process. If not selected, you must try again the following year. The lottery odds have historically been around 25–35% in recent years.',
  },
  {
    q: 'Can remote jobs sponsor visas?',
    a: 'Yes — but with nuances. For H-1B, the employer must file a Labor Condition Application (LCA) covering your actual work location, even if it is your home. Your physical work location must be listed. For other visas like UK Skilled Worker or EU Blue Card, the employer must be a licensed sponsor in that country. Full-remote roles increasingly sponsor visas, particularly in tech.',
  },
  {
    q: 'What is an L-1 visa?',
    a: 'The L-1 visa is an intracompany transferee visa for employees moving within a multinational company. L-1A is for managers and executives; L-1B is for employees with specialized knowledge. You must have worked for the company abroad for at least one continuous year in the past three years. There is no annual lottery and no cap, making it faster and more predictable than H-1B.',
  },
  {
    q: 'What is OPT/CPT for international students?',
    a: 'OPT (Optional Practical Training) allows F-1 international students to work in the US in a job related to their field of study for up to 12 months after graduation (or 24 additional months for STEM degrees — called STEM OPT extension). CPT (Curricular Practical Training) is similar work authorization used during your studies. Many employers use OPT as a bridge while filing an H-1B petition.',
  },
  {
    q: 'How long does visa sponsorship take?',
    a: 'Timelines vary significantly by visa type. H-1B standard processing takes 3–6 months; premium processing (extra $2,805 fee) guarantees a 15 business-day decision. UK Skilled Worker applications take about 3 weeks once documents are ready. EU Blue Card in Germany typically takes 1–3 months. L-1 petitions take 2–4 months standard, or 15 business days with premium processing.',
  },
  {
    q: 'What jobs are most likely to get visa sponsorship?',
    a: 'Tech roles have the highest sponsorship rates. Software engineering, data science, machine learning, cloud architecture, cybersecurity, and product management are the most commonly sponsored. Large tech companies (Google, Microsoft, Amazon, Meta, Apple) are among the top H-1B sponsors each year. Startups increasingly sponsor visas too — especially in competitive engineering markets.',
  },
  {
    q: 'What is the EB-2 NIW?',
    a: 'The EB-2 National Interest Waiver (NIW) is a US employment-based green card category for individuals with advanced degrees or exceptional ability whose work benefits the US national interest. Crucially, it allows self-petition — you do not need an employer to sponsor you. If approved by USCIS, you skip the PERM labor certification process. It is popular among researchers, scientists, engineers, and entrepreneurs.',
  },
];

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
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
            How to Use RemoteVisaJobsBoard
          </h1>
          <p className="text-gray-600 text-lg">
            A guide to finding remote jobs with visa sponsorship, plus answers to the most common questions.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Quick start guide */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-4">Quick Start Guide</h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Browse or filter jobs',
                body: 'Start on the Jobs page. Use the filters to narrow by country, visa type, role category (engineering, data, design, etc.), or remote status.',
              },
              {
                step: '2',
                title: 'Check the visa type',
                body: 'Each listing shows the visa type(s) the employer sponsors. Look for H-1B, O-1, Skilled Worker, Blue Card, or other visa labels to confirm eligibility.',
              },
              {
                step: '3',
                title: 'Read the job details',
                body: 'Click a job to see full description, salary range, sponsorship details, and application instructions. Verify sponsorship directly with the employer.',
              },
              {
                step: '4',
                title: 'Apply directly',
                body: 'Click "Apply Now" to go directly to the employer\'s application page. We do not charge fees and we are not a recruiter — it is a direct link.',
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

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-[#1e1b4b] text-sm mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-4">More Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: `/${locale}/visa-guide`, label: 'Visa Types Guide', desc: 'Deep dive into H-1B, TN, Skilled Worker, Blue Card, and more.' },
              { href: `/${locale}/jobs`, label: 'Browse All Jobs', desc: 'All active remote jobs offering visa sponsorship.' },
              { href: `/${locale}/companies`, label: 'Top Sponsors', desc: 'Companies with the best visa sponsorship track record.' },
              { href: `/${locale}/countries`, label: 'By Country', desc: 'Explore opportunities in the US, UK, EU, Canada, and Australia.' },
            ].map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="block bg-purple-50 border border-purple-100 rounded-xl p-4 hover:border-purple-300 transition-colors group"
              >
                <p className="font-semibold text-[#7c3aed] text-sm group-hover:underline">{resource.label} →</p>
                <p className="text-gray-500 text-xs mt-1">{resource.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-900 mb-2">Not Legal Advice</h3>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This guide is for general informational purposes only. Visa rules, salary thresholds, processing
            times, and eligibility requirements change frequently. RemoteVisaJobsBoard is not an immigration
            attorney and does not provide legal advice. Always consult a licensed immigration attorney before
            making any visa or employment decisions.
          </p>
        </div>

      </div>
    </>
  );
}
