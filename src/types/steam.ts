import type { SchemaItem } from "./schema";

export type ItemQualities = Record<string, number>;
export type ItemQualityNames = Record<string, string>;

export interface ItemSetAttribute {
    name: string;
    class: string;
    value: number;
}

export interface ItemSet {
    item_set: string;
    name: string;
    items: string;
    attributes: ItemSetAttribute[];
}

export interface ItemLevel {
    name: string;
    level: number;
    required_score: number;
}

export interface ItemLevels {
    name: string;
    levels: ItemLevel[];
}

export interface ItemOriginName {
    name: string;
    origin: number;
}

export interface ItemAttribute {
    name: string;
    hidden: boolean;
    defindex: number;
    effect_type: string;
    attribute_class: string;
    stored_as_integer: boolean;
    description_string: string;
    description_format: string;
}

export interface StringLookup {
    index: number;
    string: string;
}

export interface StringLookups {
    table_name: string;
    strings: StringLookup[];
}

export interface KillEaterScoreType {
    type: number;
    type_name: string;
    level_data: string;
}

export interface AttachedParticleAttribute {
    id: number;
    name: string;
    system: string;
    attach_to_rootbone: boolean;
}

export interface GetSchemaOverviewResult {
    status: number;
    item_sets: ItemSet[];
    items_game_url: string;
    qualities: ItemQualities;
    item_levels: ItemLevels[];
    attributes: ItemAttribute[];
    originNames: ItemOriginName[];
    qualityNames: ItemQualityNames;
    string_lookups: StringLookups[];
    kill_eater_score_types: KillEaterScoreType[];
    attribute_controlled_attached_particles: AttachedParticleAttribute[];
}

export interface GetSchemaOverviewResponse {
    result: GetSchemaOverviewResult;
}

export interface GetSchemaItemsResult {
    next?: number;
    status: number;
    items: SchemaItem[];
    items_game_url: string;
}

export interface GetSchemaItemsResponse {
    result: GetSchemaItemsResult;
}
