'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Stats {
  colleges: number;
  students: number;
  placementRate: string;
  support: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    colleges: 0,
    students: 0,
    placementRate: 'N/A',
    support: '24/7'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges/stats`);
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white antialiased transition-colors duration-300 min-h-screen">

      <section className="pt-28 pb-12 px-4 relative overflow-hidden bg-pattern">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs font-semibold shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Zpluse University 2026 Ecosystem Live
          </div>
        </div>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
            The Future of <br />
            <span className="text-primary">Higher Education</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 px-2">
            A comprehensive, Next-Gen Learning Management System uniting Administrators, Teachers, and Students in a single, high-performance ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-2">
            <Link href="/register" className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
              Apply Now
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link href="/colleges" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all">
              Explore Colleges
              <span className="material-symbols-outlined text-lg">search</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-soft border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{stats.colleges}+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Top Colleges</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-soft border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-3xl font-bold text-secondary mb-1">{(stats.students / 1000).toFixed(0)}k+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Students</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-soft border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-3xl font-bold text-secondary mb-1">{stats.placementRate}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Placement Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-soft border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-3xl font-bold text-accent mb-1">{stats.support}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">AI Support</div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Designed for Every Role</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">              Secure, dedicated dashboards tailored specifically to your needs, powered by Supabase Authentication and Role-Based Access Control.
            </p>
          </div>
          <div className="space-y-6">
            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-secondary mb-4 relative z-10">
                <span className="material-symbols-outlined">admin_panel_settings</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Admin Console</h3>
              <p className="text-sm text-subtext-light dark:text-subtext-dark mb-6 leading-relaxed relative z-10">
                Manage the global college directory, evaluate pending teacher approvals, and monitor platform telemetrics via the AI Scraper.
              </p>
              <Link href="/login" className="inline-flex items-center text-sm font-bold text-secondary hover:text-purple-700 dark:hover:text-purple-400 transition-colors relative z-10">
                Access Portal <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary mb-4 relative z-10">
                <span className="material-symbols-outlined">school</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Teacher Workspace</h3>
              <p className="text-sm text-subtext-light dark:text-subtext-dark mb-6 leading-relaxed relative z-10">
                Design courses, schedule live classes, process student assignments, and securely upload study materials to Cloudinary.
              </p>
              <Link href="/login" className="inline-flex items-center text-sm font-bold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors relative z-10">
                Access Portal <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-accent mb-4 relative z-10">
                <span className="material-symbols-outlined">backpack</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Student Hub</h3>
              <p className="text-sm text-subtext-light dark:text-subtext-dark mb-6 leading-relaxed relative z-10">
                Consume course content via the dual-pane cinematic LMS viewer, track academic progress, and monitor vital deadline alerts.
              </p>
              <Link href="/login" className="inline-flex items-center text-sm font-bold text-accent hover:text-green-700 dark:hover:text-green-400 transition-colors relative z-10">
                Access Portal <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-white dark:bg-slate-900 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-16 w-px bg-slate-200 dark:bg-slate-800"></div>
        <div className="max-w-2xl mx-auto pt-8 flex items-center justify-center flex-col text-center sm:text-left sm:flex-row sm:justify-start gap-8">
          <div className="w-full">
            <span className="inline-block py-1 px-3 rounded-md bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Elevating Global <br />Education Standards.
            </h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Zpluse University is an elite architecture combining world-class educators with cutting-edge learning technologies. Our platform was rebuilt from the ground up in 2026 to utilize Next.js Server-Side Rendering and PostgreSQL cloud infrastructure.
              </p>
              <p>
                We believe that powerful tools create powerful outcomes. Whether you're exploring the College Directory via our Mega Filters or participating in immersive Virtual 360 Campus Tours, Zpluse delivers an unparalleled academic experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 justify-center sm:justify-start">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">UGC Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">language</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Global Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-white text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to begin your journey?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
                Join the Zpluse Ecosystem today and unlock your future. Creating an account takes less than 30 seconds.
          </p>
          <Link href="/register" className="inline-block w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all transform hover:scale-[1.02]">
            Start Learning Now
          </Link>
        </div>
      </section>

    </div>
  );
}

