import UrlBuilder from "../builders/url";
import SteamErrorFactory from "../factory";
import { getSchemaItems } from "../../lib/utils";
import { SteamConstants } from "../../resources/constants";
import { type ItemSchema, SchemaParser } from "@mann-conomy/tf-parser";
import type { GetSchemaItemsResult, GetSchemaOverviewResponse, GetSchemaOverviewResult } from "../../types/steam";
export interface SchemaClientOptions {
    version: string;
    language: string;
}

export default class SchemaClient {
    private readonly version: string;
    private readonly language: string;

    public constructor(private apiKey: string, options: Partial<SchemaClientOptions> = {}) {
        this.version = options.version || SteamConstants.DefaultVersion;
        this.language = options.language || SteamConstants.DefaultLanguage;
    }

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

    public async getSchemaItems(): Promise<GetSchemaItemsResult> {
        const builder = new UrlBuilder(SteamConstants.SteamAPIBaseUrl, {
            pathValues: [SteamConstants.GetSchemaItemsPath, this.version],
            searchParams: { key: this.apiKey, language: this.language },
        });

        return await getSchemaItems(builder);
    }

    public async getItemSchema(url: string | URL): Promise<ItemSchema> {
        const response = await fetch(url);
        if (!response.ok) {
            throw await SteamErrorFactory.fromResponse(response);
        }

        const schema = await response.text();
        return SchemaParser.parse(schema);
    }

    public getVersion() {
        return this.version;
    }

    public getLanguage() {
        return this.language;
    }
}
