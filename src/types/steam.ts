import type { SchemaItem } from "./schema";

export type ItemQualities = Record<string, number>;
export type ItemQualityNames = Record<string, string>;

/**
 * An object that describes special attributes granted by equipping a complete item set.
 */
export interface ItemSetAttribute {
    /**
     * The attribute's name value.
     */
    name: string;
    /**
     * The attribute's attribute_class value.
     */
    class: string;
    /**
     * The "value" of that attribute as a "%0.6f" formatted number: 1 (or 0) for boolean attributes.
     */
    value: number;
}

/**
 * An object that contains item set definitions.
 */
export interface ItemSet {
    /**
     * The internal name of the set used for look ups.
     */
    item_set: string;
    /**
     * The localized set name.
     */
    name: string;
    /**
     * A list of localized item names identifying the items contained in the set.
     */
    items: string[];
    /**
     * A list of objects that describe special attributes granted by equipping a complete set.
     */
    attributes: ItemSetAttribute[];
}

/**
 * An object that describe ranks for kill eater items.
 */
export interface ItemLevel {
    /**
     * The rank/prefix name.
     */
    name: string;
    /**
     * The rank's level.
     */
    level: number;
    /**
     * The required kill eater score to level up the rank to the next one.
     */
    required_score: number;
}

/**
 * A list of objects that describe ranks for kill eater items.
 */
export interface ItemLevels {
    /**
     * The name of the rank set that the ranks are for.
     */
    name: string;
    /**
     * A list of objects describing requirements and levels of each rank.
     */
    levels: ItemLevel[];
}

/**
 * An object that describes an item's origin.
 */
export interface ItemOriginName {
    /**
     * The localized name of the origin.
     */
    name: string;
    /**
     * An integer identifying the origin.
     */
    origin: number;
}

/**
 * An object that describes an item's attributes.
 */
export interface ItemAttribute {
    /**
     * A name describing the attribute.
     */
    name: string;
    /**
     * A boolean that indicates if the attribute's description should be hidden from user view.
     */
    hidden: boolean;
    /**
     * The attribute's unique index.
     */
    defindex: number;
    /**
     * A string describing the type of effect the attribute has.
     */
    effect_type: string;
    /**
     * An underscore-based name for the attribute.
     */
    attribute_class: string;
    /**
     * A boolean that indicates whether or not the value of the attribute is stored as an integer (opposed to a float).
     */
    stored_as_integer: boolean;
    /**
     * The tokenized string that describes the attribute.
     */
    description_string: string;
    /**
     * A string describing how to format the value for a description.
     */
    description_format: string;
}

/**
 * An objec that describes a lookup table.
 */
export interface StringLookup {
    /**
     * The unique index.
     */
    index: number;
    /**
     * The tokenized string for the value.
     */
    string: string;
}

/**
 * An object containing a list of objects describing lookup tables.
 */
export interface StringLookups {
    /**
     * The name of the lookup table.
     */
    table_name: string;
    /**
     * An array of StringLookup objects.
     */
    strings: StringLookup[];
}

/**
 * An object that describes suffixes to use after a kill eater value in an attribute display line.
 */
export interface KillEaterScoreType {
    /**
     * An integer matching the one found in kill eater score type attributes.
     */
    type: number;
    /**
     * A localized suffix.
     */
    type_name: string;
    /**
     * Optional level data for the kill eater score type.
     */
    level_data?: string;
}

/**
 * An object that describe the defined particle effects.
 */
export interface AttachedParticleAttribute {
    /**
     * The effect's ID, referred to by the attached particle effect attribute.
     */
    id: number;
    /**
     * The localized name of the effect.
     */
    name: string;
    /**
     * The name of the particle system.
     */
    system: string;
    /**
     * A boolean that indicates whether or not the effect is attached to the "root" bone.
     */
    attach_to_rootbone: boolean;
}

/**
 * The base result data shared by the Steam Web API methods.
 */
export interface GetSchemaResult {
    /**
     * The status of the request, should always be 1.
     */
    status: number;
    /**
     * A string containing the URL to the full item schema as used by the game.
     */
    items_game_url: string;
}

/**
 * An overview of the TF2 item schema.
 */
export interface SchemaOverview {
    /**
     * A list of objects containing item set definitions.
     */
    item_sets: ItemSet[];
    /**
     * An object containing the numeric values corresponding to each "quality" an item can have:
     */
    qualities: ItemQualities;
    /**
     * A list of objects that describe ranks for kill eater items.
     */
    item_levels: ItemLevels[];
    /**
     * If the item has effects normally associated with it.
     */
    attributes: ItemAttribute[];
    /**
     * A list of objects describing an item's origin.
     */
    originNames: ItemOriginName[];
    /**
     * If the language argument is specified this object is included in the output.
     */
    qualityNames: ItemQualityNames;
    /**
     * A list of objects describing lookup tables.
     */
    string_lookups: StringLookups[];
    /**
     * A list of objects describing suffixes to use after a kill eater value in an attribute display line.
     */
    kill_eater_score_types: KillEaterScoreType[];
    /**
     * A list of objects that describe the defined particle effects.
     */
    attribute_controlled_attached_particles: AttachedParticleAttribute[];
}

/**
 * The `GetSchemaOverview` result object from the `GetSchemaOverviewResponse` object.
 */
export type GetSchemaOverviewResult = SchemaOverview & GetSchemaResult;

/**
 * The `GetSchemaOverview` response object from the Steam Web API.
 */
export interface GetSchemaOverviewResponse {
    /**
     * The `GetSchemaOverview` result object from the response.
     */
    result: GetSchemaOverviewResult;
}

/**
 * The `GetSchemaItems` result object from the `GetSchemaItemsResponse` object.
 */
export interface GetSchemaItemsResult extends GetSchemaResult {
    /**
     * Defindex to set up the next query to get the next set of items.
     */
    next?: number;
    /**
     * A list of schema item objects.
     */
    items: SchemaItem[];
}

/**
 * The `GetSchemaItems` response object from the Steam Web API.
 */
export interface GetSchemaItemsResponse {
    /**
     * The `GetSchemaItems` result object from the response.
     */
    result: GetSchemaItemsResult;
}
