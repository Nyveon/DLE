import { SkeletonObject } from "@/ts/skelebertle";
import { useRef, useState } from "react";

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
	skele: SkeletonObject;
	onSkeleClick: () => void;
}) {
	const [clicked, setClicked] = useState(false);
	const [position] = useState(getRandomPosition());

	function handleClick() {
		setClicked(true);
		skele.audio.currentTime = 0;

		if (skele.volume) {
			skele.audio.volume = skele.volume;
		}

		skele.audio.play();

		onSkeleClick();
	}

	if (clicked) {
		return null;
	}

	return (
		<img
			key={skele.id}
			src={skele.image.src}
			alt={skele.name}
			className="absolute w-1/10 h-1/10 cursor-pointer select-none"
			onClick={handleClick}
			style={{
				top: `${position.x}%`,
				left: `${position.y}%`,
			}}
			draggable="false"
		/>
	);
}
