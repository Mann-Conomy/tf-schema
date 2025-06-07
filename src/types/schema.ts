import type { SchemaOverview } from "./steam";
import type { ClientSchema } from "@mann-conomy/tf-parser";

/**
 * Options for the ItemSchema and ClientSchema classes.
 */
export interface SchemaOptions {
    /**
     * The schema version.
     */
    version: string;
    /**
     * The schema language name or ISO 639 code.
     */
    language: string;
}

/**
 * An object describing various capabilities of the item, including how it can be interacted with.
 */
export interface SchemaItemCapabilities {
    /**
     * Tags can be used on the item.
     */
    nameable: boolean;
    /**
     * The item can be painted.
     */
    paintable?: boolean;
    /**
     * The item can be consumed.
     */
    can_consume: boolean;
    /**
     * This item can have strange parts applied.
     */
    strange_parts: boolean;
    /**
     * The item can be gift wrapped.
     */
    can_gift_wrap: boolean;
    /**
     * The item can be strange.
     */
    can_strangify?: boolean;
    /**
     * The item will have the crafter's name attached to it.
     */
    can_craft_mark: boolean;
    /**
     * The item can be restored.
     */
    can_be_restored: boolean;
    /**
     * The item can be marked as a numbered craft.
     */
    can_craft_count?: boolean;
    /**
     * The item can be upgraded during a campaign.
     */
    can_card_upgrade: boolean;
    /**
     * The item can killstreakify.
     */
    can_killstreakify: boolean;
    /**
     * The item can be used in crafting if purchased.
     */
    can_craft_if_purchased?: boolean;
}

/**
 * Attributes normally associated with the item.
 */
export interface SchemaItemAttribute {
    /**
     * The attribute's name value.
     */
    name: string;
    /**
     * The attribute's attribute_class value.
     */
    value: number;
    /**
     * The "value" of that attribute as a "%0.6f" formatted number: 1 (or 0) for boolean attributes.
     */
    class: string;
}

/**
 * A schema item object.
 */
export interface SchemaItem {
    /**
     * A string that defines the item in the items_game.txt
     */
    name: string;
    /**
     * The item's unique index.
     */
    defindex: number;
    /**
     * A string indicating what loadout slot the item can be equipped to.
     */
    item_slot: string;
    /**
     * The tokenized string for the item's name.
     */
    item_name: string;
    /**
     * The URL of the small (128x128) backpack icon for the relevant item.
     */
    image_url: string;
    /**
     * A string indicating how an item will detach from the player upon death. 
     */
    drop_type?: string;
    /**
     * The minimum level of the item in the schema.
     */
    min_ilevel: number;
    /**
     * The maximum level of the item in the schema.
     */
    max_ilevel: number;
    /**
     * The item's class in game (ie. what you would use as the argument to "equip" in the console to equip it).
     */
    item_class: string;
    /**
     * The type of the item from the crafting system's point of view.
     */
    craft_class?: string;
    /**
     * A boolean value indicating the item requires "The" to be prefixed to it's English name.
     */
    proper_name: boolean;
    /**
     * The model to display for the item, using a path similar to the above but with an ".mdl" extension, or null if the object has no model.
     */
    model_player: string;
    /**
     * The item's default quality value.
     */
    item_quality: number;
    /**
     * The tokenized string that describes the item's class.
     */
    item_type_name: string;
    /**
     * The URL of the large (512x512) backpack image for the relevant item.
     */
    image_url_large: string;
    /**
     * The image to display, as an escaped-slash ("\/") path to the material, without the extension
     */
    image_inventory: string;
    /**
     * The tokenized string for the item's description if it has one.
     */
    item_description?: string;
    /**
     * The list of classes that can use this item.
     */
    used_by_classes?: string[];
    /**
     * Similar to craft_class, except this determines if it can be used in certain crafting recipes.
     */
    craft_material_type?: string;
    /**
     * If the item has effects normally associated with it.
     */
    attributes: SchemaItemAttribute[];
    /**
     * An object describing various capabilities of the item, including how it can be interacted with.
     */
    capabilities: SchemaItemCapabilities;
}

/**
 * The components that make up the TF2 item schema.
 */
export interface SchemaComponents {
    /**
     * A list of schema item objects.
     */
    items: SchemaItem[];
    /**
     * The TF2 game client schema.
     */
    client: ClientSchema;
    /**
     * An overview of the TF2 item schema.
     */
    overview: SchemaOverview;
}


/**
 * The contents of the TF2 item schema.
 */
export interface SchemaContents {
    /**
     * The components that make up the TF2 item schema.
     */
    schema: SchemaComponents;
    /**
     * The item schema options.
     */
    options: SchemaOptions;
}
