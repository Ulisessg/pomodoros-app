/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	// Typescript import alias
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};
