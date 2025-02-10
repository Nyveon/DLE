import { GameResults } from "@/ts/games";
import { compileResults } from "@/ts/util";
import { toast } from "react-toastify";

export default function ResultPanel({ results }: { results: GameResults }) {
	const { count, body } = compileResults(results);

	async function share() {
		try {
			await navigator.clipboard.writeText(body);
			toast("Results copied to clipboard c:", {
				type: "success",
			});
		} catch {
			toast("Error copying results to clipboard", {
				type: "error",
			});
		}
	}

	return (
		<>
			{count != 0 && (
				<button
					className="w-24 mt-2 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md cursor-pointer"
					onClick={share}
				>
					Share
				</button>
			)}
			<pre className="bg-slate-700 p-3 rounded-md border-2 border-slate-600">
				{count != 0 ? body : "No results yet."}
			</pre>
		</>
	);
}
