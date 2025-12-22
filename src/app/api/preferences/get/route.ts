import { NextResponse } from "next/server";

import { getAuthHeaders, updateCookiesFromResponse } from "@/lib/api-route-helper";

export async function GET() {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders.Authorization) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const backend = process.env.BACKEND_URL;
  const res = await fetch(`${backend}/preferences`, {
    headers: authHeaders,
    cache: "no-store",
  });
  
  const data = await res.json();
  const nextResponse = NextResponse.json(data, { status: res.status });
  return updateCookiesFromResponse(res, nextResponse);
}