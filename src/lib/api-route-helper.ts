import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getAuthHeaders(): Promise<{
    Authorization?: string;
    'X-Refresh-Token'?: string;
}> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const headers: {
        Authorization?: string;
        'X-Refresh-Token'?: string;
    } = {};

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
        headers['X-Refresh-Token'] = refreshToken;
    }

    return headers;
}

export function updateCookiesFromResponse(
    response: Response,
    nextResponse: NextResponse
): NextResponse {
    const newAccessToken = response.headers.get('X-New-Access-Token');
    const newRefreshToken = response.headers.get('X-New-Refresh-Token');

    if (newAccessToken) {
        nextResponse.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    }

    if (newRefreshToken) {
        nextResponse.cookies.set('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    }

    return nextResponse;
}
