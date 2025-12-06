export interface Subscription {
    plan: "free" | "pro" | "business";
    status: "active" | "canceled" | "incomplete" | "past_due";
    renewAt: string | null;
}

export interface BillingCheckoutResponse {
    url?: string;
    message?: string;
}

export interface CheckoutUrlResponse {
    url: null | string
}