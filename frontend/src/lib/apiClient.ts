import { supabase } from './supabaseClient';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    // Always grab fresh session to ensure valid JWT
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
    });

    let data;
    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    if (!response.ok) {
        throw new Error(data?.message || 'API Error');
    }
    return data;
}

// ── Axios-compatible default export ────────────────────────────────────────
// Allows both:
//   import { fetchApi } from '@/lib/apiClient'          (named, existing pattern)
//   import apiClient from '@/lib/apiClient'             (default, axios-style)
const apiClient = {
    get: (endpoint: string, options?: RequestInit) =>
        fetchApi(endpoint, { method: 'GET', ...options }),

    post: (endpoint: string, body: unknown, options?: RequestInit) =>
        fetchApi(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        }),

    put: (endpoint: string, body: unknown, options?: RequestInit) =>
        fetchApi(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options,
        }),

    patch: (endpoint: string, body: unknown, options?: RequestInit) =>
        fetchApi(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
            ...options,
        }),

    delete: (endpoint: string, options?: RequestInit) =>
        fetchApi(endpoint, { method: 'DELETE', ...options }),
};

export default apiClient;
