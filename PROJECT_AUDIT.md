# 🏗️ Zplus University — Project Rescue Audit
> Generated: March 2, 2026

---

## 1. Project Structure

```
zpluse-education/
├── index.html                          ← Static MVP homepage
├── college-detail.html                 ← Static college detail page
├── profile.html                        ← Static profile page
├── stitchHTML.html                     ← Stitch/prototype HTML
│
├── assets/
│   ├── generate-placeholders.html
│   ├── README.md
│   └── w4.jpeg, w5.jpeg, w6.jpeg, w7.jpeg, w9.jpeg (university images)
│
├── css/
│   ├── premium-ultra.css               ← Primary design system (2000+ lines)
│   ├── ultra-expressive.css            ← Alternate design system
│   ├── mvp-styles.css                  ← Modals & special features
│   └── impressive-features.css         ← Interactive feature styles
│
├── js/
│   ├── auth.js                         ← Frontend-only auth
│   ├── expressive-enhancements.js      ← Scroll animations
│   ├── impressive-features.js          ← Bookmarks, dark mode, sharing
│   ├── main-mvp.js                     ← Homepage rendering logic
│   ├── profile.js                      ← Profile page logic
│   ├── universities-mvp.js             ← University data (5 universities)
│   └── university-detail-mvp.js        ← Detail page rendering
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── bulk-scraper.js
│   ├── db.js
│   ├── package.json
│   ├── render.yaml
│   ├── server.js                       ← Express API server
│   ├── setup-auth-trigger.js
│   ├── controllers/
│   │   └── college.controller.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── college.routes.js
│   │   ├── course.routes.js
│   │   ├── enrollment.routes.js
│   │   └── material.routes.js
│   └── sql/
│       ├── migrate_college_fields.sql
│       ├── migrate_colleges_v2.sql     ← Active: v2 schema migration
│       └── schema.sql
│
├── frontend/
│   ├── next.config.ts
│   ├── package.json
│   ├── README.md
│   ├── stitch_assets/                  ← Design prototypes (NOT used in production)
│   │   ├── About.html
│   │   ├── AdminDashboard.html
│   │   ├── Colleges.html
│   │   ├── Homepage.html
│   │   ├── RoleBasedAccess.html
│   │   ├── StudentDashboard.html
│   │   ├── StudentLMS.html
│   │   └── TeacherDashboard.html
│   └── src/
│       ├── app/
│       │   ├── layout.tsx              ← ROOT layout (AuthProvider + ToastProvider)
│       │   ├── globals.css
│       │   ├── (public)/               ← Route group: public pages
│       │   │   ├── layout.tsx          ← PublicNavbar + Footer (renders ONCE here)
│       │   │   ├── page.tsx            ← Homepage /
│       │   │   ├── colleges/
│       │   │   │   └── page.tsx
│       │   │   ├── college/[id]/
│       │   │   │   └── page.tsx
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   ├── register/
│       │   │   │   └── page.tsx
│       │   │   ├── admissions/
│       │   │   │   └── page.tsx
│       │   │   ├── live/[classId]/
│       │   │   │   └── page.tsx
│       │   │   ├── help/
│       │   │   │   └── page.tsx
│       │   │   ├── privacy/
│       │   │   │   └── page.tsx
│       │   │   ├── terms/
│       │   │   │   └── page.tsx
│       │   │   ├── docs/
│       │   │   ├── forgot-password/
│       │   │   ├── reset-password/
│       │   │   ├── webinars/
│       │   │   └── api/
│       │   │       └── chat/
│       │   │           └── route.ts    ← Gemini AI chatbot API
│       │   ├── (study-hub)/            ← Route group: student LMS
│       │   │   ├── layout.tsx          ← StudyHubNavbar, RoleGuard(student)
│       │   │   └── study-hub/
│       │   │       ├── page.tsx
│       │   │       └── live-classes/
│       │   │           └── page.tsx
│       │   ├── dashboard/
│       │   │   └── page.tsx            ← Student learning hub
│       │   ├── teacher/
│       │   │   └── page.tsx            ← Teacher dashboard
│       │   └── admin/
│       │       └── page.tsx            ← Admin dashboard
│       ├── components/
│       │   ├── auth/
│       │   │   └── RoleGuard.tsx
│       │   ├── college/
│       │   │   └── CollegeDetailClient.tsx
│       │   ├── layout/
│       │   │   ├── PublicNavbar.tsx
│       │   │   ├── Footer.tsx          ← SINGLE canonical Footer component
│       │   │   ├── Sidebar.tsx
│       │   │   └── StudyHubNavbar.tsx
│       │   └── ui/
│       │       ├── AccessibilityOverlay.tsx
│       │       ├── GlobalAIChatbot.tsx
│       │       └── Toast.tsx
│       ├── constants/
│       │   └── brandConfig.ts          ← Single source of truth for brand
│       ├── context/
│       │   └── AuthContext.tsx
│       └── lib/
│           ├── apiClient.ts
│           ├── supabaseClient.ts
│           └── themeConfig.ts
│
├── .gitignore
├── README.md
├── README_FINAL.md
├── CLEANUP_SUMMARY.md
├── DEPLOY_NOW.md
├── DEPLOY_TO_NETLIFY.md
├── DESIGN_UPGRADE_SUMMARY.md
├── IMAGE_FIX_GUIDE.md
├── NO_BACKEND_NEEDED.md
├── PREMIUM_DESIGN_UPDATE.md
├── VISUAL_TRANSFORMATION.md
├── download_stitch.js
├── seed_colleges.py
└── PROJECT_AUDIT.md                    ← This file
```

---

## 2. Dependencies

### Architecture Overview

> **There is NO root-level `package.json`** — this is NOT a monorepo with a shared workspace root.
> It is two completely independent projects running separately:
> - `/backend` → Node.js / Express API
> - `/frontend` → Next.js 15 App Router

---

### `backend/package.json` (Inferred from imports in `server.js`)

```json
{
  "name": "zpluse-university-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

---

### `frontend/package.json` (Inferred from all observed imports across `frontend/src/`)

```json
{
  "name": "zpluse-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@jitsi/react-sdk": "^1.4.0",
    "@google/generative-ai": "^0.21.0",
    "@supabase/supabase-js": "^2.39.0",
    "next": "15.x",
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "15.x"
  }
}
```

---

## 3. Entry & Routing

### ⚠️ Important

> **There is NO `App.jsx`, `main.jsx`, or `vite.config.js`.**
> The frontend is **Next.js 15 App Router**, not React+Vite.
> Routing is entirely **file-system based** — no separate router config file exists.

---

### Root Layout — `frontend/src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ui/Toast';
import { AuthProvider } from '@/context/AuthContext';
import AccessibilityOverlay from '@/components/ui/AccessibilityOverlay';
import GlobalAIChatbot from '@/components/ui/GlobalAIChatbot';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Zpluse University | Next-Gen Higher Education LMS',
    template: '%s | Zpluse University'
  },
  description: 'The ultimate ecosystem for Administrators, Teachers, and Students.',
  openGraph: {
    title: 'Zpluse University LMS',
    description: 'Next-Gen Higher Education platform with Role-Based Access Control.',
    url: 'https://www.zpluseuniversity.com',
    siteName: 'Zpluse University',
    images: [{ url: 'https://www.zpluseuniversity.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zpluse University | Next-Gen LMS',
    description: 'The future of higher education is here.',
    images: ['https://www.zpluseuniversity.com/og-image.jpg'],
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col pt-0 transition-colors duration-200">
        <AuthProvider>
          <ToastProvider>
            {children}
            <AccessibilityOverlay />
            <GlobalAIChatbot />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

### Public Route Group Layout — `frontend/src/app/(public)/layout.tsx`

```tsx
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicNavbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}
```

---

### Study Hub Route Group Layout — `frontend/src/app/(study-hub)/layout.tsx`

```tsx
import StudyHubNavbar from '@/components/layout/StudyHubNavbar';
import RoleGuard from '@/components/auth/RoleGuard';

export default function StudyHubLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={['student']}>
            <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <StudyHubNavbar role="student" />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}
```

---

### Route Map

| URL Path | Page File | Layout Applied |
|---|---|---|
| `/` | `(public)/page.tsx` | `(public)/layout.tsx` → `root/layout.tsx` |
| `/colleges` | `(public)/colleges/page.tsx` | `(public)/layout.tsx` |
| `/colleges/[id]` | `(public)/colleges/[id]/page.tsx` | `(public)/layout.tsx` |
| `/login` | `(public)/login/page.tsx` | `(public)/layout.tsx` |
| `/register` | `(public)/register/page.tsx` | `(public)/layout.tsx` |
| `/admissions` | `(public)/admissions/page.tsx` | `(public)/layout.tsx` |
| `/live/[classId]` | `(public)/live/[classId]/page.tsx` | `(public)/layout.tsx` |
| `/help` | `(public)/help/page.tsx` | `(public)/layout.tsx` |
| `/privacy` | `(public)/privacy/page.tsx` | `(public)/layout.tsx` |
| `/terms` | `(public)/terms/page.tsx` | `(public)/layout.tsx` |
| `/study-hub` | `(study-hub)/study-hub/page.tsx` | `(study-hub)/layout.tsx` |
| `/study-hub/live-classes` | `(study-hub)/study-hub/live-classes/page.tsx` | `(study-hub)/layout.tsx` |
| `/dashboard` | `dashboard/page.tsx` | `root/layout.tsx` ONLY |
| `/teacher` | `teacher/page.tsx` | `root/layout.tsx` ONLY |
| `/admin` | `admin/page.tsx` | `root/layout.tsx` ONLY |

---

## 4. Footer Components — Duplication Audit

### ✅ Canonical Footer (ONE — production component)

| File | Status |
|---|---|
| `frontend/src/components/layout/Footer.tsx` | ✅ REAL — used in `(public)/layout.tsx` |

The `Footer.tsx` component is rendered **exactly once**, inside the `(public)/layout.tsx` route group layout.

---

### ⚠️ Footer-Like HTML in Prototype / Static Files (NOT production)

These files contain inline `<footer>` tags but are **not imported anywhere** in the Next.js application. They are dead stitch prototypes and legacy static files.

| File | Footer Description |
|---|---|
| `frontend/stitch_assets/Homepage.html` | Inline `<footer>` with `bg-slate-950`, ZplusUni branding |
| `frontend/stitch_assets/Colleges.html` | Inline `<footer>` with `bg-slate-900`, © 2026 |
| `frontend/stitch_assets/About.html` | Inline `<footer>` with `bg-slate-900`, Privacy/Terms links |
| `frontend/stitch_assets/StudentLMS.html` | Partial footer structure |
| `stitchHTML.html` | Inline `<footer>` with © 2024 Zpluse University |
| `index.html` | `<footer class="footer">` with Font Awesome icons, © 2025 |
| `college-detail.html` | Inline footer (uses `premium-ultra.css`) |
| `profile.html` | Inline footer (uses `premium-ultra.css`) |

> **Root Cause:** The `stitch_assets/` folder and root-level static HTML files are design mockups that were never cleaned up. They are safe to delete from the production build.

---

## 5. Configuration

### `frontend/next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

> **No `vite.config.js` or `webpack.config.js` exists** — this is a pure Next.js project.

---

## 6. Database Migration — `migrate_colleges_v2.sql`

This SQL file adds rich college data columns to the existing `colleges` table in Supabase.
Safe to run multiple times (uses `IF NOT EXISTS`).

### Columns Added

| Category | Column | Type | Default |
|---|---|---|---|
| Ranking | `nirf_rank` | INT | — |
| Ranking | `nirf_category` | VARCHAR(50) | — |
| Ranking | `naac_grade` | VARCHAR(10) | — |
| Ranking | `nba_accredited` | BOOLEAN | FALSE |
| Stats | `total_students` | INT | — |
| Stats | `faculty_count` | INT | — |
| Stats | `student_faculty_ratio` | VARCHAR(20) | — |
| Placements | `placement_rate` | DECIMAL(5,2) | — |
| Placements | `avg_package` | VARCHAR(50) | — |
| Placements | `highest_package` | VARCHAR(50) | — |
| Placements | `top_recruiters` | JSONB | `[]` |
| Programs | `courses` | JSONB | `[]` |
| Programs | `entrance_exams` | JSONB | `[]` |
| Fees | `fee_structure` | TEXT | — |
| Fees | `scholarships` | TEXT | — |
| Accreditation | `affiliation` | TEXT | — |
| Accreditation | `reviews_summary` | TEXT | — |
| Infrastructure | `facilities` | JSONB | `[]` |
| Infrastructure | `gallery_images` | JSONB | `[]` |
| Infrastructure | `campus_area_acres` | DECIMAL(8,2) | — |
| Contact | `contact_email` | VARCHAR(320) | — |
| Contact | `contact_phone` | VARCHAR(30) | — |
| Contact | `social_links` | JSONB | `{}` |
| Admission | `admission_process` | JSONB | `[]` |
| Admission | `admission_open` | BOOLEAN | FALSE |
| Admission | `application_deadline` | VARCHAR(50) | — |
| SEO | `tagline` | VARCHAR(300) | — |
| SEO | `highlights` | JSONB | `[]` |

### Indexes Created

| Index | Column | Order |
|---|---|---|
| `idx_colleges_nirf` | `nirf_rank` | ASC NULLS LAST |
| `idx_colleges_naac` | `naac_grade` | Default |
| `idx_colleges_place` | `placement_rate` | DESC NULLS LAST |

### JSONB Shape References

```json
// courses[]
{ "name": "B.Tech CSE", "degree": "B.Tech", "duration": "4 Years",
  "fee_per_year": 150000, "seats": 120,
  "eligibility": "10+2 PCM", "entrance_exams": ["JEE Main"] }

// top_recruiters[]
["Google", "Microsoft", "Infosys", "TCS"]

// facilities[]
["Hostel", "Wi-Fi", "Sports Complex", "Library"]

// social_links{}
{ "instagram": "url", "twitter": "url", "linkedin": "url",
  "youtube": "url", "facebook": "url" }

// admission_process[]
{ "step": 1, "title": "Apply Online", "description": "Fill the form at..." }

// highlights[]
["Ranked #3 by NIRF 2024", "100% Placement Record", "NBA Accredited"]
```

---

## 7. Critical Architecture Issues

| # | Severity | Issue | Location | Recommended Fix |
|---|---|---|---|---|
| 1 | 🔴 HIGH | Two separate codebases confused as one — static HTML files (`index.html` etc.) are the **old MVP** and are NOT connected to the Next.js app | Root `/` vs `/frontend` | Keep only `/frontend` for production; archive or delete root static files |
| 2 | 🔴 HIGH | No root `package.json` — cannot run both projects from root | `/` | Create a root `package.json` with workspaces, or document the two-project structure explicitly |
| 3 | 🟡 MEDIUM | `stitch_assets/` HTML files are dead prototypes occupying the production repo | `frontend/stitch_assets/` | Delete from production branch; keep in a separate `design-archive` branch if needed |
| 4 | 🟡 MEDIUM | `/dashboard`, `/teacher`, `/admin` routes have NO layout wrapper | `frontend/src/app/` | They only get the root layout — no `PublicNavbar` or `Footer`. Add dedicated layout files or a shared `(protected)/layout.tsx` |
| 5 | 🟡 MEDIUM | `/live/[classId]` is in the `(public)` route group — accessible without auth | `(public)/live/` | Move to `(study-hub)` or wrap a `RoleGuard` inside the page |
| 6 | 🟠 LOW | Copyright year mismatch across files | Various | Use `BRAND.copyright` from `frontend/src/constants/brandConfig.ts` as single source of truth |
| 7 | 🟠 LOW | 8 duplicate inline `<footer>` tags in prototype/static files | `stitch_assets/`, root HTML files | No action needed in production; they are never imported |

---

## 8. Recommended Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              PRODUCTION DEPLOYMENT               │
│                                                 │
│  ┌─────────────────┐    ┌─────────────────────┐ │
│  │  Vercel / CDN   │    │   Render / Railway  │ │
│  │  /frontend      │───▶│   /backend          │ │
│  │  Next.js 15     │    │   Express + pg      │ │
│  │  Port: 3000     │    │   Port: 5000        │ │
│  └────────┬────────┘    └──────────┬──────────┘ │
│           │                        │            │
│           │             ┌──────────▼──────────┐ │
│           └────────────▶│     Supabase        │ │
│             /api/v1/*   │  PostgreSQL + Auth  │ │
│             (rewrites)  └─────────────────────┘ │
└─────────────────────────────────────────────────┘
```

- Frontend API calls to `/api/v1/*` are proxied to the backend via `next.config.ts` rewrites
- Set `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Supabase handles both DB and Auth (JWT tokens validated by backend middleware)
