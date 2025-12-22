import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

const BACKEND = process.env.BACKEND_URL!;

export async function POST(req: Request) {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const res = await fetch(`${BACKEND}/profile/change-email-request`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    const errorResponse = NextResponse.json(
      { error: error.message || "Failed to request email change" },
      { status: res.status }
    );
    return updateCookiesFromResponse(res, errorResponse);
  }

  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: 200 });
  return updateCookiesFromResponse(res, nextResponse);
}