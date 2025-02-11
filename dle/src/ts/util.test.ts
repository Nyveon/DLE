import {
	CheckableGames,
	gameExamples,
	GameIds,
	GameResults,
	games,
} from "@/ts/games";
import { compileResults, identifyGame } from "@/ts/util";
import { vi, describe, it, expect } from "vitest";

const mockDate = new Date(2025, 1, 10);
vi.useFakeTimers();
vi.setSystemTime(mockDate);

describe("compileResults", () => {
	it("should return an empty result when given no game results", () => {
		const results: GameResults = {
			connections: "",
			foodguessr: "",
			countryle: "",
			tradle: "",
			pick5: "",
			skelebertle: "",
		};

		const compiled = compileResults(results);
		expect(compiled.count).toBe(0);
		expect(compiled.body).toBe("dle.eric.tc - 10/2/25");
	});

	it("should compile results correctly when given multiple game results, sorted by key", () => {
		const results: GameResults = {
			connections: "Connections result",
			foodguessr: "FoodGuessr result",
			countryle: "Countryle result",
			tradle: "Tradle result",
			pick5: "Pick5 result",
			skelebertle: "Skelebertle result",
		};

		const compiled = compileResults(results);
		expect(compiled.count).toBe(6);
		expect(compiled.body).toBe(
			"dle.eric.tc - 10/2/25" +
				"\n\nConnections result" +
				"\n\nFoodGuessr result" +
				"\n\nCountryle result" +
				"\n\nTradle result" +
				"\n\nPick5 result" +
				"\n\nSkelebertle result"
		);
	});

	it("should only count and include non-empty results", () => {
		const results: GameResults = {
			connections: "Connections result",
			foodguessr: "",
			countryle: "Countryle result",
			tradle: "",
			pick5: "Pick5 result",
			skelebertle: "",
		};

		const compiled = compileResults(results);
		expect(compiled.count).toBe(3);
		expect(compiled.body).toBe(
			"dle.eric.tc - 10/2/25" +
				"\n\nConnections result" +
				"\n\nCountryle result" +
				"\n\nPick5 result"
		);
	});
});

describe("identifyGame", () => {
	const testGames: CheckableGames = {
		connections: { check: { identifier: "id1" } },
		pick5: { check: { identifier: "id2" } },
	};

	it("should return the key of the game that matches the identifier", () => {
		expect(identifyGame("id1\netcetc", testGames)).toBe("connections");
		expect(identifyGame("id2", testGames)).toBe("pick5");
		expect(identifyGame("id2fdfgh\netcetc", testGames)).toBe("pick5");
	});

	it("should return null if it doesn't match any game", () => {
		expect(identifyGame("", testGames)).toBe(null); // Is Empty
		expect(identifyGame("id3\ntest", testGames)).toBe(null); // ID not present
		expect(identifyGame(" id1\ntest", testGames)).toBe(null); // Trim not in this step
		expect(identifyGame("xid1\ntest", testGames)).toBe(null); // Only starts with
	});

	it.each(GameIds.filter((gameId) => games[gameId].check))(
		"should identify %s correctly",
		(gameId) => {
			expect(gameExamples[gameId]).toBeDefined();
			const example = gameExamples[gameId]!;
			expect(example.expected).toBeTruthy();
			expect(identifyGame(example.expected, games)).toBe(gameId);
		}
	);
});
