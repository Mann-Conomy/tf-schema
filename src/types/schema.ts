export interface ItemCapabilities {
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

export interface ItemAttribute {
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
    attributes: ItemAttribute[];
    capabilities: ItemCapabilities;
}