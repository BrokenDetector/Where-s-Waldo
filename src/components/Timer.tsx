import { GameContext, TGameContext } from "@/hooks/GameContext";
import { FC, useCallback, useContext, useEffect, useRef } from "react";

interface TimerProps {
	game: boolean;
}

const Timer: FC<TimerProps> = ({ game }) => {
	const { setScore } = useContext(GameContext) as TGameContext;
	const timerRef = useRef<HTMLParagraphElement>(null);
	const startTimeRef = useRef<number | null>(null);
	const animationFrameRef = useRef<number | null>(null);

	const formatTime = (milliseconds: number): string => {
		const minutes = Math.floor(milliseconds / (1000 * 60))
			.toString()
			.padStart(2, "0");
		const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
			.toString()
			.padStart(2, "0");
		const ms = Math.floor(milliseconds % 1000)
			.toString()
			.padStart(3, "0");
		return `${minutes}:${seconds}:${ms}`;
	};

	const updateTimer = useCallback(() => {
		if (!startTimeRef.current || !timerRef.current) return;

		const elapsed = Date.now() - startTimeRef.current;
		timerRef.current.textContent = `Time: ${formatTime(elapsed)}`;

		animationFrameRef.current = requestAnimationFrame(updateTimer);
	}, []);

	useEffect(() => {
		if (game) {
			startTimeRef.current = Date.now();
			animationFrameRef.current = requestAnimationFrame(updateTimer);
		} else if (startTimeRef.current) {
			const elapsed = Date.now() - startTimeRef.current;
			setScore(formatTime(elapsed));

			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		}

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [game, setScore, updateTimer]);

	return (
		<div>
			<p ref={timerRef}>Time: 00:00:000</p>
		</div>
	);
};

export default Timer;
