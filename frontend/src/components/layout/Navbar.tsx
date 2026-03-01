'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize dark mode from system or localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // Don't render the global navbar inside the dashboard routes, 
    // they will have their own Sidebar layout later.
    const isDashboardRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/teacher') || pathname?.startsWith('/dashboard');

    if (isDashboardRoute) return null;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/colleges', label: 'Explore Colleges' },
        { href: '/dashboard', label: 'Learning Hub' },
        { href: '/#about', label: 'About Us' },
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled
                ? 'glass-effect shadow-sm py-3'
                : 'bg-white dark:bg-slate-900 border-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                        <span className="material-symbols-outlined text-white text-2xl leading-none">school</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Zpluse<span className="text-blue-600"> University</span>
                    </span>
                </Link>

                {/* DESKTOP LINKS */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm font-semibold transition-colors ${
                                pathname === href
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* ACTIONS */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Toggle Dark Mode"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <Link
                        href="/login"
                        className="text-sm font-bold text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-2"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className="bg-slate-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Get Started
                    </Link>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 space-y-1 shadow-lg">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                pathname === href
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3 flex flex-col gap-2">
                        <Link
                            href="/login"
                            className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
