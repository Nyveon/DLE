import { useCallback, useEffect, useState } from "react";
import { games, GameResults } from "@/data/games";
import GameList from "@/components/GameList";
import ResultPanel from "@/components/ResultPanel";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
	const [results, setResults] = useState<GameResults>({});

	const checkClipboard = useCallback(async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (!text || text.trim().length === 0) return false;

			return Object.entries(games).some(([key, game]) => {
				if (text.includes(game.check.identifier)) {
					const processed = game.check.slice
						? text.split("\n").slice(0, game.check.slice).join("\n")
						: text;

					if (results[key] === processed) {
						return false;
					}

					setResults((prev) => ({
						...prev,
						[key]: processed,
					}));

					toast(`Found results for ${game.name}!`, {
						type: "success",
					});

					return true;
				}
			});
		} catch {
			toast("Error reading clipboard!", {
				type: "error",
			});
		}

		return false;
	}, [results]);

	async function manualCheck() {
		console.log("here");
		const result = await checkClipboard();
		console.log(result);
		if (!result) {
			toast("No results found in clipboard.", {
				type: "info",
			});
		}
	}

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
			<h1 className="text-3xl font-bold mb-6">Super Gaming 3000</h1>

			<GameList games={games} results={results} checkClipboard={manualCheck} />

			<hr className="h-px my-8 bg-slate-600 border-0 w-full" />

			<ResultPanel results={results} />

			<ToastContainer theme="dark" autoClose={2000} />
		</main>
	);
}
