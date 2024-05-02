import { expect } from "@jest/globals";
import getFirstObjectKey from "./getFirstObjectKey";

describe("Get first object key util", () => {
	it("Should trow error, no valid object in param", () => {
		try {
			getFirstObjectKey([]);
		} catch (e) {
			const error = e as Error;
			expect(error instanceof TypeError).toBe(true);
			expect(error.message).toBe("obj param is not object");
		}
	});

	it("Should return first key as undefined, empty object", () => {
		expect(getFirstObjectKey({})).toBeUndefined();
	});

	it("Should return the firs object key", () => {
		expect(getFirstObjectKey({ value: 12 })).toBe("value");
	});
});
