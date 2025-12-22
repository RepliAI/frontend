import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const authHeaders = await getAuthHeaders();

    if (!authHeaders.Authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}`, {
        headers: authHeaders,
        cache: "no-store",
    });

    const data = await res.json();
    const nextResponse = NextResponse.json(data, { status: res.status });
    return updateCookiesFromResponse(res, nextResponse);
}