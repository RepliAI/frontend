import { apiFetch } from "@/lib/api-client";
import { CheckoutUrlResponse, Subscription } from "@/types";

export const billingService = {
    async getSubscription(): Promise<Subscription> {
        return await apiFetch<Subscription>("/api/billing/subscription");
    },
    async getCheckoutUrl(priceId: string, plan: string): Promise<CheckoutUrlResponse> {
        const body = {
            priceId,
            plan,
        }
        return await apiFetch<CheckoutUrlResponse>('/api/billing/checkout', {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
};