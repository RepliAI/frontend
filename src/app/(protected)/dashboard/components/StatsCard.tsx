import clsx from "clsx";

type StatCardProps = {
	label: string;
	value: number | string;
	color: string;
};

export default function StatCard({ label, value, color }: StatCardProps) {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
			<div className="flex items-start justify-between gap-2">
				<div className="space-y-1">
					<p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500">
						{label}
					</p>
					<p className="text-3xl font-semibold leading-tight text-gray-900">
						{value}
					</p>
				</div>
				<div className={clsx("flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-semibold shadow-inner", color)}>
					•
				</div>
			</div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-r from-transparent via-slate-50 to-transparent" />
		</div>
	);
}