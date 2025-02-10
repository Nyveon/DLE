import { Game } from "@/ts/games";

/**
 * Normalizes and chops game sharing text for later result compilation
 * @param text game share text, probably from clipboard
 * @param game corresponding game
 * @returns cleaned share text
 */
export function processShareText(text: string, game: Game) {
    let processed = text.trim();

    if (game.check.slice) {
        processed = processed
            .split("\n")
            .filter((l) => {
                return l.trim().length > 0;
            })
            .slice(0, game.check.slice)
            .join("\n");
    }

    return processed;
}