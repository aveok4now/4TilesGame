import { useEffect, useRef } from "react";
import BoxReveal from "../components/client/magic/BoxReveal";
import type { ConfettiRef } from "../components/client/magic/Confetti";
import Confetti from "../components/client/magic/Confetti";
import RetroGrid from "../components/client/magic/RetroGrid";
import ShimmerButton from "../components/client/magic/ShimerButton";
import ResultData from "../components/client/ResultData";
import ResultMessage from "../components/client/ResultMessage";
import { cn } from "../lib/utils";
import type { GameResults } from "../models/GameResults";
import { RecordService } from "../services/RecordService";

interface ResultProps {
	results: GameResults;
	isOpen: boolean;
	close: () => void;
}

export default function ResultsScreen({ results, isOpen, close }: ResultProps) {
	const baseStyle =
		"bg-purple-300 dark:bg-black z-50 absolute overflow-x-hidden w-full bottom-0";
	const stateStyle = isOpen ? "h-screen" : "h-0";
	const confettiRef = useRef<ConfettiRef>(null);
	const isNewRecord = RecordService.isRecord(results);

	useEffect(() => {
		if (isOpen) {
			if (isNewRecord) confettiRef.current?.fire({});
			const gameScreen = document.getElementById("gameScreen");
			if (gameScreen) gameScreen.classList.add("hidden");
		}
	}, [results, isOpen]);

	const handlePlayAgainClick = () => {
		const gameScreen = document.getElementById("gameScreen");
		if (gameScreen) gameScreen?.classList.remove("hidden");
		close();
	};

	const boxContent = (
		<>
			<div className="pointer-events-none z-20 whitespace-pre-wrap bg-gradient-to-b from-[#8c1eff] dark:from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-4xl font-bold leading-none text-transparent">
				<ResultMessage results={results} />
				<ResultData results={results}>Your result:</ResultData>
			</div>
			<div className="flex items-center justify-center">
				<ShimmerButton
					className="shadow-xl w-64 h-16"
					onClick={handlePlayAgainClick}
				>
					<span className="whitespace-pre-wrap text-center text-xl font-regular leading-none tracking-tight text-white dark:from-white dark:to-slate-900/50 lg:text-lg">
						Play again
					</span>
				</ShimmerButton>
			</div>
		</>
	);

	return (
		<>
			<div className={cn(baseStyle, stateStyle)}>
				{isNewRecord && (
					<Confetti
						ref={confettiRef}
						className="absolute left-0 top-0 z-0 h-full w-full"
					/>
				)}

				<div className="relative flex flex-col h-full w-full max-w-screen items-center justify-center overflow-hidden rounded-lg bg-background p-20 md:shadow-xl">
					<BoxReveal boxColor={"#eba427"} duration={0.5}>
						{boxContent}
					</BoxReveal>
					<RetroGrid />
				</div>
			</div>
		</>
	);
}
