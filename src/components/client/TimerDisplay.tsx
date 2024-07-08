import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { TimerService } from "../../services/TimerService";
import LinearGradient from "./magic/LinearGradient";

interface TimerDisplayProps {
	time: number;
	startTime: number;
}

export function TimerDisplay({ time, startTime }: TimerDisplayProps) {
	const radius = 30;
	const { circumference, strokeDashoffset } =
		TimerService.calculateCircleProperties(time, startTime, radius);
	const { textStyle, lineColor } = TimerService.getStyles(time, startTime);

	return (
		<div className="relative flex size-16 md:size-24">
			<LinearGradient className="rounded-full [width:85%!important] [height:85%!important] [inset:5px!important]" />
			<svg className="w-full transform -rotate-90">
				<circle
					cx="50%"
					cy="50%"
					r={radius}
					stroke="#E5E7EB"
					strokeWidth="4"
					fill="none"
				/>
				<motion.circle
					cx="50%"
					cy="50%"
					r={radius}
					stroke={lineColor}
					strokeWidth="4"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					fill="none"
					initial={{ strokeDashoffset: 0 }}
					animate={{ strokeDashoffset }}
					transition={{ duration: 0.5 }}
				/>
			</svg>
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
				<motion.div
					className={cn("text-2xl font-bold", textStyle)}
					key={time}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", stiffness: 400, damping: 35 }}
				>
					{time}
				</motion.div>
			</div>
		</div>
	);
}
