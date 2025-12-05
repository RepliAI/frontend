import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const url = new URL(req.url);
    const query = url.searchParams.toString();

    const res = await fetch(`${process.env.BACKEND_URL}/tickets?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
