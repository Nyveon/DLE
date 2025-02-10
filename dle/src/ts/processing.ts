import { Game } from "@/ts/games";

/**
 * Normalizes and chops game sharing text for later result compilation
 * @param text game share text, probably from clipboard
 * @param game corresponding game
 * @returns cleaned share text
 */
export function processShareText(text: string, game: Game) {
	const trimmed = text.trim();

	if (game.check?.slice) {
		return trimmed
			.split("\n")
			.filter((l) => {
				return l.trim().length > 0;
			})
			.slice(0, game.check.slice)
			.join("\n");
	} else {
		return trimmed;
	}
}
