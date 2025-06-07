import ItemSchema from "../classes/schema";
import type { ClientSchema } from "@mann-conomy/tf-parser";
import type { SchemaItem, SchemaOptions, SchemaComponents } from "../types/schema";
import type { GetSchemaItemsResult, GetSchemaOverviewResult, SchemaOverview } from "../types/steam";

/**
 * Maps the item schema result to a list of schema items.
 */
export class SchemaItemMapper {
    /**
     * Maps the schema items from the `GetSchemaItems` result object.
     * @param result The result object returned from the `GetSchemaItems` API endpoint.
     * @returns An array of schema items.
     */
    public static map(result: GetSchemaItemsResult): SchemaItem[] {
        return result.items;
    }
}

/**
 * Maps the schema overview result to a structured overview object.
 */
export class SchemaOverviewMapper {
    /**
     * Maps the `GetSchemaOverview` result object into a normalized `SchemaOverview` object.
     * @param result The result object returned from the `GetSchemaOverview` API endpoint.
     * @returns A structured overview of the schema including item sets, qualities, attributes, etc.
     */
    public static map(result: GetSchemaOverviewResult): SchemaOverview {
        return {
            item_sets: result.item_sets,
            qualities: result.qualities,
            item_levels: result.item_levels,
            attributes: result.attributes,
            originNames: result.originNames,
            qualityNames: result.qualityNames,
            string_lookups: result.string_lookups,
            kill_eater_score_types: result.kill_eater_score_types,
            attribute_controlled_attached_particles: result.attribute_controlled_attached_particles
        };
    }
}

/**
 * Combines and maps all schema data (client, items, overview) into a single resource object.
 */
export class SchemaResourcesMapper {
    /**
     * Maps and bundles the schema data into a `SchemaResources` object.
     * @param client The parsed TF2 game client schema.
     * @param itemsResult The raw result from the `GetSchemaItems` API call.
     * @param overviewResult The raw result from the `GetSchemaOverview` API call.
     * @returns A combined `SchemaResources` object for use in schema construction.
     */
    public static map(client: ClientSchema, itemsResult: GetSchemaItemsResult, overviewResult: GetSchemaOverviewResult): SchemaComponents {
        const items = SchemaItemMapper.map(itemsResult);
        const overview = SchemaOverviewMapper.map(overviewResult);

        return {
            items,
            client,
            overview
        };
    }
}

/**
 * Maps all schema components into a fully constructed `ItemSchema` instance.
 */
export class ItemSchemaMapper {
    /**
     * Combines all schema data and options to create a new `ItemSchema` object.
     * @param client The parsed TF2 game client schema.
     * @param items The result object from the `GetSchemaItems` API request.
     * @param overview The result object from the `GetSchemaOverview` API request.
     * @param options The schema options such as version and language.
     * @returns A fully mapped `ItemSchema` instance.
     */
    public static map(client: ClientSchema, items: GetSchemaItemsResult, overview: GetSchemaOverviewResult, options: SchemaOptions): ItemSchema {
        const schema = SchemaResourcesMapper.map(client, items, overview);
        return new ItemSchema(schema, options);
    }
}
