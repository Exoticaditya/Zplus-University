import type { Metadata } from 'next';

// This is a Server Component by default in Next.js 13+ App Router
// if we remove 'use client' from the top. However, the original file was 'use client'.
// I will keep the client logic but add generateMetadata.
// Note: Next.js allows generateMetadata in the same file as a 'use client' page 
// ONLY if it's the page entry.

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        // We fetch data again here (Next.js will deduplicate if we use fetch() but we use fetchApi).
        // For now, I'll use a local fetch mirror to get the name.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/colleges/${params.id}`);
        const college = await res.json();

        if (!college || college.error) return { title: 'College Not Found' };

        return {
            title: college.name,
            description: `Learn more about ${college.name} in ${college.city}, ${college.state}. View courses, fees, and admission details.`,
            openGraph: {
                title: `${college.name} | Zpluse University`,
                description: `Explore ${college.name} campus, affiliation, and program offerings.`,
                images: [college.cover_image_url || 'https://www.zpluseuniversity.com/og-image.jpg'],
            }
        };
    } catch {
        return { title: 'College Details | Zpluse University' };
    }
}

import CollegeDetailClient from '@/components/college/CollegeDetailClient';

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
    // Fetch initial data on server for faster paint if desired
    let initialData = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/colleges/${params.id}`);
        if (res.ok) initialData = await res.json();
    } catch (err) {
        console.error("Server-side fetch failed for college detail:", err);
    }

    return <CollegeDetailClient id={params.id} initialData={initialData} />;
}
