import { GameResults } from "@/ts/games";

interface ResultsCompilation {
	count: number;
	body: string;
}

export function compileResults(results: GameResults): ResultsCompilation {
	//todo: sort
	let count = 0;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const shortYear = year.toString().slice(-2);
	let body = `dle.eric.tc - ${day}/${month}/${shortYear}`;

	for (const result of Object.values(results)) {
		if (!result) {
			continue;
		}

		count++;
		body += `\n\n${result}`;
	}

	console.log(body);
	return { count, body };
}
