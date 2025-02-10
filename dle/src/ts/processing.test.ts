import { GameId, GameIds, games } from "@/ts/games";
import { processShareText } from "@/ts/processing";
import { describe, expect, it } from "vitest";

interface GameExample {
	given: string;
	expected: string;
}

const gameExamples: Partial<Record<GameId, GameExample>> = {
	foodguessr: {
		given: `FoodGuessr - 10 Feb 2025 GMT
  Round 1 🌕🌕🌕🌕
  Round 2 🌕🌕🌕🌕
  Round 3 🌕🌕🌕🌖
Total score: 14,500 / 15,000

Can you beat my score? New game daily!
Play at https://foodguessr.com`,

		expected: `FoodGuessr - 10 Feb 2025 GMT
  Round 1 🌕🌕🌕🌕
  Round 2 🌕🌕🌕🌕
  Round 3 🌕🌕🌕🌖
Total score: 14,500 / 15,000`,
	},
	connections: {
		given: `Connections
Puzzle #604
🟨🟨🟨🟨
🟪🟪🟪🟪
🟩🟩🟩🟩
🟦🟦🟦🟦`,
		expected: `Connections
Puzzle #604
🟨🟨🟨🟨
🟪🟪🟪🟪
🟩🟩🟩🟩
🟦🟦🟦🟦`,
	},
	pick5: {
		given: `Pick5 #272 - Pitted Fruits 
🥉 62.78%
🟡 🟢 🟡 🟡 🟢 2/5
Play #oecGames today!
https://oec.world/en/games/pick-5`,
		expected: `Pick5 #272 - Pitted Fruits 
🥉 62.78%
🟡 🟢 🟡 🟡 🟢 2/5`,
	},
	tradle: {
		given: `#Tradle #1065 4/6
🟩⬜⬜⬜⬜
🟩🟩🟩⬜⬜
🟩🟩🟩🟩🟨
🟩🟩🟩🟩🟩
https://oec.world/en/games/tradle`,
		expected: `#Tradle #1065 4/6
🟩⬜⬜⬜⬜
🟩🟩🟩⬜⬜
🟩🟩🟩🟩🟨
🟩🟩🟩🟩🟩`,
	},
	countryle: {
		given: `#Countryle 1086
Guessed in 5 tries.

🟢⚪⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢🟡⚪⚪
🟢🟢🟢🟢🟢

https://countryle.com`,
		expected: `#Countryle 1086
Guessed in 5 tries.
🟢⚪⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢⚪⚪⚪
🟢🟢🟡⚪⚪
🟢🟢🟢🟢🟢`,
	},
};

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
