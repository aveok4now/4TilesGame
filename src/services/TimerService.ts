export class TimerService {
	static getFormattedTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
	}

	private static padZero(num: number): string {
		return num < 10 ? `0${num}` : `${num}`;
	}

	static getTimeStyle(timerValue: number, timerStartTime: number) {
		const styleMap = new Map([
			[timerStartTime / 5, "text-red-300"],
			[timerStartTime / 2, "text-yellow-300"],
		]);

		for (const [threshold, style] of styleMap) {
			if (timerValue <= threshold) {
				return style;
			}
		}

		return "text-white";
	}
}
