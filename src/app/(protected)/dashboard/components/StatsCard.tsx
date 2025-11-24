export default function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`p-6 text-white rounded-xl shadow-sm ${color}`}>
      <span className="text-sm opacity-80">{label}</span>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}
  