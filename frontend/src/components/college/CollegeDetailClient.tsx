'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';

export default function CollegeDetailClient({ id, initialData }: { id: string, initialData?: any }) {
    const [college, setCollege] = useState<any>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const { addToast } = useToast();

    useEffect(() => {
        if (!initialData) {
            const fetchCollege = async () => {
                try {
                    const res = await fetchApi(`/colleges`);
                    const found = res.data.find((c: any) => c.id === id);
                    if (found) {
                        setCollege(found);
                    } else {
                        throw new Error("College not found in registry.");
                    }
                } catch (err: any) {
                    addToast('error', 'Error Loading College', err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCollege();
        }
    }, [id, initialData]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!college) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">search_off</span>
                <h1 className="text-2xl font-bold dark:text-white">College Not Found</h1>
                <Link href="/colleges" className="mt-4 text-blue-600 font-bold">Return to Directory</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30">
            {/* 🚀 HERO SECTION 🚀 */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                {college.cover_image_url ? (
                    <img
                        src={college.cover_image_url}
                        alt={`${college.name} cover`}
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900"></div>
                )}

                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>

                <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-16">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
                        <div className="relative group w-32 h-32 md:w-40 md:h-40 shrink-0 mt-8 md:mt-0">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-50 to-blue-200 dark:from-blue-600 dark:to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            <div className="relative h-full w-full bg-white dark:bg-slate-900 rounded-3xl p-2 border-2 border-white/20 dark:border-slate-700/50 shadow-2xl flex items-center justify-center overflow-hidden">
                                {college.logo_url ? (
                                    <img src={college.logo_url} alt="Logo" className="w-full h-full object-contain rounded-2xl bg-white" />
                                ) : (
                                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600">account_balance</span>
                                )}
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1 pb-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                {college.type || 'Institution'}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
                                {college.name}
                            </h1>
                            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-200">
                                <p className="flex items-center gap-1.5 font-bold bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                                    <span className="material-symbols-outlined text-sm text-blue-400">location_on</span>
                                    {college.city}, {college.state}
                                </p>
                                <p className="flex items-center gap-1.5 font-bold bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                                    <span className="material-symbols-outlined text-sm text-yellow-400">star</span>
                                    {college.rating ?? '4.5'} Platform Rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🛡️ CONTENT AREA 🛡️ */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 -mt-8 relative z-20">
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <section className="glass-effect rounded-[40px] p-8 shadow-sm border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">info</span>
                                </div>
                                About the Institution
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed relative z-10">
                                {college.description || "Detailed information about this institution is currently being updated. Please check back later or visit the official website below."}
                            </p>
                        </section>

                        <section className="grid sm:grid-cols-2 gap-6">
                            <StatCard icon="public" title="Location" value={`${college.city}, ${college.state}`} color="indigo" />
                            <StatCard icon="account_balance_wallet" title="Estimated Fee" value={college.fee_structure || 'Contact Admin'} color="purple" />
                            <StatCard icon="verified" title="Accreditation / Affiliation" value={college.affiliation || 'Nationally Recognized'} color="green" fullWidth />
                        </section>

                        {college.courses && college.courses.length > 0 && (
                            <section className="glass-effect rounded-[40px] p-8 shadow-sm border border-slate-200 dark:border-white/5">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">menu_book</span>
                                    </div>
                                    Programs Offered
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {college.courses.map((course: string, idx: number) => (
                                        <div key={idx} className="px-5 py-2.5 bg-slate-100 dark:bg-white/5  rounded-2xl text-slate-700 dark:text-slate-300 font-bold text-sm">
                                            {course}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="glass-effect rounded-[40px] p-8 shadow-2xl border-white/20 dark:border-white/5 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">Quick Actions</h3>
                            <div className="space-y-4">
                                {college.website ? (
                                    <a href={college.website} target="_blank" rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 uppercase tracking-wider text-sm">
                                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                        Visit Campus
                                    </a>
                                ) : (
                                    <div className="w-full text-center py-4 px-4 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-800">
                                        Website Hidden
                                    </div>
                                )}
                                <button className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-black text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-red-500/50 hover:text-red-500 transition-all hover:-translate-y-1 uppercase tracking-wider text-sm shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    Shortlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color, fullWidth }: { icon: string, title: string, value: string, color: 'indigo' | 'purple' | 'green', fullWidth?: boolean }) {
    const colors = {
        indigo: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
        purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
        green: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    };

    return (
        <div className={`glass-effect border border-white/10 rounded-[32px] p-6 shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform ${fullWidth ? 'sm:col-span-2' : ''}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${colors[color]}`}>
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{value}</p>
            </div>
        </div>
    );
}
