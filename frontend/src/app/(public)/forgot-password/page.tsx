'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) throw error;
            setSent(true);
            addToast('success', 'Email Sent', 'Check your inbox for the password reset link.');
        } catch (err: any) {
            addToast('error', 'Failed', err.message || 'Could not send reset email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 -left-20 w-60 h-60 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

            <div className="relative z-10 w-full max-w-lg">
                {/* Back link */}
                <div className="mb-6">
                    <Link href="/login" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to Sign In
                    </Link>
                </div>

                {sent ? (
                    // Success state
                    <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl text-green-500">mark_email_read</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Check Your Inbox</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            We sent a password reset link to <span className="font-semibold text-slate-700 dark:text-slate-200">{email}</span>.
                            Check your spam folder if it doesn&apos;t appear within a few minutes.
                        </p>
                        <button
                            onClick={() => { setSent(false); setEmail(''); }}
                            className="text-sm font-medium text-primary hover:text-blue-700 transition"
                        >
                            Resend email
                        </button>
                    </div>
                ) : (
                    // Form state
                    <>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-100 dark:border-blue-800">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Password Recovery
                            </div>
                            <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Reset Password</h1>
                            <p className="text-subtext-light dark:text-subtext-dark text-sm leading-relaxed max-w-xs mx-auto">
                                Enter your account email and we&apos;ll send you a reset link.
                            </p>
                        </div>

                        <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-lg">email</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
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

                                <button
                                    className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] disabled:opacity-60"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Send Reset Link
                                            <span className="material-symbols-outlined text-base ml-2">send</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                )}

                <p className="mt-6 text-center text-xs text-subtext-light dark:text-subtext-dark">
                    Remembered your password?{' '}
                    <Link className="font-medium text-primary hover:text-blue-600 dark:text-blue-400 ml-1" href="/login">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
