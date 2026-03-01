"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { JitsiMeeting } from '@jitsi/react-sdk';

export default function LiveClassPage({ params }: { params: { classId: string } }) {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setLoading(false);
    }, [user, router]);

    if (loading || !user) {
        return <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white">Initializing Secure Classroom...</div>
    }

    const roomName = `ZplusEducation-LiveClass-${params.classId}`;

    return (
        <div className="h-screen flex flex-col bg-slate-900 border-none m-0 p-0 overflow-hidden font-sans">

            {/* Minimal Header */}
            <div className="px-4 py-3 flex justify-between items-center bg-black border-b border-slate-800 z-50">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    <h1 className="text-white font-bold text-md tracking-tight">Live Session Room</h1>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => router.back()} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-1.5 rounded-md font-bold transition-all border border-slate-700">
                        Leave Class
                    </button>
                </div>
            </div>

            {/* Powerful free WebRTC via Jitsi Meet */}
            <div className="flex-1 w-full bg-slate-950 relative">
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    configOverwrite={{
                        startWithAudioMuted: user.user_metadata?.role !== 'teacher',
                        startWithVideoMuted: user.user_metadata?.role !== 'teacher',
                        disableDeepLinking: true,
                        prejoinPageEnabled: false
                    }}
                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_PROMOTIONAL_CLOSE_PAGE: false
                    }}
                    userInfo={{
                        displayName: user.user_metadata?.full_name || 'Zpluse Participant',
                        email: user.email || ''
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = '100%';
                        iframeRef.style.width = '100%';
                        iframeRef.style.border = 'none';
                    }}
                />
            </div>

        </div>
    );
}
