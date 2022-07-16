module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: true,
      isolatedModules: true,
    },
  },
  testPathIgnorePatterns: [".*e2e.*"],
};
