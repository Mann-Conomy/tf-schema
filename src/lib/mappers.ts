import ItemSchema from "../classes/schema";
import type { ClientSchema } from "@mann-conomy/tf-parser";
import type { SchemaItem, SchemaOptions } from "../types/schema";
import type { GetSchemaOverviewResult, SchemaOverview } from "../types/steam";

export class SchemaOverviewMapper {
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

export class ItemSchemaMapper {
    public static map(client: ClientSchema, items: SchemaItem[], result: GetSchemaOverviewResult, options: SchemaOptions): ItemSchema {
        const overview = SchemaOverviewMapper.map(result);
        return new ItemSchema({ items, client, overview }, options);
    }
}
