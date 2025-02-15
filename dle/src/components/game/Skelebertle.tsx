import { useEffect, useState } from "react";
import Skeleton from "@/components/game/Skeleton";
import { Game } from "@/ts/games";
import GameItem from "@/components/GameItem";
import { toast } from "react-toastify";

import sndStart from "@/assets/sounds/laugh.mp3";
import sndSecret from "@/assets/sounds/bones.mp3";
import { skelebertleResult, skeletons } from "@/ts/skelebertle";

// Preload
const audioStart = new Audio(sndStart);
const audioSecret = new Audio(sndSecret);

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
	const [secretFound, setSecretFound] = useState<boolean>(false);

	useEffect(() => {
		audioStart.currentTime = 0;
		audioStart.play();

		const timerId = setInterval(() => {
			setTimeRemaining((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	useEffect(() => {
		const maxScore = secretFound ? skeletons.length + 1 : skeletons.length;

		if (!gameOver && (timeRemaining <= 0 || score >= maxScore)) {
			setTimeRemaining(0);
			setGameOver(true);
			handleGameEnd(skelebertleResult(score));
			toast("Farewell, Skeleberto!", {
				type: "info",
			});
		}
	}, [timeRemaining, score, gameOver, handleGameEnd, secretFound]);

	function handleSkeletonClick() {
		if (!gameOver) {
			setScore((prev) => prev + 1);
		}
	}

	function handleSecret() {
		if (!gameOver && !secretFound) {
			setScore((prev) => prev + 1);
			setSecretFound(true);
			audioSecret.currentTime = 0;
			audioSecret.play();
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
				onIconClick={handleSecret}
			/>

			{!gameOver && <div>⏳Skeletime left: {timeRemaining}s</div>}

			{!gameOver &&
				skeletons.map((skele) => (
					<Skeleton skele={skele} onSkeleClick={handleSkeletonClick} />
				))}
		</>
	);
}
