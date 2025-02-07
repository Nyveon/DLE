import { GameResults } from "@/data/games";
import { toast } from "react-toastify";

export default function ResultPanel({ results }: { results: GameResults }) {
	let completed = 0;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const shortYear = year.toString().slice(-2);
	let output = `dle.eric.tc - ${day}/${month}/${shortYear}`;

	for (const result of Object.values(results)) {
		if (!result) {
			continue;
		}

		completed++;
		output += `\n\n${result}`;
	}

	async function share() {
		try {
			await navigator.clipboard.writeText(output);
			toast("Results copied to clipboard c:", {
				type: "success",
			});
		} catch {
			toast("Error copying results to clipboard", {
				type: "error",
			});
		}
	}

	console.log(output);

	return (
		<>
			{completed != 0 && (
				<button
					className="w-24 mt-2 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md cursor-pointer"
					onClick={share}
				>
					Share
				</button>
			)}
			<pre className="bg-slate-700 p-3 rounded-md border-2 border-slate-600">
				{completed != 0 ? output : "No results yet."}
			</pre>
		</>
	);
}
