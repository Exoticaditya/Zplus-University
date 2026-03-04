'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Enrollment {
    id: string;
    course_id: string;
    progress_percent: string;
    status: string;
    courseTitle?: string;
    courseCategory?: string;
}

export default function StudentDashboard() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';
    const router = useRouter();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [watchlist, setWatchlist] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const enrRes = await fetchApi('/enrollments/my');
                const enriched = enrRes.data.map((e: any, i: number) => ({
                    ...e,
                    courseTitle: e.courseTitle || `Enrolled Course #${i + 1}`,
                    courseCategory: e.courseCategory || 'Computer Science'
                }));
                setEnrollments(enriched);
            } catch { }
            try {
                const colRes = await fetchApi('/colleges?limit=4');
                setWatchlist(colRes.data || []);
            } catch { }
            setIsLoading(false);
        };
        loadData();
    }, [user]);

    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Student';

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {firstName} 👋
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Continue your learning journey.</p>
                </div>
                <Link href="/colleges" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 w-max">
                    <span className="material-symbols-outlined text-lg">search</span> Explore Colleges
                </Link>
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
                <>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            { label: 'Enrolled Courses', value: enrollments.length, icon: 'school', color: 'blue' },
                            { label: 'Avg Progress', value: enrollments.length > 0 ? `${Math.round(enrollments.reduce((a, e) => a + Number(e.progress_percent || 0), 0) / enrollments.length)}%` : '0%', icon: 'trending_up', color: 'emerald' },
                            { label: 'Watchlist', value: watchlist.length, icon: 'bookmark', color: 'orange' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : s.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'}`}>
                                    <span className="material-symbols-outlined">{s.icon}</span>
                                </div>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Continue Learning */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                        <div className="relative z-10">
                            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">Continue Learning</span>
                            <h3 className="text-xl font-bold mb-2">Advanced System Architecture</h3>
                            <p className="text-blue-100 text-sm mb-4">Node.js & Microservices — 65% complete</p>
                            <div className="w-full h-2 bg-white/20 rounded-full mb-4 overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
                            </div>
                            <button className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-blue-50 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">play_arrow</span> Resume
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Session */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white">Upcoming Live Session</h3>
                        </div>
                        <div className="px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">videocam</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-slate-900 dark:text-white">Q&A: Microservices Architecture</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Tomorrow, 10:00 AM • Prof. Sarah Chen</p>
                                </div>
                            </div>
                            <button className="bg-purple-600 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Set Reminder</button>
                        </div>
                    </div>
                </>
            )}

            {/* ── COURSES TAB ── */}
            {activeTab === 'courses' && (
                <div className="space-y-5">
                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">My Enrolled Courses</h2>
                    {isLoading ? (
                        <div className="p-12 text-center"><div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
                    ) : enrollments.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3">school</span>
                            <p className="text-slate-500 dark:text-slate-400 mb-4">You haven&apos;t enrolled in any courses yet.</p>
                            <Link href="/colleges" className="bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl inline-block">Browse Colleges</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {enrollments.map((enr) => (
                                <div key={enr.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-2xl">school</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{enr.courseTitle}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{enr.courseCategory}</p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Number(enr.progress_percent) || 0}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">{Number(enr.progress_percent || 0).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── SCHEDULE TAB ── */}
            {activeTab === 'schedule' && (
                <div className="space-y-5">
                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">Weekly Schedule</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {[
                            { day: 'Monday', time: '10:00 AM', title: 'System Architecture', prof: 'Prof. Smith', live: true },
                            { day: 'Tuesday', time: '2:00 PM', title: 'Database Design', prof: 'Prof. Johnson', live: false },
                            { day: 'Wednesday', time: '11:00 AM', title: 'Cloud Computing', prof: 'Prof. Chen', live: false },
                            { day: 'Thursday', time: '10:00 AM', title: 'Machine Learning', prof: 'Prof. Lee', live: true },
                            { day: 'Friday', time: '3:00 PM', title: 'Web Development', prof: 'Prof. Kumar', live: false },
                        ].map((s, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase">{s.day.slice(0, 3)}</p>
                                        <p className="text-xs text-slate-500">{s.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{s.prof}</p>
                                    </div>
                                </div>
                                {s.live && (
                                    <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PROFILE TAB ── */}
            {activeTab === 'profile' && (
                <div className="max-w-2xl space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {firstName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.user_metadata?.full_name || 'Student'}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                <input defaultValue={user?.user_metadata?.full_name || ''} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                                <input readOnly value={user?.email || ''} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-500 dark:text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Suggested Colleges */}
            {activeTab === 'overview' && watchlist.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Suggested Colleges</h3>
                        <Link href="/colleges" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {watchlist.map((col: any) => (
                            <Link key={col.id} href={`/college/${col.id}`} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow block">
                                <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{col.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{col.city}{col.state ? `, ${col.state}` : ''}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
