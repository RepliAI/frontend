import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET(req: Request) {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders.Authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const days = url.searchParams.get("days") || "14";

    const res = await fetch(`${process.env.BACKEND_URL}/stats?days=${days}`, {
        headers: authHeaders,
        cache: "no-store",
    });

    const data = await res.json();
    const nextResponse = NextResponse.json(data, { status: res.status });
    return updateCookiesFromResponse(res, nextResponse);
}