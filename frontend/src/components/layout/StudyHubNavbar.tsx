'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { BRAND, STUDY_HUB_NAV } from '@/constants/brandConfig';

type Role = 'student' | 'teacher' | 'admin';

interface StudyHubNavbarProps {
    role: Role;
}

/**
 * STUDY HUB NAVBAR — Top bar for authenticated dashboards.
 * No global footer here (focus mode). Content: Logo | nav links | profile avatar + sign-out.
 */
export default function StudyHubNavbar({ role }: StudyHubNavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const navItems = STUDY_HUB_NAV[role];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <header className="sticky top-0 z-40 h-14 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 md:px-6 gap-4 shadow-sm">

            {/* ── LEFT: Logo ── */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 mr-4">
                <span className="material-symbols-outlined text-blue-600 text-xl">school</span>
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
                    {BRAND.nameParts.prefix}
                    <span className="text-blue-600">{BRAND.nameParts.suffix}</span>
                </span>
            </Link>

            {/* ── CENTER: Nav links ── */}
            <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
                {navItems.map(({ href, label, icon }) => {
                    const active = pathname === href || (href !== '/study-hub' && pathname?.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                active
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">{icon}</span>
                            <span className="hidden sm:inline">{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* ── RIGHT: User avatar + sign-out ── */}
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden md:block truncate max-w-[120px]">
                    {displayName}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-inner select-none">
                    {initials}
                </div>
                <button
                    onClick={handleSignOut}
                    title="Sign out"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
            </div>
        </header>
    );
}
