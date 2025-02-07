import { useCallback, useEffect, useState } from "react";
import { games, GameResults } from "@/data/games";
import GameList from "@/components/GameList";
import ResultPanel from "@/components/ResultPanel";

export default function App() {
	const [results, setResults] = useState<GameResults>({});

	const checkClipboard = useCallback(async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (!text || text.trim().length === 0) return;

			Object.entries(games).forEach(([key, game]) => {
				if (text.includes(game.check.identifier)) {
					const processed = game.check.slice
						? text.split("\n").slice(0, game.check.slice).join("\n")
						: text;
					console.log(processed);
					setResults((prev) => ({ ...prev, [key]: processed }));
				}
			});
		} catch (err) {
			console.error("Error reading clipboard:", err);
		}
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				setTimeout(() => {
					checkClipboard();
				}, 500);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [checkClipboard]);

	return (
		<main className="flex flex-col items-center gap-2">
			<h1 className="text-3xl font-bold mb-4">Super Gaming 3000</h1>

			<GameList games={games} results={results} />

			<hr className="h-px my-8 bg-gray-200 border-0 w-full" />

			<ResultPanel />
		</main>
	);
}
