import { describe, it, expect, vi } from "vitest";
import { skelebertleResult, skeletons } from "@/ts/skelebertle";

describe("skelebertleResult", () => {
	it("returns a correctly formatted string", () => {
		// Mock date to ensure consistent result
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10")); // Fixed test date

		const score = 4;
		const result = skelebertleResult(score);

		// Calculate expected skeleton number
		const expectedNumber = Math.floor(
			(new Date("2025-02-10").getTime() - new Date("2025-02-06").getTime()) /
				(1000 * 60 * 60 * 24)
		);

		const expectedEmojis =
			"🦴".repeat(score) + "🌑".repeat(skeletons.length - score);

		expect(result).toBe(
			`Skelebertle: Skeleberto #${expectedNumber}\n${expectedEmojis}`
		);

		vi.useRealTimers();
	});

	it("handles score of 0 correctly", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10"));

		const result = skelebertleResult(0);
		const expectedNumber = Math.floor(
			(new Date("2025-02-10").getTime() - new Date("2025-02-06").getTime()) /
				(1000 * 60 * 60 * 24)
		);

		expect(result).toBe(
			`Skelebertle: Skeleberto #${expectedNumber}\n${"🌑".repeat(
				skeletons.length
			)}`
		);

		vi.useRealTimers();
	});

	it("handles max score correctly", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-10"));

		const result = skelebertleResult(skeletons.length);
		const expectedNumber = Math.floor(
			(new Date("2025-02-10").getTime() - new Date("2025-02-06").getTime()) /
				(1000 * 60 * 60 * 24)
		);

		expect(result).toBe(
			`Skelebertle: Skeleberto #${expectedNumber}\n${"🦴".repeat(
				skeletons.length
			)}`
		);

		vi.useRealTimers();
	});

	it("changes number based on the date", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-02-12")); // Different test date

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
