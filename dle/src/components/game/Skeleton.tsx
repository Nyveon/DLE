import { SkeletonTemplate } from "@/components/game/Skelebertle";
import { useState } from "react";

function getRandomPosition() {
	return {
		x: Math.floor(Math.random() * 90),
		y: Math.floor(Math.random() * 90),
	};
}

export default function Skeleton({
	skele,
	onSkeleClick,
}: {
	skele: SkeletonTemplate;
	onSkeleClick: () => void;
}) {
	const [clicked, setClicked] = useState(false);
	const [position] = useState(getRandomPosition());

	function handleClick() {
		setClicked(true);
		skele.sound.currentTime = 0;

		if (skele.volume) {
			skele.sound.volume = skele.volume;
		}

		skele.sound.play();

		onSkeleClick();
	}

	if (clicked) {
		return null;
	}

	return (
		<img
			key={skele.id}
			src={skele.imageUrl}
			alt={skele.name}
			className="absolute w-1/10 h-1/10 cursor-pointer select-none"
			onClick={handleClick}
			style={{
				top: `${position.x}%`,
				left: `${position.y}%`,
			}}
		/>
	);
}
