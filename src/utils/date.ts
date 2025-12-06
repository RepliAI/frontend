import { TicketMessage } from "@/types";

export const groupByDate = (messages: TicketMessage[]) => {
    const map = new Map<string, TicketMessage[]>();

    for (const m of messages) {
        const d = new Date(m.date);
        if (Number.isNaN(d.getTime())) continue;
        const key = d.toISOString().slice(0, 10);
        const group = map.get(key) || [];
        group.push(m);
        map.set(key, group);
    }

    const entries = Array.from(map.entries()).sort(
        ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
    );

    return entries;
}