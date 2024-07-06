import { useEffect, useRef } from "react";
import BoxReveal from "../components/client/magic/BoxReveal";
import type { ConfettiRef } from "../components/client/magic/Confetti";
import Confetti from "../components/client/magic/Confetti";
import RetroGrid from "../components/client/magic/RetroGrid";
import ShimmerButton from "../components/client/magic/ShimerButton";
import WordPullUp from "../components/client/magic/WordPullUp";
import { cn } from "../lib/utils";
import type { GameResults } from "../models/GameResults";
import { RecordService } from "../services/RecordService";
import { TimerService } from "../services/TimerService";

interface ResultDataProps {
	results: GameResults;
	children: string;
}

function ResultData({ results, children }: ResultDataProps) {
	return (
		<>
			<h2 className="text-[2rem] text-center mb-2">{children}</h2>
			<p className="boldFont text-[20px] text-white text-center mb-2">
				Max round: <span className="text-lime">{results.lastRound}</span>
			</p>
			<p className="boldFont text-[20px] text-white text-center mb-8">
				Max time:{" "}
				<span className="text-lime ">
					{TimerService.getFormattedTime(results.totalTime)}
				</span>
			</p>
		</>
	);
}

function renderResultMessage(results: GameResults) {
	const isNewRecord = RecordService.setRecord(results);
	const record = RecordService.getRecord();
	if (isNewRecord) {
		return (
			<WordPullUp
				className="mb-12 text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]"
				words="New Record"
			/>
		);
	} else {
		return (
			<>
				<WordPullUp
					className="mb-12 text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]"
					words="Good Luck Next Time"
				/>
				<ResultData results={record}>Stats:</ResultData>
			</>
		);
	}
}

interface ResultProps {
	results: GameResults;
	isOpen: boolean;
	close: () => void;
}

export default function Result({ results, isOpen, close }: ResultProps) {
	const baseStyle = "bg-black z-50 absolute overflow-hidden w-full bottom-0";
	const stateStyle = isOpen ? "h-screen" : "h-0";
	const confettiRef = useRef<ConfettiRef>(null);

	useEffect(() => {
		if (isOpen) {
			const isNewRecord = RecordService.setRecord(results);
			if (isNewRecord) {
				confettiRef.current?.fire({});
			}
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
			<div className="pointer-events-none z-20 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-5xl font-bold leading-none text-transparent">
				{renderResultMessage(results)}
				<ResultData results={results}>Your result:</ResultData>
			</div>
			<div className="flex items-center justify-center">
				<ShimmerButton className="shadow-2xl" onClick={handlePlayAgainClick}>
					<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
						Play again
					</span>
				</ShimmerButton>
			</div>
		</>
	);

	return (
		<div className={cn(baseStyle, stateStyle)}>
			<div className="relative flex flex-col h-full w-full max-w-screen items-center justify-center overflow-hidden rounded-lg bg-background p-20 md:shadow-xl">
				<Confetti
					ref={confettiRef}
					className="absolute left-0 top-0 z-0 h-full w-full"
				/>
				<BoxReveal boxColor={"#eba427"} duration={0.5}>
					{boxContent}
				</BoxReveal>

				<RetroGrid />
			</div>
		</div>
	);
}
