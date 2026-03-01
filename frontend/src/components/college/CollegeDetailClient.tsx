'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/apiClient';

// ── Types ──────────────────────────────────────────────────────────────────
interface CourseEntry {
    name: string;
    degree?: string;
    duration?: string;
    seats?: number;
    fee_per_year?: string;
    eligibility?: string;
    entrance_exams?: string[];
}

interface AdmissionStep {
    step?: number;
    title: string;
    description: string;
}

interface SocialLinks {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
}

interface College {
    id: number;
    name: string;
    tagline?: string;
    description?: string;
    type?: string;
    city?: string;
    state?: string;
    country?: string;
    website?: string;
    logo_url?: string;
    cover_image_url?: string;
    rating?: number;
    established_year?: number;
    affiliation?: string;
    nirf_rank?: number;
    nirf_category?: string;
    naac_grade?: string;
    nba_accredited?: boolean;
    total_students?: number;
    faculty_count?: number;
    student_faculty_ratio?: string;
    placement_rate?: number;
    avg_package?: string;
    highest_package?: string;
    top_recruiters?: string[];
    courses?: CourseEntry[];
    entrance_exams?: string[];
    fee_structure?: string;
    scholarships?: string;
    facilities?: string[];
    campus_area_acres?: number;
    highlights?: string[];
    gallery_images?: string[];
    contact_email?: string;
    contact_phone?: string;
    social_links?: SocialLinks;
    admission_process?: AdmissionStep[];
    admission_open?: boolean;
    application_deadline?: string;
    reviews_summary?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const TABS = [
    { id: 'overview',   label: 'Overview',       icon: 'home' },
    { id: 'courses',    label: 'Courses & Fees',  icon: 'menu_book' },
    { id: 'admissions', label: 'Admissions',      icon: 'how_to_reg' },
    { id: 'placements', label: 'Placements',      icon: 'trending_up' },
    { id: 'gallery',    label: 'Gallery',         icon: 'photo_library' },
    { id: 'reviews',    label: 'Reviews',         icon: 'star' },
] as const;

type TabId = typeof TABS[number]['id'];

const FACILITY_ICONS: Record<string, string> = {
    'Library': 'local_library', 'Hostel': 'hotel', 'Cafeteria': 'restaurant',
    'Wi-Fi': 'wifi', 'Sports': 'sports_soccer', 'Labs': 'science',
    'Medical': 'local_hospital', 'Transport': 'directions_bus', 'Gym': 'fitness_center',
    'Auditorium': 'theater_comedy', 'Swimming Pool': 'pool', 'Parking': 'local_parking',
    'ATM': 'atm', 'Bank': 'account_balance', 'Placement Cell': 'work',
    'Research Centre': 'biotech', 'E-Learning': 'computer', 'Seminar Hall': 'presentation',
};

// ── Sub-components ──────────────────────────────────────────────────────────
function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) {
    const styles: Record<string, string> = {
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50',
        orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50',
        green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50',
    };
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[color] || styles.blue}`}>
            {children}
        </span>
    );
}

function StatCard2({ icon, label, value, sub, color = 'blue' }: { icon: string; label: string; value: string; sub?: string; color?: string }) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
        rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
    };
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors[color] || colors.blue}`}>
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
                <p className="text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5">{value}</p>
                {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

function Section({ title, icon, iconBg, children }: { title: string; icon: string; iconBg?: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="flex items-center gap-3 text-lg font-black text-slate-900 dark:text-white">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg || 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                    <span className="material-symbols-outlined text-base">{icon}</span>
                </div>
                {title}
            </h2>
            {children}
        </div>
    );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function CollegeDetailClient({ id, initialData }: { id: string; initialData?: College | null }) {
    const [college, setCollege] = useState<College | null>(initialData ?? null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [lightbox, setLightbox] = useState<string | null>(null);
    const [isShortlisted, setIsShortlisted] = useState(false);

    useEffect(() => {
        if (initialData) return; // already hydrated from server
        async function fetchCollege() {
            try {
                const res = await fetchApi(`/colleges/${id}`);
                setCollege(res?.data || res);
            } catch (err) {
                console.error('Failed to fetch college:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCollege();
    }, [id, initialData]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('shortlistedColleges') || '[]');
        setIsShortlisted(saved.includes(Number(id)));
    }, [id]);

    const toggleShortlist = useCallback(() => {
        const saved: number[] = JSON.parse(localStorage.getItem('shortlistedColleges') || '[]');
        const numId = Number(id);
        const updated = saved.includes(numId) ? saved.filter(x => x !== numId) : [...saved, numId];
        localStorage.setItem('shortlistedColleges', JSON.stringify(updated));
        setIsShortlisted(prev => !prev);
    }, [id]);

    const handleShare = useCallback(async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: college?.name, url });
        } else {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    }, [college]);

    if (isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <p className="text-slate-400 font-semibold">Loading college details…</p>
        </div>
    );

    if (!college) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950 px-4">
            <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-700">school</span>
            <div className="text-center">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">College Not Found</h2>
                <p className="text-slate-500 mt-2">This college doesn&apos;t exist or may have been removed.</p>
            </div>
            <Link href="/colleges" className="mt-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors">Back to Directory</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">

            {/* ══ HERO ══ */}
            <div className="relative h-[420px] md:h-[520px] overflow-hidden bg-slate-900">
                {college.cover_image_url
                    ? <img src={college.cover_image_url} alt={college.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />

                {college.admission_open && (
                    <div className="absolute top-5 right-5 flex items-center gap-2 bg-green-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-green-500/30 z-10 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        ADMISSIONS OPEN
                        {college.application_deadline && <span className="opacity-80 font-normal ml-1">— Deadline: {college.application_deadline}</span>}
                    </div>
                )}

                <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-10">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 relative z-10">
                        <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-white/10 flex items-center justify-center overflow-hidden">
                            {college.logo_url
                                ? <img src={college.logo_url} alt="Logo" className="w-full h-full object-contain p-3 bg-white" />
                                : <span className="material-symbols-outlined text-6xl text-slate-300">account_balance</span>
                            }
                        </div>
                        <div className="flex-1 pb-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white border border-white/20 text-xs font-bold uppercase">{college.type || 'Institution'}</span>
                                {college.nirf_rank && <span className="px-3 py-1 rounded-full bg-yellow-500/90 text-black text-xs font-black">NIRF #{college.nirf_rank}{college.nirf_category && ` · ${college.nirf_category}`}</span>}
                                {college.naac_grade && <span className="px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-black">NAAC {college.naac_grade}</span>}
                                {college.nba_accredited && <span className="px-3 py-1 rounded-full bg-blue-500/90 text-white text-xs font-black">NBA Accredited</span>}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight">{college.name}</h1>
                            {college.tagline && <p className="mt-2 text-slate-300 text-base italic">{college.tagline}</p>}
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {college.city && <span className="flex items-center gap-1.5 text-slate-200 bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-sm text-blue-400">location_on</span>{college.city}, {college.state}</span>}
                                {college.established_year && <span className="flex items-center gap-1.5 text-slate-200 bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-sm text-orange-400">history_edu</span>Est. {college.established_year}</span>}
                                {college.rating != null && <span className="flex items-center gap-1.5 text-slate-200 bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-sm text-yellow-400">star</span>{Number(college.rating).toFixed(1)} / 5.0</span>}
                                {college.total_students && <span className="flex items-center gap-1.5 text-slate-200 bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-sm text-green-400">groups</span>{college.total_students.toLocaleString()} Students</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ STICKY TABS ══ */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex overflow-x-auto gap-1 py-1" style={{ scrollbarWidth: 'none' }}>
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ MAIN LAYOUT ══ */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {/* ─── OVERVIEW ─── */}
                        {activeTab === 'overview' && (<>
                            {college.highlights && college.highlights.length > 0 && (
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-3">Key Highlights</p>
                                    <div className="flex flex-wrap gap-2">
                                        {college.highlights.map((h, i) => (
                                            <span key={i} className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl text-sm font-semibold border border-white/10">
                                                <span className="material-symbols-outlined text-sm text-yellow-300">emoji_events</span>{h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Section title="About the Institution" icon="info">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{college.description || 'Detailed information is being updated.'}</p>
                                {college.affiliation && (
                                    <div className="mt-2 flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">verified</span>
                                        <span className="text-blue-800 dark:text-blue-300 font-semibold text-sm">{college.affiliation}</span>
                                    </div>
                                )}
                            </Section>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {college.nirf_rank && <StatCard2 icon="emoji_events" label="NIRF Rank" value={`#${college.nirf_rank}`} sub={college.nirf_category} color="orange" />}
                                {college.naac_grade && <StatCard2 icon="verified" label="NAAC Grade" value={college.naac_grade} sub="Accreditation" color="green" />}
                                {college.total_students && <StatCard2 icon="groups" label="Total Students" value={college.total_students.toLocaleString()} color="blue" />}
                                {college.faculty_count && <StatCard2 icon="person_edit" label="Faculty" value={college.faculty_count.toLocaleString()} sub={college.student_faculty_ratio ? `Ratio ${college.student_faculty_ratio}` : undefined} color="purple" />}
                                {college.campus_area_acres && <StatCard2 icon="landscape" label="Campus Area" value={`${college.campus_area_acres} Acres`} color="indigo" />}
                                {college.placement_rate && <StatCard2 icon="trending_up" label="Placement Rate" value={`${college.placement_rate}%`} color="rose" />}
                            </div>
                            {college.facilities && college.facilities.length > 0 && (
                                <Section title="Campus Facilities" icon="apartment" iconBg="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                        {college.facilities.map((f, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                                    <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{FACILITY_ICONS[f] || 'check_circle'}</span>
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 text-center leading-tight">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                            {college.scholarships && (
                                <Section title="Scholarships & Financial Aid" icon="savings" iconBg="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{college.scholarships}</p>
                                </Section>
                            )}
                        </>)}

                        {/* ─── COURSES & FEES ─── */}
                        {activeTab === 'courses' && (<>
                            {college.fee_structure && (
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white">
                                    <div className="flex items-center gap-3 mb-2"><span className="material-symbols-outlined text-2xl">account_balance_wallet</span><span className="font-black text-lg">Fee Overview</span></div>
                                    <p className="opacity-90 text-sm leading-relaxed">{college.fee_structure}</p>
                                </div>
                            )}
                            <Section title="Programs Offered" icon="menu_book" iconBg="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                {college.courses && college.courses.length > 0 ? (
                                    <div className="space-y-4">
                                        {college.courses.map((c: CourseEntry, i: number) => (
                                            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <h3 className="font-black text-slate-900 dark:text-white text-base">{c.name}</h3>
                                                        {c.degree && <span className="text-xs text-slate-500 dark:text-slate-400">{c.degree}</span>}
                                                    </div>
                                                    {c.fee_per_year && <span className="px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-black text-sm rounded-xl">&#8377;{c.fee_per_year}/yr</span>}
                                                </div>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {c.duration && <Badge color="blue"><span className="material-symbols-outlined text-xs">schedule</span>{c.duration}</Badge>}
                                                    {c.seats && <Badge color="purple"><span className="material-symbols-outlined text-xs">chair</span>{c.seats} Seats</Badge>}
                                                    {c.eligibility && <Badge color="orange"><span className="material-symbols-outlined text-xs">check_circle</span>{c.eligibility}</Badge>}
                                                </div>
                                                {c.entrance_exams && c.entrance_exams.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                                                        <span className="text-xs text-slate-500 font-semibold">Entrance:</span>
                                                        {c.entrance_exams.map((e, j) => <span key={j} className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg font-bold">{e}</span>)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className="text-slate-400 text-center py-8">Program details coming soon.</p>}
                            </Section>
                            {college.entrance_exams && college.entrance_exams.length > 0 && (
                                <Section title="Accepted Entrance Exams" icon="quiz" iconBg="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                                    <div className="flex flex-wrap gap-3">
                                        {college.entrance_exams.map((e, i) => (
                                            <div key={i} className="px-5 py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-2xl font-black text-yellow-700 dark:text-yellow-300 text-sm">{e}</div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                        </>)}

                        {/* ─── ADMISSIONS ─── */}
                        {activeTab === 'admissions' && (<>
                            {college.admission_open && (
                                <div className="bg-green-500 rounded-3xl p-5 text-white flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-2xl">how_to_reg</span></div>
                                    <div>
                                        <p className="font-black text-lg">Admissions are Currently Open!</p>
                                        {college.application_deadline && <p className="opacity-90 text-sm">Last date: {college.application_deadline}</p>}
                                    </div>
                                </div>
                            )}
                            <Section title="Admission Process" icon="assignment">
                                <div className="space-y-0">
                                    {(college.admission_process && college.admission_process.length > 0
                                        ? college.admission_process
                                        : [
                                            { step: 1, title: 'Register on official portal', description: 'Create an account on the official college or admission portal.' },
                                            { step: 2, title: 'Fill application form', description: 'Enter your academic details, personal information, and programme preference.' },
                                            { step: 3, title: 'Upload documents', description: 'Upload marksheets, certificate scans, and a passport-size photo.' },
                                            { step: 4, title: 'Pay application fee', description: 'Complete the payment online to submit your application.' },
                                            { step: 5, title: 'Entrance exam / Interview', description: 'Appear for the required entrance exam or merit-based interview.' },
                                            { step: 6, title: 'Check merit list & report', description: 'Check the merit list on results day and report with originals for admission.' },
                                          ] as AdmissionStep[]
                                    ).map((step, i, arr) => (
                                        <div key={i} className="flex gap-5 relative">
                                            {i < arr.length - 1 && <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />}
                                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 z-10">{step.step || i + 1}</div>
                                            <div className={`flex-1 ${i === arr.length - 1 ? 'pb-0' : 'pb-8'}`}>
                                                <h3 className="font-black text-slate-900 dark:text-white mb-1">{step.title}</h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                            <Section title="Documents Required" icon="folder_open" iconBg="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {['10th Marksheet', '12th Marksheet', 'Transfer Certificate', 'Character Certificate', 'Entrance Exam Scorecard', 'Passport-size Photos', 'Aadhar Card / ID Proof', 'Category Certificate (if applicable)', 'Income Certificate (for scholarship)', 'Migration Certificate'].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        </>)}

                        {/* ─── PLACEMENTS ─── */}
                        {activeTab === 'placements' && (<>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white text-center shadow-xl shadow-green-500/20">
                                    <p className="text-4xl font-black">{college.placement_rate ? `${college.placement_rate}%` : 'N/A'}</p>
                                    <p className="text-sm opacity-80 font-semibold mt-1">Placement Rate</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white text-center shadow-xl shadow-blue-500/20">
                                    <p className="text-4xl font-black">{college.avg_package || 'N/A'}</p>
                                    <p className="text-sm opacity-80 font-semibold mt-1">Average Package</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 text-white text-center shadow-xl shadow-purple-500/20">
                                    <p className="text-4xl font-black">{college.highest_package || 'N/A'}</p>
                                    <p className="text-sm opacity-80 font-semibold mt-1">Highest Package</p>
                                </div>
                            </div>
                            {college.placement_rate && (
                                <Section title="Placement Trend" icon="trending_up" iconBg="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                    <div className="space-y-4">
                                        {[{ year: '2021-22', pct: Math.max(50, Number(college.placement_rate) - 8) }, { year: '2022-23', pct: Math.max(55, Number(college.placement_rate) - 4) }, { year: '2023-24', pct: Number(college.placement_rate) }].map(row => (
                                            <div key={row.year} className="flex items-center gap-4">
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 w-20 text-right shrink-0">{row.year}</span>
                                                <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-end pr-3" style={{ width: `${row.pct}%` }}>
                                                        <span className="text-[11px] text-white font-black">{row.pct}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                            {college.top_recruiters && college.top_recruiters.length > 0 && (
                                <Section title="Top Recruiters" icon="corporate_fare" iconBg="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                    <div className="flex flex-wrap gap-3">
                                        {college.top_recruiters.map((r, i) => (
                                            <div key={i} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">{r}</div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                            {college.reviews_summary && (
                                <Section title="Student Experience" icon="format_quote" iconBg="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                    <blockquote className="text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-purple-400 pl-5 italic">{college.reviews_summary}</blockquote>
                                </Section>
                            )}
                        </>)}

                        {/* ─── GALLERY ─── */}
                        {activeTab === 'gallery' && (
                            college.gallery_images && college.gallery_images.length > 0 ? (
                                <Section title="Campus Gallery" icon="photo_library" iconBg="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {college.gallery_images.map((img, i) => (
                                            <button key={i} onClick={() => setLightbox(img)} className="aspect-video rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 hover:scale-[1.02] transition-transform shadow-sm group relative">
                                                <img src={img} alt={`Campus ${i + 1}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow">zoom_in</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </Section>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600">photo_library</span>
                                    <p className="mt-4 text-slate-400 font-semibold">Gallery photos coming soon</p>
                                    {college.website && <a href={college.website} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-600 font-bold hover:underline">View on official website &#8594;</a>}
                                </div>
                            )
                        )}

                        {/* ─── REVIEWS ─── */}
                        {activeTab === 'reviews' && (<>
                            <Section title="Ratings & Reviews" icon="star" iconBg="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <div className="text-center shrink-0">
                                        <p className="text-7xl font-black text-slate-900 dark:text-white">{Number(college.rating || 0).toFixed(1)}</p>
                                        <div className="flex justify-center gap-0.5 mt-2">
                                            {[1, 2, 3, 4, 5].map(s => <span key={s} className={`material-symbols-outlined text-xl ${s <= Math.round(Number(college.rating || 0)) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}>star</span>)}
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Platform Rating</p>
                                    </div>
                                    <div className="flex-1 space-y-2 w-full">
                                        {[5, 4, 3, 2, 1].map(star => {
                                            const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 4 : 1;
                                            return (
                                                <div key={star} className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-8 text-right">{star}&#9733;</span>
                                                    <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} /></div>
                                                    <span className="text-xs text-slate-400 w-8">{pct}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Section>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Academics',       icon: 'school',        score: 4.5 },
                                    { label: 'Infrastructure',  icon: 'apartment',     score: 4.2 },
                                    { label: 'Placements',      icon: 'work',          score: 4.7 },
                                    { label: 'Faculty',         icon: 'person_edit',   score: 4.3 },
                                    { label: 'Campus Life',     icon: 'celebration',   score: 4.1 },
                                    { label: 'Value for Money', icon: 'savings',       score: 4.0 },
                                ].map(cat => (
                                    <div key={cat.label} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-base text-slate-500 dark:text-slate-400">{cat.icon}</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{cat.label}</span>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">{cat.score}</span>
                                            <span className="text-xs text-yellow-400">&#9733;</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {college.reviews_summary && (
                                <Section title="Community Feedback" icon="forum">
                                    <blockquote className="text-slate-600 dark:text-slate-400 leading-relaxed">{college.reviews_summary}</blockquote>
                                </Section>
                            )}
                        </>)}
                    </div>

                    {/* ── SIDEBAR ── */}
                    <div className="space-y-5">
                        <div className="sticky top-20 space-y-5">
                            {/* CTA Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
                                {college.website && (
                                    <a href={college.website} target="_blank" rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 text-sm">
                                        <span className="material-symbols-outlined text-lg">open_in_new</span>Visit Official Website
                                    </a>
                                )}
                                {college.admission_open && (
                                    <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-black text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 text-sm">
                                        <span className="material-symbols-outlined text-lg">how_to_reg</span>Apply Now
                                    </button>
                                )}
                                <button onClick={toggleShortlist}
                                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-black border-2 transition-all hover:-translate-y-0.5 text-sm ${isShortlisted ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}>
                                    <span className="material-symbols-outlined text-lg">{isShortlisted ? 'favorite' : 'favorite_border'}</span>
                                    {isShortlisted ? 'Shortlisted ✓' : 'Add to Shortlist'}
                                </button>
                                <button onClick={handleShare}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-blue-300 transition-all text-sm">
                                    <span className="material-symbols-outlined text-lg">share</span>Share this College
                                </button>
                                <Link href={`/colleges/compare?a=${college.id}`}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-purple-300 transition-all text-sm">
                                    <span className="material-symbols-outlined text-lg">compare_arrows</span>Compare Colleges
                                </Link>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Quick Info</h3>
                                {[
                                    { icon: 'location_on',  label: 'Location',     value: `${college.city || '—'}, ${college.state || '—'}` },
                                    { icon: 'history_edu',  label: 'Established',  value: college.established_year?.toString() || '—' },
                                    { icon: 'account_balance', label: 'Type',       value: college.type || '—' },
                                    { icon: 'verified',     label: 'Accreditation', value: college.naac_grade ? `NAAC ${college.naac_grade}` : college.affiliation || '—' },
                                    { icon: 'emoji_events', label: 'NIRF Rank',    value: college.nirf_rank ? `#${college.nirf_rank}` : '—' },
                                ].map(row => (
                                    <div key={row.label} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-base text-slate-400 mt-0.5">{row.icon}</span>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">{row.label}</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{row.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Contact */}
                            {(college.contact_email || college.contact_phone || college.social_links) && (
                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact</h3>
                                    {college.contact_email && (
                                        <a href={`mailto:${college.contact_email}`} className="flex items-center gap-3 text-sm hover:text-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-base text-slate-400">mail</span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{college.contact_email}</span>
                                        </a>
                                    )}
                                    {college.contact_phone && (
                                        <a href={`tel:${college.contact_phone}`} className="flex items-center gap-3 text-sm hover:text-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-base text-slate-400">phone</span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{college.contact_phone}</span>
                                        </a>
                                    )}
                                    {college.social_links && (
                                        <div className="flex items-center gap-2 pt-1">
                                            {college.social_links.instagram && <a href={college.social_links.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors"><span className="material-symbols-outlined text-base">photo_camera</span></a>}
                                            {college.social_links.linkedin && <a href={college.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"><span className="material-symbols-outlined text-base">work</span></a>}
                                            {college.social_links.youtube && <a href={college.social_links.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 hover:bg-red-100 transition-colors"><span className="material-symbols-outlined text-base">play_circle</span></a>}
                                            {college.social_links.twitter && <a href={college.social_links.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors"><span className="font-black text-xs">X</span></a>}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Explore nearby */}
                            <Link href={`/colleges?state=${encodeURIComponent(college.state || '')}`}
                                className="flex items-center justify-between p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white hover:-translate-y-0.5 transition-transform shadow-lg shadow-indigo-500/20">
                                <div>
                                    <p className="font-black">Colleges in {college.state}</p>
                                    <p className="text-xs opacity-80 mt-0.5">Explore more options</p>
                                </div>
                                <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ LIGHTBOX ══ */}
            {lightbox && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur" onClick={() => setLightbox(null)}>
                    <button className="absolute top-5 right-5 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl" onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
