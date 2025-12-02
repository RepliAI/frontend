import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { priceId } = body || {};
  console.log("🚀 ~ POST ~ priceId:", priceId)

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
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ priceId }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}