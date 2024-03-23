import { GameContext, TGameContext } from "@/hooks/GameContext";
import { FC, useContext, useEffect, useState } from "react";

interface Timer {
	game: boolean;
}

const Timer: FC<Timer> = ({ game }) => {
	const [currentTime, setCurrentTime] = useState<string>("00:00:00");
	const { setScore } = useContext(GameContext) as TGameContext;

	useEffect(() => {
		let interval: NodeJS.Timeout;

		const startTimer = () => {
			const start = new Date();

			interval = setInterval(() => {
				const elapsed = new Date().getTime() - start.getTime();
				const formattedTime = formatTime(elapsed);
				setCurrentTime(formattedTime);
			}, 10);
		};

		if (game) {
			startTimer();
		} else {
			setScore(currentTime);
		}

		return () => {
			clearInterval(interval);
		};
	}, [game, setScore]);

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
	return (
		<div>
			<p>Time: {currentTime}</p>
		</div>
	);
};

export default Timer;
