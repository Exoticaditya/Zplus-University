import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Help Center',
};

const faqs = [
    {
        q: 'How do I reset my password?',
        a: 'Go to the Sign In page and click "Forgot password?". Enter your registered email to receive a reset link.',
    },
    {
        q: 'How do I enrol in a course?',
        a: 'After logging in, navigate to your Student Dashboard, browse available courses, and click "Enrol Now".',
    },
    {
        q: 'How do I join a live class?',
        a: 'Live sessions appear in your Dashboard under "Upcoming Live Session". Click "Join Live Session" at the scheduled time.',
    },
    {
        q: 'How do teachers upload study materials?',
        a: 'Teachers can upload PDFs and videos from their Teacher Workspace under the Materials section. Files are stored on Cloudinary.',
    },
    {
        q: 'How does Role-Based Access work?',
        a: 'When you register, you choose your role (Student or Educator). Admins are created manually. Each role sees a different dashboard.',
    },
    {
        q: 'I applied but my college is not showing up — why?',
        a: 'The college directory is populated by the Admin via the AI Scraper tool. Contact the Admin if a college is missing.',
    },
];

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-3xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Help Center</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-100 dark:border-blue-800">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Support
                </div>
                <h1 className="text-4xl font-extrabold mb-3">Help Center</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-12">
                    Find answers to the most common questions about Zpluse University.
                </p>

                {/* FAQ List */}
                <div className="space-y-4 mb-16">
                    {faqs.map((faq, i) => (
                        <details
                            key={i}
                            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 cursor-pointer open:shadow-md transition-all"
                        >
                            <summary className="font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4 list-none">
                                {faq.q}
                                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform shrink-0">expand_more</span>
                            </summary>
                            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                        </details>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="bg-primary/5 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800 rounded-2xl p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-blue-500 mb-3 block">support_agent</span>
                    <h2 className="text-xl font-bold mb-2">Still need help?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                        Our team is available Monday–Saturday, 9 AM – 6 PM IST.
                    </p>
                    <a
                        href="mailto:contact@zpluseuniversity.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                    >
                        <span className="material-symbols-outlined text-base">mail</span>
                        Email Support
                    </a>
                </div>
            </div>
        </div>
    );
}
