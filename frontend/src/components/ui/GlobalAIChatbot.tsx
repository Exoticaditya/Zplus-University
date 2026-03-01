'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
    id: string;
    text: string;
    isBot: boolean;
    time: string;
}

export default function GlobalAIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', text: 'Hi there! I am Z-Bot, your AI admission counselor. How can I help you explore colleges or courses today?', isBot: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            text: userText,
            isBot: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    history: messages.slice(1) // exclude the first hard-coded greeting from user history
                })
            });
            const data = await response.json();

            setIsTyping(false);

            if (data.error) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    text: data.error,
                    isBot: true,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
                return;
            }

            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: data.text || 'I encountered an error connecting to my AI brain.',
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            setIsTyping(false);
            console.error(err);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I am currently offline. Please try again later.',
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-4 font-sans">

            {/* FLOATING CHAT BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${isOpen ? 'bg-slate-800 text-white rotate-90 scale-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110'}`}
                aria-label="Toggle AI Assistant"
            >
                <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'smart_toy'}</span>
            </button>

            {/* CHAT WINDOW */}
            <div className={`absolute bottom-20 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-80 md:w-96 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Z-Bot Assistant</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">Online</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>

                {/* Message Feed */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.isBot ? 'items-start mr-auto' : 'items-end ml-auto'}`}>
                            <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.isBot ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex flex-col max-w-[85%] items-start mr-auto">
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0"
                    >
                        <span className="material-symbols-outlined text-[18px] ml-1">send</span>
                    </button>
                </form>

            </div>
        </div>
    );
}
