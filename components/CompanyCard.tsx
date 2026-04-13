import Link from 'next/link';

interface Company {
  id: string;
  name: string;
  slug: string;
  hq: string;
  size: string;
  visaApprovalRate: number;
  h1bPetitions: number;
  avgSalary: string;
  website: string;
  verified: boolean;
  description: string;
}

interface CompanyCardProps {
  company: Company;
  locale: string;
  jobCount?: number;
}

export default function CompanyCard({ company, locale, jobCount = 0 }: CompanyCardProps) {
  return (
    <Link
      href={`/${locale}/companies/${company.slug}`}
      className="block bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg">
          {company.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#1e1b4b] truncate">{company.name}</h3>
            {company.verified && (
              <span className="flex-shrink-0 bg-[#ede9fe] text-[#7c3aed] text-xs px-2 py-0.5 rounded-full font-medium">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{company.hq} · {company.size}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-600">
              <span className="font-semibold text-emerald-600">{company.visaApprovalRate}%</span> approval
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-600">
              <span className="font-semibold">{company.h1bPetitions.toLocaleString()}</span> petitions
            </span>
            {jobCount > 0 && (
              <>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-[#7c3aed] font-semibold">{jobCount} open roles</span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3 line-clamp-2">{company.description}</p>
    </Link>
  );
}
