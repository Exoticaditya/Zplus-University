'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { addToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const userRole = data.user.user_metadata?.role;
            addToast('success', 'Welcome Back!', 'Successfully logged into your portal.');

            if (userRole === 'student') {
                router.push('/dashboard');
            } else if (userRole === 'teacher') {
                router.push('/teacher');
            } else if (userRole === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }

        } catch (err: any) {
            addToast('error', 'Login Failed', err.message || 'Invalid credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
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

    const handleMicrosoftLogin = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                    scopes: 'email',
                }
            });
            if (error) throw error;
        } catch (err: any) {
            addToast('error', 'Microsoft Auth Error', err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex transition-colors duration-200">
            {/* LEFT SIDE: FORM */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo & Header */}
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
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                                Create one free
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mt-8">
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="login-email">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">email</span>
                                    </div>
                                    <input
                                        className="appearance-none block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-900 dark:text-white transition-all"
                                        id="login-email"
                                        name="email"
                                        placeholder="name@university.edu"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="login-password">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                                    </div>
                                    <input
                                        className="appearance-none block w-full pl-11 pr-12 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-900 dark:text-white transition-all"
                                        id="login-password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded dark:bg-slate-800 dark:border-slate-600"
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                    />
                                    <label className="ml-2 block text-xs text-slate-600 dark:text-slate-400 font-medium" htmlFor="remember-me">
                                        Remember me
                                    </label>
                                </div>
                                <Link className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors" href="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="pt-1">
                                <button
                                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all disabled:opacity-70 hover:-translate-y-0.5"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Sign In <span className="material-symbols-outlined text-base ml-2">arrow_forward</span></>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-slate-950 px-3 text-slate-500 text-xs font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2.5 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                                    type="button"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    onClick={handleMicrosoftLogin}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2.5 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                                    type="button"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                                        <path fill="#f35325" d="M1 1h10v10H1z" />
                                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                                    </svg>
                                    Microsoft
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: BRANDING PANEL */}
            <div className="hidden lg:block relative w-0 flex-1 bg-slate-900 overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay scale-105"
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Campus"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/60 to-blue-950/80" />

                {/* Floating glass cards */}
                <div className="absolute inset-0 flex flex-col justify-between p-16">
                    {/* Top stats */}
                    <div className="flex gap-4">
                        {[
                            { value: '90+', label: 'Top Colleges', icon: 'school' },
                            { value: '10K+', label: 'Students', icon: 'groups' },
                            { value: '98%', label: 'Placement', icon: 'trending_up' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-400 text-lg">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-white font-black text-xl leading-none">{stat.value}</p>
                                    <p className="text-blue-200/70 text-[11px] font-semibold mt-0.5">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom headline */}
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur border border-blue-400/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-blue-200 text-xs font-bold">Admissions Open 2026-27</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                            Your Journey to<br />
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Excellence</span> Starts Here
                        </h2>
                        <p className="text-blue-100/70 text-lg leading-relaxed max-w-md">
                            Access your personalized dashboard, explore top colleges, and manage your academic journey — all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
