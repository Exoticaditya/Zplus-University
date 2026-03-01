import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admissions Guide',
};

const steps = [
    {
        icon: 'search',
        title: 'Explore Colleges',
        description:
            'Browse our directory of 500+ top-ranked institutions. Use filters by state, city, type, and rating to shortlist your preferences.',
        action: { label: 'Browse Colleges', href: '/colleges' },
    },
    {
        icon: 'compare_arrows',
        title: 'Compare & Decide',
        description:
            'Use the Compare tool to evaluate up to 3 colleges side-by-side — ratings, affiliations, city, and more — in one view.',
        action: { label: 'Compare Now', href: '/colleges/compare' },
    },
    {
        icon: 'how_to_reg',
        title: 'Create Your Account',
        description:
            'Register as a Student in under 30 seconds using your email or Google account. Your role is set automatically.',
        action: { label: 'Create Account', href: '/register' },
    },
    {
        icon: 'school',
        title: 'Enrol in Courses',
        description:
            'From your Student Dashboard, browse courses offered by verified teachers across your chosen college.',
        action: { label: 'Go to Dashboard', href: '/dashboard' },
    },
    {
        icon: 'video_call',
        title: 'Attend Live Classes',
        description:
            'Join scheduled live sessions directly in your browser via the integrated Jitsi-powered classroom — no download needed.',
        action: null,
    },
    {
        icon: 'workspace_premium',
        title: 'Track Your Progress',
        description:
            'Monitor course completion, upcoming deadlines, and placement opportunities from your personalised Learning Hub.',
        action: null,
    },
];

export default function AdmissionsGuidePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-4xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Admissions Guide</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-100 dark:border-blue-800">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Admissions 2026
                </div>
                <h1 className="text-4xl font-extrabold mb-3">Admissions Guide</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-14">
                    Your step-by-step journey from exploring colleges to enrolling in your first course on Zpluse University.
                </p>

                {/* Steps */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-300 mb-4">
                                <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center mb-3">
                                {i + 1}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
                                {step.description}
                            </p>
                            {step.action && (
                                <Link
                                    href={step.action.href}
                                    className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    {step.action.label}
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-2xl p-10 text-center text-white">
                    <h2 className="text-2xl font-extrabold mb-3">Ready to get started?</h2>
                    <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                        Join thousands of students already learning on Zpluse University. Registration is free.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-slate-50 transition shadow-xl shadow-black/20"
                    >
                        Apply Now
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
