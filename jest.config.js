module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["<rootDir>/**/*.test.ts"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "<rootDir>/public/", "<rootDir>/docs/"],
	reporters: ["default", ["jest-junit", { suiteName: "jest tests" }]],
	globals: {
		"ts-jest": { diagnostics: false },
	},
	coveragePathIgnorePatterns: ["/node_modules/", "(.test)\\.(ts|tsx|js)$", "/distribution/.*\\.(ts|js)$"],
};
