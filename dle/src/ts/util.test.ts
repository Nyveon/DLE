import { CheckableGame, GameResults } from "@/ts/games";
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
				"\n\nCountryle result" +
				"\n\nFoodGuessr result" +
				"\n\nPick5 result" +
				"\n\nSkelebertle result" +
				"\n\nTradle result"
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
	it("should return the key of the game that matches the identifier, or null if no match", () => {
		const games: Record<string, CheckableGame> = {
			game1: { check: { identifier: "id1" } },
			game2: { check: { identifier: "id2" } },
		};

		expect(identifyGame("id1\netcetc", games)).toBe("game1");
		expect(identifyGame("id2", games)).toBe("game2");
		expect(identifyGame("id3\ntest", games)).toBe(null);
        expect(identifyGame(" id1\ntest", games)).toBe("game1"); // Trim not in this step
        expect(identifyGame("xid1\ntest", games)).toBe(null); // Only starts with
	});
});
