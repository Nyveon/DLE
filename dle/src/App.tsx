import { useCallback, useEffect, useState } from "react";
import { games, GameResults, GameId } from "@/ts/games";
import GameList from "@/components/GameList";
import ResultPanel from "@/components/ResultPanel";
import { toast, ToastContainer } from "react-toastify";
import { identifyGame } from "@/ts/util";
import { processShareText } from "@/ts/processing";

export default function App() {
	const [results, setResults] = useState<GameResults>({});
	const [secret, setSecret] = useState<boolean>(false);

	function helloSkelebert() {
		if (secret) {
			return;
		}

		toast("Hello Skeleberto & friends!", {
			type: "success",
		});
		setSecret(true);
	}

    function onManualResult(gameId: GameId, result: string) {
        setResults((prev) => ({
            ...prev,
            [gameId]: result,
        }));
    }

	const checkClipboard = useCallback(async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (!text || text.trim().length === 0) return false;

			const gameKey = identifyGame(text, games);

			if (gameKey) {
				const game = games[gameKey];
				const processed = processShareText(text, game);

				if (results[gameKey] === processed) {
					return false;
				}

				setResults((prev) => ({
					...prev,
					[gameKey]: processed,
				}));

				toast(`Found results for ${game.name}!`, {
					type: "success",
				});

				return true;
			}
		} catch {
			toast("Error reading clipboard!", {
				type: "error",
			});
		}

		return false;
	}, [results]);

	async function manualCheck() {
		const result = await checkClipboard();
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
		<main className="flex flex-col items-center gap-2 pb-12">
			<h1 className="text-3xl font-bold mb-6" onClick={helloSkelebert}>
				Daily Gaming 3000
			</h1>

			<GameList
				games={games}
				results={results}
				checkClipboard={manualCheck}
				secret={secret}
                handleManualResult={onManualResult}
			/>

			<hr className="h-px my-8 bg-slate-600 border-0 w-full" />

			<ResultPanel results={results} />

			<ToastContainer theme="dark" autoClose={2000} />
		</main>
	);
}
