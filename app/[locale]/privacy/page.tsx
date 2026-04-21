import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Privacy Policy | RemoteVisaJobsBoard',
    description:
      'Privacy Policy for RemoteVisaJobsBoard. Learn how we collect, use, and protect your data when you use our remote visa job board.',
    alternates: {
      canonical: `https://remote-visa-jobs-board.vercel.app/${locale}/privacy`,
      languages: {
        en: '/en/privacy',
        ko: '/ko/privacy',
        ja: '/ja/privacy',
        zh: '/zh/privacy',
        es: '/es/privacy',
        fr: '/fr/privacy',
        de: '/de/privacy',
        pt: '/pt/privacy',
      },
    },
  };
}

const LAST_UPDATED = 'April 13, 2025';
const CONTACT_EMAIL = 'privacy@remotevisajobsboard.com';
const SITE_NAME = 'RemoteVisaJobsBoard';
const SITE_URL = 'https://remote-visa-jobs-board.vercel.app';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        {
          subtitle: '1.1 Information You Provide',
          text: 'We do not require account registration to browse jobs. If you contact us via email or a feedback form, we collect your name and email address solely to respond to your inquiry.',
        },
        {
          subtitle: '1.2 Automatically Collected Information',
          text: 'When you visit the site, our servers and third-party analytics tools (such as Google Analytics) automatically collect: IP address (anonymized), browser type and version, operating system, pages visited and time spent, referring URL, and device type. This data is used in aggregate form to understand site usage and improve our service.',
        },
        {
          subtitle: '1.3 Cookies and Similar Technologies',
          text: 'We use cookies and similar tracking technologies to: remember your filter preferences, analyze traffic via Google Analytics, and serve relevant advertising via Google AdSense. You can control cookies through your browser settings. Disabling cookies may affect site functionality.',
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: '',
          text: 'We use the information collected to: operate and improve the site, analyze usage patterns and optimize performance, serve relevant advertisements, respond to your inquiries, and comply with legal obligations. We do not sell your personal data to third parties.',
        },
      ],
    },
    {
      title: '3. Third-Party Services',
      content: [
        {
          subtitle: '3.1 Google Analytics',
          text: 'We use Google Analytics to analyze site traffic. Google Analytics collects anonymized data about your visit. You can opt out using the Google Analytics Opt-out Browser Add-on. Google\'s privacy policy is available at https://policies.google.com/privacy.',
        },
        {
          subtitle: '3.2 Google AdSense',
          text: 'We use Google AdSense to display advertisements. AdSense may use cookies to personalize ads based on your browsing history. You can manage ad personalization at https://adssettings.google.com. Our AdSense publisher ID is ca-pub-7098271335538021.',
        },
        {
          subtitle: '3.3 Vercel',
          text: 'Our site is hosted on Vercel. Vercel may collect server logs including IP addresses for security and operational purposes. See Vercel\'s privacy policy at https://vercel.com/legal/privacy-policy.',
        },
        {
          subtitle: '3.4 Job Listing Sources',
          text: 'Job listings are aggregated from public sources. When you click "Apply Now," you are redirected to the employer\'s own website or the original job board. We are not responsible for the privacy practices of those third-party sites.',
        },
      ],
    },
    {
      title: '4. Data Retention',
      content: [
        {
          subtitle: '',
          text: 'Analytics data is retained according to the retention settings of the respective analytics platforms (typically 14–26 months for Google Analytics). Contact form inquiries are retained for up to 12 months. We do not retain any payment or financial data — we do not charge users any fees.',
        },
      ],
    },
    {
      title: '5. Your Rights',
      content: [
        {
          subtitle: '',
          text: 'Depending on your location, you may have the following rights regarding your personal data: the right to access data we hold about you, the right to request correction or deletion, the right to object to processing, the right to data portability, and the right to withdraw consent where processing is based on consent. To exercise any of these rights, contact us at the email address below.',
        },
      ],
    },
    {
      title: '6. Children\'s Privacy',
      content: [
        {
          subtitle: '',
          text: `${SITE_NAME} is not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such data, please contact us immediately.`,
        },
      ],
    },
    {
      title: '7. International Data Transfers',
      content: [
        {
          subtitle: '',
          text: 'Our servers and service providers are located primarily in the United States. By using the site from outside the United States, you acknowledge that your data may be transferred to and processed in the United States, which may have different data protection laws than your country.',
        },
      ],
    },
    {
      title: '8. Changes to This Policy',
      content: [
        {
          subtitle: '',
          text: 'We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. Material changes will be noted prominently. Your continued use of the site after changes constitutes acceptance of the updated policy.',
        },
      ],
    },
    {
      title: '9. Contact Us',
      content: [
        {
          subtitle: '',
          text: `For questions, data requests, or privacy concerns, contact us at: ${CONTACT_EMAIL}`,
        },
      ],
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED} &bull; Applies to{' '}
            <span className="text-[#7c3aed]">{SITE_URL}</span>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <div className="card">
          <p className="text-gray-600 text-sm leading-relaxed">
            {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit {SITE_URL}. Please read this policy carefully. If you disagree with its
            terms, please discontinue use of the site.
          </p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="card">
            <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.content.map((block, i) => (
                <div key={i}>
                  {block.subtitle && (
                    <h3 className="font-semibold text-[#1e1b4b] text-sm mb-1">{block.subtitle}</h3>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>
    </>
  );
}
