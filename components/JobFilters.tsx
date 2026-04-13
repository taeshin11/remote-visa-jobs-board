'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

const countries = ['US', 'Canada', 'UK', 'Germany', 'Netherlands', 'Australia', 'Singapore', 'Ireland'];
const visaTypes = ['H1B', 'TN', 'Skilled Worker', 'Blue Card', 'TSS', 'LTSVP', 'Critical Skills', 'Employment Pass'];
const roles = ['engineering', 'design', 'product', 'data', 'finance', 'marketing'];
const remoteOptions = ['full', 'hybrid'];

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = (key: string, value: string) => {
    const current = searchParams.get(key);
    const newValue = current === value ? '' : value;
    router.push(`${pathname}?${createQueryString(key, newValue)}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters = searchParams.toString().length > 0;

  const FilterSelect = ({
    label,
    filterKey,
    options,
    allLabel,
  }: {
    label: string;
    filterKey: string;
    options: string[];
    allLabel: string;
  }) => {
    const currentValue = searchParams.get(filterKey) || '';
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">{label}</label>
        <select
          value={currentValue}
          onChange={(e) => handleFilter(filterKey, e.target.value)}
          className="text-sm border border-purple-200 rounded-lg px-3 py-2 bg-white text-[#1e1b4b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
        >
          <option value="">{allLabel}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
      {/* Mobile toggle */}
      <button
        className="md:hidden flex items-center gap-2 text-sm font-medium text-[#7c3aed] mb-3"
        onClick={() => setShowFilters(!showFilters)}
      >
        🔍 {showFilters ? 'Hide Filters' : 'Show Filters'}
        {hasFilters && <span className="bg-[#7c3aed] text-white text-xs px-1.5 py-0.5 rounded-full">●</span>}
      </button>

      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ${showFilters ? '' : 'hidden md:grid'}`}>
        <FilterSelect label="Country" filterKey="country" options={countries} allLabel="All Countries" />
        <FilterSelect label="Visa Type" filterKey="visa" options={visaTypes} allLabel="All Visa Types" />
        <FilterSelect label="Role" filterKey="role" options={roles} allLabel="All Roles" />
        <FilterSelect label="Remote" filterKey="remote" options={remoteOptions} allLabel="All Levels" />

        {hasFilters && (
          <div className="flex flex-col justify-end">
            <button
              onClick={clearAll}
              className="text-sm text-[#7c3aed] border border-[#7c3aed] rounded-lg px-3 py-2 hover:bg-purple-50 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
