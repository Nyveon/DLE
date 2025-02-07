import { Game } from "@/data/games";
import { clsx } from "clsx/lite";

export default function GameItem({
	game,
	result,
	checkClipboard,
}: {
	game: Game;
	result: string;
	checkClipboard: () => void;
}) {
	return (
		<li className="flex items-center gap-2">
			<button
				title="Check clipboard"
				className={clsx(
					"flex place-content-center w-6 h-6",
					"border-2 rounded-full",
					result
						? "border-gray-100 pointer-events-none"
						: "border-gray-400 hover:border-gray-200",
					"font-bold leading-5",
					"cursor-pointer"
				)}
				onClick={checkClipboard}
			>
				{result && "✓"}
			</button>
			<a
				href={game.url}
				target="_blank"
				rel="noreferrer noopener"
				className={clsx(
					"block px-2 py-1 grow-1",
					result
						? "bg-green-700 hover:bg-green-600 text-gray-200 italic"
						: "bg-yellow-700 hover:bg-yellow-600 text-white",
					"rounded-lg"
				)}
			>
				{game.name}
			</a>
		</li>
	);
}
