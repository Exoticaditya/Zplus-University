import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleGuard from '@/components/auth/RoleGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={['admin']}>
            <DashboardLayout role="admin">{children}</DashboardLayout>
        </RoleGuard>
    );
}
