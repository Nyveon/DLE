import GameItem from "@/components/GameItem";
import { Game, GameResults } from "@/data/games";

export default function GameList({
	games,
	results,
	checkClipboard,
}: {
	games: Record<string, Game>;
	results: GameResults;
	checkClipboard: () => void;
}) {
	return (
		<ul className="flex flex-col gap-2 text-center">
			{Object.entries(games).map(([key, game]) => (
				<GameItem
					key={key}
					game={game}
					result={results[key]}
					checkClipboard={checkClipboard}
				/>
			))}
		</ul>
	);
}
