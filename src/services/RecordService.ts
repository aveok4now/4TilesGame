import type { GameResults } from "../models/GameResults";

const RECORD_ROUND_LABEL = "recordRound";
const RECORD_TIME_LABEL = "recordTime";

export class RecordService {
	static isRecord(results: GameResults): boolean {
		const record = this.getRecord();
		if (record.lastRound > results.lastRound) return false;
		if (record.lastRound < results.lastRound) return true;
		return record.totalTime > results.totalTime;
	}

	static getRecord(): GameResults {
		if (typeof window === "undefined") {
			return { lastRound: 0, totalTime: 0 };
		}
		return {
			lastRound: Number(localStorage.getItem(RECORD_ROUND_LABEL) ?? 0),
			totalTime: Number(localStorage.getItem(RECORD_TIME_LABEL) ?? 0),
		};
	}

	static setRecord(results: GameResults): boolean {
		if (typeof window === "undefined" || !this.isRecord(results)) return false;
		localStorage.setItem(RECORD_ROUND_LABEL, String(results.lastRound));
		localStorage.setItem(RECORD_TIME_LABEL, String(results.totalTime));
		return true;
	}
}
