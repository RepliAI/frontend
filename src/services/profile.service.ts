import { apiFetch } from "@/lib/api-client";
import { Profile } from "@/types";

export const profileService = {
    getProfile(): Promise<Profile> {
        return apiFetch<Profile>("/api/profile");
    },
    changeEmailRequest(newEmail: string): Promise<void> {
        return apiFetch<void>("/api/profile/change-email-request", {
            method: "POST",
            body: JSON.stringify({ newEmail }),
        });
    },
    deleteAccount(): Promise<void> {
        return apiFetch<void>("/api/profile", {
            method: "DELETE",
        });
    }
};