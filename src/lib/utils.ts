import type { SchemaItem, SchemaResources } from "../types/schema";
import SteamErrorFactory from "../classes/factory";
import type UrlBuilder from "../classes/builders/url";
import { SteamConstants } from "../resources/constants";
import type { GetSchemaItemsResponse, GetSchemaItemsResult } from "../types/steam";
import { extname, join } from "path";
import { FileExtension, StringSeperators } from "../resources/emums";
import { readFile, writeFile } from "fs/promises";

export function isEmptyArray(arg: unknown) {
    return Array.isArray(arg) && arg.length === 0;
}

export async function getSchemaItems(builder: UrlBuilder, items: SchemaItem[] = []): Promise<GetSchemaItemsResult> {
    const url = builder.toString();
    const response = await fetch(url);
    if (!response.ok) {
        throw await SteamErrorFactory.fromResponse(response);
    }

    const schema = await response.json() as GetSchemaItemsResponse;
    if (!isEmptyArray(schema.result.items)) {
        items = items.concat(schema.result.items);
    }

    if (schema.result.next) {
        builder.getSearchParams().set(SteamConstants.StartParameter, schema.result.next.toString());
        return getSchemaItems(builder, items);
    }

    schema.result.items = items;
    return schema.result;
}

export function findObjectByIndex<T>(objects: T[], id: number, getId: (item: T) => number): T | null {
    for (const object of objects) {
        if (object != null && getId(object) === id) {
            return object;
        }
    }

    return null;
}

export function getMiddleIndex(low: number, high: number): number {
    return Math.floor((low + high) / 2);
}

export function getObjectByIndex<T>(items: T[], defindex: number, getId: (item: T) => number): T | null {
    let low = 0;
    let high = items.length - 1;

    while(low <= high) {
        const middle = getMiddleIndex(low, high);
        const item = items[middle];
        if (item != null) {
            const identifier = getId(item);
            if (identifier === defindex) {
                console.log("found it faster");
                return item;
            }

            if (identifier < defindex) {
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }
    }

    console.log("using fallback");

    return findObjectByIndex(items, defindex, getId);
}

export function getFilename(name: string) {
    return extname(name) === FileExtension.JSON ? name : name.concat(StringSeperators.Punctuation, FileExtension.JSON);
}

export function getFilePath(directory: string, filename: string) {
    const name = getFilename(filename);
    return join(directory, name);
}

export async function writeSchemaFile(directory: string, filename: string, schema: string) {
    const path = getFilePath(directory, filename);
    await writeFile(path, schema);
    return path;
}

export async function loadSchemaFile(path: string, encoding: BufferEncoding): Promise<SchemaResources> {
    const file = await readFile(path, encoding);
    return JSON.parse(file) as SchemaResources;
}
