import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function POST() {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders.Authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = process.env.BACKEND_URL!;
    const res = await fetch(`${backendUrl}/billing/free`, {
        method: "POST",
        headers: {
            ...authHeaders,
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    const nextResponse = NextResponse.json(data, { status: res.status });
    return updateCookiesFromResponse(res, nextResponse);
}