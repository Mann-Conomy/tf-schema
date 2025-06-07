import { join } from "path";
import { SchemaClient } from "../src/classes";
import ItemSchema from "../src/classes/schema";
import { describe, expect, test } from "@jest/globals";

let schema: ItemSchema;

beforeAll(async() => {
    const client = new SchemaClient(process.env.STEAM_WEB_API_KEY!);
    schema = await client.getItemSchema();
});

describe("ItemSchema", () => {
    test("new schema should be an instance of SchemaClient", () => {
        // Assert
        expect(schema).toBeInstanceOf(ItemSchema);
    });

    test("getSchemaItems should return a list of schema items", () => {
        // Act
        const items = schema.getSchemaItems();

        // Assert
        expect(items.length).not.toBe(0);
    });

    test("getItemAttributes should return a list of item attributes", () => {
        // Act
        const items = schema.getItemAttributes();

        // Assert
        expect(items.length).not.toBe(0);
    });

    test("getClientSchema should return the client schema", () => {
        // Act
        const client = schema.getClientSchema();

        // Assert
        expect(client).not.toBe(null);
        expect(client.items_game).not.toBe(null);
    });

    test("getSchemaOverview should return the schema overview", () => {
        // Act
        const overview = schema.getSchemaOverview();

        // Assert
        expect(overview).not.toBe(null);
        expect(overview.qualities).not.toBe(null);
    });

    test("getParticleEffects should return a list of particle effects", () => {
        // Act
        const particles = schema.getParticleEffects();

        // Assert
        expect(particles.length).not.toBe(0);
    });

    test("getItemQualities should return an object of item qualities", () => {
        // Act
        const qualities = schema.getItemQualities();

        // Assert
        expect(qualities).not.toBe(null);
    });

    test("getItemQualityNames should return an object of item quality names", () => {
        // Act
        const names = schema.getItemQualityNames();

        // Assert
        expect(names).not.toBe(null);
    });

    test("getItemByName with localization should return The Infernal Impaler", () => {
        // Act
        const item = schema.getItemByName("Infernal Impaler", true);

        // Assert
        expect(item).not.toBe(null);
        expect(item?.defindex).toBe(575);
        expect(item?.name).toBe("The Infernal Impaler");
        expect(item?.item_name).toBe("Infernal Impaler");
    });

    test("getItemByName without localization should return The Infernal Impaler", () => {
        // Act
        const item = schema.getItemByName("The Infernal Impaler");
        
        // Assert
        expect(item).not.toBe(null);
        expect(item?.defindex).toBe(575);
        expect(item?.name).toBe("The Infernal Impaler");
        expect(item?.item_name).toBe("Infernal Impaler");
    });

    test("getItemByName should return null when given an invalid name", () => {
        // Act
        const item = schema.getItemByName("The Banana Blaster");

        // Assert
        expect(item).toBe(null);
    });

    test("getItemByDefindex(303) should return Berliner's Bucket Helm", () => {
        // Act
        const item = schema.getItemByDefindex(303);

        // Assert
        expect(item).not.toBe(null);
        expect(item?.defindex).toBe(303);
        expect(item?.name).toBe("Berliner's Bucket Helm");
        expect(item?.item_name).toBe("Berliner's Bucket Helm");
    });

    test("getItemByDefindex(3020) should return null", () => {
        // Act
        const item = schema.getItemByDefindex(3020);

        // Assert
        expect(item).toBe(null);
    });

    test("getQualityNameById(11) should return vintage", () => {
        // Act
        const name = schema.getQualityNameById(11);

        // Assert
        expect(name).toBe("Strange");
    });

    test("getQualityNameById(74) should return null", () => {
        // Act
        const name = schema.getQualityNameById(74);

        // Assert
        expect(name).toBe(null);
    });

    test("getQualityIdByName(Unusual) should return 5", () => {
        // Act
        const name = schema.getQualityIdByName("Unusual");

        // Assert
        expect(name).toBe(5);
    });

    test("getQualityIdByName(Rare) should return null", () => {
        // Act
        const name = schema.getQualityIdByName("Rare");

        // Assert
        expect(name).toBe(null);
    });

    test("getEffectNameById(34) should return Bubbling", () => {
        // Act
        const effect = schema.getEffectNameById(34);

        // Assert
        expect(effect).toBe("Bubbling");
    });

    test("getEffectNameById(1411) should return null", () => {
        // Act
        const effect = schema.getEffectNameById(1411);

        // Assert
        expect(effect).toBe(null);
    });

    test("getEffectIdByName(Roboactive) should return 72", () => {
        // Act
        const effect = schema.getEffectIdByName("Roboactive");
        
        // Assert
        expect(effect).toBe(72);
    });

    test("getEffectIdByName(Sandstorm) should return null", () => {
        // Act
        const effect = schema.getEffectIdByName("Sandstorm");
        
        // Assert
        expect(effect).toBe(null);
    });

    test("getAttributeByDefindex(1) should return a damage attribute", () => {
        // Act
        const attribute = schema.getAttributeByDefindex(1);

        // Assert
        expect(attribute).not.toBe(null);
        expect(attribute?.name).toBe("damage penalty");
        expect(attribute?.stored_as_integer).toBe(false);
    });

    test("getAttributeByDefindex(1091) should return null", () => {
        // Act
        const attribute = schema.getAttributeByDefindex(1091);

        // Assert
        expect(attribute).toBe(null);
    });

    test("getVersion should return the schema version", () => {
        // Act
        const version = schema.getVersion();

        // Assert
        expect(version).toBe("v0001");
    });

    test("getLanguage should return the schema language", () => {
        // Act
        const language = schema.getLanguage();

        // Assert
        expect(language).toBe("en");
    });

    test("getSchemaOptions should return the version and language", () => {
        // Act
        const options = schema.getSchemaOptions();

        // Assert
        expect(options.version).toBe("v0001");
        expect(options.language).toBe("en");
    });

    test("export should create a file at the specified path", async() => {
        // Act
        const path = await schema.export("test/static", "schema");
        const expected = join("test", "static", "schema.json");

        // Assert
        expect(path).toBe(expected);
    });

    test("import should return a new ItemSchema instance", async() => {
        // Act
        const schema = await ItemSchema.import("test/static/schema.json");

        // Assert
        expect(schema).toBeInstanceOf(ItemSchema);
    });
});
