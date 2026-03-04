'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/apiClient';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';
import Modal from '@/components/ui/Modal';

interface Course {
    id: string;
    title: string;
    category: string;
    level: string;
    is_published: boolean;
    enrollment_count?: number;
}

export default function TeacherDashboard() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'workspace';
    const router = useRouter();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modals
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
            const coursesRes = await fetchApi(`/courses?teacher_id=${user.id}`);
            setCourses(coursesRes.data || []);
        } catch { }
        setIsLoading(false);
    };

    useEffect(() => { loadData(); }, [user]);

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetchApi('/courses', {
                method: 'POST',
                body: JSON.stringify({ title: courseTitle, description: courseDesc, category: courseCategory, level: 'Beginner' })
            });
            addToast('success', 'Course Created', `${courseTitle} is now available.`);
            setCourseModalOpen(false);
            setCourseTitle(''); setCourseCategory(''); setCourseDesc('');
            loadData();
        } catch (err: any) {
            addToast('error', 'Creation Failed', err.message);
        } finally { setIsSubmitting(false); }
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
            await fetchApi('/materials', { method: 'POST', body: formData });
            addToast('success', 'Material Uploaded', 'File securely stored.');
            setUploadModalOpen(false); setFile(null); setMaterialTitle('');
        } catch (err: any) {
            addToast('error', 'Upload Error', err.message);
        } finally { setIsSubmitting(false); }
    };

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Teacher Workspace</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome, {user?.user_metadata?.full_name || 'Professor'}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setCourseModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">add</span> New Course
                    </button>
                    <button onClick={() => { if (courses.length > 0) { setSelectedCourseId(courses[0].id); setUploadModalOpen(true); } else addToast('error', 'No Courses', 'Create a course first'); }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 hover:border-blue-400">
                        <span className="material-symbols-outlined text-lg">upload_file</span> Upload
                    </button>
                </div>
            </div>

            {/* ── WORKSPACE TAB ── */}
            {(activeTab === 'workspace' || !activeTab) && (
                <>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            { label: 'My Courses', value: courses.length, icon: 'library_books', color: 'blue' },
                            { label: 'Active Students', value: '1,204', icon: 'groups', color: 'purple' },
                            { label: 'Avg Engagement', value: '84%', icon: 'trending_up', color: 'emerald' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : s.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'}`}>
                                    <span className="material-symbols-outlined">{s.icon}</span>
                                </div>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Grading Queue */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-500">pending_actions</span>
                                Grading Queue
                            </h3>
                            <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">3 Pending</span>
                        </div>
                        {[
                            { title: 'Final Project: UI Kit', student: 'Alex M.', time: '2h ago' },
                            { title: 'Mid-term Analysis', student: 'Sarah J.', time: '5h ago' },
                            { title: 'Assignment 3: REST API', student: 'John D.', time: '1d ago' },
                        ].map((item, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">📝</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.student} • {item.time}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-blue-600 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">Grade</button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ── COURSES TAB ── */}
            {activeTab === 'courses' && (
                <div className="space-y-5">
                    {isLoading ? (
                        <div className="p-12 text-center"><div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
                    ) : courses.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3">library_books</span>
                            <p className="text-slate-500 dark:text-slate-400 mb-4">No courses yet. Create your first course to get started.</p>
                            <button onClick={() => setCourseModalOpen(true)} className="bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl">Create Course</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {courses.map((course, i) => (
                                <div key={course.id} className={`rounded-2xl border p-5 transition-all hover:shadow-lg ${i === 0 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold mb-3 ${i === 0 ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>{course.category}</span>
                                    <h4 className={`font-bold text-lg mb-1 ${i > 0 ? 'text-slate-900 dark:text-white' : ''}`}>{course.title}</h4>
                                    <p className={`text-xs mb-4 ${i === 0 ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>Level: {course.level}</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${course.is_published ? (i === 0 ? 'bg-white/20' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600') : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'}`}>
                                            {course.is_published ? 'Published' : 'Draft'}
                                        </span>
                                        <button onClick={() => router.push(`/live/${course.id}`)} className={`text-xs font-bold flex items-center gap-1 ${i === 0 ? 'text-white' : 'text-blue-600'}`}>
                                            <span className="material-symbols-outlined text-sm">videocam</span> Go Live
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── MATERIALS TAB ── */}
            {activeTab === 'materials' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">cloud_upload</span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Upload Study Materials</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">Upload PDFs, videos, and documents for your courses. Files are securely stored via Cloudinary.</p>
                    <button onClick={() => { if (courses.length > 0) { setSelectedCourseId(courses[0].id); setUploadModalOpen(true); } else addToast('error', 'No Courses', 'Create a course first'); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2">
                        <span className="material-symbols-outlined">upload</span> Upload File
                    </button>
                </div>
            )}

            {/* ── STUDENTS TAB ── */}
            {activeTab === 'students' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">groups</span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Student Management</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">Enrolled students across your courses will appear here. Create and publish courses to attract students.</p>
                </div>
            )}

            {/* ── MODALS ── */}
            <Modal isOpen={isCourseModalOpen} onClose={() => setCourseModalOpen(false)} title="Create New Course">
                <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Course Title</label>
                        <input required value={courseTitle} onChange={e => setCourseTitle(e.target.value)} type="text" className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                        <input required value={courseCategory} onChange={e => setCourseCategory(e.target.value)} type="text" className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                        <textarea required rows={3} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50">
                        {isSubmitting ? 'Creating...' : 'Publish Course'}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={isUploadModalOpen} onClose={() => { setUploadModalOpen(false); setFile(null); }} title="Upload Study Material">
                <form onSubmit={handleUploadMaterial} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Target Course</label>
                        <select required value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                            <option value="" disabled>Select a course</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Material Title</label>
                        <input required value={materialTitle} onChange={e => setMaterialTitle(e.target.value)} type="text" className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Format</label>
                        <select value={materialType} onChange={e => setMaterialType(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                            <option value="pdf">PDF Document</option>
                            <option value="video">Video Lecture</option>
                            <option value="image">Image Note</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">File</label>
                        <input required type="file" onChange={e => setFile(e.target.files?.[0] || null)}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                    </div>
                    <button disabled={isSubmitting || !file || !selectedCourseId} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {isSubmitting ? 'Uploading...' : <><span className="material-symbols-outlined">cloud_upload</span> Upload File</>}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
