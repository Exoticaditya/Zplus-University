'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function LMSViewer({ params }: { params: { courseId: string } }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { addToast } = useToast();

    // Mock data since we just need the UI shell for Phase 19
    const courseTitle = "Advanced Data Structures & Algorithms";
    const currentTopic = "Module 4: AVL Trees and Red-Black Balances";

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col font-sans">
            {/* Top LMS Header */}
            <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-300">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="font-extrabold text-lg text-white leading-tight">{courseTitle}</h1>
                        <p className="text-sm text-slate-400 font-medium">{currentTopic}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                        <span className="text-sm font-bold text-blue-400">45% Completed</span>
                        <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">Mark Complete</button>
                </div>
            </header>

            {/* Dual Pane Layout */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left Pane: Video Player */}
                <div className="w-full lg:w-[65%] xl:w-[70%] bg-black flex flex-col relative border-r border-slate-800">
                    <div className="flex-1 relative flex items-center justify-center bg-slate-900/50">
                        {/* Fake Interactive Player UI */}
                        <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Lecture Board" className="w-full h-full object-cover opacity-60" />

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="absolute w-20 h-20 bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-transform hover:scale-110 z-10"
                        >
                            <span className="material-symbols-outlined text-4xl ml-2">{isPlaying ? 'pause' : 'play_arrow'}</span>
                        </button>

                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                            <div className="w-full bg-slate-600 hover:bg-slate-500 h-1.5 rounded-full cursor-pointer overflow-hidden mb-4 relative group">
                                <div className="bg-blue-500 h-full w-[35%] relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined cursor-pointer hover:text-white">volume_up</span>
                                    <span>12:45 / 36:20</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="cursor-pointer hover:text-white border border-slate-500 px-2 rounded">1.5x</span>
                                    <span className="material-symbols-outlined cursor-pointer hover:text-white">subtitles</span>
                                    <span className="material-symbols-outlined cursor-pointer hover:text-white text-xl">fullscreen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Metadata Tab */}
                    <div className="p-6 bg-slate-900 shrink-0">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentTopic}</h2>
                        <p className="text-slate-400 text-sm mb-4">Dr. Emily Chen • Stanford University CS Department</p>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                <span className="material-symbols-outlined text-[18px]">thumb_up</span> Like (1.2k)
                            </button>
                            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                <span className="material-symbols-outlined text-[18px]">forum</span> Discussion (84)
                            </button>
                            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ml-auto">
                                <span className="material-symbols-outlined text-[18px]">bookmark</span> Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Notes & PDF Reader */}
                <div className="w-full lg:w-[35%] xl:w-[30%] bg-slate-900 flex flex-col h-[600px] lg:h-auto overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 shrink-0">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-400">menu_book</span> Course Materials
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">download</span></button>
                            <button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">print</span></button>
                        </div>
                    </div>

                    {/* Interactive Document Viewer Placeholder */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-800 text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none">
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-inner mb-6">
                            <h4 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Lecture Notes: AVL Balancing</h4>
                            <p className="mb-4">An AVL tree is a self-balancing binary search tree. It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one.</p>

                            <div className="bg-slate-950 p-4 rounded-lg font-mono text-blue-300 text-xs my-4 border border-slate-800 overflow-x-auto">
                                {`struct Node {
    int key;
    struct Node *left;
    struct Node *right;
    int height;
};`}
                            </div>

                            <p className="mb-4">If at any time they differ by more than one, rebalancing is done to restore this property. Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases, where n is the number of nodes in the tree prior to the operation.</p>

                            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg my-6">
                                <strong className="text-yellow-500 block mb-1">Exam Note:</strong>
                                Insertions and deletions may require the tree to be rebalanced by one or more tree rotations. You must memorize the 4 rotation cases (LL, LR, RL, RR).
                            </div>

                            <p>Because AVL trees are strictly balanced, they provide faster lookups than Red-Black trees but can be slower during insertion/deletion due to more rotations.</p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-4">
                            <span>Page 1 / 14</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Prev</button>
                                <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Next</button>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
