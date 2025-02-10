import { CheckableGame, GameResults } from "@/ts/games";

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

	const sortedKeys = Object.keys(results).sort();

	for (const key of sortedKeys) {
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
	games: Record<string, CheckableGame>
) {
	for (const [key, game] of Object.entries(games)) {
		if (!game.check.identifier) {
			continue;
		}

		//todo: startsWith
		if (text.includes(game.check.identifier)) {
			return key;
		}
	}

	return null;
}
