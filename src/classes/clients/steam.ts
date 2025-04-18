import UrlBuilder from "../builders/url";
import SteamErrorFactory from "../factory";
import { SteamConstants } from "../../resources/constants";
import type { GetSchemaOverviewResponse, GetSchemaOverviewResult } from "../../types/steam";

export interface SteamClientOptions {
    version: string;
    language: string;
}

export default class SteamClient {
    private readonly version: string;
    private readonly language: string;

    constructor(private apiKey: string, options: Partial<SteamClientOptions> = {}) {
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
            const message = await response.text();
            throw SteamErrorFactory.fromResponse(response, message);
        }

        const overview = await response.json() as GetSchemaOverviewResponse;
        return overview.result;
    }
}
