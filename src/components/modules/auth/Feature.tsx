export default function Feature({ title, desc }: { title: string; desc: string }) {
        return (
            <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900">{title}</div>
                <div className="text-xs text-gray-600">{desc}</div>
            </div>
        );
    }