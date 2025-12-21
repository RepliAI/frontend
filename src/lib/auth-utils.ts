'use client';

let isRedirecting = false;

export async function handleUnauthorized(): Promise<void> {
    if (isRedirecting) {
        return;
    }
    
    isRedirecting = true;
    
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        window.location.href = '/authentication';
    }
}