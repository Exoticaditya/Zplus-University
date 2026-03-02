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

            // Extract role from metadata and redirect
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
        <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans antialiased min-h-screen flex flex-col transition-colors duration-300">


            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-100 dark:border-blue-800">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Secure Access Portal
                    </div>
                    <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Welcome Back</h1>
                    <p className="text-subtext-light dark:text-subtext-dark text-sm leading-relaxed max-w-xs mx-auto">
                        Sign in to access your dedicated workspace securely.
                    </p>
                </div>

                <div className={`w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8 transition-all duration-500 opacity-100`}>
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">email</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                                    id="email"
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
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="password">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                        <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600" id="remember-me" name="remember-me" type="checkbox" />
                                <label className="ml-2 block text-xs text-subtext-light dark:text-subtext-dark" htmlFor="remember-me">Remember me</label>
                            </div>
                            <div className="text-xs">
                                <Link className="font-medium text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" href="/forgot-password">Forgot password?</Link>
                            </div>
                        </div>

                        <button
                            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/30 text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform active:scale-[0.98]"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <span className="material-symbols-outlined text-base ml-2">arrow_forward</span></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card-light dark:bg-card-dark text-subtext-light dark:text-subtext-dark text-xs">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50" type="button">
                                {/* Google logo SVG */}
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button onClick={handleMicrosoftLogin} disabled={isLoading} className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50" type="button">
                                {/* Microsoft logo SVG */}
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
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

                <div className="mt-6 text-center text-xs text-subtext-light dark:text-subtext-dark">
                    Don't have an account yet?
                    <Link className="font-medium text-primary hover:text-blue-600 dark:text-blue-400 ml-1" href="/register">Apply for Admission</Link>
                </div>
            </main>



            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-20 w-60 h-60 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
