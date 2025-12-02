import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import BillingPlans from "./components/BillingPlans";

export const revalidate = 0;

export default async function BillingPage() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return notFound();

  const backend = process.env.BACKEND_URL!;
  const res = await fetch(`${backend}/billing/subscription`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const subscription = res.ok
    ? await res.json()
    : { plan: "free", status: "active", renewAt: null };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold">Abonnement</h1>
        <p className="text-sm text-gray-500">
          Gérez votre abonnement à l’assistant de support IA.
        </p>
      </div>

      <BillingPlans current={subscription} />
    </div>
  );
}