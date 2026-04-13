# RemoteVisaJobsBoard — PRD
## Remote Jobs with Visa Sponsorship — Filterable by Country, Role & Sponsor

---

## 1. Overview

**RemoteVisaJobsBoard** is a free, SEO-first job board aggregating remote job listings that offer visa sponsorship. Users can filter by target country, job role/category, and sponsoring company. Data comes from RemoteOK API (free), We Work Remotely RSS, H-1B disclosure data (DOL), and static curated JSON.

Target audience: international job seekers, software engineers looking to relocate, immigration-aware recruiters, and digital nomads.

---

## 2. Target Users

- International software engineers seeking visa-sponsored roles
- H-1B applicants searching for qualifying employers
- Digital nomads seeking remote + visa-friendly companies
- HR teams benchmarking visa-sponsoring competitors
- Immigration lawyers tracking sponsoring companies

---

## 3. Core Features

1. **Job Listing Feed** — ISR-updated cards with role, company, country, visa type
2. **Country Pages** — All visa-sponsoring jobs available for a specific country
3. **Role Pages** — Jobs by category (engineering, design, product, sales, etc.)
4. **Company Pages** — Each sponsor's profile with all their active listings + H-1B history
5. **Filter System** — Multi-select: country, role, visa type, remote level, salary range
6. **Job Detail Pages** — Full description, apply link, visa type, company info
7. **H-1B Disclosure Data** — Historical LCA/H-1B records from DOL (public)
8. **Visitor Counter** — Today + total in footer
9. **i18n** — 8 languages
10. **Adsterra Ads** — Social Bar + Native Banner + Display Banner
11. **Google Sheets Webhook** — Log job clicks, filter usage, apply button interactions

---

## 4. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, ISR) | Dynamic data with fast pages |
| Styling | Tailwind CSS | Mobile-first |
| Charts | None for MVP; Chart.js optional for H-1B history | Minimal deps |
| i18n | next-intl | App Router |
| Data | RemoteOK API + WWR RSS + H-1B JSON + curated JSON | Free |
| Deploy | Vercel (free tier) | ISR support |
| Backend (cron) | Railway free tier | Scheduled data refresh |
| Ads | Adsterra | Monetization |
| Webhook | Google Apps Script | Interaction logging |

---

## 5. Data Sources

### 5.1 RemoteOK API (Free, No Auth)
- **Endpoint**: `https://remoteok.com/api`
- Returns JSON array of job listings
- Fields: `id`, `slug`, `company`, `company_logo`, `position`, `tags`, `location`, `salary_min`, `salary_max`, `description`, `apply_url`, `date`
- Filter for visa-related jobs by checking `tags` for `visa`, `sponsorship`, `h1b`, `relocation`
- Rate limit: Polite use; cache 6h
- Revalidate: `next: { revalidate: 21600 }`

### 5.2 We Work Remotely RSS (Free, No Auth)
- **Endpoint**: `https://weworkremotely.com/categories/remote-programming-jobs.rss`
- Parse RSS via `fast-xml-parser` or `rss-parser` npm package
- Additional categories: design, marketing, sales, product
- Filter for visa keywords in title/description
- Cache 6h

### 5.3 H-1B Disclosure Data (DOL — Free, Public)
- **Source**: `https://www.dol.gov/agencies/eta/foreign-labor/performance` (H-1B LCA Data)
- Download annual CSV files
- Pre-process into `public/data/h1b-employers.json`: top employers by petition count
- Fields: `employer_name`, `slug`, `state`, `naics_code`, `total_lca`, `approval_rate`, `median_wage`, `year`
- Store static; update annually

### 5.4 Static Curated JSON (`public/data/`)
- `visa-types.json` — H-1B, O-1, TN, E-3, L-1, Green Card, UK Skilled Worker, etc.
- `countries.json` — Countries with visa programs: US, UK, Canada, Germany, Australia, Netherlands, etc.
- `roles.json` — Job categories with slug, name, description, typical salary range
- `sponsored-companies.json` — Manually verified list of known visa-sponsoring companies

---

## 6. Page Structure

### 6.1 `/` — Homepage
- Hero: "Find Remote Jobs with Visa Sponsorship"
- Filter bar: Country | Role | Visa Type | Remote Level
- KPI strip: Total jobs | Sponsoring companies | Countries covered | Updated timestamp
- Job cards grid (sorted by date, newest first)
- "Hot companies" sidebar/strip — most active sponsors
- Adsterra Social Bar + Native Banner

### 6.2 `/jobs/[slug]` — Job Detail Page
- Job title, company logo, location, posted date
- Remote type badge: Fully Remote / Remote-Friendly / Hybrid
- Visa type badge: H-1B / O-1 / TN / etc.
- Salary range (if available)
- Full job description (HTML-safe render)
- Apply button → logs webhook + opens `apply_url` in new tab
- Company info card linking to `/companies/[company]`
- Similar jobs in same role
- Schema.org: `JobPosting` structured data
- hreflang all 8 locales

### 6.3 `/countries/[country]` — Country Page
- Country name, flag (emoji), visa programs available
- All active jobs targeting this country (filterable by role)
- H-1B top employers if country = US
- Immigration overview (static curated summary paragraph)
- Schema.org: `ItemList` of `JobPosting`

### 6.4 `/roles/[role]` — Role Category Page
- Role name, description, typical salary range
- All jobs in this category (sortable)
- Top hiring companies for this role
- Skill tags common in this role
- Schema.org: `ItemList`

### 6.5 `/companies/[company]` — Company Page
- Company name, logo, website, HQ
- Active job listings
- H-1B history: petition count, approval rate, median wage (if available)
- "Known visa sponsor" verified badge
- Schema.org: `Organization` + `JobPosting` list

### 6.6 `/sitemap.xml` — Generated
- All job slugs, country slugs, role slugs, company slugs
- All i18n variants
- Priority: job pages 0.9, company 0.8, country/role 0.8

---

## 7. UI/UX Design

### 7.1 Color Palette (Soft Pastels)
```
Background:    #F0F7FF  (soft sky blue)
Card:          #FFFFFF  border border-blue-50 shadow-sm
Accent:        #5B8DB8  (muted steel blue)
H-1B badge:    #A8C8E8  (light blue)
UK badge:      #A8D5BA  (mint green)
Remote badge:  #D4B8E0  (lavender)
Salary:        #8B7EC8  (purple)
Apply CTA:     #5B8DB8  (steel blue)
Text:          #2D3748
Footer BG:     #E8F2FF
```

### 7.2 Typography
- Font: `DM Sans` via next/font — clean, professional
- Company names: `font-semibold`
- Salary: `font-mono`
- Role tags: `text-xs font-medium`

### 7.3 Key Components
- `<JobCard>` — company logo, title, remote badge, visa badge, salary, date, apply CTA
- `<VisaBadge>` — visa type with color per visa program
- `<RemoteBadge>` — fully remote / hybrid / remote-friendly
- `<FilterBar>` — multi-select dropdowns + mobile-friendly sheet/drawer
- `<CompanyCard>` — logo, name, active jobs count, verified sponsor badge
- `<H1bHistoryTable>` — employer LCA data table
- `<CountryCard>` — flag, country name, job count
- `<AdPlaceholder>` — Adsterra div
- `<NavBar>` — Logo | Jobs | Countries | Roles | Companies | [Lang]
- `<Footer>` — visitor counter, disclaimer

### 7.4 Filter Bar Implementation
```typescript
// Client component with URL search params for shareable filters
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

// Filters sync to URL: ?country=US&role=engineering&visa=h1b&remote=full
// Server component reads searchParams and filters job list
```

### 7.5 Mobile-First
- Job cards: 1 col mobile → 2-col md → 3-col lg
- Filter bar: collapsible panel on mobile (drawer from bottom)
- Company logo: 40px on mobile, 56px on desktop
- Apply button: full-width on mobile

---

## 8. SEO Requirements

### 8.1 Programmatic SEO Targets
- `/jobs/[slug]` → "[Company] [Role] visa sponsorship remote"
- `/countries/us` → "remote jobs h1b visa sponsorship 2025"
- `/countries/uk` → "remote jobs uk visa sponsorship"
- `/roles/software-engineer` → "software engineer remote visa sponsorship"
- `/companies/[company]` → "[Company] h1b sponsorship history"

### 8.2 Schema.org JobPosting
```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior Software Engineer",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Acme Corp",
    "sameAs": "https://acme.com"
  },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressCountry": "US" }
  },
  "employmentType": "FULL_TIME",
  "datePosted": "2025-04-01",
  "validThrough": "2025-07-01",
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": { "@type": "QuantitativeValue", "minValue": 120000, "maxValue": 180000, "unitText": "YEAR" }
  },
  "description": "..."
}
```

### 8.3 Metadata
- `<title>` format: `[Role] at [Company] — Remote + Visa Sponsorship | RemoteVisaJobsBoard`
- Meta description includes visa type, role, and "apply now"
- OG image: dynamic card per job

### 8.4 Sitemap
- `next-sitemap` with all routes
- `changefreq: daily` for homepage and job pages
- `changefreq: weekly` for country/role/company pages

---

## 9. i18n

### 9.1 Locales
`en`, `ko`, `ja`, `zh`, `es`, `fr`, `de`, `pt`

### 9.2 Keys (sample)
```json
{
  "nav.jobs": "Jobs",
  "nav.countries": "Countries",
  "nav.roles": "Roles",
  "nav.companies": "Companies",
  "hero.title": "Find Remote Jobs with Visa Sponsorship",
  "hero.subtitle": "Curated listings from verified sponsors. Filter by country, role, and visa type.",
  "filter.country": "Country",
  "filter.role": "Role",
  "filter.visa": "Visa Type",
  "filter.remote": "Remote Level",
  "job.apply": "Apply Now",
  "job.salary": "Salary",
  "job.posted": "Posted",
  "job.remote_full": "Fully Remote",
  "job.remote_hybrid": "Hybrid",
  "job.visa_sponsored": "Visa Sponsored",
  "company.verified_sponsor": "Verified Visa Sponsor",
  "h1b.petitions": "H-1B Petitions",
  "h1b.approval_rate": "Approval Rate",
  "footer.visitors_today": "Today: {count}",
  "footer.visitors_total": "Total: {count}",
  "footer.disclaimer": "Visa eligibility varies. Consult an immigration attorney."
}
```

---

## 10. Ads (Adsterra)

```html
<!-- Social Bar -->
<div id="adsterra-social-bar" class="fixed bottom-0 left-0 right-0 z-50">
  <!-- Adsterra Social Bar -->
</div>

<!-- Native Banner (below hero filter) -->
<div id="adsterra-native-banner" class="w-full my-6 min-h-[90px] bg-blue-50 rounded-xl flex items-center justify-center text-gray-400 text-xs">
  <!-- Adsterra Native Banner -->
</div>

<!-- Display Banner (sidebar / inline 300x250) -->
<div id="adsterra-display-banner" class="w-[300px] h-[250px] bg-blue-50 rounded-xl flex items-center justify-center text-gray-400 text-xs mx-auto my-4">
  <!-- Adsterra 300x250 -->
</div>
```

---

## 11. Google Sheets Webhook

### 11.1 Events to Log
- Apply button clicked (`event_type: job_apply`, `value: job_slug`)
- Country filter applied (`event_type: country_filter`, `value: country`)
- Role filter applied (`event_type: role_filter`, `value: role`)
- Visa type filter applied (`event_type: visa_filter`, `value: visa_type`)
- Company page visited (`event_type: company_view`, `value: company_slug`)

### 11.2 Sheet Columns
`timestamp | event_type | value | page | locale | ua`

### 11.3 Apps Script
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.timestamp, d.event_type, d.value, d.page, d.locale, d.ua]);
  return ContentService.createTextOutput('ok');
}
```

---

## 12. Visitor Counter

- Vercel KV: `visitors:total`, `visitors:YYYY-MM-DD`
- Edge middleware increments on page requests
- Footer: "Today: N · Total: N"
- Legal disclaimer in footer: "Visa eligibility varies. Not legal advice."

---

## 13. Milestones & Git Strategy

### Milestone 0 — Repo Init
```bash
cd C:\MakingApps\260413\remote-visa-jobs-board
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --yes
gh repo create taeshin11/remote-visa-jobs-board --public --source=. --push
```

### Milestone 1 — Scaffold
- Install: `next-intl next-sitemap @vercel/kv rss-parser fast-xml-parser`
- Folder structure, message stubs, `.env.local`
- `feature_list.json`, `claude-progress.txt`, `init.sh`
- Commit + push: "scaffold: project init"

### Milestone 2 — Data Layer
- `src/lib/remoteok.ts` — fetch and filter RemoteOK API
- `src/lib/wwr.ts` — parse WWR RSS feeds
- `src/lib/h1b.ts` — load and query H-1B JSON
- `src/lib/jobs.ts` — merge all sources, deduplicate, normalize
- Static JSON files created in `public/data/`
- Commit + push

### Milestone 3 — Homepage
- Layout, NavBar, Footer with visitor counter
- Filter bar (URL search params)
- Job card grid
- Adsterra placeholders
- Commit + push

### Milestone 4 — Job & Company Pages
- `/jobs/[slug]` with Schema.org JobPosting
- `/companies/[company]` with H-1B history
- Apply button with webhook logging
- Commit + push

### Milestone 5 — Country & Role Pages
- `/countries/[country]` with immigration overview
- `/roles/[role]` with top employers
- Schema.org ItemList on both
- Commit + push

### Milestone 6 — SEO, i18n, Sitemap
- All 8 locale files complete
- next-sitemap config
- All metadata and schema.org validated
- hreflang on all pages
- Commit + push

### Milestone 7 — Deploy
```bash
npx vercel --prod
```
- Set env vars in Vercel dashboard
- Verify ISR revalidation at 6h interval
- Commit + push: "deploy: Vercel production"

---

## 14. File Structure

```
remote-visa-jobs-board/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
├── public/
│   ├── data/
│   │   ├── h1b-employers.json
│   │   ├── visa-types.json
│   │   ├── countries.json
│   │   ├── roles.json
│   │   └── sponsored-companies.json
│   └── robots.txt
├── messages/
│   ├── en.json  ko.json  ja.json  zh.json
│   ├── es.json  fr.json  de.json  pt.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── jobs/[slug]/page.tsx
│   │   │   ├── countries/[country]/page.tsx
│   │   │   ├── roles/[role]/page.tsx
│   │   │   └── companies/[company]/page.tsx
│   │   ├── api/visitors/route.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── JobCard.tsx
│   │   ├── VisaBadge.tsx
│   │   ├── RemoteBadge.tsx
│   │   ├── FilterBar.tsx
│   │   ├── CompanyCard.tsx
│   │   ├── H1bHistoryTable.tsx
│   │   ├── CountryCard.tsx
│   │   ├── AdPlaceholder.tsx
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── remoteok.ts
│   │   ├── wwr.ts
│   │   ├── h1b.ts
│   │   ├── jobs.ts
│   │   ├── types.ts
│   │   ├── webhook.ts
│   │   └── visitors.ts
│   └── middleware.ts
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
└── package.json
```

---

## 15. Harness Spec

### `feature_list.json`
```json
{
  "project": "remote-visa-jobs-board",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "RemoteOK API fetcher", "status": "pending" },
    { "id": "F02", "name": "We Work Remotely RSS parser", "status": "pending" },
    { "id": "F03", "name": "H-1B DOL data loader", "status": "pending" },
    { "id": "F04", "name": "Job deduplication + normalization", "status": "pending" },
    { "id": "F05", "name": "Homepage with filter bar", "status": "pending" },
    { "id": "F06", "name": "Job detail pages + Schema.org", "status": "pending" },
    { "id": "F07", "name": "Company pages + H-1B history", "status": "pending" },
    { "id": "F08", "name": "Country pages", "status": "pending" },
    { "id": "F09", "name": "Role category pages", "status": "pending" },
    { "id": "F10", "name": "Apply button + webhook logging", "status": "pending" },
    { "id": "F11", "name": "i18n (8 locales)", "status": "pending" },
    { "id": "F12", "name": "Adsterra placeholders", "status": "pending" },
    { "id": "F13", "name": "Visitor counter (KV)", "status": "pending" },
    { "id": "F14", "name": "SEO metadata + sitemap", "status": "pending" },
    { "id": "F15", "name": "Vercel deployment", "status": "pending" }
  ]
}
```

### `init.sh`
```bash
#!/bin/bash
set -e
echo "=== RemoteVisaJobsBoard Init ==="
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --yes
npm install next-intl next-sitemap @vercel/kv rss-parser
mkdir -p messages research_history public/data src/components src/lib
cat > .env.local << 'EOF'
GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_WEBHOOK_URL=your_apps_script_url_here
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
EOF
git init
git add .
git commit -m "scaffold: initial project setup"
gh repo create taeshin11/remote-visa-jobs-board --public --source=. --push
echo "=== Init complete ==="
```

---

## 16. Environment Variables

| Variable | Source |
|---|---|
| `GITHUB_TOKEN` | GitHub PAT (optional, for higher rate limit) |
| `NEXT_PUBLIC_WEBHOOK_URL` | Google Apps Script Web App |
| `KV_REST_API_URL` | Vercel KV |
| `KV_REST_API_TOKEN` | Vercel KV |

---

## 17. Quality Checklist

- [ ] Job deduplication works (same job from multiple sources = 1 card)
- [ ] Filter bar updates URL search params (shareable links)
- [ ] Apply button opens in new tab with `rel="noopener"`
- [ ] Schema.org JobPosting passes Google Rich Results test
- [ ] All 8 locale files complete
- [ ] H-1B data table renders correctly on mobile
- [ ] Empty state for filters that return 0 results
- [ ] RemoteOK API failure gracefully falls back to cached data
- [ ] Adsterra divs on all page templates
- [ ] Webhook fires on apply click without blocking navigation
- [ ] Lighthouse: SEO > 95, Performance > 85, Accessibility > 90

---

## 18. Notes

- **No user auth**: fully public
- **Legal disclaimer**: "Visa eligibility varies by individual circumstances. This is not legal advice."
- **Data accuracy**: Visa sponsorship signals are heuristic (tag-based). Warn users to verify with employer.
- **Job expiry**: Remove jobs older than 60 days from default view; keep in archive
- **ISR**: Revalidate job pages every 6 hours to catch new listings
- **Railway**: Only needed if a scheduled cron job is required to pre-fetch and cache data; Vercel cron (free tier: 1 job) may suffice
