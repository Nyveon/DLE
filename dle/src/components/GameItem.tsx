import { Game } from "@/data/games";
import { clsx } from "clsx/lite";

export default function GameItem({
	game,
	result,
}: {
	game: Game;
	result: string;
}) {
	return (
		<li>
			<a
				href={game.url}
				target="_blank"
				className={clsx(
					"block w-full px-2 py-1",
					result
						? "bg-green-700 hover:bg-green-600 text-gray-200 italic"
						: "bg-blue-700 hover:bg-blue-600 text-white",
					"rounded-lg"
				)}
			>
				{game.name}
			</a>
		</li>
	);
}
