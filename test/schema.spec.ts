import ItemSchema from "../src/classes/schema";
import { describe, expect, test } from "@jest/globals";

let schema: ItemSchema;

beforeAll(async () => {
    schema = await ItemSchema.import("./test/static/schema.json");
});

describe("ItemSchema", () => {
    test("new client should be an instance of SchemaClient", () => {
        // Assert
        expect(schema).toBeInstanceOf(ItemSchema);
    });

    test("getAllItems", async() => {
        // Act
        const items = schema.getSchemaItems();

        // Assert
        expect(items.length).not.toBe(0);
    });

    test("getItemByName", () => {
        // Act
        const item = schema.getItemByName("Infernal Impaler", true);

        // Assert
        expect(item).not.toBe(null);
        expect(item?.defindex).toBe(575);
        expect(item?.name).toBe("The Infernal Impaler");
        expect(item?.item_name).toBe("Infernal Impaler");
    });

    test("getItemByName", () => {
        // Act
        const item = schema.getItemByName("The Infernal Impaler", false);

        console.log(item)

        expect(item).not.toBe(null);
        expect(item?.defindex).toBe(575);
        expect(item?.name).toBe("The Infernal Impaler");
        expect(item?.item_name).toBe("Infernal Impaler");
    });

    test("", () => {
        const name = schema.getQualityNameById(11);
        const id = schema.getQualityIdByName("Vintage");

        expect(name).toBe("Strange");
        expect(id).toBe(3);
    })

    test("2", () => {
        const effect = schema.getEffectNameById(34);
        console.log(effect);
    });

    test("2", () => {
        const effect = schema.getEffectIdByName("Roboactive");
        console.log(effect);
    });
});