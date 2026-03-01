import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleGuard from '@/components/auth/RoleGuard';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={['teacher']}>
            <DashboardLayout role="teacher">{children}</DashboardLayout>
        </RoleGuard>
    );
}
