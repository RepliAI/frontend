import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

const BACKEND = process.env.BACKEND_URL!;

export async function GET() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { status: null, planId: null, renewAt: null },
      { status: 200 },
    );
  }

  const res = await fetch(`${BACKEND}/billing/subscription`, {
    headers: authHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const errorResponse = NextResponse.json(
      { status: null, planId: null, renewAt: null },
      { status: res.status },
    );
    return updateCookiesFromResponse(res, errorResponse);
  }

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: 200 });
  return updateCookiesFromResponse(res, nextResponse);
}

export async function DELETE() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BACKEND}/billing/subscription`, {
    method: "DELETE",
    headers: authHeaders,
  });

  if (!res.ok) {
    const text = await res.text();
    const errorResponse = NextResponse.json({ error: text }, { status: res.status });
    return updateCookiesFromResponse(res, errorResponse);
  }

  const nextResponse = NextResponse.json({ ok: true }, { status: 200 });
  return updateCookiesFromResponse(res, nextResponse);
}