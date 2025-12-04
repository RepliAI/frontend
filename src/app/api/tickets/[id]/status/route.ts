import { cookies } from "next/headers";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
	const { params } = context;
	const resolvedParams = await params;

	const token = (await cookies()).get("access_token")?.value;
	const body = await req.json();

	const res = await fetch(`${process.env.BACKEND_URL}/tickets/${resolvedParams.id}/status`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		}
	);

	return new Response(await res.text(), { status: res.status });
}