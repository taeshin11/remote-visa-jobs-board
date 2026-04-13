import Link from 'next/link';

interface Country {
  code: string;
  name: string;
  flag: string;
  primaryVisa: string;
  description: string;
  jobCount: number;
  minSalary: string;
  processingTime: string;
}

interface CountryCardProps {
  country: Country;
  locale: string;
}

export default function CountryCard({ country, locale }: CountryCardProps) {
  return (
    <Link
      href={`/${locale}/countries/${country.code}`}
      className="block bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h3 className="font-semibold text-[#1e1b4b]">{country.name}</h3>
          <span className="text-xs bg-[#ede9fe] text-[#7c3aed] px-2 py-0.5 rounded-full font-medium">
            {country.primaryVisa}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{country.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#7c3aed] font-semibold">{country.jobCount} jobs</span>
        <span className="text-gray-500">Min: {country.minSalary}</span>
      </div>
    </Link>
  );
}
