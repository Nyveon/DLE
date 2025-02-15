import { useEffect, useState } from "react";
import Skeleton from "@/components/game/Skeleton";
import { Game } from "@/ts/games";
import GameItem from "@/components/GameItem";
import { toast } from "react-toastify";

import sndStart from "@/assets/sounds/laugh.wav";
import { skelebertleResult, skeletons } from "@/ts/skelebertle";

const audioStart = new Audio(sndStart);

export default function Skelebertle({
	game,
	handleGameEnd,
}: {
	game: Game;
	handleGameEnd: (result: string) => void;
}) {
	const [score, setScore] = useState<number>(0);
	const [timeRemaining, setTimeRemaining] = useState<number>(5);
	const [gameOver, setGameOver] = useState<boolean>(false);

	useEffect(() => {
		audioStart.currentTime = 0;
		audioStart.play();

		const timerId = setInterval(() => {
			setTimeRemaining((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	useEffect(() => {
		if (!gameOver && (timeRemaining <= 0 || score >= skeletons.length)) {
			setTimeRemaining(0);
			setGameOver(true);
			handleGameEnd(skelebertleResult(score));
			toast("Farewell, Skeleberto!", {
				type: "info",
			});
		}
	}, [timeRemaining, score, gameOver, handleGameEnd]);

	function handleSkeletonClick() {
		if (!gameOver) {
			setScore((prev) => prev + 1);
		}
	}

	return (
		<>
			<GameItem
				game={game}
				result={gameOver ? skelebertleResult(score) : ""}
				checkClipboard={() => {
					toast("Skeleberto!!!", {
						type: "info",
					});
				}}
			/>

			{!gameOver && <div>⏳Skeletime left: {timeRemaining}s</div>}

			{!gameOver &&
				skeletons.map((skele) => (
					<Skeleton skele={skele} onSkeleClick={handleSkeletonClick} />
				))}
		</>
	);
}
