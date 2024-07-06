import type { GameConfig } from "../models/GameConfig";

export class GameService {
	static calculateNewStartTime(
		currentTime: number,
		config: GameConfig
	): number {
		return Math.max(config.minGameTime, currentTime - config.timeDecreaseValue);
	}

	static isGameSolved(matchedCount: number, totalCouples: number): boolean {
		return matchedCount === totalCouples;
	}
}
