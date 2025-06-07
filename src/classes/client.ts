import type ItemSchema from "./schema";
import UrlBuilder from "./builders/url";
import SteamErrorFactory from "./factory";
import { getSchemaItems } from "../lib/utils";
import { ItemSchemaMapper } from "../lib/mappers";
import type { SchemaOptions } from "../types/schema";
import { SteamConstants } from "../resources/constants";
import { type ClientSchema, SchemaParser } from "@mann-conomy/tf-parser";
import type { GetSchemaItemsResult, GetSchemaOverviewResponse, GetSchemaOverviewResult } from "../types/steam";

/**
 * A JavaScript client for interacting with the Steam Web API to fetch and parse TF2 item schema data.
 */
export default class SchemaClient {
    private readonly version: string;
    private readonly language: string;

    /**
     * Creates a new instance of SchemaClient.
     * @param apiKey A Steam Web API key.
     * @param options Optional parameters for the schema version and language.
     */
    public constructor(private apiKey: string, options: Partial<SchemaOptions> = {}) {
        this.version = options.version || SteamConstants.DefaultVersion;
        this.language = options.language || SteamConstants.DefaultLanguage;
    }

    /**
     * Fetches an overview of the TF2 item schema from the Steam Web API.
     * @returns A promise that resolves to a schema overview result object.
     * @throws An error if the request fails or the response status is not OK.
     */
    public async getSchemaOverview(): Promise<GetSchemaOverviewResult> {
        const builder = new UrlBuilder(SteamConstants.SteamAPIBaseUrl, {
            pathValues: [SteamConstants.GetSchemaOverviewPath, this.version],
            searchParams: { key: this.apiKey, language: this.language },
        });

        const url = builder.toString();
        const response = await fetch(url);
        if (!response.ok) {
            throw await SteamErrorFactory.fromResponse(response);
        }

        const overview = await response.json() as GetSchemaOverviewResponse;
        return overview.result;
    }

    /**
     * Fetches the list of TF2 items defined in the schema from the Steam Web API.
     * @returns A promise that resolves to the schema items result.
     * @throws An error if the request fails or the response status is not OK.
     */
    public async getSchemaItems(): Promise<GetSchemaItemsResult> {
        const builder = new UrlBuilder(SteamConstants.SteamAPIBaseUrl, {
            pathValues: [SteamConstants.GetSchemaItemsPath, this.version],
            searchParams: { key: this.apiKey, language: this.language },
        });

        return await getSchemaItems(builder);
    }

    /**
     * Fetches and parses the TF2 game client schema from a given URL.
     * @param url The URL or request object pointing to the client schema file. 
     * @returns A promise that resolves to a parsed client schema object.
     * @throws An error if the request fails or the response status is not OK.
     */
    public async getClientSchema(url: string | URL | globalThis.Request): Promise<ClientSchema> {
        const response = await fetch(url);
        if (!response.ok) {
            throw await SteamErrorFactory.fromResponse(response);
        }

        const schema = await response.text();
        return SchemaParser.parse(schema);
    }

    /**
     * Retrieves the full TF2 item schema by combining schema items, overview, and client schema data.
     * @returns A promise that resolves to a fully constructed item schema object.
     * @throws An error if any of the underlying schema requests fail.
     */
    public async getItemSchema(): Promise<ItemSchema> {
        const [items, overview] = await Promise.all([this.getSchemaItems(), this.getSchemaOverview()]);
        const client = await this.getClientSchema(overview.items_game_url);
        return ItemSchemaMapper.map(client, items, overview, this.getSchemaOptions());
    }

    /**
     * Gets the schema version used by the client.
     * @returns The schema version.
     */
    public getVersion() {
        return this.version;
    }

    /**
     * Gets the language name or code used by the client.
     * @returns The language name or ISO 639 code.
     */
    public getLanguage() {
        return this.language;
    }

    /**
     * Gets schema options such as version and language.
     * @returns The current schema options object.
     */
    public getSchemaOptions(): SchemaOptions {
        return {
            version: this.getVersion(),
            language: this.getLanguage()
        };
    }
}
