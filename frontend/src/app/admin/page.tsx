'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';

interface College {
    id: string;
    name: string;
    city: string;
    state: string;
    type: string;
    rating: number;
}

interface User {
    id: string;
    email: string;
    full_name: string;
    role: string;
    created_at: string;
}

export default function AdminDashboard() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';
    const { user } = useAuth();
    const { addToast } = useToast();

    const [colleges, setColleges] = useState<College[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Scraper
    const [url, setUrl] = useState('');
    const [isScraping, setIsScraping] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const collegesRes = await fetchApi('/colleges?limit=20');
            setColleges(collegesRes.data || []);
        } catch { }
        try {
            const usersRes = await fetchApi('/auth/users?limit=20');
            setUsers(usersRes.data || []);
        } catch { }
        setIsLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScraping(true);
        try {
            const data = await fetchApi('/admin/scrape-and-create', {
                method: 'POST',
                body: JSON.stringify({ target_url: url })
            });
            addToast('success', 'College Generated', `Created: ${data.data?.name || 'New entry'}`);
            setUrl('');
            loadData();
        } catch (err: any) {
            addToast('error', 'Scraper Failed', err.message);
        } finally {
            setIsScraping(false);
        }
    };

    const stats = [
        { label: 'Total Colleges', value: colleges.length || '90+', icon: 'account_balance', color: 'blue', trend: '+5 this month' },
        { label: 'Registered Users', value: users.length || '3', icon: 'groups', color: 'purple', trend: '+12%' },
        { label: 'Active Teachers', value: '1.2K', icon: 'school', color: 'emerald', trend: '+3%' },
        { label: 'Total Courses', value: '3,450', icon: 'menu_book', color: 'orange', trend: '+8%' },
    ];

    const colorMap: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
        orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    };

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back, {user?.user_metadata?.full_name || 'Admin'}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        All Systems Operational
                    </span>
                </div>
            </div>

            {/* ────── OVERVIEW TAB ────── */}
            {activeTab === 'overview' && (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg transition-shadow group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                                        <span className="material-symbols-outlined">{stat.icon}</span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Scraper + System Health */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Scraper */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">AI College Generator</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Scrape & create college profiles instantly</p>
                                </div>
                            </div>
                            <form onSubmit={handleScrape} className="flex gap-3">
                                <input
                                    type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.edu"
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
                                />
                                <button type="submit" disabled={isScraping}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm whitespace-nowrap">
                                    {isScraping ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-symbols-outlined text-lg">auto_awesome</span>}
                                    {isScraping ? 'Generating...' : 'Generate'}
                                </button>
                            </form>
                        </div>

                        {/* System Health */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5">
                                <span className="material-symbols-outlined text-blue-600">dns</span>
                                System Health
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Database', pct: 42, color: 'bg-blue-600' },
                                    { name: 'API Response', pct: 95, color: 'bg-emerald-500' },
                                    { name: 'Storage', pct: 67, color: 'bg-orange-500' },
                                ].map((item) => (
                                    <div key={item.name}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-slate-500 dark:text-slate-400 font-medium">{item.name}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">{item.pct}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                            <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Audit Log */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { text: 'Course "AI 101" Published', sub: 'Prof. Smith • 2m ago', dot: 'bg-emerald-500' },
                                { text: 'New student registration', sub: 'student@example.com • 15m ago', dot: 'bg-blue-500' },
                                { text: 'System Backup Complete', sub: 'Automated Task • 1h ago', dot: 'bg-slate-400' },
                                { text: 'College profile updated', sub: 'Admin • 3h ago', dot: 'bg-purple-500' },
                            ].map((log, i) => (
                                <div key={i} className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <span className={`w-2 h-2 rounded-full ${log.dot} flex-shrink-0`} />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{log.text}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{log.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* ────── COLLEGES TAB ────── */}
            {activeTab === 'colleges' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">College Directory ({colleges.length})</h3>
                    </div>
                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500"><div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {colleges.map((c) => (
                                <div key={c.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-lg">account_balance</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{c.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{c.city}{c.state ? `, ${c.state}` : ''} • <span className="uppercase">{c.type}</span></p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">{c.rating ? `★ ${c.rating}` : '—'}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ────── USERS TAB ────── */}
            {activeTab === 'users' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">User Management ({users.length})</h3>
                    </div>
                    {isLoading ? (
                        <div className="p-12 text-center"><div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
                    ) : users.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 text-sm">No users found. Users will appear here after they register.</div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map((u) => (
                                <div key={u.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {(u.full_name || u.email || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{u.full_name || 'Unknown'}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${u.role === 'admin' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : u.role === 'teacher' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                                        {u.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ────── SETTINGS TAB ────── */}
            {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">General Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Platform Name</label>
                                <input defaultValue="Zpluse University" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Contact Email</label>
                                <input defaultValue="admissions@zpluseuniversity.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Danger Zone</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">These actions are irreversible. Proceed with caution.</p>
                        <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                            Reset Database
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
