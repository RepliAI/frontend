import { apiFetch } from "@/lib/api-client";
import { TicketListResponse } from "@/types";

export const ticketService = {
    getTickets() {
        const searchParams = new URLSearchParams();
        return apiFetch<TicketListResponse>(`/api/tickets?${searchParams}`, {
            method: "GET",
        });
    },
};