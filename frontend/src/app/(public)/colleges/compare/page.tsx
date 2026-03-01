'use client';

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/apiClient';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

interface College {
    id: string;
    name: string;
    city: string;
    type: string;
    rating: number;
    established_year: number;
    logo_url: string;
}

export default function CompareCollegesPage() {
    const [allColleges, setAllColleges] = useState<College[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await fetchApi('/colleges');
                setAllColleges(res.data);
            } catch (err: any) {
                setApiError(err.message || 'Could not reach the server.');
                addToast('error', 'Error loading data', err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchColleges();
    }, []);

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(val => val !== id));
        } else {
            if (selectedIds.length >= 3) {
                addToast('info', 'Maximum Reached', 'You can only compare up to 3 colleges at once.');
                return;
            }
            setSelectedIds([...selectedIds, id]);
        }
    };

    const selectedColleges = selectedIds.map(id => allColleges.find(c => c.id === id)).filter(Boolean) as College[];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-6 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10">
                    <Link href="/colleges" className="text-blue-600 font-bold flex items-center gap-1 mb-4 hover:underline">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Directory
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600 text-4xl">compare_arrows</span>
                        Compare Institutes
                    </h1>
                    <p className="text-slate-500 mt-2">Select up to 3 colleges to evaluate their metrics side-by-side.</p>
                </div>

                {/* Selection Area */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
                    <h2 className="font-bold text-slate-900 dark:text-white mb-4">Select Colleges to Compare ({selectedIds.length}/3)</h2>
                    {isLoading ? (
                        <div className="animate-pulse flex gap-4 overflow-hidden">
                            <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                    ) : apiError ? (
                        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <span className="material-symbols-outlined text-red-400 text-2xl">cloud_off</span>
                            <div>
                                <p className="font-semibold text-red-700 dark:text-red-400 text-sm">Backend Unavailable</p>
                                <p className="text-xs text-red-500 dark:text-red-500 font-mono mt-0.5">{apiError}</p>
                            </div>
                            <button onClick={() => window.location.reload()} className="ml-auto px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition">
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {allColleges.map(c => {
                                const isSelected = selectedIds.includes(c.id);
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => toggleSelection(c.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2
                             ${isSelected
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                                            }
                          `}
                                    >
                                        {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                                        {c.name}
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Comparison Table */}
                {selectedColleges.length > 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="p-6 border-b border-r dark:border-slate-800 w-1/4">
                                            <span className="text-slate-500 uppercase font-bold text-xs tracking-wider">Metrics</span>
                                        </th>
                                        {selectedColleges.map(c => (
                                            <th key={c.id} className="p-6 border-b border-r dark:border-slate-800 w-1/4 text-center">
                                                <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                                                    {c.logo_url ? <img src={c.logo_url} alt="logo" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-slate-400">account_balance</span>}
                                                </div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{c.name}</h3>
                                            </th>
                                        ))}
                                        {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                                            <th key={`empty-${i}`} className="p-6 border-b border-slate-200 dark:border-slate-800 w-1/4">
                                                <div className="h-full w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 p-8">
                                                    Add College
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600 dark:text-slate-300">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 border-b border-r dark:border-slate-800 font-semibold bg-slate-50 dark:bg-slate-800/20">Location</td>
                                        {selectedColleges.map(c => <td key={c.id} className="p-4 border-b border-r dark:border-slate-800 text-center">{c.city}, {c.type}</td>)}
                                        {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`e1-${i}`} className="p-4 border-b dark:border-slate-800"></td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 border-b border-r dark:border-slate-800 font-semibold bg-slate-50 dark:bg-slate-800/20">Established</td>
                                        {selectedColleges.map(c => <td key={c.id} className="p-4 border-b border-r dark:border-slate-800 text-center">{c.established_year || 'N/A'}</td>)}
                                        {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`e2-${i}`} className="p-4 border-b dark:border-slate-800"></td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 border-b border-r dark:border-slate-800 font-semibold bg-slate-50 dark:bg-slate-800/20">NAAC Rating</td>
                                        {selectedColleges.map(c => (
                                            <td key={c.id} className="p-4 border-b border-r dark:border-slate-800 text-center">
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 px-3 py-1 rounded-full font-bold">
                                                    <span className="material-symbols-outlined text-[16px]">star</span> {c.rating ? `${c.rating}/5.0` : 'N/A'}
                                                </span>
                                            </td>
                                        ))}
                                        {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`e3-${i}`} className="p-4 border-b dark:border-slate-800"></td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 border-b border-r dark:border-slate-800 font-semibold bg-slate-50 dark:bg-slate-800/20">Action</td>
                                        {selectedColleges.map(c => (
                                            <td key={c.id} className="p-4 border-b border-r dark:border-slate-800 text-center">
                                                <Link href={`/college/${c.id}`} className="text-blue-600 font-bold hover:underline">View Full Profile</Link>
                                            </td>
                                        ))}
                                        {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`e4-${i}`} className="p-4 border-b dark:border-slate-800"></td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-6xl mb-4">difference</span>
                        <p>Select colleges from the pool above to start your comparison.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
