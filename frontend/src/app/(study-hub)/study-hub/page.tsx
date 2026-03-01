'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import { BRAND } from '@/constants/brandConfig';

interface Enrollment {
    id: string;
    course_id: string;
    progress_percent: number | string;
    status: string;
    courseTitle?: string;
    courseCategory?: string;
    thumbnailUrl?: string;
}

export default function StudyHubPage() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const firstName = user?.user_metadata?.full_name?.split(' ')[0]
        || user?.email?.split('@')[0]
        || 'Student';

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const res = await fetchApi('/enrollments/my');
                setEnrollments(
                    res.data.map((e: any, i: number) => ({
                        ...e,
                        courseTitle: e.courseTitle || `Course #${i + 1}`,
                        courseCategory: e.courseCategory || 'General Studies',
                        progress_percent: Number(e.progress_percent) || 0,
                    }))
                );
            } catch (err: any) {
                addToast('error', 'Could not load courses', err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user]);

    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* Greeting */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    Welcome back, {firstName} 👋
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Pick up where you left off — your {BRAND.name} courses are waiting.
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                    { href: '/study-hub/live-classes', icon: 'videocam',       label: 'Live Classes',  color: 'text-blue-500' },
                    { href: '/study-hub/performance',  icon: 'trending_up',    label: 'Performance',   color: 'text-green-500' },
                    { href: '/study-hub/profile',      icon: 'account_circle', label: 'My Profile',    color: 'text-purple-500' },
                ].map(({ href, icon, label, color }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                        <span className={`material-symbols-outlined text-3xl ${color}`}>{icon}</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
                    </Link>
                ))}
            </div>

            {/* Enrolled Courses */}
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">My Courses</h2>

            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2].map(i => (
                        <div key={i} className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    ))}
                </div>
            ) : enrollments.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3 block">school</span>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No courses yet</p>
                    <Link href="/colleges" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition">
                        Explore Colleges
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {enrollments.map(enrollment => (
                        <div
                            key={enrollment.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">play_lesson</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                                        {enrollment.courseTitle}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{enrollment.courseCategory}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span>Progress</span>
                                    <span>{enrollment.progress_percent}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                        style={{ width: `${enrollment.progress_percent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
