
import type { ClientSchema } from "@mann-conomy/tf-parser";
import { exportFile, getObjectByIndex, importFile, } from "../lib/utils";
import type { SchemaContents, SchemaItem, SchemaOptions, SchemaComponents } from "../types/schema";
import type { AttachedParticleAttribute, ItemAttribute, ItemQualities, ItemQualityNames, SchemaOverview } from "../types/steam";

/**
 * Represents the full parsed TF2 item schema, including definitions, attributes and particle effects.
 */
export default class ItemSchema {
    private readonly items: SchemaItem[];
    private readonly client: ClientSchema;
    private readonly overview: SchemaOverview;

    private readonly version: string;
    private readonly language: string;

    /**
     * Creates a new instance of the TF2 item schema with parsed resources and metadata.
     * @param schema The parsed schema data including items, client schema and overview.
     * @param options The schema options such as version and language.
     */
    public constructor(schema: SchemaComponents, options: SchemaOptions) {
        this.items = schema.items;
        this.client = schema.client;
        this.overview = schema.overview;
        
        this.version = options.version;
        this.language = options.language;
    }

    /**
     * Finds an item in the schema by its name.
     * @param name The internal or localized name of the item.
     * @param localized If true, uses the localized name for comparison. Defaults to false.
     * @returns The schema item if found, otherwise null.
     */
    public getItemByName(name: string, localized = false): SchemaItem | null {
        for (const item of this.items) {
            if ((localized ? item.item_name : item.name).toLowerCase() === name.toLowerCase()) {
                return item;
            }
        }

        return null;
    }

    /**
     * Finds an item in the schema by its defindex.
     * @param defindex The unique identifier for the item.
     * @returns The schema item if found, otherwise null.
     */
    public getItemByDefindex(defindex: number): SchemaItem | null {
        return getObjectByIndex(this.items, defindex, item => item.defindex);
    }

    /**
     * Gets the localized quality name from a quality ID.
     * @param id The numeric quality ID.
     * @returns The quality name or null if not found.
     */
    public getQualityNameById(id: number): string | null {
        for (const [name, quality] of Object.entries(this.overview.qualities)) {
            if (quality === id && this.overview.qualityNames[name]) {
                return this.overview.qualityNames[name];
            }
        }

        return null;
    }

    /**
     * Gets the quality ID from its localized name.
     * @param name The quality name (case-insensitive).
     * @returns The quality ID or null if not found.
     */
    public getQualityIdByName(name: string): number | null {
        for (const [id, quality] of Object.entries(this.overview.qualityNames)) {
            if (name.toLowerCase() === quality.toLowerCase() && this.overview.qualities[id]) {
                return this.overview.qualities[id];
            }
        }

        return null;
    }

    /**
     * Finds an item attribute by its defindex.
     * @param defindex The unique attribute index.
     * @returns The matching attribute object or null if not found.
     */
    public getAttributeByDefindex(defindex: number) {
        return getObjectByIndex(this.overview.attributes, defindex, attribute => attribute.defindex);
    }

    /**
     * Gets the particle effect name by its ID.
     * @param id The ID of the particle effect.
     * @returns The name of the effect or null if not found.
     */
    public getEffectNameById(id: number): string | null {
        const effect = getObjectByIndex(this.overview.attribute_controlled_attached_particles, id, particle => particle.id);
        return (effect != null) ? effect.name : null;
    }

    /**
     * Gets the ID of a particle effect by its name.
     * @param name The name of the effect.
     * @returns The effect ID or null if not found.
     */
    public getEffectIdByName(name: string): number | null {
        for (const effect of this.overview.attribute_controlled_attached_particles) {
            if (effect.name.toLowerCase() === name.toLowerCase()) {
                return effect.id;
            }
        }

        return null;
    }

    /**
     * Gets the list of all schema items.
     * @returns An array of item definitions.
     */
    public getSchemaItems(): SchemaItem[] {
        return this.items;
    }

    /**
     * Gets all defined item attributes.
     * @returns An array of item attribute definitions.
     */
    public getItemAttributes(): ItemAttribute[] {
        return this.overview.attributes;
    }

    /**
     * Gets all defined particle effects from the schema.
     * @returns An array of attached particle attributes.
     */
    public getParticleEffects(): AttachedParticleAttribute[] {
        return this.overview.attribute_controlled_attached_particles;
    }

    /**
     * Gets the parsed TF2 game client schema.
     * @returns The TF2 game client schema object.
     */
    public getClientSchema(): ClientSchema {
        return this.client;
    }

    /**
     * Gets the schema overview metadata.
     * @returns The schema overview object.
     */
    public getSchemaOverview(): SchemaOverview {
        return this.overview;
    }

    /**
     * Gets the internal mapping of quality names to their IDs.
     * @returns An object of quality names mapped to their numeric IDs.
     */
    public getItemQualities(): ItemQualities {
        return this.overview.qualities;
    }

    /**
     * Gets the internal mapping of quality IDs to their localized names.
     * @returns An object of quality IDs mapped to their display names.
     */
    public getItemQualityNames(): ItemQualityNames {
        return this.overview.qualityNames;
    }

    /**
     * Converts the schema to a JSON string.
     * @returns A JSON representation of the schema.
     */
    public stringify(): string {
        const schema = this.toJSON();
        return JSON.stringify(schema);
    }

    /**
     * Gets the Schema version.
     * @returns The Schema version.
     */
    public getVersion(): string {
        return this.version;
    }

    /**
     * Gets the language name or code used by the Schema.
     * @returns The language name or ISO 639 code.
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * Gets schema options such as version and language.
     * @returns The current schema options object.
     */
    public getSchemaOptions(): SchemaOptions {
        return {
            version: this.version,
            language: this.language
        };
    }

    /**
     * Converts the schema into a serializable object.
     * @returns The full schema content including definitions and options.
     */
    public toJSON(): SchemaContents {
        return {
            schema: {
                items: this.items,
                client: this.client,
                overview: this.overview
            },
            options: {
                version: this.version,
                language: this.language
            }
        };
    }
    
    /**
     * Exports the item schema to a file.
     * @param directory The output directory path.
     * @param filename The name of the file to write.
     * @param encoding The encoding to use when writing the file. Defaults to "utf8".
     * @returns A promise that resolves with the path to the exported file.
     */
    public async export(directory: string, filename: string, encoding: BufferEncoding = "utf8"): Promise<string> {
        return exportFile(directory, filename, this.stringify(), encoding);
    }

    /**
     * Imports a schema from a file.
     * @param path The path to the schema JSON file.
     * @param encoding The encoding of the file. Defaults to "utf8".
     * @returns A promise that resolves with the loaded ItemSchema instance.
     */
    public static async import(path: string, encoding: BufferEncoding = "utf8"): Promise<ItemSchema> {
        const file = await importFile<SchemaContents>(path, encoding);
        return new ItemSchema(file.schema, file.options);
    }
}
