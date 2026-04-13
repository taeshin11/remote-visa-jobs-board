'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const localeNames: Record<string, string> = {
  en: 'English', ko: '한국어', ja: '日本語', zh: '中文',
  es: 'Español', fr: 'Français', de: 'Deutsch', pt: 'Português',
};

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Replace current locale in path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${locale}/jobs`, label: 'Jobs' },
    { href: `/${locale}/companies`, label: 'Companies' },
    { href: `/${locale}/countries`, label: 'Countries' },
    { href: `/${locale}/visa-guide`, label: 'Visa Guide' },
  ];

  return (
    <nav className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7c3aed] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="font-bold text-[#1e1b4b] text-sm hidden sm:block">
              RemoteVisa<span className="text-[#7c3aed]">Jobs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-[#7c3aed]' : 'text-gray-600 hover:text-[#7c3aed]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#7c3aed] bg-purple-50 px-2 py-1 rounded-lg font-medium transition-colors">
                🌐 {locale.toUpperCase()}
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-purple-100 py-1 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={switchLocale(l)}
                    className={`block px-3 py-1.5 text-xs hover:bg-purple-50 transition-colors ${
                      l === locale ? 'text-[#7c3aed] font-semibold' : 'text-gray-600'
                    }`}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-purple-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-gray-600 hover:text-[#7c3aed] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
