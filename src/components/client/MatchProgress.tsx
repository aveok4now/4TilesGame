import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface MatchProgressProps {
	matchedCount: number;
	totalCards: number;
}

export function MatchProgress({
	matchedCount,
	totalCards,
}: MatchProgressProps) {
	const progressWidth = (matchedCount / totalCards) * 100;

	return (
		<div className="mt-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-white text-sm font-medium">Progress</span>
				<span className="text-white text-sm font-medium">{`${matchedCount} / ${totalCards}`}</span>
			</div>
			<div className="bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
				<motion.div
					className="bg-blue-600 h-4"
					initial={{ width: 0 }}
					animate={{ width: `${progressWidth}%` }}
					transition={{ duration: 0.5 }}
				/>
			</div>
			<div className="flex mt-2 space-x-1">
				{[...Array(totalCards)].map((_, index) => (
					<motion.div
						key={index}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: index * 0.1 }}
					>
						<CheckCircle2
							size={16}
							className={`${
								index < matchedCount
									? "text-green-500"
									: "text-gray-300 dark:text-gray-600"
							}`}
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
}
