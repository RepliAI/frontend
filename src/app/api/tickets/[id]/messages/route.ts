import { cookies } from "next/headers";

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    const { id } = await context.params;
    const token = (await cookies()).get("access_token")?.value;

    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/tickets/${id}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return new Response(await res.text(), { status: res.status });
}