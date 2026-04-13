import { MetadataRoute } from 'next';
import jobsData from '@/data/jobs-fallback.json';
import companiesData from '@/data/companies-fallback.json';
import countriesData from '@/data/countries-fallback.json';
import rolesData from '@/data/roles-fallback.json';

const BASE_URL = 'https://remote-visa-jobs-board.vercel.app';
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

const jobs = jobsData as Array<{ id: string }>;
const companies = companiesData as Array<{ slug: string }>;
const countries = countriesData as Array<{ code: string }>;
const roles = rolesData as Array<{ slug: string }>;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Homepages
  locales.forEach((locale) => {
    urls.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // Job pages
  jobs.forEach((job) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${BASE_URL}/${locale}/jobs/${job.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // Company pages
  companies.forEach((company) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${BASE_URL}/${locale}/companies/${company.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Country pages
  countries.forEach((country) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${BASE_URL}/${locale}/countries/${country.code}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Role pages
  roles.forEach((role) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${BASE_URL}/${locale}/roles/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Static pages
  ['jobs', 'companies', 'countries', 'visa-guide'].forEach((page) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  return urls;
}
