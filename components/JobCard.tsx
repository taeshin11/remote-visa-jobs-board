'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import VisaBadge from './VisaBadge';
import RemoteBadge from './RemoteBadge';
import { BookmarkIcon, BookmarkFilledIcon } from './Icons';

interface Job {
  id: string;
  title: string;
  company: string;
  slug: string;
  country: string;
  visa: string;
  role: string;
  salary: string;
  remote: string;
  postedDate: string;
  applyUrl: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  locale: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  if (diff < 60) return '1 month ago';
  return `${Math.floor(diff / 30)} months ago`;
}

const countryFlags: Record<string, string> = {
  US: '🇺🇸',
  Canada: '🇨🇦',
  UK: '🇬🇧',
  Germany: '🇩🇪',
  Netherlands: '🇳🇱',
  Australia: '🇦🇺',
  Singapore: '🇸🇬',
  Ireland: '🇮🇪',
};

export default function JobCard({ job, locale }: JobCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSaved(savedJobs.includes(job.id));
  }, [job.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    let updated;
    if (saved) {
      updated = savedJobs.filter((id: string) => id !== job.id);
    } else {
      updated = [...savedJobs, job.id];
    }
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    setSaved(!saved);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Log webhook event
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_WEBHOOK_URL) {
      fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          event_type: 'job_apply',
          value: job.slug,
          page: window.location.pathname,
          locale,
          ua: navigator.userAgent.slice(0, 100),
        }),
      }).catch(() => {});
    }
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link
      href={`/${locale}/jobs/${job.id}`}
      className="block bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 p-5 group"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Company avatar */}
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-base">
          {job.company.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500 font-medium">{job.company}</p>
              <h3 className="text-[#1e1b4b] font-semibold text-sm mt-0.5 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
                {job.title}
              </h3>
            </div>
            <button
              onClick={toggleSave}
              className="flex-shrink-0 text-gray-400 hover:text-[#7c3aed] transition-colors"
              aria-label={saved ? 'Unsave job' : 'Save job'}
            >
              {saved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            <VisaBadge visa={job.visa} />
            <RemoteBadge remote={job.remote} />
            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
              <span>{countryFlags[job.country] || '🌍'}</span>
              <span>{job.country}</span>
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs font-mono text-[#7c3aed] font-semibold">{job.salary}</p>
            <p className="text-xs text-gray-400">{formatDate(job.postedDate)}</p>
          </div>

          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{job.description}</p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleApply}
              className="bg-[#7c3aed] text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-[#6d28d9] transition-colors"
            >
              Apply Now →
            </button>
            <span className="text-xs text-gray-400 capitalize">{job.role}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
