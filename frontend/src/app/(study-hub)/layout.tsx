import StudyHubNavbar from '@/components/layout/StudyHubNavbar';
import RoleGuard from '@/components/auth/RoleGuard';

/**
 * STUDY HUB LAYOUT
 * Wraps all /study-hub/* routes.
 * - Protected: requires authenticated student role.
 * - No global footer (focus/LMS mode).
 * - Top navbar with: Logo | My Classes | Live Classes | Performance | Profile
 */
export default function StudyHubLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={['student']}>
            <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <StudyHubNavbar role="student" />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}
