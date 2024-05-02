const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	preset: "ts-jest",
	// Typescript import alias
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

module.exports = createJestConfig(config);
