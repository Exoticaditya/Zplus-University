'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { addToast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Sign up with Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role
                    }
                }
            });

            if (error) throw error;

            addToast('success', 'Account Created!', 'Welcome to Zpluse University.');

            // Auto redirect based on selected role
            if (role === 'teacher') {
                router.push('/teacher');
            } else {
                router.push('/dashboard');
            }

        } catch (err: any) {
            addToast('error', 'Registration Failed', err.message || 'Could not create account.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            addToast('error', 'Google Auth Error', err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex transition-colors duration-200">
            {/* LEFT SIDE: FORM */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Header */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 group mb-8 w-max">
                            <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                                <span className="material-symbols-outlined text-white text-2xl leading-none">school</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Zpluse<span className="text-blue-600"> University</span>
                            </span>
                        </Link>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                                Sign in securely
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        <form className="space-y-5" onSubmit={handleRegister}>
                            {/* ROLE SELECTION */}
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all hover:-translate-y-0.5 ${role === 'student' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/10' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-300 dark:hover:border-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-3xl mb-1">badge</span>
                                    <span className="text-sm font-bold">Student</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('teacher')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all hover:-translate-y-0.5 ${role === 'teacher' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/10' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-300 dark:hover:border-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-3xl mb-1">history_edu</span>
                                    <span className="text-sm font-bold">Educator</span>
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-900 dark:text-white transition-all"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-900 dark:text-white transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full pl-4 pr-12 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-900 dark:text-white transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Must be at least 6 characters.</p>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all disabled:opacity-70 hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleGoogleRegister}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-70"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: BRANDING PANEL */}
            <div className="hidden lg:block relative w-0 flex-1 bg-slate-900 overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay scale-105"
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Zpluse Campus Library"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">Join the Elite.<br />Learn Without Limits.</h2>
                        <ul className="text-xl text-blue-100/90 leading-relaxed border-l-4 border-blue-500 pl-6 space-y-2">
                            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400">check_circle</span> 10,000+ Verified Students</li>
                            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400">check_circle</span> Top Tier Universities</li>
                            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400">check_circle</span> 98% Placement Rates</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
