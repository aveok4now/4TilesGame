export class TimerService {
	private static styleMap = new Map([
		[0.2, { textStyle: "text-red-500", lineColor: "rgb(239 68 68)" }],
		[0.5, { textStyle: "text-yellow-500", lineColor: "rgb(245 158 11)" }],
		[1, { textStyle: "text-white", lineColor: "rgb(34 197 94)" }],
	]);

	static getFormattedTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
	}

	private static padZero(num: number): string {
		return num < 10 ? `0${num}` : `${num}`;
	}

	static getStyles(timerValue: number, timerStartTime: number) {
		const progress = timerValue / timerStartTime;
		for (const [threshold, styles] of this.styleMap) {
			if (progress <= threshold) {
				return styles;
			}
		}
		return { textStyle: "text-white", lineColor: "#FFFFFF" };
	}

	static calculateCircleProperties(
		time: number,
		startTime: number,
		radius: number
	) {
		const progress = 1 - time / startTime;
		const circumference = 2 * Math.PI * radius;
		const strokeDashoffset = circumference * progress;
		return { circumference, strokeDashoffset };
	}
}
