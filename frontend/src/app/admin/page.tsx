'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';

interface College {
    id: string;
    name: string;
    city: string;
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
    const [url, setUrl] = useState('');
    const [isScraping, setIsScraping] = useState(false);
    const [colleges, setColleges] = useState<College[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { addToast } = useToast();

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            const [collegesRes, usersRes] = await Promise.all([
                fetchApi('/colleges?limit=5'),
                fetchApi('/auth/users?limit=5')
            ]);
            setColleges(collegesRes.data);
            setUsers(usersRes.data);
        } catch (err: any) {
            addToast('error', 'Failed to load panel', err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScraping(true);

        try {
            const data = await fetchApi('/admin/scrape-and-create', {
                method: 'POST',
                body: JSON.stringify({ target_url: url })
            });

            addToast('success', 'Generative API Run', `Successfully created: ${data.data.name}`);
            setUrl('');
            loadDashboardData(); // Refresh table
        } catch (err: any) {
            addToast('error', 'Scraper Failed', err.message);
        } finally {
            setIsScraping(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased transition-colors duration-200 min-h-screen font-sans">
            <div className="max-w-md mx-auto min-h-screen relative flex flex-col pb-24 shadow-2xl bg-background-light dark:bg-background-dark">
                <header className="flex items-center justify-between px-6 py-5 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-lg">school</span>
                        </div>
                        <h1 className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                            Zpluse<span className="text-primary dark:text-blue-400"> University</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-5 pt-6 space-y-6">
                    <div className="flex flex-col space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-blue-400">Global Control Center</span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">System metrics and pending approvals.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-xl">account_balance</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{colleges.length + 50}+</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Colleges</p>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-outlined text-xl">groups</span>
                                </div>
                                <span className="flex items-center text-xs text-green-500 font-medium">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +12%
                                </span>
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length * 12 + 1500}</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Students</p>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined text-xl">school</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2k</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Teachers</p>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-2 bg-teal-100 dark:bg-teal-900/40 rounded-lg text-teal-600 dark:text-teal-400">
                                    <span className="material-symbols-outlined text-xl">menu_book</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">3,450</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Courses</p>
                            </div>
                        </div>
                    </div>

                    {/* SCRAPER CARD MODIFIED FOR MOBILE */}
                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl text-blue-600">
                                <span className="material-symbols-outlined text-2xl">bolt</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">College Generator</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Scrape university data instantly.</p>
                            </div>
                        </div>
                        <form onSubmit={handleScrape} className="flex flex-col gap-3">
                            <input
                                type="url"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.edu"
                                className="w-full bg-background-light dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-shadow"
                            />
                            <button
                                type="submit"
                                disabled={isScraping}
                                className="w-full bg-primary hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                {isScraping ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">api</span>
                                        Generate Post
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                                <span className="material-symbols-outlined text-primary text-lg">dns</span>
                                System Health
                            </h3>
                            <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold">Operational</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500 dark:text-slate-400">CPU Load</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">42%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500 dark:text-slate-400">Cloudinary API</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">87%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white px-1">Management Actions</h3>

                        {/* TABLES ADAPTED FOR MOBILE LISTINGS */}

                        {/* Colleges List */}
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Recent Colleges</h4>
                            <div className="space-y-3">
                                {isLoading ? (
                                    <p className="text-xs text-center text-slate-500">Loading...</p>
                                ) : colleges.length === 0 ? (
                                    <p className="text-xs text-center text-slate-500">No colleges found.</p>
                                ) : (
                                    colleges.map((c) => (
                                        <div key={c.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0 last:pb-0">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                                                <p className="text-xs text-slate-500">{c.city} • <span className="uppercase">{c.type}</span></p>
                                            </div>
                                            <button className="text-primary text-xs font-semibold">Edit</button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Users List */}
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Recent Users</h4>
                            <div className="space-y-3">
                                {isLoading ? (
                                    <p className="text-xs text-center text-slate-500">Loading...</p>
                                ) : users.length === 0 ? (
                                    <p className="text-xs text-center text-slate-500">No users found.</p>
                                ) : (
                                    users.map((u) => (
                                        <div key={u.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                    <span className="material-symbols-outlined text-sm">person</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{u.full_name || 'N/A'}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase">{u.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
                                <span className="material-symbols-outlined mb-1 text-2xl">analytics</span>
                                <span className="text-xs font-medium">Reports</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
                                <span className="material-symbols-outlined mb-1 text-2xl">campaign</span>
                                <span className="text-xs font-medium">Announcements</span>
                            </button>
                        </div>
                    </div>

                    <div className="pb-6">
                        <div className="flex items-center justify-between mb-3 px-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Audit Log</h3>
                            <a className="text-xs font-medium text-primary hover:underline" href="#">View All</a>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Course "AI 101" Published</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Prof. Smith • 2m ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Login Failed (5x)</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">IP 192.168.1.1 • 15m ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">System Backup Complete</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Automated Task • 1h ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface-dark text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-8 border border-gray-700/50">
                    <button className="flex flex-col items-center gap-1 opacity-100">
                        <span className="material-symbols-outlined text-primary text-xl">dashboard</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xl">people</span>
                    </button>
                    <div className="w-10 h-10 -mt-8 rounded-full bg-primary flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-white text-xl">add</span>
                    </div>
                    <button className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xl">chat</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xl">settings</span>
                    </button>
                </div>

                {/* Background ambient light effects */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-primary/5 rounded-full blur-3xl dark:bg-primary/10"></div>
                    <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[30%] bg-purple-500/5 rounded-full blur-3xl dark:bg-purple-500/10"></div>
                </div>
            </div>
        </div>
    );
}
