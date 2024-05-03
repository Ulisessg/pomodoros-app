import { expect } from "@jest/globals";
import convertSecondsInTime from "./convertSecondsInTime";

describe("Test convert seconds in time util", () => {
	// Errors
	it("Should throw error, seconds param is not number", () => {
		try {
			convertSecondsInTime("" as unknown as number);
		} catch (error) {
			const err = error as TypeError;
			expect(err instanceof TypeError).toBe(true);
			expect(err.message).toBe("Seconds must be number");
		}
	});
	it("Should throw error, seconds is not integer number", () => {
		try {
			convertSecondsInTime(3.1416);
		} catch (error) {
			const err = error as RangeError;
			expect(err instanceof RangeError).toBe(true);
			expect(err.message).toBe("Seconds is not integer");
		}
	});

	// Time
	it("Should return 15 seconds in time format", () => {
		const result = convertSecondsInTime(15);
		expect(result).toEqual("00:00:15");
	});
	it("Should return 8 minutes in time format", () => {
		expect(convertSecondsInTime(480)).toBe("00:08:00");
	});
	it("Should return 2 hours in time format", () => {
		expect(convertSecondsInTime(7200)).toBe("02:00:00");
	});
	it("Should return 1 hour 30 minutes 9 seconds in time format", () => {
		expect(convertSecondsInTime(5409)).toBe("01:30:09");
	});
});
