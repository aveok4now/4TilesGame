import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BorderBeam } from "../components/client/magic/BorderBeam";
import Confetti, {
	type ConfettiRef,
} from "../components/client/magic/Confetti";
import { Statistics } from "../components/client/Statistics";
import { TilesBoard } from "../components/client/TilesBoard";
import { tiles } from "../config";
import { useTimer } from "../hooks/useTimer";
import { cn } from "../lib/utils";
import type { GameConfig } from "../models/GameConfig";
import ResultsScreen from "../screens/ResultsScreen";
import { GameService } from "../services/GameService";
import { TimerService } from "../services/TimerService";

interface GameScreenProps {
	config: GameConfig;
}

export function GameScreen({ config }: GameScreenProps) {
	const [round, setRound] = useState(1);
	const [timerStartTime, setTimerStartTime] = useState(config.gameTimeSec);
	const [matchedCount, setMatchedCount] = useState(0);
	const [isResultShowed, setResultShowed] = useState(false);
	const [attempt, setAttempt] = useState(1);
	const [roundPassed, setRoundPassed] = useState(false);
	const confettiRef = useRef<ConfettiRef>(null);

	const timer = useTimer(() => {
		setResultShowed(true);
	});

	useEffect(() => {
		timer.refresh(config.gameTimeSec);
		setRoundPassed(false);
	}, [config.gameTimeSec]);

	const handleSolve = useCallback(() => {
		if (timer.isExpired) return;
		setMatchedCount(0);
		setRound((prev) => prev + 1);

		const newStartTime = GameService.calculateNewStartTime(
			timerStartTime,
			config
		);
		setTimerStartTime(newStartTime);
		timer.refresh(newStartTime);
		setRoundPassed(true);
		confettiRef.current?.fire({});

		setTimeout(() => {
			setRoundPassed(false);
		}, 3000);
	}, [config, timer, timerStartTime]);

	const handleCloseResults = useCallback(async function () {
		setResultShowed(false);
		setTimerStartTime(config.gameTimeSec);
		setMatchedCount(0);
		setAttempt((prev) => prev + 1);

		await new Promise((res) => setTimeout(res, 100));
		setRound(1);
		timer.clear();
		timer.refresh(config.gameTimeSec);
	}, []);

	const results = useMemo(() => {
		return { totalTime: timer.totalTime, lastRound: round };
	}, [isResultShowed]);

	const timeStyle = TimerService.getTimeStyle(timer.value, timerStartTime);

	return (
		<>
			{roundPassed && (
				<Confetti
					ref={confettiRef}
					className="absolute left-0 top-0 z-0 h-full w-full"
				/>
			)}
			<div
				className="mx-auto md:w-full max-w-[35rem] sm:w-[95%]  overflow-hidden p-4"
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
				<Statistics className="mt-4 text-white">
					{matchedCount + " / " + config.cards}
				</Statistics>
			</div>

			{timer.isExpired && (
				<ResultsScreen
					isOpen={isResultShowed}
					close={handleCloseResults}
					results={results}
				/>
			)}
		</>
	);
}
