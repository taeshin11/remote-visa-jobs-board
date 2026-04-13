import Link from 'next/link';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Visa Types Explained — H1B, Skilled Worker, Blue Card & More',
  description: 'Comprehensive guide to work visas for remote workers. Learn about H1B, TN, Skilled Worker, EU Blue Card, TSS, and more.',
};

const visaGuides = [
  {
    type: 'H-1B',
    country: 'United States 🇺🇸',
    color: 'blue',
    description: 'The H-1B is the primary work visa for specialty occupations in the US. It requires a bachelor\'s degree and is subject to an annual lottery cap of 85,000 (65,000 regular cap + 20,000 for US master\'s holders).',
    requirements: [
      "Bachelor's degree or equivalent in specialty occupation",
      'Job offer from US employer willing to sponsor',
      'Employer must file LCA with DOL',
      'Subject to annual lottery (April filing, October start)',
    ],
    process: 'Employer files LCA → File I-129 → H1B lottery (April) → Approval → Start date October 1',
    duration: '3 years, extendable to 6 years (+ more if GC pending)',
    salary: '$60,000+ (prevailing wage)',
    tips: 'File early — the lottery fills up fast. Consider O-1 if you have extraordinary ability.',
  },
  {
    type: 'TN Visa',
    country: 'United States / Canada 🇺🇸🇨🇦',
    color: 'green',
    description: 'The TN visa is available to Canadian and Mexican citizens under USMCA (formerly NAFTA) for specific professional categories. No lottery, no cap.',
    requirements: [
      'Must be Canadian or Mexican citizen',
      'Job must be in eligible USMCA occupation list',
      'Bachelor\'s degree in relevant field',
      'US job offer from legitimate employer',
    ],
    process: 'Get job offer → Gather documents → Apply at border (Canadian) or consulate (Mexican)',
    duration: '3 years, unlimited renewals',
    salary: 'No minimum (but must match prevailing wage)',
    tips: 'Canadians can apply directly at the border — no advance filing needed. Much easier than H1B.',
  },
  {
    type: 'Skilled Worker',
    country: 'United Kingdom 🇬🇧',
    color: 'purple',
    description: 'The UK Skilled Worker visa replaced Tier 2 (General) after Brexit. Employers must be licensed sponsors. No annual cap on numbers.',
    requirements: [
      'Job offer from UK-licensed sponsor',
      'Role must be eligible (RQF Level 3+)',
      'Salary meets threshold: £26,200 or going rate (whichever higher)',
      'English language requirement (B1 level)',
    ],
    process: 'Employer gets CoS → Apply online (up to 3 months before) → Biometrics → Decision (3 weeks)',
    duration: 'Up to 5 years, path to ILR after 5 years',
    salary: '£26,200 minimum (£20,960 for shortage occupations)',
    tips: 'Tech roles often qualify for shortage occupation discounts. London premium applies.',
  },
  {
    type: 'EU Blue Card',
    country: 'Germany / Europe 🇩🇪🇪🇺',
    color: 'indigo',
    description: 'The EU Blue Card allows highly qualified non-EU nationals to work in most EU member states. Germany has one of the most accessible Blue Card programs.',
    requirements: [
      'Recognized university degree (or equivalent)',
      'Job offer with salary above €56,400/year (STEM/shortage: €43,992)',
      'Degree must be recognized in Germany',
      'Health insurance',
    ],
    process: 'Get job offer → Degree recognition → Visa application → Entry → Register → Blue Card',
    duration: '4 years (or contract length + 3 months)',
    salary: '€43,992+ for shortage occupations, €56,400+ for others',
    tips: 'Degree recognition is key — use anabin database. Berlin is very tech-friendly and English-friendly.',
  },
  {
    type: 'TSS 482',
    country: 'Australia 🇦🇺',
    color: 'orange',
    description: 'The Temporary Skill Shortage (TSS) visa subclass 482 allows Australian employers to sponsor skilled overseas workers for up to 4 years with a path to permanent residence.',
    requirements: [
      'Employer must be approved sponsor',
      'Occupation on eligible list (MLTSSL or STSOL)',
      'Meet TSMIT salary threshold (~AUD $70,000)',
      '2 years relevant work experience',
    ],
    process: 'Employer approved → Nominate position → Apply for visa → Grant',
    duration: 'Up to 4 years (short-term stream: 2 years)',
    salary: 'AUD $70,000 TSMIT minimum',
    tips: 'Medium-term stream leads to ENS 186 permanent residency. Regional positions often easier.',
  },
  {
    type: 'Knowledge Migrant (LTSVP)',
    country: 'Netherlands 🇳🇱',
    color: 'teal',
    description: 'The Dutch Knowledge Migrant permit (Highly Skilled Migrant) allows recognized IND sponsors to fast-track work permits for skilled international employees.',
    requirements: [
      'Employer must be recognized IND sponsor',
      'Salary above €5,008/month (2025, under 30: €3,672)',
      'Valid passport',
      'No degree requirement (salary-based)',
    ],
    process: 'Employer applies to IND → 2-week decision → MVV (if required) → Entry → Residence card',
    duration: 'Up to 5 years (matches employment contract)',
    salary: '€60,000+ annually (age-dependent floor)',
    tips: 'Netherlands is very international — many companies operate in English. Amsterdam tech scene is strong.',
  },
];

export default async function VisaGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: visaGuides.map((guide) => ({
      '@type': 'Question',
      name: `What is the ${guide.type} visa?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: guide.description,
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2">Work Visa Types Explained</h1>
          <p className="text-gray-600">
            Everything you need to know about work visas for remote workers and international tech talent.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder type="native" />

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {visaGuides.map((guide) => (
            <a
              key={guide.type}
              href={`#${guide.type.replace(/[\s/]/g, '-')}`}
              className="text-xs bg-white border border-purple-200 text-[#7c3aed] px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors font-medium"
            >
              {guide.type}
            </a>
          ))}
        </div>

        {/* Visa cards */}
        <div className="space-y-6">
          {visaGuides.map((guide) => (
            <div
              key={guide.type}
              id={guide.type.replace(/[\s/]/g, '-')}
              className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${colorMap[guide.color] || colorMap.blue}`}>
                      {guide.type}
                    </span>
                    <span className="text-sm text-gray-500">{guide.country}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">{guide.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {guide.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-[#7c3aed] mt-0.5 flex-shrink-0">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Key Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-right">{guide.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Min Salary</span>
                      <span className="font-medium text-right text-[#7c3aed]">{guide.salary}</span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                      💡 <strong>Tip:</strong> {guide.tips}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Process</h3>
                <p className="text-xs text-gray-600">{guide.process}</p>
              </div>

              <div className="mt-4">
                <Link
                  href={`/${locale}/jobs?visa=${encodeURIComponent(guide.type.split(' ')[0])}`}
                  className="text-xs text-[#7c3aed] font-medium hover:underline"
                >
                  Browse {guide.type} jobs →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Disclaimer</h3>
          <p className="text-sm text-yellow-800 leading-relaxed">
            Visa rules change frequently. This guide is for informational purposes only and is NOT legal advice.
            Requirements, salary thresholds, and processes may have changed. Always verify with an immigration attorney
            or the official government immigration website before making decisions.
          </p>
        </div>

        <AdPlaceholder type="display" />
      </div>
    </>
  );
}
