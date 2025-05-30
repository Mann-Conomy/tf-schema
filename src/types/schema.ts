import type { SchemaOverview } from "./steam";
import type { ClientSchema } from "@mann-conomy/tf-parser";

export interface SchemaOptions {
    version: string;
    language: string;
}

export interface SchemaItemCapabilities {
    nameable: boolean;
    can_consume: boolean;
    can_strangify: boolean;
    strange_parts: boolean;
    can_gift_wrap: boolean;
    can_craft_mark: boolean;
    can_be_restored: boolean;
    can_card_upgrade: boolean;
    can_killstreakify: boolean;
}

export interface SchemaItemAttribute {
    name: string;
    value: number;
    class: string;
}

export interface SchemaItem {
    name: string;
    defindex: number;
    item_slot: string;
    item_name: string;
    image_url: string;
    drop_type: string;
    min_ilevel: number;
    max_ilevel: number;
    item_class: string;
    proper_name: boolean;
    model_player: string;
    item_quality: number;
    item_type_name: string;
    image_url_large: string;
    image_inventory: string;
    item_description: string;
    attributes: SchemaItemAttribute[];
    capabilities: SchemaItemCapabilities;
}

export interface SchemaProperties {
    items: SchemaItem[];
    client: ClientSchema;
    overview: SchemaOverview;
}

export interface SchemaResources {
    options: SchemaOptions;
    properties: SchemaProperties;
}
