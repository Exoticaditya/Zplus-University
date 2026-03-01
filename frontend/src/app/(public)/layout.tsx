import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';

/**
 * PUBLIC LAYOUT — College Discovery Portal
 * Wraps all public-facing pages: /, /colleges, /about, /admissions, /login, /register, etc.
 * Contains PublicNavbar + standard Footer (rendered exactly once here).
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicNavbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}
