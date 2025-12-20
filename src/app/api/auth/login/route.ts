import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    console.log("🚀 ~ POST ~ response:", response)

    if(!response.ok) {
        return NextResponse.json({ message: "Un problème est survenu lors de l'authentification, veuillez contacter le support client"}, { status: response.status });
    }
    const data = await response.json();

    const res = NextResponse.json({ success: true });
    
    res.cookies.set('access_token', data.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });
    
      res.cookies.set('refresh_token', data.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });
    
    return res;
}