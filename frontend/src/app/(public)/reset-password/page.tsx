'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidSession, setIsValidSession] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const router = useRouter();
    const { addToast } = useToast();

    useEffect(() => {
        // Supabase writes the recovery session into the URL hash.
        // getSession() automatically picks it up.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setIsValidSession(true);
            } else {
                addToast('error', 'Invalid Link', 'This reset link is invalid or has expired.');
            }
            setIsCheckingSession(false);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            addToast('error', 'Passwords do not match', 'Please make sure both passwords are identical.');
            return;
        }
        if (password.length < 6) {
            addToast('error', 'Too short', 'Password must be at least 6 characters.');
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            addToast('success', 'Password Updated!', 'You can now sign in with your new password.');
            router.push('/login');
        } catch (err: any) {
            addToast('error', 'Update Failed', err.message || 'Could not update password.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 -left-20 w-60 h-60 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

            <div className="relative z-10 w-full max-w-lg">
                {!isValidSession ? (
                    // Invalid / expired link state
                    <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-red-100 dark:border-red-900/40 p-8 text-center">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl text-red-400">link_off</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Link Expired</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            This password reset link is invalid or has already been used. Please request a new one.
                        </p>
                        <Link
                            href="/forgot-password"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-primary/20"
                        >
                            Request New Link
                        </Link>
                    </div>
                ) : (
                    // Password reset form
                    <>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-xs font-semibold mb-4 border border-green-100 dark:border-green-800">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Link Verified
                            </div>
                            <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Set New Password</h1>
                            <p className="text-subtext-light dark:text-subtext-dark text-sm leading-relaxed max-w-xs mx-auto">
                                Choose a strong password for your Zpluse University account.
                            </p>
                        </div>

                        <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="password">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                            id="password"
                                            placeholder="Minimum 6 characters"
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                                        >
                                            <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="confirm">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-lg">lock_reset</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                            id="confirm"
                                            placeholder="Re-enter your password"
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                <button
                                    className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 text-sm font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] disabled:opacity-60"
                                    type="submit"
                                    disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Update Password
                                            <span className="material-symbols-outlined text-base ml-2">check</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
