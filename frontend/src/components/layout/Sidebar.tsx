'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, STUDY_HUB_NAV } from '@/constants/brandConfig';

export default function Sidebar({ role }: { role: 'admin' | 'teacher' | 'student' }) {
    const pathname = usePathname();

    // Normalise STUDY_HUB_NAV shape to match existing sidebar format
    const navItems = STUDY_HUB_NAV[role].map(item => ({ name: item.label, href: item.href, icon: item.icon }));

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 hidden lg:flex flex-col z-40 transition-transform">
            {/* Brand Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-blue-500 text-2xl group-hover:scale-110 transition-transform">school</span>
                    <span className="text-xl font-bold tracking-tight text-white">
                        {BRAND.nameParts.prefix}<span className="text-blue-500">{BRAND.nameParts.suffix}</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
                    {role} portal
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile Widget */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">admin@zpluseuniversity.com</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-500">more_vert</span>
                </div>
            </div>
        </aside>
    );
}
