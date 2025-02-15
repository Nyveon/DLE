import { describe, it, expect, vi } from "vitest";
import { skelebertleResult, skeletons } from "@/ts/skelebertle";

const maxScorePossible = skeletons.length + 1;
const expectedLength = maxScorePossible / 2;

describe("skelebertleResult", () => {
	it("returns a correctly formatted string, where the first was on 2025-02-07", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-08"));

		const result = skelebertleResult(1);

		expect(result).toContain("Skelebertle: Skeleberto #2\n");

		vi.useRealTimers();
	});

	it("handles score of 0 correctly", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10"));

		const result = skelebertleResult(0);
		expect(result).toContain("🌑".repeat(expectedLength));

		vi.useRealTimers();
	});

	it("handles max score correctly", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10"));

		const result = skelebertleResult(maxScorePossible);
		expect(result).toContain("💀".repeat(expectedLength));

		vi.useRealTimers();
	});

	it("handles partial score correctl", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10"));

		const unevenPartial = Math.floor(maxScorePossible / 2) + 1;
		const result = skelebertleResult(unevenPartial);
		expect(result).toContain("🦴");
		expect(result).toContain("💀💀");
		expect(result).toContain("🌑🌑");

		vi.useRealTimers();
	});

	it("changes number based on the date", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-12"));

		const result = skelebertleResult(3);
		const expectedNumber = Math.floor(
			(new Date("2025-02-12").getTime() - new Date("2025-02-06").getTime()) /
				(1000 * 60 * 60 * 24)
		);

		expect(
			result.startsWith(`Skelebertle: Skeleberto #${expectedNumber}`)
		).toBe(true);

		vi.useRealTimers();
	});
});
