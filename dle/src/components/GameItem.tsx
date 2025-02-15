import { Game } from "@/ts/games";
import { clsx } from "clsx/lite";

export default function GameItem({
	game,
	result,
	checkClipboard,
	onIconClick,
}: {
	game: Game;
	result: string | undefined;
	checkClipboard: () => void;
	onIconClick?: () => void;
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
					"flex items-center px-3 py-1 grow-1 gap-1.5",
					result
						? "bg-green-700 hover:bg-green-600 text-gray-200 italic"
						: "bg-yellow-700 hover:bg-yellow-600 text-white",
					"rounded-lg",
					!game.url && "pointer-events-none"
				)}
			>
				<img
					src={game.icon}
					className={clsx(
						"size-6 mix-blend-multiply",
						onIconClick && "cursor-pointer pointer-events-auto"
					)}
					onClick={(e) => {
						if (onIconClick) {
							e.preventDefault();
							onIconClick();
						}
					}}
				></img>
				{game.name}
			</a>
		</li>
	);
}
