import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if(!response.ok) {
        return NextResponse.json({ message: "Un problème est survenu lors de l'inscription, veuillez contacter le support client"}, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    
    return res;
}