import { describe, expect, test } from "@jest/globals";
import UrlBuilder from "../src/classes/builders/url";

describe("UrlBuilder", () => {
    const BASE_URL = "https://api.steampowered.com/";

    describe("toString", () => {
        test("should convert the base url to a string", () => {
            // Arrange
            const builder = new UrlBuilder(BASE_URL);

            // Act
            const url = builder.toString();

            // Assert
            expect(url).toBe(BASE_URL);
        });

        test("should convert the base url and a single path value to a string", () => {
            // Arrange
            const builder = new UrlBuilder(BASE_URL, {
                pathValues: "IEconItems_440"
            });

            // Act
            const url = builder.toString();

            // Assert
            expect(url).toBe("https://api.steampowered.com/IEconItems_440");
        });

        test("should convert the base url and a multiple path values to a string", () => {
            // Arrange
            const builder = new UrlBuilder(BASE_URL, {
                pathValues: ["IEconItems_440", "GetSchemaItems", "v0001"],
            });

            // Act
            const url = builder.toString();

            // Assert
            expect(url).toBe("https://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001");
        });

        test("should convert a url to a string", () => {
            // Arrange
            const builder = new UrlBuilder(BASE_URL, {
                pathValues: ["IEconItems_440", "GetSchemaOverview", "v0001"],
                searchParams: { language: "en" },
            });

            // Act
            const url = builder.toString();

            // Assert
            expect(url).toBe("https://api.steampowered.com/IEconItems_440/GetSchemaOverview/v0001?language=en")
        });
    });

    describe("append", () => {
        test("should append name-value pair", () => {
            // Arrange
            const builder = new UrlBuilder(BASE_URL, {
                pathValues: ["IEconItems_440", "GetSchemaItems", "v0001"],
                searchParams: { language: "en" },
            });

            // Act
            builder.getSearchParams().set("start", "1460");
            builder.getSearchParams().set("start", "2410");
            const url = builder.toString(); 
            
            // Assert
            expect(url).toBe("https://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001?language=en&start=2410");
        });
    });
});