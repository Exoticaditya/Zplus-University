import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 max-w-none">

                <div className="mb-8 not-prose">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Terms of Service</span>
                </div>

                <h1>Terms of Service</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm not-prose mb-8">Last updated: March 1, 2026</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By creating an account or using the Zpluse University platform, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.</p>

                <h2>2. User Accounts</h2>
                <p>You must provide accurate, current information during registration. You are responsible for maintaining the confidentiality of your password and for all activity that occurs under your account.</p>

                <h2>3. Roles & Responsibilities</h2>
                <ul>
                    <li><strong>Students:</strong> May browse colleges, enrol in published courses, and join live sessions. Any misuse of the platform (spam, harassment, cheating) results in immediate account suspension.</li>
                    <li><strong>Educators:</strong> Accounts require Admin approval. Educators are responsible for the accuracy and quality of course materials they upload.</li>
                    <li><strong>Admins:</strong> Admin accounts are issued directly by Zpluse University and carry full platform management rights.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <p>Course materials uploaded by educators remain the intellectual property of the respective educator. By uploading content, you grant Zpluse University a non-exclusive licence to display and distribute that content to enrolled students.</p>

                <h2>5. Prohibited Conduct</h2>
                <p>You may not:</p>
                <ul>
                    <li>Use the platform for any unlawful purpose</li>
                    <li>Upload copyrighted content without permission</li>
                    <li>Attempt to access other users' accounts</li>
                    <li>Scrape or automate access to the platform without written permission</li>
                </ul>

                <h2>6. Service Availability</h2>
                <p>We aim for 99% uptime but do not guarantee uninterrupted service. We reserve the right to suspend or discontinue any part of the platform with reasonable notice.</p>

                <h2>7. Limitation of Liability</h2>
                <p>Zpluse University is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

                <h2>8. Governing Law</h2>
                <p>These terms are governed by the laws of India and subject to the exclusive jurisdiction of courts in New Delhi.</p>

                <h2>9. Contact</h2>
                <p>For questions about these terms, email us at <a href="mailto:admissions@zpluseuniversity.com">admissions@zpluseuniversity.com</a>.</p>
            </div>
        </div>
    );
}
