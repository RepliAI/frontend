"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
	icon: ReactNode;
	title: string;
	subtitle?: string;
}

export function PageHeader({ icon, title, subtitle }: PageHeaderProps) {
	return (
		<div className="mb-8">
			<div className="flex items-center gap-3">
				<div className="h-10 w-10 rounded-full  bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
					{icon}
				</div>
				<div>
					<h1 className="text-3xl font-semibold tracking-tight text-gray-900">
						{title}
					</h1>
					{subtitle && (
						<p className="text-gray-500 text-sm mt-0.5">
							{subtitle}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}