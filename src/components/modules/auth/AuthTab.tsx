import { AuthMode } from "@/types";

interface AuthTabProps {
    label: string;
	mode: AuthMode;
	current: AuthMode;
	onClick: (m: AuthMode) => void;
}
export default function AuthTab({ label, mode, current, onClick }: AuthTabProps) {
	const active = current === mode;
	return (
		<button
			type="button"
			onClick={() => onClick(mode)}
			className={`flex-1 px-4 py-1.5 rounded-full transition ${active
					? 'bg-white shadow-sm text-gray-900'
					: 'text-gray-500 hover:text-gray-700'
				}`}
		>
			{label}
		</button>
	);
}