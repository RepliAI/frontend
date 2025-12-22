import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
	const { params } = context;
	const resolvedParams = await params;

	const authHeaders = await getAuthHeaders();
	const body = await req.json();

	const res = await fetch(`${process.env.BACKEND_URL}/tickets/${resolvedParams.id}/status`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			...authHeaders,
		},
		body: JSON.stringify(body),
	});

	const text = await res.text();
	const nextResponse = new NextResponse(text, { status: res.status });
	return updateCookiesFromResponse(res, nextResponse);
}