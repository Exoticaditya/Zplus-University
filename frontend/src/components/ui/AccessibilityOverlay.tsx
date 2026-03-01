'use client';

import React, { useState, useEffect } from 'react';

export default function AccessibilityOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [textScale, setTextScale] = useState(100);
    const [dyslexicFont, setDyslexicFont] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Sync classes to HTML root layer
    useEffect(() => {
        const root = document.documentElement;

        if (isHighContrast) root.classList.add('high-contrast');
        else root.classList.remove('high-contrast');

        if (dyslexicFont) root.classList.add('font-dyslexic');
        else root.classList.remove('font-dyslexic');

        root.style.fontSize = `${textScale}%`;
    }, [isHighContrast, textScale, dyslexicFont]);

    // Screen Reader Tool
    const readPage = () => {
        if (!window.speechSynthesis) return;
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const content = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(content.substring(0, 1000)); // Cap for demo
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">

            {/* OVERLAY PANEL */}
            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-80 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <div className="bg-blue-600 px-5 py-4 flex items-center justify-between text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">accessibility_new</span> Accessibility Tools
                    </h3>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>

                <div className="p-5 space-y-5">

                    {/* Visibility Modes */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Visibility</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setIsHighContrast(!isHighContrast)}
                                className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center gap-2 transition-colors ${isHighContrast ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 hover:border-blue-500'}`}
                            >
                                <span className="material-symbols-outlined">contrast</span> Contrast
                            </button>
                            <button
                                onClick={() => setDyslexicFont(!dyslexicFont)}
                                className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center gap-2 transition-colors ${dyslexicFont ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300' : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 hover:border-blue-500'}`}
                            >
                                <span className="material-symbols-outlined">text_format</span> Dyslexia Font
                            </button>
                        </div>
                    </div>

                    {/* Text Sizing */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex justify-between">
                            Text Size <span>{textScale}%</span>
                        </h4>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setTextScale(Math.max(80, textScale - 10))} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border hover:border-blue-500"><span className="material-symbols-outlined">remove</span></button>
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full transition-all" style={{ width: `${((textScale - 80) / 70) * 100}%` }}></div>
                            </div>
                            <button onClick={() => setTextScale(Math.min(150, textScale + 10))} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border hover:border-blue-500"><span className="material-symbols-outlined">add</span></button>
                        </div>
                    </div>

                    {/* Audio Assistance */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Audio Assistance</h4>
                        <button
                            onClick={readPage}
                            className={`w-full py-3 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${isSpeaking ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400' : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 hover:bg-blue-100'}`}
                        >
                            <span className="material-symbols-outlined">{isSpeaking ? 'stop_circle' : 'record_voice_over'}</span>
                            {isSpeaking ? 'Stop Reading' : 'Read Page Aloud'}
                        </button>
                    </div>

                    {/* Reset */}
                    <button
                        onClick={() => { setIsHighContrast(false); setDyslexicFont(false); setTextScale(100); if (isSpeaking) readPage(); }}
                        className="w-full py-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-semibold underline decoration-slate-300 underline-offset-4"
                    >
                        Reset Settings
                    </button>

                </div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                aria-label="Open Accessibility Menu"
            >
                <span className="material-symbols-outlined text-3xl">accessibility_new</span>
            </button>
        </div>
    );
}
