import { GameResults } from "@/ts/games";
import { compileResults } from "@/ts/util";
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

	it("should compile results correctly when given multiple game results", () => {
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
