import { useCallback, useRef, useState } from "react";

export function useTimer(onTimeEnd: () => void) {
	const [value, setTimerValue] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const isExpired = useRef<boolean>(false);
	const timer = useRef<number>();

	const clear = useCallback(() => {
		setTimerValue(0);
		setTotalTime(0);
		clearInterval(timer.current);
	}, []);

	const refresh = useCallback(
		(startTime: number) => {
			isExpired.current = false;
			clearInterval(timer.current);
			setTimerValue(startTime);
			timer.current = window.setInterval(() => {
				setTotalTime((prev) => prev + 1);
				setTimerValue((prev) => {
					const newValue = prev - 1;
					if (newValue <= 0) {
						clearInterval(timer.current);
						onTimeEnd();
						isExpired.current = true;
					}
					return newValue;
				});
			}, 1000);
		},
		[onTimeEnd]
	);

	return {
		value,
		totalTime,
		refresh,
		clear,
		isExpired: isExpired.current,
	};
}
