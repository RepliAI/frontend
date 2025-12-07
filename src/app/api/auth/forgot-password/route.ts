import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(
            { message: "Email manquant." },
            { status: 400 }
        );
    }

    const backend = process.env.BACKEND_URL;

    const res = await fetch(`${backend}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("🚀 ~ POST ~ data:", data)

    return NextResponse.json(data, { status: res.status });
}