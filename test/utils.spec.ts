import { describe, expect, test } from "@jest/globals";
import { findObjectByIndex, getFilename, isEmptyArray } from "../src/lib/utils";

describe("isEmptyArray", () => {
    test("should return true if the array is empty", () => {
        // Arrange
        const elements = [];

        // Act
        const empty = isEmptyArray(elements);

        // Assert
        expect(empty).toBe(true);
    });

    test("should return false if the array contains elements", () => {
        // Arrange
        const elements = ["1", "2"];

        // Act
        const empty = isEmptyArray(elements);

        // Assert
        expect(empty).toBe(false);
    });
});

describe("findObjectByIndex", () => {
        test("should find the item object in a list using a custom index property", () => {
        // Arrange
        const items = [{ index: 54 }, { index: 55 }, { index: 56 }];

        // Act
        const item = findObjectByIndex(items, 56, item => item.index);

        // Assert
        expect(item).not.toBe(null);
        expect(item?.index).toBe(56);
    });
});

describe("getFilename", () => {
    test("should return the filename with the .json extension", () => {
        // Act
        const filename = getFilename("schema.v0001.en");

        // Assert
        expect(filename).toBe("schema.v0001.en.json");
    });

    test("should return the original filename if it has a .json extension", () => {
        // Act
        const filename = getFilename("schema.v0001.da.json");

        // Assert
        expect(filename).toBe("schema.v0001.da.json");
    });
});
