'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';

interface Course {
    id: string;
    title: string;
    category: string;
    level: string;
    is_published: boolean;
    enrollment_count?: number;
}

interface Enrollment {
    id: string;
    student_id: string;
    course_id: string;
    progress_percent: string;
    student_name?: string;
}

export default function TeacherDashboard() {
    const router = useRouter();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [courses, setCourses] = useState<Course[]>([]);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modals state
    const [isCourseModalOpen, setCourseModalOpen] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');

    // Course Form
    const [courseTitle, setCourseTitle] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [courseDesc, setCourseDesc] = useState('');

    // Upload Form
    const [materialTitle, setMaterialTitle] = useState('');
    const [materialType, setMaterialType] = useState('pdf');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadData = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            // Fetch courses for this teacher
            const coursesRes = await fetchApi(`/courses?teacher_id=${user.id}`);
            setCourses(coursesRes.data);

            // Fetch enrollments (simplified for demo, ideally an aggregation endpoint)
            if (coursesRes.data.length > 0) {
                const courseIds = coursesRes.data.map((c: any) => c.id).join(',');
                // Note: Assuming backend supports course_id in query, else fallback to empty array
                try {
                    const enrRes = await fetchApi(`/enrollments/course/${coursesRes.data[0].id}`);
                    setEnrollments(enrRes.data);
                } catch (e) { /* swallow if not supported */ }
            }
        } catch (err: any) {
            addToast('error', 'Failed to load workspace', err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [user]);

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetchApi('/courses', {
                method: 'POST',
                body: JSON.stringify({
                    title: courseTitle,
                    description: courseDesc,
                    category: courseCategory,
                    level: 'Beginner' // default
                })
            });
            addToast('success', 'Course Created', `${courseTitle} is now available.`);
            setCourseModalOpen(false);
            loadData();
        } catch (err: any) {
            addToast('error', 'Creation Failed', err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUploadMaterial = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !selectedCourseId) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('course_id', selectedCourseId);
            formData.append('title', materialTitle);
            formData.append('type', materialType);
            formData.append('file', file);

            await fetchApi('/materials', {
                method: 'POST',
                body: formData
            });
            addToast('success', 'Material Uploaded', `File securely stored in Cloudinary.`);
            setUploadModalOpen(false);
            setFile(null);
        } catch (err: any) {
            addToast('error', 'Upload Error', err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartLiveClass = async (courseId: string, courseTitle: string) => {
        addToast('info', 'Starting Class...', `Entering secure Jitsi room for ${courseTitle}`);
        router.push(`/live/${courseId}`);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-text-light dark:text-text-dark min-h-screen pb-20 transition-colors duration-300">
            <div className="max-w-md mx-auto min-h-screen relative overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl">
                <header className="sticky top-0 z-40 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-card-border-light dark:border-card-border-dark px-5 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Zpluse<span className="text-primary dark:text-blue-400"> University</span></h1>
                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Welcome back, {user?.user_metadata?.full_name || 'Prof. Sarah'}</p>
                        </div>
                    </div>
                    <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                    </button>
                </header>

                <main className="p-5 space-y-6">
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => setCourseModalOpen(true)} className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm hover:shadow-md transition-all active:scale-95">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">add_circle</span>
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">New Course</span>
                            </button>
                            <button onClick={() => { if (courses.length > 0) { setSelectedCourseId(courses[0].id); setUploadModalOpen(true); } else { addToast('error', 'No Courses', 'Create a course first'); } }} className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm hover:shadow-md transition-all active:scale-95">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">Upload</span>
                            </button>
                            <button onClick={() => { if (courses.length > 0) handleStartLiveClass(courses[0].id, courses[0].title); }} className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm hover:shadow-md transition-all active:scale-95">
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors animate-pulse">
                                    <span className="material-symbols-outlined text-2xl">videocam</span>
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">Go Live</span>
                            </button>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">Weekly Engagement</h2>
                            <select className="bg-transparent text-xs font-medium text-primary focus:outline-none cursor-pointer dark:bg-surface-dark">
                                <option>This Week</option>
                                <option>Last Month</option>
                            </select>
                        </div>
                        <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-3xl font-bold text-text-light dark:text-text-dark">84%</p>
                                    <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        +2.4% vs last week
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Active Students</p>
                                    <p className="text-sm font-semibold">1,204</p>
                                </div>
                            </div>
                            <div className="relative h-24 w-full bg-gradient-to-t from-primary/10 to-transparent rounded-lg border-b-2 border-primary flex items-end px-2 gap-2 hide-scrollbar">
                                {/* Synthetic Chart Bar Visuals */}
                                <div className="w-full h-[60%] bg-primary/20 rounded-t border-t border-primary/50 relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] text-primary">Mon</div></div>
                                <div className="w-full h-[40%] bg-primary/20 rounded-t border-t border-primary/50 relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] text-primary">Tue</div></div>
                                <div className="w-full h-[80%] bg-primary/40 rounded-t border-t border-primary/50 relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] text-primary">Wed</div></div>
                                <div className="w-full h-[90%] bg-primary/50 rounded-t border-t border-primary shadow-[0_0_10px_rgba(37,99,235,0.5)] relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] font-bold text-primary">Thu</div></div>
                                <div className="w-full h-[50%] bg-primary/20 rounded-t border-t border-primary/50 relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] text-primary">Fri</div></div>
                                <div className="w-full h-[70%] bg-primary/30 rounded-t border-t border-primary/50 relative"><div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[8px] text-primary">Sat</div></div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">My Courses</h2>
                            <button className="text-xs font-medium text-primary">View All</button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                            {isLoading ? (
                                <p className="text-sm text-text-muted-light p-4">Loading courses...</p>
                            ) : courses.length === 0 ? (
                                <div className="min-w-[260px] p-6 border border-dashed rounded-xl border-card-border-light dark:border-card-border-dark text-center text-text-muted-light">
                                    No courses yet.
                                </div>
                            ) : (
                                courses.map((course, i) => (
                                    i === 0 ? (
                                        <div key={course.id} className="min-w-[260px] p-4 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg relative overflow-hidden flex-shrink-0 cursor-pointer">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4"></div>
                                            <div className="relative z-10">
                                                <span className="inline-block px-2 py-1 rounded bg-white/20 text-[10px] font-bold mb-2 backdrop-blur-sm truncate max-w-[120px]">{course.category}</span>
                                                <h3 className="font-bold text-lg mb-1 truncate">{course.title}</h3>
                                                <p className="text-blue-100 text-xs mb-4">Level: {course.level}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex -space-x-2">
                                                        <div className="w-7 h-7 rounded-full bg-blue-300 border-2 border-primary"></div>
                                                        <div className="w-7 h-7 rounded-full bg-blue-400 border-2 border-primary"></div>
                                                        <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-primary"></div>
                                                        <div className="w-7 h-7 rounded-full border-2 border-primary bg-white text-primary text-[10px] font-bold flex items-center justify-center">+42</div>
                                                    </div>
                                                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={course.id} className="min-w-[260px] p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm relative flex-shrink-0 cursor-pointer">
                                            <div className="absolute top-4 right-4 text-orange-500">
                                                <span className="material-symbols-outlined">star</span>
                                            </div>
                                            <span className="inline-block px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold mb-2 truncate max-w-[120px]">{course.category}</span>
                                            <h3 className="font-bold text-lg mb-1 text-text-light dark:text-text-dark truncate">{course.title}</h3>
                                            <p className="text-text-muted-light dark:text-text-muted-dark text-xs mb-4">Level: {course.level}</p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-4">
                                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                                <span className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">75% Done</span>
                                            </div>
                                        </div>
                                    )
                                ))
                            )}
                        </div>
                    </section>

                    <section className="grid gap-4">
                        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-card-border-light dark:border-card-border-dark flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-500">pending_actions</span>
                                    <h3 className="font-bold text-sm">Grading Queue</h3>
                                </div>
                                <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">3 Pending</span>
                            </div>
                            <div>
                                <div className="p-4 border-b border-card-border-light dark:border-card-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">📝</div>
                                        <div>
                                            <h4 className="text-sm font-semibold">Final Project: UI Kit</h4>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Submitted by Alex M.</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-medium text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">Grade</button>
                                </div>
                                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">📊</div>
                                        <div>
                                            <h4 className="text-sm font-semibold">Mid-term Analysis</h4>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Submitted by Sarah J.</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-medium text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">Grade</button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark border border-card-border-light dark:border-card-border-dark shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-card-border-light dark:border-card-border-dark flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">forum</span>
                                    <h3 className="font-bold text-sm">Recent Queries</h3>
                                </div>
                            </div>
                            <div className="p-4 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm text-gray-500">person</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-semibold">John Doe</h4>
                                        <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark">2m ago</span>
                                    </div>
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark line-clamp-2">Professor, I had a doubt regarding the useEffect hook in the last lecture. Could you explain the dependency array again?</p>
                                    <div className="mt-2 flex gap-2">
                                        <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors">Reply</button>
                                        <button className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark px-2 py-1 hover:text-text-light dark:hover:text-text-dark">Ignore</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface-light dark:bg-surface-dark border-t border-card-border-light dark:border-card-border-dark px-6 py-3 flex justify-between items-center z-50">
                    <button onClick={() => router.push('/teacher')} className="flex flex-col items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-2xl">dashboard</span>
                        <span className="text-[10px] font-medium">Home</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">library_books</span>
                        <span className="text-[10px] font-medium">Courses</span>
                    </button>
                    <div className="relative -top-8">
                        <button onClick={() => setCourseModalOpen(true)} className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center transform hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </button>
                    </div>
                    <button className="flex flex-col items-center gap-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                        <span className="text-[10px] font-medium">Chat</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">person</span>
                        <span className="text-[10px] font-medium">Profile</span>
                    </button>
                </nav>

                {/* MODALS (Kept from original state integration) */}
                <Modal isOpen={isCourseModalOpen} onClose={() => setCourseModalOpen(false)} title="Create New Course">
                    <form onSubmit={handleCreateCourse} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Course Title</label>
                            <input required value={courseTitle} onChange={e => setCourseTitle(e.target.value)} type="text" className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Category</label>
                            <input required value={courseCategory} onChange={e => setCourseCategory(e.target.value)} type="text" className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Description</label>
                            <textarea required rows={3} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500"></textarea>
                        </div>
                        <button disabled={isSubmitting} type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50">
                            {isSubmitting ? 'Creating...' : 'Publish Course'}
                        </button>
                    </form>
                </Modal>

                <Modal isOpen={isUploadModalOpen} onClose={() => { setUploadModalOpen(false); setFile(null); }} title="Upload Study Material">
                    <form onSubmit={handleUploadMaterial} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Target Course</label>
                            <select required value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500">
                                <option value="" disabled>Select a course</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Material Title</label>
                            <input required value={materialTitle} onChange={e => setMaterialTitle(e.target.value)} type="text" className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Format</label>
                            <select value={materialType} onChange={e => setMaterialType(e.target.value)} className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-blue-500">
                                <option value="pdf">PDF Document</option>
                                <option value="video">Video Lecture</option>
                                <option value="image">Image Note</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">File</label>
                            <input required type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                        </div>
                        <button disabled={isSubmitting || !file || !selectedCourseId} type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {isSubmitting ? 'Uploading to Cloudinary...' : <><span className="material-symbols-outlined">cloud_upload</span> Upload File</>}
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
