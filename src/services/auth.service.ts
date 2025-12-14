import { apiFetch } from "@/lib/api-client";
import { LoginResponse, RegisterResponse } from "@/types";

export const authService = {
    login(email: string, password: string): Promise<LoginResponse> {
        return apiFetch<LoginResponse>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },
    register(email: string, password: string): Promise<RegisterResponse> {
        const body = {
            email,
            password
        }
        return apiFetch<RegisterResponse>("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
    resetPassword(token: string, password: string) {
        const body = {
            token,
            password
        }
        return apiFetch<LoginResponse>("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
    forgotPassword(email: string) {
        const body = {
            email
        }
        return apiFetch<LoginResponse>("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
    confirmEmailChange(token: string) {
        return apiFetch(`/api/auth/confirm-email-change?token=${encodeURIComponent(token)}`, {
            method: "POST",
        });
    },
};