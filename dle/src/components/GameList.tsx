import GameItem from "@/components/GameItem";
import { Game, GameIds, GameResults } from "@/ts/games";

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
			{GameIds.flatMap((gameId) => {
				const game = games[gameId];
				const result = results[gameId];

				if (game.secret && !secret) {
					return [];
				}

				return (
					<GameItem
						key={gameId}
						game={game}
						result={result}
						checkClipboard={checkClipboard}
					/>
				);
			})}
		</ul>
	);
}
