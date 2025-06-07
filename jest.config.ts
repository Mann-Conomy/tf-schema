import type { Config } from "jest";

const config: Config = {
    verbose: true,
    transform: {
        "\\.[jt]sx?$": "ts-jest"
    },
    testTimeout: 50000,
    setupFilesAfterEnv: ["dotenv/config"]
}

export default config;
