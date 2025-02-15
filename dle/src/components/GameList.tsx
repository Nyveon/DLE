import Skelebertle from "@/components/game/Skelebertle";
import GameItem from "@/components/GameItem";
import { Game, GameId, GameIds, GameResults } from "@/ts/games";

export default function GameList({
	games,
	results,
	checkClipboard,
	secret,
	handleManualResult,
}: {
	games: Record<string, Game>;
	results: GameResults;
	checkClipboard: () => void;
	secret: boolean;
	handleManualResult: (gameId: GameId, result: string) => void;
}) {
	return (
		<ul className="flex flex-col gap-2 text-center">
			{GameIds.flatMap((gameId) => {
				const game = games[gameId];
				const result = results[gameId];

				if (game.secret) {
					if (secret) {
						return (
							<Skelebertle
								key={gameId}
								game={game}
								handleGameEnd={(result: string) =>
									handleManualResult(gameId, result)
								}
							/>
						);
					} else {
						return [];
					}
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
