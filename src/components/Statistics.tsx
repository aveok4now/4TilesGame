import { cn } from "../lib/utils";
import LinearGradient from "./LinearGradient";

interface StatisticsProps {
	children: React.ReactNode;
	className?: string;
}

export function Statistics({ children, className = "" }: StatisticsProps) {
	return (
		<div
			className={cn(
				"relative bg-black h-20 flex items-center justify-center font-bold rounded-md",
				className
			)}
		>
			<LinearGradient className="rounded-md border" />
			{children}
		</div>
	);
}
