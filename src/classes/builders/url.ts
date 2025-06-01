import { StringSeperators } from "../../resources/emums";

export type PathValues = string | string[];
export type SearchParams = Record<string, string> | string | URLSearchParams;

/**
 * Options for constructing a URL using `UrlBuilder`.
 */
export interface UrlBuilderOptions {
    /** Path segments or a single path string to append to the base URL. */
    pathValues: PathValues;
    /** Query parameters to append to the URL. */
    searchParams: SearchParams;
}

/**
 * A utility class for building URLs with dynamic paths and query parameters.
 */
export default class UrlBuilder {
    private readonly url: URL;
    private readonly searchParams: URLSearchParams;
    private readonly seperator = StringSeperators.ForwardSlash;

    /**
     * Constructs a new instance of `UrlBuilder`.
     * @param baseUrl The base URL to build from.
     * @param options Optional path and search parameter values.
     */
    public constructor(baseUrl: string, options: Partial<UrlBuilderOptions> = {}) {
        const url = UrlBuilder.toPath(this.seperator, options.pathValues);

        this.url = new URL(url, baseUrl);
        this.searchParams = new URLSearchParams(options.searchParams);
    }

    /**
     * Joins path values using the given separator.
     * @param seperator The separator to use (e.g., `/`).
     * @param options A path string or array of path segments.
     * @returns The joined path string.
     */
    private static toPath(seperator: string, options?: string | string[]): string {
        if (!options) {
            return seperator;
        }
        
        if (Array.isArray(options)) {
            return options.join(seperator);
        }
    
        return options;
    }

    /**
     * Retrieves the search parameters for the URL.
     * @returns The `URLSearchParams` instance representing the query string from the URL.
     */
    public getSearchParams() {
        return this.searchParams;
    }

    /**
     * Returns the constructed URL as a string.
     * @returns The URL as a string.
     */
    public toString(): string {
        if (this.searchParams.size > 0) {
            this.url.search = this.searchParams.toString();
        }
        
        return this.url.toString();
    }
}
