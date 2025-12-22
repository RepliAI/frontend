import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { connected: false },
      { status: 200 },
    );
  }

  const backendUrl = process.env.BACKEND_URL;

  const res = await fetch(`${backendUrl}/gmail/status`, {
    method: "GET",
    headers: authHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const errorResponse = NextResponse.json(
      { connected: false },
      { status: res.status },
    );
    return updateCookiesFromResponse(res, errorResponse);
  }

  const data = await res.json();
  const nextResponse = NextResponse.json(
    { connected: !!data.connected },
    { status: 200 },
  );
  return updateCookiesFromResponse(res, nextResponse);
}