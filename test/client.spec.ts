import { describe, expect, test } from "@jest/globals";
import { SteamError } from "../src/classes/builders/error";
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

        test("getSchemaOverview should throw when the API key is invalid", () => {
            // Arrange
            const client = new SchemaClient("2USADFLSDLIFLSDEF8F3QWLKFSDEFSD");

            // Assert
            expect(async() => await client.getSchemaOverview()).rejects.toThrow(SteamError);
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

        test("getSchemaItems should throw when the API key is invalid", () => {
            // Arrange
            const client = new SchemaClient("SHDFJSODIUFJH4892WIUOUJEWOE4SFR");

            // Assert
            expect(async() => await client.getSchemaItems()).rejects.toThrow(SteamError);
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
        
        test("getClientSchema should throw when the URL is invalid", () => {
            // Arrange
            const client = new SchemaClient("JDFG89WJGFSODF8QWE9WSOF8SEWR9OFG");
            const url = new URL("http://media.steampowered.com/apps/440/scripts/items/items_game.381273f3bbc5846888vved1b11e4057297af8852.txt");

            // Assert
            expect(async() => await client.getClientSchema(url)).rejects.toThrow(SteamError);
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
