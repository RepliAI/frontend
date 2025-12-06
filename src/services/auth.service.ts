import { apiFetch } from "@/lib/api-client";
import { LoginResponse } from "@/types";

export const authService = {
    login(email: string, password: string) {
        return apiFetch<LoginResponse>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },
    register(email: string, password: string) {
        const body = {
            email,
            password
        }
        return apiFetch<LoginResponse>("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
};