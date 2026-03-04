import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleGuard from '@/components/auth/RoleGuard';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={['student']}>
            <DashboardLayout role="student">{children}</DashboardLayout>
        </RoleGuard>
    );
}
