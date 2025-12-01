import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { connected: false },
      { status: 200 },
    );
  }

  const backendUrl = process.env.BACKEND_URL;

  const res = await fetch(`${backendUrl}/gmail/status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { connected: false },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(
    { connected: !!data.connected },
    { status: 200 },
  );
}