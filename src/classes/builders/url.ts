import { UrlSeperators } from "../../resources/emums";

export type PathValues = string | string[];
export type SearchParams = Record<string, string> | string | URLSearchParams;

export interface UrlBuilderOptions {
    pathValues: PathValues;
    searchParams: SearchParams;
}

export default class UrlBuilder {
    private readonly url: URL;
    private readonly searchParams: URLSearchParams;
    private readonly seperator = UrlSeperators.ForwardSlash;

    constructor(baseUrl: string, options: Partial<UrlBuilderOptions> = {}) {
        const url = UrlBuilder.toPath(this.seperator, options.pathValues);

        this.url = new URL(url, baseUrl);
        this.searchParams = new URLSearchParams(options.searchParams);
    }

    private static toPath(seperator: string, options?: string | string[]): string {
        if (!options) {
            return seperator;
        }
        
        if (Array.isArray(options)) {
            return options.join(seperator);
        }
    
        return options;
    }

    public getUrl() {
        return this.url;
    }

    public getSearchParams() {
        return this.searchParams;
    }

    public toString(): string {
        if (this.searchParams.size > 0) {
            this.url.search = this.searchParams.toString();
        }
        
        return this.url.toString();
    }
}
