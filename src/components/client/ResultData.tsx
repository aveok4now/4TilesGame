import type { GameResults } from "../../models/GameResults";
import { TimerService } from "../../services/TimerService";
import SparklesText from "./magic/SparklesText";
import WordPullUp from "./magic/WordPullUp";

interface ResultDataProps {
	results: GameResults;
	children: string;
}

function ResultData({ results, children }: ResultDataProps) {
	return (
		<>
			<SparklesText
				sparklesCount={1}
				text={children as string}
				className="mb-4"
			/>

			<WordPullUp
				words={`Max round: ${results.lastRound}`}
				className="text-black/90 dark:text-white leading-[3rem]"
			/>

			<WordPullUp
				words={`Max time: ${TimerService.getFormattedTime(results.totalTime)}`}
				className="text-black/90 dark:text-white leading-[3rem] mb-4"
			/>
		</>
	);
}

export default ResultData;
