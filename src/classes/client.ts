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
 * 
 */
export default class SchemaClient {
    private readonly version: string;
    private readonly language: string;

    /**
     * Creates a new instance of SchemaClient.
     * @param apiKey A Steam Web API key.
     * @param options Optional parameters for schema version and language.
     */
    public constructor(private apiKey: string, options: Partial<SchemaOptions> = {}) {
        this.version = options.version || SteamConstants.DefaultVersion;
        this.language = options.language || SteamConstants.DefaultLanguage;
    }

    /**
     * 
     * @returns 
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
     * 
     * @returns 
     */
    public async getSchemaItems(): Promise<GetSchemaItemsResult> {
        const builder = new UrlBuilder(SteamConstants.SteamAPIBaseUrl, {
            pathValues: [SteamConstants.GetSchemaItemsPath, this.version],
            searchParams: { key: this.apiKey, language: this.language },
        });

        return await getSchemaItems(builder);
    }

    /**
     * 
     * @param url The 
     * @returns 
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
     * 
     * @returns 
     */
    public async getItemSchema(): Promise<ItemSchema> {
        const [result, overview] = await Promise.all([this.getSchemaItems(), this.getSchemaOverview()]);
        const client = await this.getClientSchema(result.items_game_url || overview.items_game_url);
        return ItemSchemaMapper.map(client, result.items, overview, this.getSchemaOptions());
    }

    /**
     * Gets the Schema version used by the client.
     * @returns The Schema version.
     */
    public getVersion() {
        return this.version;
    }

    /**
     * Gets the language code used by the client.
     * @returns The ISO 639 language code.
     */
    public getLanguage() {
        return this.language;
    }

    /**
     * 
     * @returns 
     */
    public getSchemaOptions(): SchemaOptions {
        return {
            version: this.getVersion(),
            language: this.getLanguage()
        };
    }
}
