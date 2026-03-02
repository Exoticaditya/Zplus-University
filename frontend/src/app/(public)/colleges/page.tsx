'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/apiClient';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

interface College {
    id: string;
    name: string;
    city: string;
    state: string;
    type: string;
    rating: number;
    logo_url: string;
    cover_image_url: string;
    affiliation?: string;
}

export default function CollegesDirectory() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [apiError, setApiError] = useState<string | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchColleges = async () => {
            setIsLoading(true);
            setApiError(null);
            try {
                const res = await fetchApi('/colleges');
                setColleges(res.data);
            } catch (err: any) {
                setApiError(err.message || 'Could not reach the server.');
                addToast('error', 'Error loading colleges', err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchColleges();
    }, []);

    const filteredColleges = colleges.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.city && c.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">


            <main className="pb-20 max-w-7xl mx-auto pt-4 relative">
                <section className="px-4 pt-6 pb-4">
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-semibold mb-3 border border-blue-100 dark:border-blue-800">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Zpluse University Directory 2026
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">Find Your <span className="text-primary">Perfect Campus</span></h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Explore top-rated institutions tailored to your future.</p>
                    </div>

                    <div className="relative shadow-soft rounded-2xl overflow-hidden group border border-slate-200 dark:border-slate-700">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-card-dark border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 text-base"
                            placeholder="Search colleges, courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">tune</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="pl-4 mb-6">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pr-4">
                        <FilterChip label="All" icon="grid_view" active={true} />
                        <FilterChip label="Engineering" icon="engineering" active={false} />
                        <FilterChip label="Medical" icon="medical_services" active={false} />
                        <FilterChip label="Business" icon="business_center" active={false} />
                        <FilterChip label="Arts" icon="palette" active={false} />
                    </div>
                </section>

                <section className="px-4">
                    {isLoading ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-card-light dark:bg-card-dark rounded-2xl h-[380px] animate-pulse border border-slate-100 dark:border-slate-800 shadow-card"></div>
                            ))}
                        </div>
                    ) : apiError ? (
                        <div className="text-center py-20 bg-card-light dark:bg-card-dark rounded-2xl shadow-card border border-red-100 dark:border-red-900/40">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-red-400">cloud_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Backend Unavailable</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm mx-auto">
                                We couldn&apos;t connect to the database. Please try again in a moment.
                            </p>
                            <p className="text-xs text-red-400 dark:text-red-500 mt-3 font-mono">{apiError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-6 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Retry
                            </button>
                        </div>
                    ) : filteredColleges.length === 0 ? (
                        <div className="text-center py-20 bg-card-light dark:bg-card-dark rounded-2xl shadow-card border border-slate-100 dark:border-slate-800">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-600">search_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No results matching "{searchTerm}"</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Try adjusting your search terms to find more institutions.</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-6 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredColleges.map(college => (
                                <CollegeCard key={college.id} college={college} />
                            ))}

                            <div className="mt-4 md:mt-0 rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 text-center text-white relative overflow-hidden md:col-span-2 lg:col-span-3">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
                                <h3 className="text-xl font-bold mb-2 relative z-10">Not sure where to start?</h3>
                                <p className="text-blue-100 text-sm mb-4 relative z-10">Take our 2-minute career assessment test to find your perfect match.</p>
                                <button className="px-6 py-2 bg-white text-primary rounded-full font-bold text-sm shadow-lg relative z-10 hover:bg-blue-50 transition-colors">
                                    Take Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>


        </div>
    );
}

function FilterChip({ label, icon, active }: { label: string, icon: string, active: boolean }) {
    return (
        <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${active
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
            }`}>
            <span className="material-symbols-outlined text-sm">{icon}</span> {label}
        </button>
    );
}

function CollegeCard({ college }: { college: College }) {
    return (
        <div className="bg-card-light dark:bg-card-dark rounded-2xl overflow-hidden shadow-card border border-slate-100 dark:border-slate-800 group hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <div className="h-40 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                {college.cover_image_url ? (
                    <img alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={college.cover_image_url} />
                ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-blue-100 to-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-primary/40">business</span>
                    </div>
                )}

                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-emerald-600 flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {college.rating ? `${college.rating} Rating` : 'Top Ranked'}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">{college.name}</h3>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                            <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                            {college.city}, {college.state}
                        </div>
                    </div>
                    <div className="w-10 h-10 ml-3 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0 hover:bg-red-50 dark:hover:bg-red-900/20 group/fav transition-colors">
                        <span className="material-symbols-outlined text-slate-400 group-hover/fav:text-red-500 cursor-pointer transition-colors">favorite_border</span>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 mb-5">
                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded text-xs font-medium border border-blue-100 dark:border-blue-800/50 uppercase tracing-wide">{college.type}</span>
                    {college.affiliation && (
                        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded text-xs font-medium border border-purple-100 dark:border-purple-800/50 truncate max-w-[120px]">{college.affiliation}</span>
                    )}
                </div>

                <div className="mt-auto pt-2">
                    <Link href={`/college/${college.id}`} className="w-full py-3 bg-white dark:bg-slate-800 border bg-slate-50/50 border-primary/20 text-primary dark:text-blue-400 font-semibold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-2">
                        Explore College
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
