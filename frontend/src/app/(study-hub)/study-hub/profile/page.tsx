'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { BRAND } from '@/constants/brandConfig';

export default function StudyHubProfilePage() {
    const { user } = useAuth();

    const name  = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
    const email = user?.email || '—';
    const role  = user?.user_metadata?.role || 'student';
    const joinedDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
        : '—';

    return (
        <div className="p-6 max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{BRAND.name} account</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow">
                        {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white text-lg">{name}</p>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-semibold capitalize">
                            {role}
                        </span>
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    {[
                        { label: 'Email', value: email,      icon: 'email' },
                        { label: 'Role',  value: role,       icon: 'badge' },
                        { label: 'Joined', value: joinedDate, icon: 'calendar_today' },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[20px] w-6 shrink-0">{icon}</span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-400">
                        To update your profile, contact{' '}
                        <a href={`mailto:${BRAND.email}`} className="text-blue-500 hover:underline">
                            {BRAND.email}
                        </a>
                    </p>
                </div>
            </div>

            <div className="text-center mt-6">
                <Link href="/study-hub" className="text-sm font-medium text-slate-400 hover:text-blue-600 transition">
                    ← Back to Study Hub
                </Link>
            </div>
        </div>
    );
}
