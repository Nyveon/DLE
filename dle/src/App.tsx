import { useState } from "react";
import { games, GameResults } from "@/data/games";
import GameList from "@/components/GameList";

export default function App() {
	const [results, setResults] = useState<GameResults>({});

	return (
		<main className="flex flex-col items-center gap-2">
			<h1 className="text-3xl font-bold mb-4">Super Gaming 3000</h1>

			<GameList games={games} results={results} />
		</main>
	);
}
