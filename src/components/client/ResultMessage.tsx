import type { GameResults } from "../../models/GameResults";
import { RecordService } from "../../services/RecordService";
import WordPullUp from "./magic/WordPullUp";
import ResultData from "./ResultData";

function ResultMessage({ results }: { results: GameResults }) {
	const isNewRecord = RecordService.setRecord(results);
	const record = RecordService.getRecord();

	const renderWordPullUp = (words: string) => (
		<WordPullUp
			className="mb-12 text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]"
			words={words}
		/>
	);

	return (
		<>
			{renderWordPullUp(isNewRecord ? "New Record" : "Good Luck Next Time")}
			{!isNewRecord && <ResultData results={record}>Stats:</ResultData>}
		</>
	);
}

export default ResultMessage;
