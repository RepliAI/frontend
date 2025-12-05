import { apiFetch } from "@/lib/api-client";
import { TicketStatsDashboard } from "@/types/dashboard.type";

export const dashboardService = {
  getStats(days: number): Promise<TicketStatsDashboard> {
    return apiFetch<TicketStatsDashboard>(`/api/dashboard/stats?days=${days}`, {
        method: 'GET'
    });
  }
};
