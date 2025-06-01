import { describe, expect, test } from "@jest/globals";
import { SchemaManager } from "../src/classes";

describe("", () => {
    const API_KEY = process.env.STEAM_WEB_API_KEY!;

    test("", () => {
        const manager = new SchemaManager(API_KEY, [
            {
                identifier: "test",
                language: "en",
                version: "a",
                required: true,
                interval: 60 * 60 * 1000
            }
        ]);

        manager.init();
    })
})