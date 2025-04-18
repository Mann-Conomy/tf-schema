import { describe, expect, test } from "@jest/globals";
import SteamClient from "../src/classes/index";

describe("SteamClient", () => {
    test("new client should be an instance of SteamClient", () => {
        // Arrange
        const apiKey = process.env.STEAM_WEB_API_KEY;
        const client = new SteamClient(apiKey!);

        // Act and assert
        expect(client).toBeInstanceOf(SteamClient);
    });

    describe("getSchemaOverview", () => {
        test("should return a valid JSON response", async () => {
            // Arrange
            const apiKey = process.env.STEAM_WEB_API_KEY;
            const client = new SteamClient(apiKey!);

            // Act
            const result = await client.getSchemaOverview();

            // Assert
            expect(result.status).toBe(1);
            expect(() => new URL(result.items_game_url)).not.toThrow();
        });
    });
});
