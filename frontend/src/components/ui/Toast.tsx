'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
}

interface ToastContextData {
    addToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextData>({ addToast: () => { } });

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((type: ToastType, title: string, message?: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, title, message }]);

        // Auto remove after 5s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => {
                    const isSuccess = toast.type === 'success';
                    const isError = toast.type === 'error';

                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border relative overflow-hidden animate-slideUp fade-in
                ${isSuccess ? 'bg-white dark:bg-slate-900 border-green-500/30' : ''}
                ${isError ? 'bg-white dark:bg-slate-900 border-red-500/30' : ''}
                ${!isSuccess && !isError ? 'bg-white dark:bg-slate-900 border-blue-500/30' : ''}
              `}
                        >
                            {/* Type Accent Line */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-1
                 ${isSuccess ? 'bg-green-500' : ''}
                 ${isError ? 'bg-red-500' : ''}
                 ${!isSuccess && !isError ? 'bg-blue-500' : ''}
                `}
                            />

                            {/* Icon */}
                            <div
                                className={`shrink-0 rounded-full w-8 h-8 flex items-center justify-center
                 ${isSuccess ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                 ${isError ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
                 ${!isSuccess && !isError ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                `}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {isSuccess ? 'check' : isError ? 'error' : 'info'}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                    {toast.title}
                                </p>
                                {toast.message && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                        {toast.message}
                                    </p>
                                )}
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
