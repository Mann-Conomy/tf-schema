import { extname, join } from "path";
import type { SchemaItem } from "../types/schema";
import SteamErrorFactory from "../classes/factory";
import type UrlBuilder from "../classes/builders/url";
import { SteamConstants } from "../resources/constants";
import { readFile, writeFile, mkdir } from "fs/promises";
import { FileExtension, StringSeperators } from "../resources/emums";
import type { GetSchemaItemsResponse, GetSchemaItemsResult } from "../types/steam";

/**
 * Checks whether the provided argument is an empty array.
 * @param arg The value to check.
 * @returns True if the argument is an array with zero length, otherwise false.
 */
export function isEmptyArray(arg: unknown) {
    return Array.isArray(arg) && arg.length === 0;
}

/**
 * Recursively fetches all schema items using the provided URL builder.
 * @param builder The URL builder configured for the `GetSchemaItems` endpoint.
 * @param items An optional array of items to accumulate during recursion.
 * @returns A promise resolving to the full list of schema items.
 * @throws An error if the fetch request fails or the response is invalid.
 */
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

/**
 * Finds an object in an array by a custom ID extractor function.
 * @param objects The array of objects to search.
 * @param id The ID to search for.
 * @param getId A function that extracts the ID from each object.
 * @returns The matching object if found, otherwise null.
 */
export function findObjectByIndex<T>(objects: T[], id: number, getId: (item: T) => number): T | null {
    for (const object of objects) {
        if (object != null && getId(object) === id) {
            return object;
        }
    }

    return null;
}

/**
 * Calculates the middle index between two numbers.
 * @param low The lower bound index.
 * @param high The upper bound index.
 * @returns The middle index.
 */
export function getMiddleIndex(low: number, high: number): number {
    return Math.floor((low + high) / 2);
}

/**
 * Performs a binary search for an object in a sorted array using a custom ID extractor.
 * @param items The array of items, assumed to be sorted by ID.
 * @param defindex The ID to search for.
 * @param getId A function to extract the ID from each object.
 * @returns The matching object if found, otherwise null.
 */
export function getObjectByIndex<T>(items: T[], defindex: number, getId: (item: T) => number): T | null {
    let low = 0;
    let high = items.length - 1;

    while(low <= high) {
        const middle = getMiddleIndex(low, high);
        const item = items[middle];
        if (item != null) {
            const id = getId(item);
            if (id === defindex) {
                return item;
            }

            if (id < defindex) {
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }
    }

    return findObjectByIndex(items, defindex, getId);
}

/**
 * Ensures that the filename ends with `.json`. Appends it if missing.
 * @param name The base filename.
 * @returns A filename with a `.json` extension.
 */
export function getFilename(name: string) {
    return extname(name) === StringSeperators.Punctuation.concat(FileExtension.JSON) ? name : name.concat(StringSeperators.Punctuation, FileExtension.JSON);
}

/**
 * Joins a directory and filename into a full file path with a `.json` extension.
 * @param directory The target directory.
 * @param filename The base filename.
 * @returns The full file path.
 */
export function getFilePath(directory: string, filename: string) {
    const name = getFilename(filename);
    return join(directory, name);
}

/**
 * Writes a string to a file in the specified directory with the given filename.
 * @param directory The directory to write the file to.
 * @param filename The filename to use (automatically appends `.json` if not present).
 * @param data The string content to write.
 * @param encoding The encoding to use when writing the file.
 * @returns A promise that resolves with the full path to the written file.
 */
export async function exportFile(directory: string, filename: string, data: string, encoding: BufferEncoding): Promise<string> {
    const path = getFilePath(directory, filename);
    await mkdir(directory, { recursive: true });
    await writeFile(path, data, encoding);
    return path;
}

/**
 * Imports a JSON file and parses it into an object of type `T`.
 * @param path The path to the file to import.
 * @param encoding The encoding used to read the file.
 * @returns A promise that resolves with the parsed object.
 */
export async function importFile<T>(path: string, encoding: BufferEncoding): Promise<T> {
    const file = await readFile(path, encoding);
    return JSON.parse(file) as T;
}
