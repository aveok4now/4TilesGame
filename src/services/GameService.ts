import type { GameConfig } from "../models/GameConfig";

export class GameService {
	static calculateNewStartTime(
		currentTime: number,
		config: GameConfig
	): number {
		return Math.max(config.minTime, currentTime - config.timeDecreasment);
	}

	static isGameSolved(matchedCount: number, totalCouples: number): boolean {
		return matchedCount === totalCouples;
	}
}
