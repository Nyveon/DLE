import { gameExamples, GameId, GameIds, games } from "@/ts/games";
import { processShareText } from "@/ts/processing";
import { describe, expect, it } from "vitest";

describe("processShareText", () => {
	it.each(GameIds.filter((gameId) => games[gameId].check))(
		"should have example for %s",
		(gameId) => {
			expect(gameExamples[gameId]).toBeDefined();
		}
	);

	it.each(Object.entries(gameExamples))(
		"should process %s share text correctly",
		(gameId, example) => {
			const game = games[gameId as GameId];
			expect(example.expected).toBeTruthy();
			expect(processShareText(example.given, game)).toBe(example.expected);
		}
	);
});
