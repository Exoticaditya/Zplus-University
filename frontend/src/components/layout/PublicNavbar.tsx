'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, PUBLIC_NAV_LINKS } from '@/constants/brandConfig';

/**
 * PUBLIC NAVBAR — Marketing / College-Discovery site.
 * Links: Home | Find Colleges | Admissions | About Us  +  Login | Get Started
 */
export default function PublicNavbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = stored === 'dark' || (!stored && prefersDark);
        document.documentElement.classList.toggle('dark', dark);
        setIsDarkMode(dark);
    }, []);

    // Close mobile menu whenever route changes
    useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

    const toggleDark = () => {
        const next = !isDarkMode;
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        setIsDarkMode(next);
    };

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname?.startsWith(href.replace('/#', '/'));

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 border-b ${
                isScrolled
                    ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-slate-100 dark:border-slate-800 py-3'
                    : 'bg-white dark:bg-slate-900 border-transparent py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

                {/* ── LOGO ── */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-blue-600/25">
                        <span className="material-symbols-outlined text-white text-xl leading-none">school</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {BRAND.nameParts.prefix}
                        <span className="text-blue-600">{BRAND.nameParts.suffix}</span>
                    </span>
                </Link>

                {/* ── DESKTOP NAV ── */}
                <nav className="hidden md:flex items-center gap-7">
                    {PUBLIC_NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm font-semibold transition-colors ${
                                isActive(href)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* ── DESKTOP ACTIONS ── */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Toggle dark mode"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <Link
                        href="/login"
                        className="text-sm font-bold text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-2 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/20 hover:-translate-y-0.5"
                    >
                        Get Started
                    </Link>
                </div>

                {/* ── MOBILE TOGGLE ── */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-[22px]">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* ── MOBILE DROPDOWN ── */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-lg z-50 px-4 pb-4 pt-2">
                    <nav className="flex flex-col gap-1 mb-4">
                        {PUBLIC_NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive(href)
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                        <Link href="/login" className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-white hover:border-blue-400 transition-colors">
                            Login
                        </Link>
                        <Link href="/register" className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
