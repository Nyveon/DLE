import { CheckableGames, GameId, GameIds, GameResults } from "@/ts/games";

interface ResultsCompilation {
	count: number;
	body: string;
}

/**
 * Compile the results into a string body.
 * @param results Game Results
 * @returns Share-able results
 */
export function compileResults(results: GameResults): ResultsCompilation {
	let count = 0;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const shortYear = year.toString().slice(-2);
	let body = `dle.eric.tc - ${day}/${month}/${shortYear}`;

	for (const key of GameIds) {
		const result = results[key];
		if (!result) {
			continue;
		}

		count++;
		body += `\n\n${result}`;
	}

	console.log(body);
	return { count, body };
}

/**
 * Identify the game from the "share" text.
 * @param text Resulting game text, probably from clipboard
 * @param games Games to check against
 * @returns Game key, or null if none found
 */
export function identifyGame(
	text: string,
	games: CheckableGames
): GameId | null {
	return (
		GameIds.find((key) => {
			const game = games[key];
			return game?.check.identifier && text.startsWith(game.check.identifier);
		}) || null
	);
}
