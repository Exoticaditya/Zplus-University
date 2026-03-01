'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { BRAND } from '@/constants/brandConfig';
import Link from 'next/link';

export default function StudyHubLiveClassesPage() {
    const { user } = useAuth();

    // Jitsi room name derived from user id to give each student a personal test room
    const roomName = `zpluse-live-${user?.id?.slice(0, 8) ?? 'guest'}`;
    const jitsiUrl = `https://meet.jit.si/${roomName}`;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Classes</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Join scheduled live sessions with your teachers on {BRAND.name}.
                </p>
            </div>

            {/* Jitsi Launch Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 text-center mb-6 shadow-sm">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-blue-600 text-4xl">videocam</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Join Your Live Session
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                    Your teacher will share the class link. Click below to open the Jitsi meeting room.
                </p>
                <a
                    href={jitsiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-600/25"
                >
                    <span className="material-symbols-outlined text-lg">play_circle</span>
                    Launch Meeting Room
                </a>
            </div>

            <div className="text-center">
                <Link href="/study-hub" className="text-sm font-medium text-slate-400 hover:text-blue-600 transition">
                    ← Back to Study Hub
                </Link>
            </div>
        </div>
    );
}
