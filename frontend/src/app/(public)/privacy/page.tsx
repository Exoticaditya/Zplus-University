import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 max-w-none">

                <div className="mb-8 not-prose">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Privacy Policy</span>
                </div>

                <h1>Privacy Policy</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm not-prose mb-8">Last updated: March 1, 2026</p>

                <h2>1. Information We Collect</h2>
                <p>We collect information you provide directly when you register, including your full name, email address, and role (student or educator). We also collect usage data such as pages visited, courses enrolled in, and session activity.</p>

                <h2>2. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                    <li>Provide, personalise and improve our platform</li>
                    <li>Send transactional emails (e.g., password resets, enrolment confirmations)</li>
                    <li>Generate anonymised analytics to improve the college directory</li>
                    <li>Ensure platform security and prevent fraud</li>
                </ul>

                <h2>3. Data Storage & Security</h2>
                <p>User authentication data is stored securely via Supabase Auth, which is SOC 2 compliant. Course materials are stored on Cloudinary's encrypted CDN. We never store plain-text passwords.</p>

                <h2>4. Third-Party Services</h2>
                <p>We integrate with:</p>
                <ul>
                    <li><strong>Supabase</strong> — Authentication and database</li>
                    <li><strong>Cloudinary</strong> — Media storage</li>
                    <li><strong>Jitsi Meet</strong> — Live video sessions (no account required)</li>
                    <li><strong>Google OAuth</strong> — Optional sign-in</li>
                </ul>

                <h2>5. Cookies</h2>
                <p>We use session cookies to keep you logged in. We do not use third-party tracking or advertising cookies.</p>

                <h2>6. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal data at any time. To request deletion of your account, email us at <a href="mailto:contact@zpluseuniversity.com">contact@zpluseuniversity.com</a>.</p>

                <h2>7. Contact</h2>
                <p>For privacy-related inquiries, contact us at <a href="mailto:contact@zpluseuniversity.com">contact@zpluseuniversity.com</a>.</p>
            </div>
        </div>
    );
}
