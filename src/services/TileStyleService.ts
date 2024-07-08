import { cn } from "../lib/utils";
import type { TileState } from "../models/Tile";

export class TileStyleService {
	static getBaseWrapperStyles(): string {
		return "rounded-lg w-full aspect-square cursor-pointer flex items-center justify-center relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105";
	}

	static getStateStyles(state: TileState): string {
		return cn(
			state === "active" &&
				"rotate-y-180 pointer-events-none border-none bg-gradient-to-br from-blue-400 to-purple-500",
			state === "hidden" &&
				"bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 pointer-events-none opacity-50",
			state === "closed" &&
				"rotate-y-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
		);
	}

	static getPlaceholderStateStyles(state: TileState): string {
		return cn(
			state === "active" && "opacity-0",
			state === "closed" && "opacity-100"
		);
	}

	static getImgStateStyles(state: TileState): string {
		return cn(
			state === "active" && "opacity-100",
			state === "closed" && "opacity-0",
			state === "hidden" && "opacity-0"
		);
	}

	static getPlaceholderImgStyles(state: TileState): string {
		return cn(
			"absolute transition-all duration-300 h-[50%] object-cover filter drop-shadow-md",
			this.getPlaceholderStateStyles(state),
			state === "hidden" && "hidden"
		);
	}

	static getMainImgStyles(state: TileState): string {
		return cn(
			"absolute transition-all h-[97%] duration-300 object-cover rotate-y-180 filter drop-shadow-lg rounded-md",
			this.getImgStateStyles(state)
		);
	}

	static getActiveGlowStyles(): string {
		return "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-300 active:after:opacity-20";
	}
}
