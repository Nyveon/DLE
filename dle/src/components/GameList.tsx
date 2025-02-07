import GameItem from "@/components/GameItem";
import { Game, GameResults } from "@/data/games";

export default function GameList({
	games,
	results,
}: {
	games: Record<string, Game>;
	results: GameResults;
}) {
	return (
		<ul className="flex flex-col gap-4 text-center">
			{Object.entries(games).map(([key, game]) => (
				<GameItem key={key} game={game} result={results[key]} />
			))}
		</ul>
	);
}
