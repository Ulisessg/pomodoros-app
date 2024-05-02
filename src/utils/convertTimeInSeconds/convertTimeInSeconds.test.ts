import { expect } from "@jest/globals";

import convertTimeInSeconds from "./convertTimeInSeconds";
import { ValidationTypeError } from "@/models/TableValidations";

describe("Convert Time In Seconds util", () => {
	it("Should throw error, time is not string", () => {
		try {
			convertTimeInSeconds(NaN as unknown as string);
		} catch (error) {
			const err = error as ValidationTypeError;
			expect(err instanceof ValidationTypeError).toBe(true);
			expect(err.message).toBe("Duration must be string");
		}
	});
	it("Should throw error, invalid time format", () => {
		try {
			convertTimeInSeconds("00:322:00");
		} catch (err) {
			const error = err as Error;
			expect(error instanceof Error).toBe(true);
			expect(error.message).toBe("Bad time format");
		}
	});
	it("Should return 15 seconds", () => {
		expect(convertTimeInSeconds("00:00:15")).toBe(15);
	});
	it("Should return 480 seconds", () => {
		expect(convertTimeInSeconds("00:08:00")).toBe(480);
	});
	it("Should return 7200 seconds", () => {
		expect(convertTimeInSeconds("02:00:00")).toBe(7200);
	});
	it("Should return 5409 seconds", () => {
		expect(convertTimeInSeconds("01:30:09")).toBe(5409);
	});
});
