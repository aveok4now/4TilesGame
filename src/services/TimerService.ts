export class TimerService {
	static getFormattedTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
	}

	private static padZero(num: number): string {
		return num < 10 ? `0${num}` : `${num}`;
	}
}
