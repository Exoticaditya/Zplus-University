import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/colleges/${params.id}`, { cache: 'no-store' });
        const json = await res.json();
        const college = json?.data || json;

        if (!college || college.error) return { title: 'College Not Found' };

        return {
            title: college.name,
            description: `Learn more about ${college.name} in ${college.city}, ${college.state}. View courses, fees, and admission details.`,
            openGraph: {
                title: `${college.name} | Zpluse University`,
                description: `Explore ${college.name} campus, affiliation, and programme offerings.`,
                images: [college.cover_image_url || 'https://www.zpluseuniversity.com/og-image.jpg'],
            }
        };
    } catch {
        return { title: 'College Details | Zpluse University' };
    }
}

import CollegeDetailClient from '@/components/college/CollegeDetailClient';

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
    let initialData = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/colleges/${params.id}`, { cache: 'no-store' });
        if (res.ok) {
            const json = await res.json();
            // backend may return { data: {...} } or the object directly
            initialData = json?.data || json;
        }
    } catch (err) {
        console.error('Server-side fetch failed for college detail:', err);
    }

    return <CollegeDetailClient id={params.id} initialData={initialData} />;
}
