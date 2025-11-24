export default function StatsCard({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    );
  }
  