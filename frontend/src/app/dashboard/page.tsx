'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Enrollment {
    id: string;
    course_id: string;
    progress_percent: string;
    status: string;
    courseTitle?: string;
    courseCategory?: string;
    thumbnailUrl?: string;
}

export default function LearningHub() {
    const router = useRouter();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [watchlist, setWatchlist] = useState<any[]>([]); // Quick mock for watchlist
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                // Fetch enrollments. Backend should filter by student_id automatically via auth middleware
                const enrRes = await fetchApi('/enrollments/my');

                // Let's populate mock course metadata if the API didn't join it to keep UI rich
                const enrichedEnrollments = enrRes.data.map((e: any, i: number) => ({
                    ...e,
                    courseTitle: e.courseTitle || `Enrolled Course #${i + 1}`,
                    courseCategory: e.courseCategory || 'Computer Science'
                }));
                setEnrollments(enrichedEnrollments);

                // Fetch general colleges to act as a watchlist / suggestions
                const colRes = await fetchApi('/colleges?limit=3');
                setWatchlist(colRes.data);

            } catch (err: any) {
                addToast('error', 'Failed to load dashboard', err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [user]);

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-text-light dark:text-text-dark min-h-screen pb-20 transition-colors duration-300">
            <header className="fixed top-0 w-full z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-light dark:text-muted-dark transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                                <span className="material-symbols-outlined text-lg">school</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight">Zpluse<span className="text-primary dark:text-blue-400"> University</span></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-light dark:text-muted-dark transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-surface-light dark:border-surface-dark"></span>
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
                            <span className="material-symbols-outlined text-xl dark:hidden">dark_mode</span>
                            <span className="material-symbols-outlined text-xl hidden dark:block">light_mode</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-16 max-w-2xl mx-auto">
                <div className="relative w-full aspect-video bg-black sticky top-16 z-30 shadow-lg">
                    <img alt="Lecture coding screen" className="w-full h-full object-cover opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr6x4k-YcYEqVdbmV4AO7RRDGBItC7eusVxp0OxbESC7Jt74sWO5P14G9mAX47lv6AnHObstgnyhEyg137g7F3RnlzLmXPxeghjl3zk0DNwqv5jtqbVToLn1nPwnXxqxFKfUmyB5ryvS47LKfkHXuYZwaUW3JbLeEi6kY7x05W3CZJPjZOLos-sqatVEV_unHGxUg54zd5flth02uoY0r9JA3slzxkE4j26-2TD7BZbq_JzwNPwevgFc3PCqrklHGWap071V3FuawM" />
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40">
                        <div className="flex justify-between items-start">
                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 font-medium animate-pulse">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                            </span>
                            <button className="text-white/80 hover:text-white">
                                <span className="material-symbols-outlined">cast</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center absolute inset-0 pointer-events-none">
                            <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white pointer-events-auto hover:bg-white/30 hover:scale-105 transition-all">
                                <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-white text-xs font-medium">
                                <span>14:32</span>
                                <span>45:00</span>
                            </div>
                            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-primary relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-5 bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h1 className="text-xl font-bold leading-tight">Advanced System Architecture with Node.js & Microservices</h1>
                        <button className="flex-shrink-0 text-primary dark:text-blue-400">
                            <span className="material-symbols-outlined">bookmark_border</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-light dark:text-muted-dark mb-4">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">person</span>
                            <span>Prof. Sarah Chen</span>
                        </div>
                        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <div className="flex items-center gap-1 text-warning">
                            <span className="material-symbols-outlined text-base">star</span>
                            <span>4.9</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-primary dark:text-blue-400 uppercase tracking-wide">Course Progress</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">65%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                            <div className="w-[65%] h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-glow"></div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col md:flex-row gap-3">
                        <button className="flex-1 bg-primary hover:bg-blue-800 text-white py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-lg">videocam</span>
                            Join Live Session
                        </button>
                        <button className="flex-1 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-800 py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-lg text-secondary">share</span>
                            Share Class
                        </button>
                    </div>
                </div>

                <div className="sticky top-[calc(4rem+56.25vw)] z-20 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto no-scrollbar">
                    <div className="flex px-4 min-w-max">
                        <button className="px-4 py-3 text-sm transition-all text-primary border-b-2 border-primary font-semibold dark:text-blue-400 dark:border-blue-400">Lectures</button>
                        <button className="px-4 py-3 text-sm font-medium transition-all text-muted-light border-b-2 border-transparent hover:text-text-light dark:text-muted-dark dark:hover:text-text-dark">Resources</button>
                        <button className="px-4 py-3 text-sm font-medium transition-all text-muted-light border-b-2 border-transparent hover:text-text-light dark:text-muted-dark dark:hover:text-text-dark">Notes</button>
                        <button className="px-4 py-3 text-sm font-medium transition-all text-muted-light border-b-2 border-transparent hover:text-text-light dark:text-muted-dark dark:hover:text-text-dark">Doubt Forum</button>
                        <button className="px-4 py-3 text-sm font-medium transition-all text-muted-light border-b-2 border-transparent hover:text-text-light dark:text-muted-dark dark:hover:text-text-dark">Reviews</button>
                    </div>
                </div>

                <div className="p-5 space-y-6 bg-gray-50 dark:bg-background-dark min-h-[50vh]">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-text-light dark:text-text-dark">My Enrolled Courses</h3>
                            <span className="text-xs text-muted-light dark:text-muted-dark font-medium bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{enrollments.length} Active</span>
                        </div>

                        {isLoading ? (
                            <p className="text-center text-sm py-8 text-muted-light">Loading courses...</p>
                        ) : enrollments.length === 0 ? (
                            <p className="text-center text-sm py-8 text-muted-light">You are not enrolled in any courses.</p>
                        ) : (
                            enrollments.map((enr, i) => (
                                <div key={enr.id} className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-soft border-l-4 border-primary ring-1 ring-gray-100 dark:ring-gray-800">
                                    <div className="flex gap-4">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                            {enr.thumbnailUrl ? (
                                                <img alt="Thumbnail" className="w-full h-full object-cover" src={enr.thumbnailUrl} />
                                            ) : (
                                                <span className="material-symbols-outlined text-4xl text-gray-400">school</span>
                                            )}
                                            {i === 0 && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white animate-pulse">equalizer</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-0.5">
                                            <div>
                                                <h4 className={`font-semibold text-sm mb-1 ${i === 0 ? 'text-primary dark:text-blue-400' : 'text-text-light dark:text-text-dark'}`}>{enr.courseTitle}</h4>
                                                <p className="text-xs text-muted-light dark:text-muted-dark line-clamp-2">{enr.courseCategory}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {i === 0 ? (
                                                    <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 px-1.5 py-0.5 rounded">PLAYING</span>
                                                ) : (
                                                    <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{Number(enr.progress_percent).toFixed(0)}% Done</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all opacity-75 mt-4">
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                    <img alt="Server room" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnIyoNKzbH_nCiRc3TYmgs1M4JvxNdEJ8JUt96yUtLz4_e2SyKtTPOsh4GBTTlqUth78Y93DU-WMawm7dkIyrFcZmStQmf6mMkv0u3ReLMD0WfjjnOKLK-QWgao_0JbOgHd0a1iaKfII8f474CYbRKAMaGmpxmyRaRLbrYW3xlTwljJbwHxUsFp1-BBfDUFb14Y5RQvLJgZEhiGvyJ2R6KgcsV5e6Rtif0RCzRAtLyIJvdZKTZI7Up1iHCB152OobQ2-c3-9HnDFmV" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="bg-success rounded-full p-0.5">
                                            <span className="material-symbols-outlined text-white text-sm">check</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div>
                                        <h4 className="font-semibold text-text-light dark:text-text-dark text-sm mb-1 line-through decoration-muted-light">Load Balancing Strategies (Completed)</h4>
                                        <p className="text-xs text-muted-light dark:text-muted-dark">Nginx configuration and AWS ALB setup.</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-light dark:text-muted-dark">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 18:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 mb-4">
                        <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-4">Upcoming Live Session</h3>
                        <div className="bg-gradient-to-br from-secondary to-purple-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10">Tomorrow, 10:00 AM</span>
                                    <span className="material-symbols-outlined text-white/80">event</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">Q&A: Microservices Architecture</h4>
                                <p className="text-purple-100 text-sm mb-4">Live doubt clearing session with industry experts.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <img alt="Student" className="w-8 h-8 rounded-full border-2 border-purple-600" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbPiFQnwrXKX2hmn1ujAC1SqxtGeidJWjs2lAXCUooTQ1dHz5rgcKpqj9QUSGsh5P94z6gcfnBNmCbwKqll89O8y7i0YhO3SZ6AWmQG9K6fB0KqD_NQdMExMm8o6jfVBiqQFuCwGClt4oyZmMDxYOnbyYijKwBbJzOFYDhRGnHt9cN_VCZC8LgHISLPWxxs6XL2YZzzQ4Dxx8mQB37aZ51ciWI7GbxscGyilI6q7ezXQLfGyNHpgE6lCd-Bm02Wy9-832mlYVOVFsd" />
                                        <img alt="Student" className="w-8 h-8 rounded-full border-2 border-purple-600" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuJLhlYdJp5Kk8E31cwUFTvpVj9gTnccQ_N0xDKzUSXV6tpqzuHG14nm4tx9sdHuen_Om8Own8GaWbN60xaz8C1sN2QQF26X2Uytax_vX97B7af2mVyeHSduVUpez4mIegvbCcAcD-05WrnVpKm_UnbRKH6AR8uKrYPWEfhvPjIA6DmjFlwh3NEldGfdeACmmMT_id6XeB__H9BSsHXYs6HfNkH6an4L5aPrlyb0ImxmnIwtDJMY_BU7ino7y-gOE9FqiSZv31r-zN" />
                                        <img alt="Student" className="w-8 h-8 rounded-full border-2 border-purple-600" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP-tYZRC0-fpZaXjxipVF5KYKQN2oOGy4sbyqXTdCqaL-YXumhrCrwKfodzWkwjnjNn5eZaKlTBHOSkmrCwHl7ehjmd8x8Rh1u9PfiSnMHyoxVbdWL-CQqQeBCAyfKOuTzYMLarlr_MMkz0-dzQuvbX_CBheJUyhJkOUmd_ubbh7_FfKZrSxlTHXHvwzC41ltfxhS-KuQMsUT628eokCFSbMLWdqF9OL-BQSXC0E4jJz3zVh7rl-kzpX7cMNEv9pBA87l7nzDehWgy" />
                                        <div className="w-8 h-8 rounded-full border-2 border-purple-600 bg-purple-900 text-[10px] flex items-center justify-center font-bold">+42</div>
                                    </div>
                                    <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-gray-100 transition-colors">
                                        Set Reminder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-24 right-5 z-40">
                <button className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg shadow-black/20 flex items-center justify-center hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">chat</span>
                </button>
            </div>

            <nav className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] pt-2 z-50">
                <div className="flex justify-around items-center max-w-2xl mx-auto px-2">
                    <button className="flex flex-col items-center gap-1 p-2 text-primary dark:text-blue-400">
                        <span className="material-symbols-outlined">menu_book</span>
                        <span className="text-[10px] font-medium">Learn</span>
                    </button>
                    <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined">grid_view</span>
                        <span className="text-[10px] font-medium">Dashboard</span>
                    </Link>
                    <Link href="/colleges" className="flex flex-col items-center gap-1 p-2 text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span className="text-[10px] font-medium">Colleges</span>
                    </Link>
                    <button className="flex flex-col items-center gap-1 p-2 text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-medium">Profile</span>
                    </button>
                </div>
                <div className="h-5 w-full"></div>
            </nav>
        </div>
    );
}
