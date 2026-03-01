import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Educator Documentation',
};

const sections = [
    {
        icon: 'how_to_reg',
        title: 'Getting Approved as a Teacher',
        content: `After registering as an Educator, your account goes into a "Pending Approval" state. 
An Admin will review your profile and approve or reject it within 2 business days. 
You will receive an email notification once your status changes.
To expedite approval, ensure your full name and bio are complete in your profile.`,
    },
    {
        icon: 'menu_book',
        title: 'Creating & Publishing Courses',
        content: `From your Teacher Workspace, click "New Course" to create a course. 
Fill in the title, description, category, level, and pricing. 
Courses remain in Draft mode until you click "Publish". 
Only published courses are visible to students.`,
    },
    {
        icon: 'upload_file',
        title: 'Uploading Study Materials',
        content: `Navigate to a course and open the Materials tab. 
Click "Upload Material" to upload PDFs, videos, or images. 
Files are stored securely on Cloudinary with a maximum size of 50 MB per file.
You can set visibility (public to enrolled students, or private draft).`,
    },
    {
        icon: 'video_call',
        title: 'Scheduling Live Classes',
        content: `Open a course and go to "Live Sessions". 
Set the session title, date, time, and duration. 
Students will see the session in their Dashboard under "Upcoming Live Session". 
Live classes use Jitsi Meet — no installation required for you or students.
As the host, you will have full moderator controls (mute, kick, etc.).`,
    },
    {
        icon: 'assignment',
        title: 'Managing Student Enrollments',
        content: `The Enrollments tab shows all students enrolled in each of your courses, their progress percentage, and current status (active / completed / dropped). 
You can export this data as CSV for offline tracking.`,
    },
    {
        icon: 'cloud',
        title: 'Cloudinary Integration',
        content: `All media uploads go through Cloudinary automatically. 
You do not need a Cloudinary account — the platform handles it. 
Upload limits and formats: PDF (50 MB), MP4 video (500 MB), JPEG/PNG images (10 MB).
Uploaded files are accessible via a secure, CDN-served URL.`,
    },
];

export default function EducatorDocsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-24 px-4 transition-colors">
            <div className="max-w-4xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-sm text-slate-500">Educator Docs</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-semibold mb-4 border border-purple-100 dark:border-purple-800">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    Educator Resources
                </div>
                <h1 className="text-4xl font-extrabold mb-3">Educator Documentation</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-12">
                    Everything you need to know about managing courses, uploads, and live classes on Zpluse University.
                </p>

                {/* Sections */}
                <div className="space-y-6 mb-16">
                    {sections.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined">{s.icon}</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg mb-3">{s.title}</h2>
                                    <div className="space-y-2">
                                        {s.content.split('\n').filter(Boolean).map((line, j) => (
                                            <p key={j} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                {line.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-primary rounded-2xl p-8 text-center text-white">
                    <h2 className="text-xl font-bold mb-2">Ready to start teaching?</h2>
                    <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                        Register as an Educator today and reach thousands of motivated students across India.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition shadow-lg"
                        >
                            Register as Educator
                        </Link>
                        <Link
                            href="/help"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition"
                        >
                            Visit Help Center
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
