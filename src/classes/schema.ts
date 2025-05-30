
import type { ClientSchema } from "@mann-conomy/tf-parser";
import { getObjectByIndex, loadSchemaFile, writeSchemaFile } from "../lib/utils";
import type { SchemaItem, SchemaOptions, SchemaProperties, SchemaResources } from "../types/schema";
import type { AttachedParticleAttribute, ItemAttribute, ItemQualities, ItemQualityNames, SchemaOverview } from "../types/steam";

export default class ItemSchema {
    private readonly items: SchemaItem[];
    private readonly client: ClientSchema;
    private readonly overview: SchemaOverview;

    private readonly version: string;
    private readonly language: string;

    public constructor(properties: SchemaProperties, options: SchemaOptions) {
        this.items = properties.items;
        this.client = properties.client;
        this.overview = properties.overview;
        
        this.version = options.version;
        this.language = options.language;
    }

    /**
     * 
     * @param name 
     * @param localized 
     * @returns The Schema item that matches the name, otherwise null.
     */
    public getItemByName(name: string, localized = false): SchemaItem | null {
        const items = this.getSchemaItems();
        for (const item of items) {
            if ((localized ? item.item_name : item.name).toLowerCase() === name.toLowerCase()) {
                return item;
            }
        }

        return null;
    }

    public getItemByDefindex(defindex: number): SchemaItem | null {
        const items = this.getSchemaItems();
        return getObjectByIndex(items, defindex, item => item.defindex);
    }

    public getQualityNameById(id: number): string | null {
        const qualities = this.getItemQualities();
        for (const [name, quality] of Object.entries(qualities)) {
            if (quality === id) {
                return this.overview.qualityNames[name] ?? null;
            }
        }

        return null;
    }

    public getQualityIdByName(name: string): number | null {
        const names = this.getItemQualityNames();
        for (const [id, quality] of Object.entries(names)) {
            if (name.toLowerCase() === quality.toLowerCase()) {
                return this.overview.qualities[id] ?? null;
            }
        }

        return null;
    }

    public getAttributeByDefindex(defindex: number) {
        const attributes = this.getItemAttributes();
        return getObjectByIndex(attributes, defindex, attribute => attribute.defindex);
    }

    public getEffectNameById(id: number): string | null {
        const effects = this.getParticleEffects();
        const effect = getObjectByIndex(effects, id, particle => particle.id);
        return (effect != null) ? effect.name : null;
    }

    public getEffectIdByName(name: string): number | null {
        const effects = this.getParticleEffects();
        for (const effect of effects) {
            if (effect.name.toLowerCase() === name.toLowerCase()) {
                return effect.id;
            }
        }

        return null;
    }

    public getSchemaItems(): SchemaItem[] {
        return this.items;
    }

    public getItemAttributes(): ItemAttribute[] {
        return this.overview.attributes;
    }

    public getParticleEffects(): AttachedParticleAttribute[] {
        return this.overview.attribute_controlled_attached_particles;
    }

    public getClientSchema(): ClientSchema {
        return this.client;
    }

    public getSchemaOverview(): SchemaOverview {
        return this.overview;
    }

    public getItemQualities(): ItemQualities {
        return this.overview.qualities;
    }

    public getItemQualityNames(): ItemQualityNames {
        return this.overview.qualityNames;
    }

    public stringify(): string {
        const schema = this.toJSON();
        return JSON.stringify(schema);
    }

    public getSchemaOptions(): SchemaOptions {
        return {
            version: this.version,
            language: this.language
        };
    }

    public toJSON(): SchemaResources {
        return {
            properties: {
                items: this.getSchemaItems(),
                client: this.getClientSchema(),
                overview: this.getSchemaOverview()
            },
            options: this.getSchemaOptions()
        };
    }

    /**
     * 
     * @param directory 
     * @param name 
     * @returns The path to the exported Schema file.
     */
    public async export(directory: string, filename: string): Promise<string> {
        const schema = this.stringify();
        return writeSchemaFile(directory, filename, schema);
    }

    public static async import(path: string, encoding: BufferEncoding = "utf8"): Promise<ItemSchema> {
        const schema = await loadSchemaFile(path, encoding);
        return new ItemSchema(schema.properties, schema.options);
    }
}
