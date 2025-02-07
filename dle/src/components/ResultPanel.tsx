import { GameResults } from "@/data/games";

export default function ResultPanel({ results }: { results: GameResults }) {
	let completed = 0;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const shortYear = year.toString().slice(-2);
	let output = `dle.eric.tc - ${day}/${month}/${shortYear}\n\n`;

	for (const result of Object.values(results)) {
		if (!result) {
			continue;
		}

		completed++;
		output += `${result}\n\n`;
	}

	async function share() {
		try {
			await navigator.clipboard.writeText(output);
			alert("Results copied to clipboard c:");
		} catch (err) {
			console.error("Error copying results:", err);
		}
	}

	return (
		<>
			<pre className="bg-slate-700 p-3 rounded-md border-2 border-slate-600">
				{completed ? output : "No results yet."}
			</pre>
			{completed && (
				<button
					className="w-24 mt-2 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md"
					onClick={share}
				>
					Share
				</button>
			)}
		</>
	);
}
