import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function POST(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const authHeaders = await getAuthHeaders();

    const res = await fetch(
        `${process.env.BACKEND_URL}/tickets/${id}/generate-reply`,
        {
            method: "POST",
            headers: authHeaders,
        }
    );

    const text = await res.text();
    const nextResponse = new NextResponse(text, { status: res.status });
    return updateCookiesFromResponse(res, nextResponse);
}