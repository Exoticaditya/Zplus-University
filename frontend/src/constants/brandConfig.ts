// ─────────────────────────────────────────────────────────────────────────────
//  BRAND CONFIG — Single Source of Truth
//  Import from here. Never hardcode brand text, contact info, or nav links.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
    /** Full official brand name */
    name: 'Zpluse University',
    /** Used for split-colour logo rendering */
    nameParts: { prefix: 'Zpluse', suffix: ' University' },
    tagline: 'The Next-Gen Education Ecosystem',
    domain: 'zpluseuniversity.com',
    url: 'https://www.zpluseuniversity.com',

    // ── Contact ────────────────────────────────────────────────────────────
    email: 'admissions@zpluseuniversity.com',
    phone: '+91 8630735008',
    address: {
        line1: 'Noida, Uttar Pradesh',
        line2: 'India',
    },

    // ── Copyright (updates automatically each year) ─────────────────────
    get copyright() {
        return `© ${new Date().getFullYear()} Zpluse University. All rights reserved.`;
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC / MARKETING NAV
//  Layout: Logo | Find Colleges | Admissions | About | [Login] [Get Started]
// ─────────────────────────────────────────────────────────────────────────────
export const PUBLIC_NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/colleges', label: 'Find Colleges' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/#about', label: 'About Us' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
//  STUDY HUB NAV  (private / authenticated)
// ─────────────────────────────────────────────────────────────────────────────
export const STUDY_HUB_NAV: Record<'student' | 'teacher' | 'admin', { href: string; label: string; icon: string }[]> = {
    student: [
        { href: '/study-hub',              label: 'My Classes',   icon: 'play_lesson' },
        { href: '/study-hub/live-classes', label: 'Live Classes', icon: 'videocam' },
        { href: '/study-hub/performance',  label: 'Performance',  icon: 'trending_up' },
        { href: '/study-hub/profile',      label: 'Profile',      icon: 'account_circle' },
    ],
    teacher: [
        { href: '/teacher',          label: 'Workspace',   icon: 'history_edu' },
        { href: '/teacher/courses',  label: 'My Courses',  icon: 'library_books' },
        { href: '/teacher/materials', label: 'Materials',  icon: 'cloud_upload' },
        { href: '/teacher/students', label: 'Students',    icon: 'groups' },
    ],
    admin: [
        { href: '/admin',          label: 'Overview',  icon: 'dashboard' },
        { href: '/admin/colleges', label: 'Colleges',  icon: 'account_balance' },
        { href: '/admin/users',    label: 'Users',     icon: 'group' },
        { href: '/admin/settings', label: 'Settings',  icon: 'settings' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER LINK GROUPS
//  Defined once here — imported by Footer.tsx only.
// ─────────────────────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
    explore: [
        { href: '/colleges',        label: 'College Directory' },
        { href: '/colleges/compare', label: 'Compare Colleges' },
        { href: '/#about',          label: 'About Us' },
        { href: '/login',           label: 'Student Portal' },
    ],
    resources: [
        { href: '/help',            label: 'Help Center' },
        { href: '/admissions',      label: 'Admissions Guide' },
        { href: '/webinars',        label: 'Live Webinars' },
        { href: '/docs/educators',  label: 'Educator Docs' },
    ],
    legal: [
        { href: '/privacy',         label: 'Privacy Policy' },
        { href: '/terms',           label: 'Terms of Service' },
    ],
} as const;
