export interface TicketStatsLastTickets {
    id: string;
    subject: string;
    createdAt: Date;
}

export interface TicketsPeriod {
    id: string;
    subject: string;
    createdAt: Date;
    status:  "OPEN" | "PENDING" | "RESOLVED";
}

export interface StatsSummary {
    open: number;
        pending: number;
        resolved: number;
}

export interface TicketsStatsPerdiod {
    from: Date;
    to: Date;
    tickets: TicketsPeriod[];
    summary: StatsSummary;
}
export interface TicketStatsDashboard {
    total: number;
    open: number;
    pending: number;
    resolved: number;
    lastTickets: TicketStatsLastTickets[];
    period: TicketsStatsPerdiod;
}