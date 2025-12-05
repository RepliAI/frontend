import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const days = url.searchParams.get("days") || "14";

    const res = await fetch(`${process.env.BACKEND_URL}/stats?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}