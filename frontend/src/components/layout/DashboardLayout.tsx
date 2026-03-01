'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import { BRAND } from '@/constants/brandConfig';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'admin' | 'teacher' | 'student';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
            {/* SIDEBAR COMPONENT */}
            <Sidebar role={role} />

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col lg:pl-64 h-screen overflow-hidden">

                {/* TOP MOBILE NAV (small screens only) */}
                <header className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 z-30 sticky top-0">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">school</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {BRAND.nameParts.prefix}
                            <span className="text-blue-600">{BRAND.nameParts.suffix}</span>
                        </span>
                    </Link>
                    <button className="p-2 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* SCROLLABLE INTERIOR */}
                <main className="flex-1 overflow-y-auto no-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
