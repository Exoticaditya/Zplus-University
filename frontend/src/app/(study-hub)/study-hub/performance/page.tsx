'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BRAND } from '@/constants/brandConfig';

export default function StudyHubPerformancePage() {
    const { user } = useAuth();
    const name = user?.user_metadata?.full_name?.split(' ')[0] || 'Student';

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {name}'s academic overview on {BRAND.name}
                </p>
            </div>

            {/* Placeholder state */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4 block">trending_up</span>
                <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">Analytics Coming Soon</h2>
                <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mx-auto mb-6">
                    Detailed progress charts, assignment scores, and attendance reports will appear here once your courses begin.
                </p>
                <Link href="/study-hub" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition">
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to Study Hub
                </Link>
            </div>
        </div>
    );
}
