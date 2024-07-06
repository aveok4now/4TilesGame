import { useCallback, useEffect, useMemo, useState } from "react";
import { BorderBeam } from "../components/BorderBeam";
import { Statistics } from "../components/Statistics";
import { TilesBoard } from "../components/TilesBoard";
import { tiles } from "../config";
import { useTimer } from "../hooks/useTimer";
import { cn } from "../lib/utils";
import type { GameConfig } from "../models/GameConfig";
import Result from "../screens/ResultsScreen";
import { GameService } from "../services/GameService";
import { TimerService } from "../services/TimerService";

interface GameScreenProps {
	config: GameConfig;
}

export function GameScreen({ config }: GameScreenProps) {
	const [round, setRound] = useState(1);
	const [timerStartTime, setTimerStartTime] = useState(config.startTime);
	const [matchedCount, setMatchedCount] = useState(0);
	const [isResultShowed, setResultShowed] = useState(false);
	const [attempt, setAttempt] = useState(1);

	const timer = useTimer(() => {
		setResultShowed(true);
	});

	useEffect(() => {
		timer.refresh(config.startTime);
	}, []);

	function handleSolve() {
		if (timer.isExpired) return;
		setMatchedCount(0);
		setRound((prev) => prev + 1);
		const newStartTime = GameService.calculateNewStartTime(
			timerStartTime,
			config
		);
		setTimerStartTime(newStartTime);
		timer.refresh(newStartTime);
	}

	const handleCloseResults = useCallback(async function () {
		setResultShowed(false);
		setTimerStartTime(config.startTime);
		setMatchedCount(0);
		setAttempt((prev) => prev + 1);

		await new Promise((res) => setTimeout(res, 100));
		setRound(1);
		timer.clear();
		timer.refresh(config.startTime);
	}, []);

	const results = useMemo(() => {
		return { totalTime: timer.totalTime, lastRound: round };
	}, [isResultShowed]);

	const timeStyle = (() => {
		if (timer.value <= timerStartTime / 5) return "text-red";
		if (timer.value <= timerStartTime / 2) return "text-yellow";
		return "text-white";
	})();

	return (
		<>
			<div
				className="mx-auto md:w-full max-w-[35rem] sm:w-[95%] mt-10 min-h-screen overflow-hidden"
				id="gameScreen"
			>
				<div className="flex justify-between mb-4">
					<Statistics className="[width:calc(50%-.25rem)] text-white">
						{"Round " + round}
					</Statistics>
					<Statistics className={cn("[width:calc(50%-.25rem)]", timeStyle)}>
						{TimerService.getFormattedTime(timer.value)}
						<BorderBeam size={250} duration={12} delay={9} />
					</Statistics>
				</div>
				<TilesBoard
					config={config}
					tiles={tiles}
					onSolve={handleSolve}
					matchedCount={matchedCount}
					setMatchedCount={setMatchedCount}
					attempt={attempt}
				/>
				{!isResultShowed && (
					<Statistics className="mt-4 text-white">
						{matchedCount + " / " + config.couples}
					</Statistics>
				)}
			</div>

			<Result
				isOpen={isResultShowed}
				close={handleCloseResults}
				results={results}
			/>
		</>
	);
}
