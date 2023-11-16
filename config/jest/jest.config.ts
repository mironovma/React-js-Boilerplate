import path from "path";

export default {
    clearMocks: true,
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
    globals: { __IS_DEV__: true, __API__: "" },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
    ],
    moduleNameMapper: {
        "\\.s?css$": "identity-obj-proxy",
        "\\.svg": path.resolve(__dirname, "jestEmptyComponent.tsx"),
        "^@/(.*)$": "<rootDir>src/$1",
    },
    reporters: [
        "default",
        [
            "jest-html-reporters",
            {
                publicPath: "<rootDir>/reports/unit",
                inlineSource: true,
                filename: "unit-report.html",
            },
        ],
    ],
    rootDir: "../../",
    setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.ts"],
    testEnvironment: "jsdom",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)",
    ],

    testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\.fttemplates\\\\"],
};
