import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.toString();

    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${process.env.BACKEND_URL}/tickets?${query}`, {
        headers: authHeaders,
    });

    const data = await res.json();
    const nextResponse = NextResponse.json(data, { status: res.status });
    return updateCookiesFromResponse(res, nextResponse);
}
