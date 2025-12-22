import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function POST(req: Request) {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { priceId, plan } = body || {};

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing priceId" },
      { status: 400 },
    );
  }

  const backendUrl = process.env.BACKEND_URL!;
  const res = await fetch(`${backendUrl}/billing/checkout`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priceId, plan }),
  });

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: res.status });
  return updateCookiesFromResponse(res, nextResponse);
}