import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

const BACKEND = process.env.BACKEND_URL!;

export async function GET() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BACKEND}/profile`, {
    headers: authHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    const errorResponse = NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: res.status }
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
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BACKEND}/profile`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    const errorResponse = NextResponse.json(
      { error: error.message || "Failed to delete account" },
      { status: res.status }
    );
    return updateCookiesFromResponse(res, errorResponse);
  }

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: 200 });
  return updateCookiesFromResponse(res, nextResponse);
}
