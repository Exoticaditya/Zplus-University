import React from 'react';
import Link from 'next/link';
import { BRAND, FOOTER_LINKS } from '@/constants/brandConfig';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand Column */}
                <div className="md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 group mb-6">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <span className="material-symbols-outlined text-white text-2xl leading-none">school</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">
                            {BRAND.nameParts.prefix}<span className="text-blue-600">{BRAND.nameParts.suffix}</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed mb-6">
                        {BRAND.tagline}. Join thousands of students and educators transforming modern learning.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                            <span className="material-symbols-outlined text-[20px]">link</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                            <span className="material-symbols-outlined text-[20px]">share</span>
                        </a>
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide">Explore</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        {FOOTER_LINKS.explore.map(({ href, label }) => (
                            <li key={href}><Link href={href} className="hover:text-blue-500 transition-colors">{label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        {FOOTER_LINKS.resources.map(({ href, label }) => (
                            <li key={href}><Link href={href} className="hover:text-blue-500 transition-colors">{label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide">Contact Us</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-blue-500 mt-0.5 text-[20px]">location_on</span>
                            <span>{BRAND.address.line1}<br />{BRAND.address.line2}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[20px]">mail</span>
                            <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">{BRAND.email}</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[20px]">call</span>
                            <span>{BRAND.phone}</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium content-center">
                <p>{BRAND.copyright}</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    {FOOTER_LINKS.legal.map(({ href, label }) => (
                        <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
