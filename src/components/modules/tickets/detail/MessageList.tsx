"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { LoaderBubble } from "./LoaderBubble";

export function MessageList({
    messages,
    loading,
}: {
    messages: any[];
    loading?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <div
            ref={containerRef}
            className="max-h-[60vh] overflow-y-auto pr-2 space-y-4"
        >
            {messages.map((m) => (
                <MessageBubble
                    key={m.id}
                    from={m.from}
                    content={m.content}
                    date={m.date}
                />
            ))}

            {loading && <LoaderBubble />}
        </div>
    );
}

