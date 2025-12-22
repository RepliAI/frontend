import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

const BACKEND = process.env.BACKEND_URL!;

export async function POST() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BACKEND}/auth/logout-all`, {
    method: "POST",
    headers: authHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    const errorResponse = NextResponse.json(
      { error: error.message || "Failed to logout all devices" },
      { status: res.status }
    );
    return updateCookiesFromResponse(res, errorResponse);
  }

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: 200 });
  return updateCookiesFromResponse(res, nextResponse);
}
