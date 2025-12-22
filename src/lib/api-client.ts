import { handleUnauthorized } from './auth-utils';

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            await handleUnauthorized();
            throw new Error('Session expirée. Redirection en cours...');
        }
        
        const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}