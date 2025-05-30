import { describe, expect, test } from "@jest/globals";
import { ItemSchema, SchemaClient } from "../src/classes/index";

const API_KEY = process.env.STEAM_WEB_API_KEY!;

describe("SchemaClient", () => {
    test("new client should be an instance of SchemaClient", () => {
        // Arrange
        const client = new SchemaClient(API_KEY, {
            version: "v0001",
            language: "en"
        });

        // Act and assert
        expect(client).toBeInstanceOf(SchemaClient);
    });

    describe("getSchemaOverview", () => {
        test("should return a valid GetSchemaOverviewResult object", async() => {
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
        test("should return a valid GetSchemaItemsResult object", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const result = await client.getSchemaItems();

            // Assert
            expect(result.status).toBe(1);
            expect(result.items.length).not.toBe(0);
            expect(() => new URL(result.items_game_url)).not.toThrow();
        });
    });

    describe("getClientSchema", () => {
        test("should return a valid ClientSchema object", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const result = await client.getSchemaOverview();
            const schema = await client.getClientSchema(result.items_game_url);

            // Assert
            expect(schema.items_game.qualities.vintage?.value).toBe(3);
            expect(schema.items_game.qualities["strange"]?.value).toBe(11);
        });
    });

    describe("getItemSchema", () => {
        test("should return an instance of ItemSchema", async() => {
            // Arrange
            const client = new SchemaClient(API_KEY);

            // Act
            const schema = await client.getItemSchema();

            // Assert
            expect(schema).toBeInstanceOf(ItemSchema);
        });
    });
});
