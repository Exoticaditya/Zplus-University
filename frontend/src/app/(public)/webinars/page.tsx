import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Live Webinars',
};

const upcomingWebinars = [
    {
        title: 'Cracking JEE Advanced 2026 — Strategy Session',
        date: 'March 10, 2026',
        time: '5:00 PM IST',
        host: 'Prof. Ankit Sharma',
        category: 'Engineering',
        seats: 1200,
    },
    {
        title: 'NEET Preparation: Last 60-Day Master Plan',
        date: 'March 14, 2026',
        time: '4:00 PM IST',
        host: 'Dr. Priya Menon',
        category: 'Medical',
        seats: 800,
    },
    {
        title: 'MBA Admissions: How to Write a Winning SOP',
        date: 'March 18, 2026',
        time: '6:00 PM IST',
        host: 'Prof. Rahul Kapoor',
        category: 'Business',
        seats: 600,
    },
    {
        title: 'Full-Stack Web Dev Career Roadmap 2026',
        date: 'March 22, 2026',
        time: '7:00 PM IST',
        host: 'Ms. Divya Nair',
        category: 'Technology',
        seats: 1500,
    },
];

const categoryColors: Record<string, string> = {
    Engineering: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    Medical: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    Business: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    Technology: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
};

export default function WebinarsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-4xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Live Webinars</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs font-semibold mb-4 border border-red-100 dark:border-red-800">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Live &amp; Upcoming
                </div>
                <h1 className="text-4xl font-extrabold mb-3">Live Webinars</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-12">
                    Free expert-led sessions covering admissions, careers, and academics. Register to get a reminder.
                </p>

                {/* Webinar cards */}
                <div className="space-y-5 mb-16">
                    {upcomingWebinars.map((w, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${categoryColors[w.category]}`}>
                                        {w.category}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg leading-snug mb-1">{w.title}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">calendar_today</span>
                                        {w.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">schedule</span>
                                        {w.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">person</span>
                                        {w.host}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">group</span>
                                        {w.seats.toLocaleString()} seats
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/register"
                                className="shrink-0 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-500/30"
                            >
                                Register Free
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 text-center text-white border border-slate-800">
                    <span className="material-symbols-outlined text-4xl text-blue-400 mb-3 block">notifications_active</span>
                    <h2 className="text-xl font-bold mb-2">Never miss a session</h2>
                    <p className="text-slate-400 text-sm mb-5">
                        Create a free account to get email reminders and early access to exclusive webinars.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition"
                    >
                        Get Notified
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
