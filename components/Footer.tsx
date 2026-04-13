import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-purple-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#7c3aed] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                V
              </div>
              <span className="font-bold text-[#1e1b4b] text-sm">RemoteVisaJobs</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connecting international talent with remote jobs that offer visa sponsorship worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-[#1e1b4b] uppercase tracking-wide mb-3">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/jobs`, label: 'All Jobs' },
                { href: `/${locale}/companies`, label: 'Companies' },
                { href: `/${locale}/countries`, label: 'Countries' },
                { href: `/${locale}/visa-guide`, label: 'Visa Guide' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-gray-500 hover:text-[#7c3aed] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visa types */}
          <div>
            <h4 className="text-xs font-semibold text-[#1e1b4b] uppercase tracking-wide mb-3">Visa Types</h4>
            <ul className="space-y-2">
              {['H-1B (USA)', 'TN (Canada)', 'Skilled Worker (UK)', 'EU Blue Card', 'TSS 482 (Australia)'].map((v) => (
                <li key={v}>
                  <Link href={`/${locale}/visa-guide`} className="text-xs text-gray-500 hover:text-[#7c3aed] transition-colors">
                    {v}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h4 className="text-xs font-semibold text-[#1e1b4b] uppercase tracking-wide mb-3">Top Roles</h4>
            <ul className="space-y-2">
              {[
                { slug: 'engineering', label: 'Engineering' },
                { slug: 'design', label: 'Design' },
                { slug: 'product', label: 'Product' },
                { slug: 'data', label: 'Data Science' },
                { slug: 'finance', label: 'Finance' },
              ].map((r) => (
                <li key={r.slug}>
                  <Link href={`/${locale}/roles/${r.slug}`} className="text-xs text-gray-500 hover:text-[#7c3aed] transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} RemoteVisaJobsBoard. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center max-w-md">
            ⚠️ Visa eligibility varies by individual circumstances. This is not legal advice. Consult an immigration attorney.
          </p>
        </div>
      </div>
    </footer>
  );
}
