import GameItem from "@/components/GameItem";
import { Game, GameResults } from "@/data/games";

export default function GameList({
	games,
	results,
	checkClipboard,
	secret,
}: {
	games: Record<string, Game>;
	results: GameResults;
	checkClipboard: () => void;
	secret: boolean;
}) {
	return (
		<ul className="flex flex-col gap-2 text-center">
			{Object.entries(games).flatMap(([key, game]) => {
				if (game.secret && !secret) {
					return [];
				}

				return (
					<GameItem
						key={key}
						game={game}
						result={results[key]}
						checkClipboard={checkClipboard}
					/>
				);
			})}
		</ul>
	);
}
