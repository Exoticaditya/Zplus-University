import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ui/Toast';
import { AuthProvider } from '@/context/AuthContext';
import AccessibilityOverlay from '@/components/ui/AccessibilityOverlay';
import GlobalAIChatbot from '@/components/ui/GlobalAIChatbot';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Zpluse University | Next-Gen Higher Education LMS',
    template: '%s | Zpluse University'
  },
  description: 'The ultimate ecosystem for Administrators, Teachers, and Students. Explore colleges, manage courses, and elevate your learning experience.',
  openGraph: {
    title: 'Zpluse University LMS',
    description: 'Next-Gen Higher Education platform with Role-Based Access Control and AI Scraper integration.',
    url: 'https://www.zpluseuniversity.com',
    siteName: 'Zpluse University',
    images: [
      {
        url: 'https://www.zpluseuniversity.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zpluse University | Next-Gen LMS',
    description: 'The future of higher education is here.',
    images: ['https://www.zpluseuniversity.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col pt-0 transition-colors duration-200">
        <AuthProvider>
          <ToastProvider>
            {children}
            <AccessibilityOverlay />
            <GlobalAIChatbot />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
