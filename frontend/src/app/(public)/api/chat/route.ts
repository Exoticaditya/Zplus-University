import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
// We initialize it inside the handler to ensure it picks up the key at runtime if needed,
// but doing it at the top level is fine as long as the env var is available.
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
    if (!apiKey || apiKey === 'your_key_here') {
        return new Response(JSON.stringify({ error: 'Gemini API Key is missing or invalid. Please update .env.local' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { message, history } = await req.json();

        // Use the Gemini 1.5 Flash model for fast chat responses
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const systemPrompt = `You are Z-Bot, the official AI admission counselor for Zpluse University.
Zpluse University is an elite Next-Gen Learning Management System uniting Administrators, Teachers, and Students.
Key facts:
- Over 500+ Top Colleges listed.
- Over 10k+ Active Students.
- 98% Placement Rate.
- You provide 24/7 AI Support.
- We have a Mega Filter tool for finding colleges in the directory.
- Features include: immersive Virtual 360 Campus Tours, dual-pane cinematic LMS viewer, secure material upload, and UGC Approved Global Network.

Answer user queries concisely, professionally, and enthusiastically. Keep answers short (2-3 sentences max) unless detail is specifically requested.`;

        // We construct the chat context
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am Z-Bot, ready to assist.' }]
                },
                ...(history || []).map((msg: any) => ({
                    role: msg.isBot ? 'model' : 'user',
                    parts: [{ text: msg.text }]
                }))
            ]
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return new Response(JSON.stringify({ text: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process AI request', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
