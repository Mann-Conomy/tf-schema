import { describe, expect, test } from "@jest/globals";
import SchemaClient from "../src/classes/index";

const API_KEY = process.env.STEAM_WEB_API_KEY!;

describe("SchemaClient", () => {
    test("new client should be an instance of SchemaClient", () => {
        // Arrange
        const client = new SchemaClient(API_KEY);

        // Act and assert
        expect(client).toBeInstanceOf(SchemaClient);
    });

    describe("getSchemaOverview", () => {
        test("should return a valid JSON response", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const result = await client.getSchemaOverview();

            // Assert
            expect(result.status).toBe(1);
            expect(() => new URL(result.items_game_url)).not.toThrow();
        });
    });
 
    describe("getSchemaItems", () => {
        test("should return a valid JSON response", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const result = await client.getSchemaItems();

            // Assert
            expect(result.status).toBe(1);
            expect(result.items).not.toBe(0);
            expect(() => new URL(result.items_game_url)).not.toThrow();
        });
    });

    describe("getItemSchema", () => {
        test("should return a valid JSON response", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const result = await client.getSchemaOverview();
            const schema = await client.getItemSchema(result.items_game_url);

            // Assert
            expect(schema.items_game.qualities.vintage?.value).toBe(3);
            expect(schema.items_game.qualities["strange"]?.value).toBe(11);
        });
    });
});
