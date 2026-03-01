'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: ('student' | 'teacher' | 'admin')[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { session, user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!session || !user) {
                // Not logged in -> Redirect to login
                router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
            } else {
                // Logged in, check role
                const userRole = user.user_metadata?.role as 'student' | 'teacher' | 'admin';

                if (!userRole) {
                    // Default fallback or error handling
                    console.error("User has no role defined in metadata.");
                    router.replace('/login');
                } else if (allowedRoles.includes(userRole)) {
                    setIsAuthorized(true);
                } else {
                    // Role mismatch, redirect to appropriate home
                    if (userRole === 'student') router.replace('/dashboard');
                    else if (userRole === 'teacher') router.replace('/teacher');
                    else if (userRole === 'admin') router.replace('/admin');
                    else router.replace('/');
                }
            }
        }
    }, [isLoading, session, user, router, pathname, allowedRoles]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{children}</>;
}
